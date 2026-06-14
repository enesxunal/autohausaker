import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { createServiceClient } from "@/lib/supabase/server";
import { getSupabaseServiceKey } from "@/lib/supabase/env";

async function getDbClient() {
  if (getSupabaseServiceKey()) return createServiceClient();
  return null;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = [
      ...(formData.getAll("files") as File[]),
      ...(formData.get("file") ? [formData.get("file") as File] : []),
    ].filter((f) => f && f.size > 0);

    if (files.length === 0) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const auth = await requireAdmin({ requireWrite: true });
    if ("error" in auth && auth.error) return auth.error;

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: "Blob not configured" }, { status: 500 });
    }

    const { put } = await import("@vercel/blob");
    const urls: string[] = [];

    for (const file of files) {
      const blob = await put(`vehicles/${Date.now()}-${file.name}`, file, {
        access: "public",
      });
      urls.push(blob.url);
    }

    return NextResponse.json(files.length === 1 ? { url: urls[0] } : { urls });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
