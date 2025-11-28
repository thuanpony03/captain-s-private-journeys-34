import { useEffect } from 'react';

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
  
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };
    
    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    
    // Twitter tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
    
  }, [title, description, keywords, image, url, type]);
  
  return null;
};

export default SEOHead;
