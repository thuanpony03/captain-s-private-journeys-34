import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { DEFAULT_OG_IMAGE, absoluteUrl } from "@/lib/seo";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  /**
   * Đường dẫn canonical. Nhận path tương đối ("/tour/my-west-coast") hoặc URL
   * tuyệt đối. Bỏ trống thì tự lấy path hiện tại — KHÔNG mặc định về trang chủ.
   *
   * Trước đây prop này mặc định là SITE_URL, khiến mọi trang tour đều canonical
   * về "/" và tự loại mình khỏi index của Google.
   */
  url?: string;
  type?: string;
  /** Đặt true cho trang không muốn index (admin, đăng nhập, 404). */
  noIndex?: boolean;
  /** JSON-LD structured data cho riêng trang này. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEOHead = ({
  title = "Private Tour Mỹ Úc Châu Âu - Đi như Người Nhà cùng Vinh Around | Passport Lounge",
  description = "🌟 Private Tour cao cấp Mỹ, Úc, Châu Âu ✈️ Xe riêng Mercedes, lịch trình tùy chỉnh 100%, từ 6 khách 🏆 100+ gia đình tin tưởng. Tư vấn miễn phí 24h!",
  keywords = "private tour mỹ, private tour úc, private tour châu âu, du lịch mỹ, du lịch úc, vinh around, passport lounge",
  image = DEFAULT_OG_IMAGE,
  url,
  type = "website",
  noIndex = false,
  jsonLd,
}: SEOHeadProps) => {
  const location = useLocation();

  // Ưu tiên url được truyền vào; nếu không có thì dùng path hiện tại.
  const canonical = absoluteUrl(url ?? location.pathname);
  const ogImage = absoluteUrl(image);

  const structuredData = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Vinh Around - Passport Lounge" />
      <meta property="og:locale" content="vi_VN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {structuredData.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
