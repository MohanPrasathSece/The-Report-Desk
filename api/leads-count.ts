import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getLeadCount } from "./_lib/leadStorage.js";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const count = await getLeadCount();
    return res.status(200).json({ success: true, count });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || "Failed to retrieve lead count" });
  }
}
