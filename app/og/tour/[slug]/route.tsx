import { ImageResponse } from "next/og";
import { createPublicClient } from "@/lib/supabase/server";
import { OgLayout, OG_SIZE } from "@/lib/og-image";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1200&q=80";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = createPublicClient();
  const { data: tour } = await supabase
    .from("tour_packages")
    .select("title, tagline, price, image_url")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  return new ImageResponse(
    (
      <OgLayout
        badge={tour?.tagline || "Private Tour"}
        title={tour?.title || "Vinh Around"}
        image={tour?.image_url || FALLBACK_IMAGE}
        footer={tour?.price || undefined}
      />
    ),
    OG_SIZE
  );
}
