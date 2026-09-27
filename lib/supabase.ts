/**
 * Supabase client with graceful offline/fallback handling.
 * If NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set,
 * the client is `null` and callers must fall back to seed/mock data.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn('[supabase] env vars missing — running in offline/mock mode');
    return null;
  }

  try {
    _client = createClient(url, key, {
      auth: { persistSession: false },
    });
    return _client;
  } catch (err) {
    console.error('[supabase] client init failed', err);
    return null;
  }
}

export const isSupabaseConfigured = (): boolean =>
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;