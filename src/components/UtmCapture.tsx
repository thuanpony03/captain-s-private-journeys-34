"use client";

import { useEffect } from "react";
import { captureUtm } from "@/lib/utm";

/** Không render gì — chỉ bắt UTM param lúc mount rồi lưu sessionStorage. */
export default function UtmCapture() {
  useEffect(() => {
    captureUtm();
  }, []);

  return null;
}
