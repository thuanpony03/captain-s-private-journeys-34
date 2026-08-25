"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Next.js điều hướng client-side (không reload trang), nên Meta Pixel chỉ
 * bắn PageView đúng 1 lần lúc tải trang đầu tiên (script nền trong layout).
 * Component này bắn thêm PageView mỗi khi pathname đổi — bỏ qua lần mount
 * đầu để không trùng với PageView base script đã bắn.
 */
export default function FbPixelRouteTracker() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
