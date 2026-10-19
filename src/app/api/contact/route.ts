import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, services, budget, message, consent, honeypot } = body;

    // Honeypot spam protection (Section 6.3)
    if (honeypot) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }

    // Required fields validation
    if (!name || !email || !message || !consent) {
      return NextResponse.json(
        { error: "Please fill in all required fields and accept the privacy consent." },
        { status: 400 }
      );
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid business email address." },
        { status: 400 }
      );
    }

    console.log("=== NEW CYBER DESIGN HOUSE CONSULTATION INQUIRY ===");
    console.log({
      name,
      email,
      phone,
      company,
      services,
      budget,
      message,
      timestamp: new Date().toISOString(),
    });

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
