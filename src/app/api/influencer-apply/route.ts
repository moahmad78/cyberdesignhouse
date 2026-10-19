import { NextResponse } from "next/server";

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

    console.log("=== NEW INFLUENCER APPLICATION RECEIVED ===");
    console.log({
      name,
      handle,
      platform,
      category,
      followers,
      email,
      phone,
      sampleReel,
      message,
      submittedAt: new Date().toISOString(),
    });

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
