import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Không tìm thấy trang",
  description: "Trang bạn tìm không tồn tại hoặc đã được chuyển đi.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center px-6">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-2 text-xl text-muted-foreground">
          Không tìm thấy trang bạn đang tìm
        </p>
        <p className="mb-6 text-sm text-muted-foreground">
          Có thể tour này đã kết thúc hoặc đường dẫn bị sai.
        </p>
        <Link href="/" className="text-primary underline hover:text-primary/90">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
