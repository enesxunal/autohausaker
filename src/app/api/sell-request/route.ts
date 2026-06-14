import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { Resend } from "resend";
import { z } from "zod";
import { getSupabaseServiceKey, isSupabaseConfigured } from "@/lib/supabase/env";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  year: z.string().optional(),
  mileage: z.string().optional(),
  transmission: z.string().optional(),
  fuel_type: z.string().optional(),
  description: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      brand: formData.get("brand") as string,
      model: formData.get("model") as string,
      year: (formData.get("year") as string) || undefined,
      mileage: (formData.get("mileage") as string) || undefined,
      transmission: (formData.get("transmission") as string) || undefined,
      fuel_type: (formData.get("fuel_type") as string) || undefined,
      description: (formData.get("description") as string) || undefined,
    };

    const parsed = schema.parse(data);

    let imageUrl: string | null = null;
    const photo = formData.get("photo") as File | null;
    if (photo && photo.size > 0 && process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`sell-requests/${Date.now()}-${photo.name}`, photo, {
        access: "public",
      });
      imageUrl = blob.url;
    }

    if (isSupabaseConfigured() && getSupabaseServiceKey()) {
      const { createServiceClient } = await import("@/lib/supabase/server");
      const supabase = await createServiceClient();
      await supabase.from("sell_requests").insert({
        ...parsed,
        year: parsed.year ? parseInt(parsed.year) : null,
        mileage: parsed.mileage ? parseInt(parsed.mileage) : null,
        image_url: imageUrl,
      });
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "Autohaus AKER <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL || "info@autohausaker.de",
        subject: `Neue Verkaufsanfrage: ${parsed.brand} ${parsed.model}`,
        html: `
          <h2>Neue Verkaufsanfrage</h2>
          <p><strong>Name:</strong> ${parsed.name}</p>
          <p><strong>E-Mail:</strong> ${parsed.email}</p>
          <p><strong>Telefon:</strong> ${parsed.phone}</p>
          <p><strong>Fahrzeug:</strong> ${parsed.brand} ${parsed.model}</p>
          ${parsed.year ? `<p><strong>Baujahr:</strong> ${parsed.year}</p>` : ""}
          ${parsed.mileage ? `<p><strong>KM:</strong> ${parsed.mileage}</p>` : ""}
          ${parsed.transmission ? `<p><strong>Getriebe:</strong> ${parsed.transmission}</p>` : ""}
          ${parsed.fuel_type ? `<p><strong>Kraftstoff:</strong> ${parsed.fuel_type}</p>` : ""}
          ${parsed.description ? `<p><strong>Beschreibung:</strong> ${parsed.description}</p>` : ""}
          ${imageUrl ? `<p><strong>Foto:</strong> <a href="${imageUrl}">${imageUrl}</a></p>` : ""}
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sell request error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
