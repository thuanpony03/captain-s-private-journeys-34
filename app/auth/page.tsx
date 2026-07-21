import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";
import { redirectIfAuthenticated } from "@/lib/auth-guard";

export const metadata: Metadata = {
  title: "Đăng nhập Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function Page() {
  await redirectIfAuthenticated();
  return <AuthForm />;
}
