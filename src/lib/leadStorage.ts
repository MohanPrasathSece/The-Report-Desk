import { put, list } from "@vercel/blob";

// Local in-memory counter fallback in case credentials are not configured yet
let localLeadCountFallback = 0;

export async function getLeadCount(): Promise<number> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.warn("[LEAD STORAGE] BLOB_READ_WRITE_TOKEN is not defined in env variables. Using local fallback.");
    return localLeadCountFallback;
  }

  try {
    const { blobs } = await list({ token });
    const leadCountBlob = blobs.find((b) => b.pathname === "lead-count.json");
    
    if (leadCountBlob) {
      const response = await fetch(leadCountBlob.url);
      const data = await response.json();
      return typeof data.count === "number" ? data.count : 0;
    }
  } catch (error) {
    console.error("[LEAD STORAGE] Error reading from Vercel Blob:", error);
  }

  return localLeadCountFallback;
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
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    });
    return newCount;
  } catch (error) {
    console.error("[LEAD STORAGE] Error updating Vercel Blob:", error);
    localLeadCountFallback = newCount; // fallback
    return newCount;
  }
}
