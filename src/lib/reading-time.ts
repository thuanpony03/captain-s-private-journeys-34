/**
 * Tách riêng khỏi lib/blog.ts vì file đó import supabase/server (next/headers)
 * — nếu BlogManager.tsx (client component) import estimateReadingTime từ
 * lib/blog.ts thì kéo theo cả chuỗi import server-only vào bundle client,
 * làm build lỗi. Hàm thuần này không phụ thuộc gì nên tách ra dùng chung.
 */
export function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
