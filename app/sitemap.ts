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

  return routes;
}
