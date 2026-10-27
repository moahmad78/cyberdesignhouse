export interface LeadEmailPayload {
  leadId?: string;
  name: string;
  mobileNumber: string;
  email?: string | null;
  company?: string | null;
  requirement?: string | null;
  projectDetails?: string | null;
  budgetOrDuration?: string | null;
  submissionSource?: string | null;
  timestamp?: string;
}

const DEFAULT_RECEIVER = "voometd@gmail.com";

/**
 * Dispatches an immediate lead notification email to voometd@gmail.com
 * via Resend API (same as VoometDesign).
 */
export async function sendLeadNotificationEmail(lead: LeadEmailPayload) {
  const receiverEmail = process.env.LEAD_RECEIVER_EMAIL || DEFAULT_RECEIVER;
  const resendApiKey = process.env.RESEND_API_KEY;
  const formattedDate = lead.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #071633; color: #334155; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.25); }
    .header { background: linear-gradient(135deg, #071633 0%, #0f2757 100%); color: #ffffff; padding: 28px 32px; border-bottom: 3px solid #3b82f6; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0 0; color: #94a3b8; font-size: 13px; }
    .content { padding: 28px 32px; }
    .lead-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .lead-table td { padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; vertical-align: top; }
    .label { width: 38%; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
    .value { color: #071633; font-weight: 600; font-size: 14px; }
    .highlight { color: #2563eb; font-size: 16px; font-weight: 700; }
    .phone-btn { display: inline-block; background: #071633; color: #ffffff !important; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 13px; margin-top: 6px; }
    .footer { background: #f8fafc; padding: 18px 32px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>💻 New Lead Received — Cyber Design House</h1>
      <p>Technology &amp; Digital Growth Arm of VoometDesign • ${formattedDate}</p>
    </div>
    <div class="content">
      <table class="lead-table">
        <tr>
          <td class="label">Client Name</td>
          <td class="value">${lead.name}</td>
        </tr>
        <tr>
          <td class="label">Phone / WhatsApp</td>
          <td class="value">
            <span class="highlight">${lead.mobileNumber}</span><br/>
            <a href="tel:${lead.mobileNumber.replace(/\s+/g, '')}" class="phone-btn">📞 Call Client</a>
            <a href="https://wa.me/${lead.mobileNumber.replace(/[^0-9]/g, '')}" style="display:inline-block; background:#25D366; color:#ffffff; padding:10px 18px; border-radius:8px; text-decoration:none; font-weight:600; font-size:13px; margin-top:6px; margin-left:6px;">💬 WhatsApp</a>
          </td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value">${lead.email || "Not Provided"}</td>
        </tr>
        ${lead.company ? `<tr><td class="label">Company</td><td class="value">${lead.company}</td></tr>` : ""}
        <tr>
          <td class="label">Service / Scope</td>
          <td class="value">${lead.requirement || "Web & App Development"}</td>
        </tr>
        ${lead.budgetOrDuration ? `<tr><td class="label">Duration / Budget</td><td class="value" style="color: #059669; font-weight: 700;">${lead.budgetOrDuration}</td></tr>` : ""}
        <tr>
          <td class="label">Source</td>
          <td class="value">${lead.submissionSource || "Cyber Design House (IT)"}</td>
        </tr>
        ${
          lead.projectDetails
            ? `<tr><td class="label">Project Notes</td><td class="value" style="background:#f8fafc; padding:10px; border-radius:8px; font-weight:400; line-height:1.6;">${lead.projectDetails}</td></tr>`
            : ""
        }
      </table>
    </div>
    <div class="footer">
      Cyber Design House Automation (by VoometDesign) • Delivered directly to voometd@gmail.com
    </div>
  </div>
</body>
</html>
`;

  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Cyber Design House <onboarding@resend.dev>",
          to: [receiverEmail],
          reply_to: lead.email || undefined,
          subject: `🔥 [IT Lead] ${lead.name} — ${lead.requirement || "Tech Inquiry"}`,
          html: htmlContent,
        }),
      });

      const resData = await response.json().catch(() => null);
      if (response.ok) {
        console.log("[Mailer/Resend] ✅ IT Lead email sent successfully:", resData?.id);
        return { success: true, messageId: resData?.id };
      } else {
        console.error("[Mailer/Resend] ❌ Resend API Error:", resData);
      }
    } catch (resendErr) {
      console.error("[Mailer/Resend] ❌ Exception calling Resend:", resendErr);
    }
  }

  return { success: false, reason: "No email dispatch method succeeded." };
}
