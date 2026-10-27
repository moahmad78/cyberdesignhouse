export interface GoogleSheetLeadData {
  leadId?: string;
  name: string;
  mobileNumber: string;
  email?: string | null;
  projectLocation?: string | null;
  requirement?: string | null;
  projectDetails?: string | null;
  areaSqft?: string | null;
  submissionSource?: string | null;
  promoCode?: string | null;
  createdAt?: string;
}

const DEFAULT_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbw5JCO6w0jndkW6uYd3HTEQFPIKwV-7X2BqDYgWd_cX-JtQzGSj2UE8GmyBNQAywl2_/exec";

/**
 * Appends a new lead from Cyber Design House (IT Company)
 * to the configured VoometDesign Google Sheet via Google Apps Script Webhook.
 */
export async function appendLeadToGoogleSheet(data: GoogleSheetLeadData): Promise<boolean> {
  const webhookUrl = (process.env.GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_WEBHOOK_URL).trim();
  if (!webhookUrl || webhookUrl === "") {
    console.warn("[GoogleSheet] GOOGLE_SHEET_WEBHOOK_URL is not configured.");
    return false;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12 second timeout

    const payload = {
      leadId: data.leadId || `IT-${Date.now().toString(36).toUpperCase()}`,
      name: data.name || "",
      mobileNumber: data.mobileNumber || "",
      email: data.email || "",
      projectLocation: data.projectLocation || "Bangalore",
      requirement: data.requirement || "Web & App Development",
      projectDetails: data.projectDetails || "",
      areaSqft: data.areaSqft || "N/A",
      submissionSource: data.submissionSource || "Cyber Design House (IT)",
      promoCode: data.promoCode || "",
      createdAt: data.createdAt || new Date().toISOString(),
    };

    const response = await fetch(webhookUrl.trim(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[GoogleSheet] Sync failed with status: ${response.status}`);
      return false;
    }

    const resData = await response.json().catch(() => null);
    console.log("[GoogleSheet] IT Lead appended successfully to Google Sheet:", resData || "OK");
    return true;
  } catch (error) {
    console.error("[GoogleSheet] Error syncing IT lead to Google Sheet:", error);
    return false;
  }
}
