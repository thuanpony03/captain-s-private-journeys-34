import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/blog/BlogPostPage";
import { getPostBySlug } from "@/lib/blog";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, "cam-nang");

  if (!post) {
    return { title: "Không tìm thấy bài viết", robots: { index: false, follow: false } };
  }

  const title = post.title;
  const description = post.meta_description || post.excerpt || undefined;
  const image = post.og_image || post.featured_image || DEFAULT_OG_IMAGE;
  const path = `/cam-nang/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      title: `${title} | Vinh Around`,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Vinh Around`,
      description,
      images: [image],
    },
  };
}

export default async function CamNangDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, "cam-nang");

  if (!post) notFound();

  return <BlogPostPage post={post} category="cam-nang" />;
}
