import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.parse(body);

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "Autohaus AKER <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL || "info@autohausaker.de",
        replyTo: parsed.email,
        subject: `Kontaktanfrage von ${parsed.name}`,
        html: `
          <h2>Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${parsed.name}</p>
          <p><strong>E-Mail:</strong> ${parsed.email}</p>
          ${parsed.phone ? `<p><strong>Telefon:</strong> ${parsed.phone}</p>` : ""}
          <p><strong>Nachricht:</strong></p>
          <p>${parsed.message.replace(/\n/g, "<br>")}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
