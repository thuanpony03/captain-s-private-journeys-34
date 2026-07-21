#!/usr/bin/env node
/**
 * Sinh public/sitemap.xml từ dữ liệu tour trong Supabase.
 *
 * Chạy tự động trước mỗi lần build (xem script "prebuild" trong package.json).
 *
 * Vì sao cần script này:
 *   Sitemap viết tay trước đây liệt kê URL dạng fragment (/#tours, /#about...).
 *   Search engine coi fragment là CÙNG MỘT URL với trang chủ, nên 5/6 entry
 *   không có tác dụng gì. Ngược lại, các trang /tour/:slug — thứ có giá trị SEO
 *   cao nhất — lại hoàn toàn vắng mặt.
 *
 * Nếu không kết nối được Supabase, script vẫn sinh sitemap với các trang tĩnh
 * và thoát code 0 — không được làm hỏng build vì lý do này.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

config({ path: resolve(ROOT, ".env") });

const SITE_URL = (
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  "https://vinharound.com"
).replace(/\/$/, "");

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const today = new Date().toISOString().split("T")[0];

/** Trang tĩnh. Lưu ý: KHÔNG đưa URL fragment (#...) vào sitemap. */
const staticRoutes = [
  { path: "/", changefreq: "daily", priority: "1.0" },
];

function xmlEscape(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function fetchTours() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn(
      "[sitemap] Thiếu VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY — bỏ qua trang tour."
    );
    return [];
  }

  const url =
    `${SUPABASE_URL}/rest/v1/tour_packages` +
    `?select=slug,title,image_url,updated_at&slug=not.is.null`;

  try {
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (!res.ok) {
      console.warn(`[sitemap] Supabase trả về ${res.status} — bỏ qua trang tour.`);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.warn(`[sitemap] Không gọi được Supabase (${err.message}) — bỏ qua trang tour.`);
    return [];
  }
}

function urlEntry({ loc, lastmod, changefreq, priority, image, imageCaption }) {
  const img = image
    ? `
    <image:image>
      <image:loc>${xmlEscape(image)}</image:loc>${
        imageCaption
          ? `
      <image:caption>${xmlEscape(imageCaption)}</image:caption>`
          : ""
      }
    </image:image>`
    : "";

  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${img}
  </url>`;
}

async function main() {
  const tours = await fetchTours();

  const entries = [
    ...staticRoutes.map((r) =>
      urlEntry({
        loc: r.path === "/" ? SITE_URL : `${SITE_URL}${r.path}`,
        lastmod: today,
        changefreq: r.changefreq,
        priority: r.priority,
        image: `${SITE_URL}/og-image.jpg`,
        imageCaption: "Private Tour Mỹ Úc Châu Âu cùng Vinh Around",
      })
    ),
    ...tours.map((t) =>
      urlEntry({
        loc: `${SITE_URL}/tour/${t.slug}`,
        lastmod: (t.updated_at || today).split("T")[0],
        changefreq: "weekly",
        priority: "0.9",
        image: t.image_url,
        imageCaption: t.title,
      })
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Tự động sinh bởi scripts/generate-sitemap.mjs — đừng sửa tay -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join("\n")}
</urlset>
`;

  const out = resolve(ROOT, "public/sitemap.xml");
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, xml, "utf8");

  console.log(
    `[sitemap] Đã ghi ${entries.length} URL (${tours.length} tour) → public/sitemap.xml`
  );
}

main().catch((err) => {
  console.error("[sitemap] Lỗi:", err);
  process.exit(0); // không làm hỏng build
});
