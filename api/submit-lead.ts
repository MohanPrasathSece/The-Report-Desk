import type { VercelRequest, VercelResponse } from "@vercel/node";
import { formatFullPhoneNumber } from "../src/lib/phoneValidation";
import { incrementLeadCount } from "../src/lib/leadStorage";

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
        errMsg = "The phone number or email format appears to be incorrect. Please make sure your phone number has the correct number of digits and corresponds to the selected country code.";
      }
      return res.status(200).json({ success: false, error: errMsg });
    }

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
