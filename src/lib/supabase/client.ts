"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/integrations/supabase/types";

/**
 * Supabase client dùng trong Client Component.
 *
 * Khác bản Vite cũ: session lưu trong cookie thay vì localStorage, nhờ vậy
 * Server Component và middleware đọc được — đó là điều kiện để chặn /admin
 * ở tầng edge thay vì chỉ giấu UI ở client.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
