import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseAnonKey, getSupabaseServiceKey, getSupabaseUrl } from "./env";

export async function createClient() {
  const cookieStore = await cookies();
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component
        }
      },
    },
  });
}

export async function createServiceClient() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(getSupabaseUrl(), getSupabaseServiceKey());
}
