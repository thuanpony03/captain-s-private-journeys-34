/**
 * Hằng số và helper dùng chung cho SEO.
 *
 * Mọi URL tuyệt đối (canonical, og:image, JSON-LD) đi qua đây thay vì hardcode
 * rải rác — tránh lặp lại lỗi canonical trỏ nhầm về trang chủ.
 */

/** Không có dấu "/" ở cuối. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://vinharound.com"
).replace(/\/$/, "");

export const SITE_NAME = "Vinh Around - Passport Lounge";

export const DEFAULT_OG_IMAGE = "/og-image.jpg";

/** Chuyển path tương đối thành URL tuyệt đối; URL đã tuyệt đối giữ nguyên. */
export function absoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return SITE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/**
 * Thông tin doanh nghiệp cho structured data.
 *
 * Cố ý KHÔNG có aggregateRating: bản cũ khai 5.0/100 review là dữ liệu bịa,
 * và self-serving review markup vi phạm guideline của Google.
 * Muốn hiện sao trên SERP thì phải thu review thật qua Google Business Profile.
 */
export const ORGANIZATION = {
  "@type": "TravelAgency",
  name: SITE_NAME,
  description:
    "Dịch vụ Private Tour cao cấp đến Mỹ, Úc, Châu Âu với xe riêng và lịch trình tùy chỉnh 100%",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  priceRange: "$$$",
  telephone: "+84933344646",
  address: {
    "@type": "PostalAddress",
    streetAddress: "192 Trần Quang Khải",
    addressLocality: "Phường Tân Định",
    addressRegion: "Thành phố Hồ Chí Minh",
    addressCountry: "VN",
  },
  sameAs: [
    "https://youtube.com/@vinharound",
    "https://tiktok.com/@dicung.vinharound",
    "https://facebook.com/DicungVinhAround",
  ],
} as const;
