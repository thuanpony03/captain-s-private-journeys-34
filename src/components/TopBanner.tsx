"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

// Đổi key khi đổi nội dung banner (1 đoàn → 2 đoàn) để không bị giấu vĩnh viễn
// với người đã lỡ đóng bản banner cũ trước đó.
const DISMISS_KEY = "hide-banner-canada-2doan";
// Sau ngày này banner tự ẩn hẳn (đoàn 03/11 — đoàn cuối — đã khởi hành, campaign kết thúc).
const HIDE_AFTER = "2026-11-02";

/**
 * Banner khuyến mãi 1 chiến dịch — chèn bên trong Navbar (cùng khối fixed) để
 * không cần đồng bộ chiều cao giữa 2 element fixed riêng biệt. Mặc định hiện
 * (server không biết localStorage/ngày giờ máy khách) rồi tự ẩn qua useEffect
 * nếu đã bị đóng trước đó hoặc đã quá hạn — chấp nhận 1 nhịp chớp rất ngắn
 * cho người đã từng đóng, còn hơn gây lệch layout (CLS) vì nav đang fixed.
 */
export default function TopBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      if (today > HIDE_AFTER) {
        setVisible(false);
        return;
      }
      if (localStorage.getItem(DISMISS_KEY) === "1") {
        setVisible(false);
      }
    } catch {
      // Không đọc được localStorage (chặn cookie/private mode) — cứ hiện banner.
    }
  }, []);

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Không lưu được thì lần sau load lại vẫn hiện — chấp nhận được.
    }
  };

  return (
    <div className="relative flex items-center justify-center bg-primary px-10 py-2 text-center">
      <Link
        href="/tour/canada-mua-thu?utm_source=web&utm_medium=banner&utm_campaign=canada-0311"
        className="text-xs md:text-sm font-semibold text-white hover:underline"
      >
        🍁 Còn 2 đoàn Canada cuối mùa thu: 10/10 (đỉnh lá phong) & 03/11 — mỗi đoàn 6 khách. Xem
        chi tiết →
      </Link>
      <button
        type="button"
        onClick={handleClose}
        aria-label="Đóng thông báo"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
