import { put, list } from "@vercel/blob";

// In-memory fallback when credentials are absent (local dev without .env)
let localLeadCountFallback = 0;

export async function getLeadCount(): Promise<number> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.warn("[LEAD STORAGE] BLOB_READ_WRITE_TOKEN not set - using in-memory fallback.");
    return localLeadCountFallback;
  }

  try {
    const { blobs } = await list({ token, prefix: "lead-count.json" });
    const blob = blobs.find((b) => b.pathname === "lead-count.json");

    if (blob) {
      // Private blobs require the token in the Authorization header
      const response = await fetch(blob.url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      return typeof data.count === "number" ? data.count : 0;
    }
  } catch (error) {
    console.error("[LEAD STORAGE] Error reading from Vercel Blob:", error);
  }

  return 0;
}

export async function incrementLeadCount(): Promise<number> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const currentCount = await getLeadCount();
  const newCount = currentCount + 1;

  if (!token) {
    localLeadCountFallback = newCount;
    return newCount;
  }

  try {
    await put("lead-count.json", JSON.stringify({ count: newCount }), {
      access: "private",       // matches your private Blob store
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    });
    console.log(`[LEAD STORAGE] Count updated to ${newCount}`);
    return newCount;
  } catch (error) {
    console.error("[LEAD STORAGE] Error updating Vercel Blob:", error);
    localLeadCountFallback = newCount;
    return newCount;
  }
}
