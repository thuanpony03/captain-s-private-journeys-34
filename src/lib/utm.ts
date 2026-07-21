/**
 * Bắt UTM params lúc khách vào site qua link ads, lưu sessionStorage để
 * form submit ở trang bất kỳ (không nhất thiết là landing page gốc) vẫn
 * gắn được đúng nguồn campaign.
 */

const STORAGE_KEY = "va_utm";

export interface StoredUtm {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  landing_page: string | null;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export function captureUtm(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const hasUtm = UTM_KEYS.some((key) => params.has(key));
  if (!hasUtm) return;

  const data: StoredUtm = {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    landing_page: window.location.pathname,
  };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Safari private mode / storage đầy — bỏ qua, không phải lỗi nghiêm trọng.
  }
}

export function getStoredUtm(): StoredUtm {
  const empty: StoredUtm = {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    landing_page: null,
  };

  if (typeof window === "undefined") return empty;

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}
