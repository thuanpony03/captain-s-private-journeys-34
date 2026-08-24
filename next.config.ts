import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // Ảnh tour lưu trên Supabase Storage, ảnh minh hoạ lấy từ Unsplash.
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },

  // 301 các URL của bản WordPress cũ về trang tương ứng bên Next.js — GSC audit
  // 24/08/2026 phát hiện 20 URL cũ trả trang trống thay vì redirect/404 thật.
  // Exact-match luôn đứng TRƯỚC wildcard trong mảng vì Next.js match theo thứ tự.
  // TUYỆT ĐỐI không thêm wildcard dạng /tour/:slug* — sẽ nuốt mất route tour hiện tại.
  async redirects() {
    return [
      // ===== Thương mại (exact) =====
      { source: "/lich-khoi-hanh-tour-canada", destination: "/tour/canada", permanent: true },
      { source: "/anh-bac-ireland", destination: "/tour/chau-au", permanent: true },
      { source: "/ai-cap-chau-phi", destination: "/tour", permanent: true },
      {
        source: "/tours/tour-lai-xe-xuyen-bang-my-canada-tu-bo-dong-den-bo-tay-2",
        destination: "/tour/canada-tu-lai-mua-thu",
        permanent: true,
      },
      {
        source: "/tours/tour-lai-xe-xuyen-bang-nuoc-uc-hanh-trinh-tu-melbourne-den-brisbane",
        destination: "/tour/uc",
        permanent: true,
      },
      {
        source: "/tours/tour-lai-xe-xuyen-bang-nuoc-my-kham-pha-day-nui-smoky-va-bo-bien-atlanta",
        destination: "/tour/my",
        permanent: true,
      },
      {
        source: "/tours/10-ngay-kham-pha-new-england-boston-portsmouth-va-cape-cod-2",
        destination: "/tour/my",
        permanent: true,
      },
      // Tour cũ trùng prefix /tour/ — bắt buộc exact-match, không được lọt xuống wildcard
      { source: "/tour/krabi-koh-phi-phi-landtour", destination: "/tour", permanent: true },
      { source: "/tour/tour-philippines-manila-boracay", destination: "/tour", permanent: true },
      {
        source: "/tour/bac-au-dan-mach-na-uy-thuy-dien-phan-lan-ice-land",
        destination: "/tour/chau-au",
        permanent: true,
      },

      // ===== Bài có nội dung mới tương đương =====
      {
        source: "/las-vegas-thanh-pho-hoang-kim-cua-my",
        destination: "/chuyen-di/las-vegas-noi-rat-la",
        permanent: true,
      },
      {
        source: "/thac-niagara-falls-thac-nuoc-hung-vi-o-bien-gioi-canada-my",
        destination: "/tour/canada",
        permanent: true,
      },
      {
        source: "/brussels-thu-do-va-trung-tam-chinh-tri-cua-lien-minh-chau-au",
        destination: "/cam-nang/kinh-nghiem-lai-xe-amsterdam-brussels",
        permanent: true,
      },

      // ===== Bài viết Mỹ =====
      { source: "/tampa-bay-manh-dat-hung-vi-va-da-sac-mau", destination: "/tour/my", permanent: true },
      { source: "/colorado-diem-den-tuyet-voi-cho-ky-nghi-hap-dan", destination: "/tour/my", permanent: true },
      { source: "/toa-nha-willis-tower-toa-nha-cao-nhat-bac-my", destination: "/tour/my", permanent: true },
      {
        source: "/bac-california-dai-dien-cho-su-da-dang-thien-nhien-va-van-hoa",
        destination: "/tour/my",
        permanent: true,
      },
      { source: "/alcatraz-island-lich-su-huyen-bi-va-bieu-tuong-ca-nhan", destination: "/tour/my", permanent: true },

      // ===== Bài viết Châu Âu =====
      {
        source: "/turku-loi-nguyen-cua-thanh-pho-co-va-ve-dep-bo-bien-o-phan-lan",
        destination: "/tour/chau-au",
        permanent: true,
      },
      {
        source: "/lucerne-kham-pha-thanh-pho-co-kinh-voi-kien-truc-tuyet-dep-va-bo-ho-xanh-mat-o-thuy-si",
        destination: "/tour/chau-au",
        permanent: true,
      },
      {
        source: "/perpignan-thanh-pho-nghe-thuat-va-van-hoa-tren-bo-bien-dia-trung-hai",
        destination: "/tour/chau-au",
        permanent: true,
      },
      { source: "/umbria-vung-dat-cua-su-tinh-lang-va-su-hap-dan", destination: "/tour/chau-au", permanent: true },
      { source: "/rhine-falls-thien-nhien-hung-vi-tai-trai-tim-chau-au", destination: "/tour/chau-au", permanent: true },
      {
        source: "/nui-etna-hanh-trinh-phieu-luu-dinh-nui-lua-hoat-dong-lon-nhat-chau-au",
        destination: "/tour/chau-au",
        permanent: true,
      },
      {
        source: "/kham-pha-nui-matterhorn-bieu-tuong-noi-bat-cua-thuy-si-voi-ve-dep-va-do-cao-an-tuong-tai-chau-au",
        destination: "/tour/chau-au",
        permanent: true,
      },
      {
        source: "/zakopane-hanh-trinh-kham-pha-ve-dep-nui-non-va-van-hoa-dan-gian",
        destination: "/tour/chau-au",
        permanent: true,
      },
      { source: "/rome-hon-ngoc-sang-cua-de-che-la-ma", destination: "/tour/chau-au", permanent: true },
      {
        source: "/san-van-dong-allianz-arena-noi-hoi-tu-niem-dam-me-bong-da",
        destination: "/tour/chau-au",
        permanent: true,
      },

      // ===== Bài viết Úc =====
      {
        source: "/chinatown-o-uc-su-hoa-tron-van-hoa-va-net-dac-trung-cua-cong-dong-nguoi-hoa",
        destination: "/tour/uc",
        permanent: true,
      },
      {
        source: "/toa-nha-quoc-hoi-cua-uc-bieu-tuong-chinh-tri-va-kien-truc-doc-dao-cua-australia",
        destination: "/tour/uc",
        permanent: true,
      },

      // ===== Khác =====
      { source: "/tangier-cua-ngo-chau-phi-ra-chau-au", destination: "/cam-nang", permanent: true },
      { source: "/hon-dao-miyako-hon-dao-phia-nam-dep-nhat-nhat-ban", destination: "/cam-nang", permanent: true },

      // ===== Wildcard — luôn đặt cuối =====
      { source: "/tours/:slug*", destination: "/tour", permanent: true },
      { source: "/dich-vu-xin-visa-:slug*", destination: "/lien-he", permanent: true },
      { source: "/lich-khoi-hanh-tour-:slug*", destination: "/tour", permanent: true },
    ];
  },
};

export default nextConfig;
