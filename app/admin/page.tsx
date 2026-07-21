import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { requireAdmin } from "@/lib/auth-guard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function Page() {
  // Chặn ở server: không đủ quyền thì redirect trước khi render bất cứ thứ gì.
  await requireAdmin();
  return <AdminDashboard />;
}
