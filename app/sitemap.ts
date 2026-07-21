import type { MetadataRoute } from "next";
import { createPublicClient } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/seo";

// Sitemap sinh lại mỗi giờ để tour mới thêm trong CMS tự xuất hiện.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/tour`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tour/my`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tour/uc`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tour/chau-au`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/lien-he`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/chuyen-di`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/cam-nang`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/khach-hang`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/ve-vinh`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("tour_packages")
      .select("slug, updated_at")
      .eq("is_active", true)
      .not("slug", "is", null);

    for (const tour of data ?? []) {
      routes.push({
        url: `${SITE_URL}/tour/${tour.slug}`,
        lastModified: tour.updated_at ? new Date(tour.updated_at) : new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  } catch {
    // Mất kết nối Supabase thì vẫn trả sitemap trang tĩnh, không để build fail.
  }

  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, category, updated_at")
      .eq("status", "published");

    for (const post of data ?? []) {
      routes.push({
        url: `${SITE_URL}/${post.category}/${post.slug}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch {
    // Mất kết nối Supabase thì vẫn trả sitemap trang tĩnh, không để build fail.
  }

  return routes;
}
