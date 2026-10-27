import { NextResponse } from "next/server";
import { appendLeadToGoogleSheet } from "@/lib/googleSheet";
import { sendLeadNotificationEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, handle, platform, email, phone, category, followers, sampleReel, message } = body;

    if (!name || !handle || !email || !phone) {
      return NextResponse.json(
        { error: "Name, social handle, email, and WhatsApp phone are required." },
        { status: 400 }
      );
    }

    const creatorNotes = [
      `Handle: ${handle} (${platform || "Instagram"})`,
      category ? `Niche: ${category}` : "",
      followers ? `Followers: ${followers}` : "",
      sampleReel ? `Sample Link: ${sampleReel}` : "",
      message ? `Pitch: ${message}` : "",
    ].filter(Boolean).join(" | ");

    // 1. Append directly to VoometDesign Google Sheet
    try {
      await appendLeadToGoogleSheet({
        name: name.trim(),
        mobileNumber: phone.trim(),
        email: email.trim(),
        projectLocation: "Creator Network",
        requirement: `Influencer Marketing (${category || "General"})`,
        projectDetails: creatorNotes,
        areaSqft: followers || "N/A",
        submissionSource: "Cyber Design House (Creator Application)",
        createdAt: new Date().toISOString(),
      });
    } catch (sheetErr) {
      console.error("[IT API] Failed to append creator lead to Google Sheet:", sheetErr);
    }

    // 2. Dispatch email to voometd@gmail.com
    try {
      await sendLeadNotificationEmail({
        name: name.trim(),
        mobileNumber: phone.trim(),
        email: email.trim(),
        company: `${handle} (${platform || "Social Creator"})`,
        requirement: `Creator Application — ${category || "General"} (${followers || "Audience"})`,
        projectDetails: creatorNotes,
        submissionSource: "Cyber Design House (Creator Application)",
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      });
    } catch (mailErr) {
      console.error("[IT API] Failed to send creator email notification:", mailErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your creator application has been received. Our team will review your profile and reach out within 2 business days.",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Error processing influencer application:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again or WhatsApp us directly." },
      { status: 500 }
    );
  }
}
