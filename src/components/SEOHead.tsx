import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead = ({ 
  title = "Private Tour Mỹ Úc Châu Âu - Đi như Người Nhà cùng Vinh Around | Passport Lounge",
  description = "🌟 Private Tour cao cấp Mỹ, Úc, Châu Âu ✈️ Xe riêng Mercedes, lịch trình tùy chỉnh 100%, từ 6 khách 🏆 100+ gia đình tin tưởng. Tư vấn miễn phí 24h!",
  keywords = "private tour mỹ, private tour úc, private tour châu âu, du lịch mỹ, du lịch úc, vinh around, passport lounge",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = "https://vinharound.com",
  type = "website"
}: SEOHeadProps) => {
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOHead;
