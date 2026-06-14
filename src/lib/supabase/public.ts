import { createClient } from "@supabase/supabase-js";
import { getSupabaseAnonKey, getSupabaseUrl } from "./env";

/** Herkese açık veri okuma — oturum gerektirmez */
export function createPublicClient() {
  return createClient(getSupabaseUrl(), getSupabaseAnonKey());
}
