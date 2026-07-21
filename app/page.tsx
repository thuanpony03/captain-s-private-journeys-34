import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { SITE_URL } from "@/lib/seo";
import { getPublishedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Trang chủ nội dung tĩnh -> render sẵn lúc build, phục vụ từ cache Cloudflare.
export const revalidate = 3600;

export default async function Page() {
  const latestPosts = await getPublishedPosts("chuyen-di", 3);
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
      <HomePage latestPosts={latestPosts} />
    </>
  );
}
