import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { getPublishedPosts } from "@/lib/blog";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

const TITLE = "Chuyến đi - Câu chuyện thật từ khách hàng Vinh Around";
const DESCRIPTION =
  "Những chuyến đi thật cùng gia đình khách hàng — Mỹ, Úc, Châu Âu. Ảnh thật, câu chuyện thật, không phải brochure.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/chuyen-di" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/chuyen-di"),
    title: `${TITLE} | Vinh Around`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Vinh Around`,
    description: DESCRIPTION,
  },
};

export const revalidate = 3600;

export default async function ChuyenDiListPage() {
  const posts = await getPublishedPosts("chuyen-di");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Chuyến đi", item: absoluteUrl("/chuyen-di") },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: TITLE,
      description: DESCRIPTION,
      url: absoluteUrl("/chuyen-di"),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: posts.map((post, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(`/chuyen-di/${post.slug}`),
          name: post.title,
        })),
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen">
        <section className="pt-32 pb-10 md:pt-40 md:pb-14 bg-gradient-to-b from-primary/5 via-white to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-4">
              Chuyến đi
            </h1>
            <p className="text-primary/70 text-base md:text-lg max-w-2xl mx-auto">
              Câu chuyện thật từ những gia đình đã đi cùng Vinh
            </p>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            {posts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} basePath="chuyen-di" />
                ))}
              </div>
            ) : (
              <p className="text-center text-primary/50 py-12">
                Chưa có bài viết nào. Quay lại sau nhé!
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
