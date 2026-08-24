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
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
          <Link href="/" className="text-primary underline hover:text-primary/90">
            Về trang chủ
          </Link>
          <Link href="/tour" className="text-primary underline hover:text-primary/90">
            Xem các tour
          </Link>
          <Link href="/cam-nang" className="text-primary underline hover:text-primary/90">
            Đọc cẩm nang
          </Link>
        </div>
      </div>
    </div>
  );
}
