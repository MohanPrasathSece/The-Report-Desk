import type { VercelRequest, VercelResponse } from "@vercel/node";
import { formatFullPhoneNumber } from "./_lib/phoneValidation.js";
import { incrementLeadCount } from "./_lib/leadStorage.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { name, email, phone, countryCode, budget, message } = req.body as {
    name: string;
    email: string;
    phone: string;
    countryCode: string;
    budget?: string;
    message?: string;
  };

  const [first_name, ...lastNameParts] = (name || "Unknown").trim().split(" ");
  const last_name = lastNameParts.join(" ") || "Lead";

  const formattedPhone = formatFullPhoneNumber(phone || "", countryCode || "CY");

  const payload = {
    country_name: (countryCode || "cy").toLowerCase(),
    description: "Meridian Capital Review",
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

  const crmUrl = process.env.CRM_URL || "https://inwo.crmcore.me/api/lead_management/api/affiliates";
  const crmToken = process.env.CRM_TOKEN || "";

  console.info("[CRM SUBMISSION PAYLOAD]", payload);

  try {
    const response = await fetch(crmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${crmToken}`,
        "x-token": crmToken,
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.info("[CRM RESPONSE]", response.status, responseText);

    let parsedBody: any = null;
    try {
      parsedBody = JSON.parse(responseText);
    } catch {
      // plain text
    }

    const alreadyExists = responseText.toLowerCase().includes("already exist");
    const crmAppError = parsedBody?.error && !alreadyExists;

    if ((!response.ok || crmAppError) && !alreadyExists) {
      let errMsg = parsedBody?.error || responseText || "CRM rejected lead";
      if (errMsg.toLowerCase().includes("lead is not valid")) {
        errMsg = "Invalid phone number or email format. Please check the digits and selected country.";
      }
      return res.status(200).json({ success: false, error: errMsg });
    }

    // Sync to dashboard
    try {
      const url = (typeof process !== 'undefined' && process.env && process.env.VITE_DASHBOARD_URL) || "https://autodigix-leads-dashboard.vercel.app/api/increment";
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: "Meridian Capital Review", type: message ? "contact" : "signup", name: name, email: email})
      }).catch(() => {});
    } catch(e){}

    // Increment successful lead count in Vercel Blob
    try {
      await incrementLeadCount();
    } catch (err) {
      console.error("[CRM] Failed to increment lead count:", err);
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("[CRM ERROR]", error);
    return res.status(500).json({ success: false, error: error.message || "Unknown error" });
  }
}
