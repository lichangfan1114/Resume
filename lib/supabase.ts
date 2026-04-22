import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// 环境变量未配置时 client = null，publish 会 fallback 到 localStorage。
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const isSupabaseConfigured = Boolean(supabase);
