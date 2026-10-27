import { NextResponse } from "next/server";
import { appendLeadToGoogleSheet } from "@/lib/googleSheet";
import { sendLeadNotificationEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, services, duration, budget, message, consent, honeypot } = body;

    // Honeypot spam protection
    if (honeypot) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }

    // Required fields validation
    if (!name || !email || !message || (consent === false)) {
      return NextResponse.json(
        { error: "Please fill in all required fields and accept the privacy consent." },
        { status: 400 }
      );
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid business email address." },
        { status: 400 }
      );
    }

    const requirementText = Array.isArray(services)
      ? services.join(", ")
      : (services || "Web & App Development");

    const durationOrBudget = duration || budget || "Not Specified";
    const fullProjectNotes = [
      company ? `Company: ${company}` : "",
      durationOrBudget !== "Not Specified" ? `Timeline / Budget: ${durationOrBudget}` : "",
      message ? `Message: ${message}` : "",
    ].filter(Boolean).join(" | ");

    // 1. Append directly to the VoometDesign Google Sheet
    try {
      await appendLeadToGoogleSheet({
        name: name.trim(),
        mobileNumber: (phone || "Not Provided").trim(),
        email: email.trim(),
        projectLocation: company || "Bangalore",
        requirement: requirementText,
        projectDetails: fullProjectNotes,
        areaSqft: durationOrBudget,
        submissionSource: "Cyber Design House (IT Website Form)",
        createdAt: new Date().toISOString(),
      });
    } catch (sheetErr) {
      console.error("[IT API] Failed to append lead to Google Sheet:", sheetErr);
    }

    // 2. Dispatch email notification to voometd@gmail.com
    try {
      await sendLeadNotificationEmail({
        name: name.trim(),
        mobileNumber: (phone || "Not Provided").trim(),
        email: email.trim(),
        company: company || null,
        requirement: requirementText,
        budgetOrDuration: durationOrBudget,
        projectDetails: message,
        submissionSource: "Cyber Design House (IT Website Form)",
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      });
    } catch (mailErr) {
      console.error("[IT API] Failed to send lead notification email:", mailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been received. Our Bangalore team will respond within one business day.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Unable to process submission at this time. Please try again or WhatsApp us directly." },
      { status: 500 }
    );
  }
}
