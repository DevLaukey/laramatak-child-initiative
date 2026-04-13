import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? "Contact Form <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? "info@laramatakchildinitiative.org"],
        reply_to: email,
        subject: `[Contact Form] ${subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1F7A4C;">New Message from Contact Form</h2>
            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0; font-weight:bold; color:#374151; width:100px;">Name</td>
                <td style="padding:8px 0; color:#374151;">${name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; font-weight:bold; color:#374151;">Email</td>
                <td style="padding:8px 0; color:#374151;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:8px 0; font-weight:bold; color:#374151;">Subject</td>
                <td style="padding:8px 0; color:#374151;">${subject}</td>
              </tr>
            </table>
            <hr style="border:none; border-top:1px solid #e5e7eb; margin:16px 0;" />
            <h3 style="color:#1F7A4C;">Message</h3>
            <p style="color:#374151; line-height:1.7; white-space:pre-wrap;">${message}</p>
            <hr style="border:none; border-top:1px solid #e5e7eb; margin:16px 0;" />
            <p style="color:#9ca3af; font-size:12px;">
              Sent via the Laramatak Child Initiative contact form.
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
