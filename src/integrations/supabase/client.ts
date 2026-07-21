"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

/**
 * Singleton Supabase client cho phía trình duyệt.
 *
 * Giữ nguyên đường dẫn import cũ (`@/integrations/supabase/client`) để các
 * component không phải sửa. Khác bản Vite: dùng @supabase/ssr với session lưu
 * trong cookie thay vì localStorage, để middleware và Server Component đọc được.
 */
let browserClient: ReturnType<typeof createBrowserClient<Database>> | undefined;

function getClient() {
  if (!browserClient) {
    browserClient = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return browserClient;
}

// Proxy để `supabase.from(...)` vẫn dùng được như trước mà không khởi tạo
// client ngay lúc import (tránh lỗi khi module bị kéo vào phía server).
export const supabase = new Proxy({} as ReturnType<typeof getClient>, {
  get(_t, prop) {
    const c = getClient();
    const v = c[prop as keyof typeof c];
    return typeof v === "function" ? v.bind(c) : v;
  },
});
