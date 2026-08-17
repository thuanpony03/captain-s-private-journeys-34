import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";
import { OgLayout, OG_SIZE, loadPlayfairFont } from "@/lib/og-image";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80";

export const revalidate = 86400;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const [post, playfair] = await Promise.all([getPostBySlug(slug, "cam-nang"), loadPlayfairFont()]);

  return new ImageResponse(
    (
      <OgLayout
        badge="Cẩm nang"
        title={post?.title || "Vinh Around"}
        image={post?.og_image || post?.featured_image || FALLBACK_IMAGE}
      />
    ),
    { ...OG_SIZE, fonts: [{ name: "Playfair Display", data: playfair, weight: 800, style: "normal" }] }
  );
}
