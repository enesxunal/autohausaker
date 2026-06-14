import { createServiceClient } from "@/lib/supabase/server";
import { getSupabaseServiceKey, getSupabaseUrl } from "@/lib/supabase/env";
import type { SellRequest } from "@/lib/types";

export async function fetchAdminSellRequests(): Promise<{
  requests: SellRequest[];
  error: string | null;
}> {
  if (!getSupabaseUrl() || !getSupabaseServiceKey()) {
    return { requests: [], error: "Supabase service key eksik (Vercel env)" };
  }

  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("sell_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("fetchAdminSellRequests:", error.message);
      return { requests: [], error: error.message };
    }

    return { requests: (data ?? []) as SellRequest[], error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { requests: [], error: message };
  }
}
