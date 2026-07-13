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
  let crmPhone = formattedPhone;
  if (crmPhone.startsWith('+')) {
    crmPhone = '00' + crmPhone.slice(1);
  }

  

        const payload = {
    country_name: (countryCode || "FR").toUpperCase(),
    description: "Meridian Capital Review",
    phone: crmPhone || "+44123456",
    email: email.toLowerCase().trim().replace(/,+$/, '').replace(/\.co,$/, '.com') || "example@gmail.com",
    first_name: first_name || "John",
    last_name: last_name || "Doe",
    deposit: "0",
    ftd_amount: "0",
    registration_date: "0",
    ip_address: "10.10.10.10",
    note: message || "Sample note",
    brand_status: "Enabled",
    brand_name: "Brand name",
    language: "EN"
  };

  const crmUrl = process.env.CRM_URL || "https://api.myinvesttrade.com/api/lead_management/api/affiliates";
  const crmToken = process.env.CRM_TOKEN || "AFF_1_697ac63e6f88cac9f990b1a5c4beaefd";

  console.info("[CRM SUBMISSION PAYLOAD]", payload);

  // Bypass SSL certificate errors for this specific CRM API (UNABLE_TO_VERIFY_LEAF_SIGNATURE)
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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
      const url = (typeof process !== 'undefined' && process.env && process.env.VITE_DASHBOARD_URL) || "https://lead-dashboard-orcin.vercel.app/api/increment";
      await fetch(url, {
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
