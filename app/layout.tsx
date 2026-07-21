import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE_URL, SITE_NAME, ORGANIZATION } from "@/lib/seo";
import Providers from "./providers";
import UtmCapture from "@/components/UtmCapture";
import StickyMobileBar from "@/components/StickyMobileBar";

const TITLE =
  "Private Tour Mỹ Úc Châu Âu - Đi như Người Nhà cùng Vinh Around | Passport Lounge";
const DESCRIPTION =
  "Private Tour cao cấp Mỹ, Úc, Châu Âu. Xe riêng, lịch trình tùy chỉnh 100%, khởi hành từ 6 khách. Tư vấn miễn phí 24h.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Vinh Around",
  },
  description: DESCRIPTION,
  keywords: [
    "private tour mỹ",
    "private tour úc",
    "private tour châu âu",
    "du lịch mỹ",
    "du lịch úc",
    "vinh around",
    "passport lounge",
    "tour cao cấp",
    "xe riêng du lịch",
  ],
  authors: [{ name: "Passport Lounge - Vinh Around" }],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Private Tour Mỹ Úc cùng Vinh Around - Passport Lounge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vinharound",
    creator: "@vinharound",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
  other: {
    "geo.region": "VN",
    "geo.placename": "Vietnam",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a5f5a",
  width: "device-width",
  initialScale: 1,
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = { "@context": "https://schema.org", ...ORGANIZATION };

  return (
    <html lang="vi">
      <head>
        {/*
          Font nạp qua <link> để build không phụ thuộc mạng.
          Nâng cấp nên làm sau: chuyển sang next/font/google để Next tự host
          font, bỏ được 2 request cross-origin và loại layout shift do FOUT.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        {/*
          GTM: container rỗng lúc mới thêm, nhưng có sẵn để đổi/thêm tag sau
          này không cần deploy code. Chưa thay thế GA4/Pixel bên dưới — đó là
          bước sau khi đã cấu hình tag tương ứng trong GTM.
        */}
        {GTM_ID && (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}

        <UtmCapture />
        <Providers>{children}</Providers>
        <StickyMobileBar />

        {/*
          strategy="afterInteractive": tag analytics chạy sau khi trang đã
          tương tác được, không chặn render. Trước đây cả hai script nằm chặn
          trong <head>, kéo tụt LCP.
        */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}

        {FB_PIXEL_ID && (
          <>
            <Script id="fb-pixel" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');`}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                alt=""
                src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
