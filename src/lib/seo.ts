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
 * Cắt chuỗi ở ranh giới từ gần nhất trước maxLen, không cắt ngang từ (vd meta
 * description tự chọn dở "...Las V" khi cắt cứng theo ký tự).
 */
export function truncateAtWord(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  const cut = str.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

interface FaqItem {
  question: string;
  answer: string;
}

/** Generate FAQPage JSON-LD từ đúng mảng FAQ đang render trên trang — 1 nguồn dữ liệu duy nhất. */
export function buildFaqJsonLd(faqs: FaqItem[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/**
 * Thông tin doanh nghiệp cho structured data.
 *
 * Cố ý KHÔNG có aggregateRating: bản cũ khai 5.0/100 review là dữ liệu bịa,
 * và self-serving review markup vi phạm guideline của Google.
 * Muốn hiện sao trên SERP thì phải thu review thật qua Google Business Profile.
 *
 * legalName/taxID/2 địa chỉ/email lấy đúng từ Footer + /lien-he đang hiển thị
 * thật trên site (không phải số liệu mới) — chỉ đưa thêm vào structured data
 * cho khớp với những gì trang đã công khai.
 */
export const ORGANIZATION = {
  "@type": "TravelAgency",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: "Passport Lounge",
  taxID: "0314702049",
  description:
    "Private tour cao cấp Mỹ, Canada, Úc, Châu Âu cho gia đình và nhóm nhỏ người Việt. Tour riêng xe 7-9 chỗ, tour caravan tự lái, lịch trình thiết kế 100% theo từng nhà.",
  slogan: "Đi như người nhà",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  priceRange: "$$$",
  telephone: "+84933344646",
  email: "admin@passport.cafe",
  founder: { "@type": "Person", "@id": `${SITE_URL}/ve-vinh#vinh` },
  areaServed: ["US", "CA", "AU", "EU"],
  knowsAbout: [
    "tour riêng",
    "private tour",
    "tour gia đình",
    "tour nhóm nhỏ",
    "tour caravan tự lái",
    "tour thiết kế theo yêu cầu",
    "visa Mỹ",
    "visa Canada",
    "visa Schengen",
  ],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "192 Trần Quang Khải, Phường Tân Định",
      addressLocality: "Thành phố Hồ Chí Minh",
      addressCountry: "VN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "01 phố Đào Duy Anh",
      addressLocality: "Hà Nội",
      addressCountry: "VN",
    },
  ],
  sameAs: [
    "https://facebook.com/DicungVinhAround",
    "https://youtube.com/@vinharound",
    "https://tiktok.com/@dicung.vinharound",
    "https://zalo.me/0933344646",
  ],
} as const;
