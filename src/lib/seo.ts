/**
 * Hằng số và helper dùng chung cho SEO.
 *
 * Mọi URL tuyệt đối (canonical, og:image, JSON-LD) phải đi qua đây thay vì
 * hardcode rải rác — tránh lặp lại lỗi canonical trỏ nhầm về trang chủ.
 */

/** Không có dấu "/" ở cuối. */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://vinharound.com"
).replace(/\/$/, "");

export const SITE_NAME = "Vinh Around - Passport Lounge";

/** Ảnh OG mặc định. Thay bằng ảnh brand thật trong public/. */
export const DEFAULT_OG_IMAGE = "/og-image.jpg";

/**
 * Chuyển path tương đối thành URL tuyệt đối.
 * URL đã tuyệt đối thì giữ nguyên.
 */
export function absoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return SITE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;

  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  // Trang chủ giữ nguyên dạng gốc, không thêm "/" thừa
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** Thông tin doanh nghiệp dùng chung cho structured data. */
export const ORGANIZATION = {
  "@type": "TravelAgency",
  name: SITE_NAME,
  description:
    "Dịch vụ Private Tour cao cấp đến Mỹ, Úc, Châu Âu với xe riêng và lịch trình tùy chỉnh 100%",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "VN",
    addressLocality: "Việt Nam",
  },
  sameAs: [
    "https://youtube.com/@vinharound",
    "https://tiktok.com/@vinharound",
    "https://facebook.com/vinharound",
  ],
} as const;
