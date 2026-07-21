import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Chặn truy cập trang admin ở phía server.
 *
 * Ban đầu tôi viết cái này thành middleware (proxy.ts), nhưng Next 16 không cho
 * proxy chạy Edge runtime, còn OpenNext trên Cloudflare Workers lại chưa hỗ trợ
 * middleware chạy Node runtime — hai bên loại trừ nhau. Kiểm tra ngay trong
 * Server Component đạt hiệu quả tương đương: request bị chặn trước khi render,
 * không có HTML hay JS nào của trang admin được gửi về trình duyệt.
 *
 * Đây vẫn chỉ là lớp phòng thủ thứ hai. Lớp bảo vệ thật cho dữ liệu là RLS
 * trong Postgres (migrations/20260721000001_harden_lead_rls.sql) — ai gọi thẳng
 * Supabase REST API thì chỉ RLS mới cản được.
 */
export async function requireAdmin() {
  const supabase = await createClient();

  // getUser() xác thực token với Supabase Auth server.
  // getSession() chỉ đọc cookie nên có thể bị giả mạo — không dùng ở đây.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  const { data: role } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (!role) redirect("/");

  return user;
}

/** Đã đăng nhập rồi thì không cần vào lại trang đăng nhập. */
export async function redirectIfAuthenticated() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/admin");
}
