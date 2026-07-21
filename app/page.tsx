import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Trang chủ nội dung tĩnh -> render sẵn lúc build, phục vụ từ cache Cloudflare.
export const revalidate = 3600;

export default function Page() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <HomePage />
    </>
  );
}
