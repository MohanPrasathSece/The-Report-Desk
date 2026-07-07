/**
 * Local dev API server - mirrors Vercel serverless functions on port 3001
 * Run via: npm run api  (or automatically via npm run dev)
 */
import http from "http";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { formatFullPhoneNumber } from "./src/lib/phoneValidation";
import { incrementLeadCount, getLeadCount } from "./src/lib/leadStorage";

// ── Load .env file ────────────────────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url));
try {
  const raw = readFileSync(join(__dir, ".env"), "utf-8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (key) process.env[key] = val;
  }
  console.log("[DEV API] .env loaded");
} catch {
  console.warn("[DEV API] No .env file found, using existing env vars");
}

const PORT = 3001;

// ── Helper: parse JSON body ───────────────────────────────
function parseBody(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}

// ── Helper: send JSON response ────────────────────────────
function json(res: http.ServerResponse, status: number, data: object) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(data));
}

// ── Server ────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  const url = req.url ?? "";

  // ── POST /api/submit-lead ─────────────────────────────
  if (url === "/api/submit-lead" && req.method === "POST") {
    try {
      const body = await parseBody(req);
      const { name, email, phone, countryCode, budget, message } = body as {
        name: string; email: string; phone: string;
        countryCode: string; budget?: string; message?: string;
      };

      const [first_name, ...rest] = (name || "Unknown").trim().split(" ");
      const last_name = rest.join(" ") || "Lead";
      const formattedPhone = formatFullPhoneNumber(phone || "", countryCode || "CY");

      const payload = {
        country_name: (countryCode || "cy").toLowerCase(),
        description: message || "Signup Lead",
        phone: formattedPhone,
        email: email.toLowerCase().trim(),
        first_name,
        last_name,
        custom_fields: {
          Source_ID: "website",
          How_Much_Invested: budget || "0",
          Outline_Your_Case: message || "",
        },
      };

      const crmUrl = process.env.CRM_URL!;
      const crmToken = process.env.CRM_TOKEN!;

      console.log("\n━━━ [CRM] Submitting Lead ━━━━━━━━━━━━━━━━━━━━");
      console.log("[CRM] URL:    ", crmUrl);
      console.log("[CRM] Token:  ", crmToken ? `${crmToken.slice(0, 12)}…` : "NOT SET");
      console.log("[CRM] Payload:", JSON.stringify(payload, null, 2));

      const crmRes = await fetch(crmUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${crmToken}`,
          "x-token": crmToken,
        },
        body: JSON.stringify(payload),
      });

      const responseText = await crmRes.text();
      console.log(`[CRM] HTTP Status:  ${crmRes.status}`);
      console.log(`[CRM] Response Body: ${responseText}`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

      // Parse JSON body to detect app-level errors (CRM may return 200 with {"error":"..."})
      let parsedBody: any = null;
      try { parsedBody = JSON.parse(responseText); } catch { /* plain text */ }

      const alreadyExists = responseText.toLowerCase().includes("already exist");
      const crmAppError = parsedBody?.error && !alreadyExists;

      if ((!crmRes.ok || crmAppError) && !alreadyExists) {
        let errMsg = parsedBody?.error || responseText || "CRM rejected lead";
        if (errMsg.toLowerCase().includes("lead is not valid")) {
          errMsg = "The phone number or email format appears to be incorrect. Please make sure your phone number has the correct number of digits and corresponds to the selected country code.";
        }
        console.warn(`[CRM] Lead rejected: ${errMsg}`);
        return json(res, 200, { success: false, error: errMsg });
      }

      // Only increment count when CRM genuinely accepted the lead
      try {
        const newCount = await incrementLeadCount();
        console.log(`[LEAD COUNT] Incremented - new count: ${newCount}`);
      } catch (err) {
        console.error("[LEAD COUNT] Failed to increment:", err);
      }

      return json(res, 200, { success: true });
    } catch (err: any) {
      console.error("[DEV API] /api/submit-lead error:", err);
      return json(res, 500, { success: false, error: err?.message || "Server error" });
    }
  }

  // ── GET /api/leads-count ──────────────────────────────
  if (url === "/api/leads-count" && req.method === "GET") {
    try {
      const count = await getLeadCount();
      console.log(`[LEAD COUNT] Current count: ${count}`);
      return json(res, 200, { success: true, count });
    } catch (err: any) {
      console.error("[DEV API] /api/leads-count error:", err);
      return json(res, 500, { success: false, error: err?.message });
    }
  }

  // 404
  return json(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`\n✅ [DEV API] Running on http://localhost:${PORT}`);
  console.log("   Endpoints: POST /api/submit-lead | GET /api/leads-count\n");
});
