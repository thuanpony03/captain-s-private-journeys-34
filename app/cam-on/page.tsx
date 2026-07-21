import type { Metadata } from "next";
import Link from "next/link";
import CamOnActions from "@/components/CamOnActions";

export const metadata: Metadata = {
  title: "Cảm ơn bạn",
  robots: { index: false, follow: false },
};

export default function CamOnPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-white via-[#faf9f7] to-white">
      <div className="max-w-xl w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-black text-primary mb-4">
          Đã nhận được thông tin!
        </h1>

        <p className="text-primary/70 text-base md:text-lg mb-2">
          Vinh sẽ liên hệ trong <span className="font-semibold text-primary">2 giờ làm việc</span> qua Zalo/SĐT bạn đã cung cấp.
        </p>
        <p className="text-primary/50 text-sm mb-10">
          Muốn nhanh hơn? Nhắn Zalo cho Vinh ngay bây giờ.
        </p>

        <CamOnActions />

        <Link
          href="/"
          className="inline-block mt-10 text-primary/50 text-sm hover:text-primary transition-colors"
        >
          ← Quay lại trang chủ
        </Link>
      </div>
    </main>
  );
}
