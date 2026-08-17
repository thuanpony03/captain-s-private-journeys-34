export const OG_SIZE = { width: 1200, height: 630 };

const FONT_CACHE = new Map<string, Promise<ArrayBuffer>>();

/**
 * Tải font Playfair Display (chữ tiêu đề) từ Google Fonts lúc render OG image —
 * không bundle sẵn vì next/og chạy trên OpenNext Cloudflare, không có fs.
 * User-Agent giả trình duyệt cũ để Google trả file .ttf (Satori không đọc woff2).
 */
export async function loadPlayfairFont(): Promise<ArrayBuffer> {
  const cacheKey = "playfair-800";
  const cached = FONT_CACHE.get(cacheKey);
  if (cached) return cached;

  const promise = (async () => {
    // Không set User-Agent giả trình duyệt hiện đại: Google Fonts CSS2 API khi đó trả
    // về đúng 1 file .ttf gộp đủ toàn bộ ký tự (kể cả dấu tiếng Việt) thay vì bị tách
    // thành nhiều khối theo unicode-range (cyrillic/vietnamese/latin...) chỉ dùng cho
    // trình duyệt hỗ trợ @font-face unicode-range — Satori cần đúng 1 file duy nhất.
    const cssUrl = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800";
    const css = await (await fetch(cssUrl)).text();
    const match = css.match(/src: url\(([^)]+)\) format\('(?:truetype|woff2)'\)/);
    if (!match) throw new Error("Không tìm thấy nguồn font Playfair Display");
    const res = await fetch(match[1]);
    return res.arrayBuffer();
  })();

  FONT_CACHE.set(cacheKey, promise);
  return promise;
}

/**
 * Layout dùng chung cho mọi OG image — branded, đọc được ngay ở kích thước
 * thumbnail nhỏ trên Facebook/Zalo (như thumbnail YouTube): tiêu đề chữ lớn,
 * nền tối đủ mạnh để chữ luôn nổi bật bất kể ảnh nền sáng hay rối.
 */
export function OgLayout({
  badge,
  title,
  image,
  footer,
}: {
  badge: string;
  title: string;
  image: string;
  footer?: string;
}) {
  const displayTitle = title.length > 72 ? `${title.slice(0, 70).trimEnd()}…` : title;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: "#0f3230",
        fontFamily: "Inter",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        width={OG_SIZE.width}
        height={OG_SIZE.height}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, objectFit: "cover", width: "100%", height: "100%" }}
      />

      {/* Scrim tối dần đáng kể từ giữa ảnh xuống đáy — chữ luôn đọc được dù ảnh sáng/rối.
          Dùng top/left/right/bottom tường minh: Satori không hỗ trợ shorthand "inset". */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(180deg, rgba(8,30,28,0.02) 0%, rgba(8,30,28,0.28) 30%, rgba(8,30,28,0.88) 52%, rgba(7,26,24,0.99) 100%)",
          display: "flex",
        }}
      />

      {/* Thương hiệu góc trên trái */}
      <div style={{ position: "absolute", top: 44, left: 56, display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 13,
            background: "#e0b04c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            fontWeight: 800,
            color: "#0f3230",
          }}
        >
          V
        </div>
        <span
          style={{
            color: "white",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Vinh Around
        </span>
      </div>

      {/* Khối nội dung đáy */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          padding: "0 60px 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: "#e0b04c",
            color: "#0f3230",
            padding: "11px 26px",
            borderRadius: 999,
            fontSize: 25,
            fontWeight: 800,
            letterSpacing: 1,
            marginBottom: 26,
          }}
        >
          {badge.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: displayTitle.length > 46 ? 56 : 66,
            fontWeight: 800,
            fontFamily: "Playfair Display",
            lineHeight: 1.14,
            maxWidth: 1060,
            textShadow: "0 3px 18px rgba(0,0,0,0.55)",
          }}
        >
          {displayTitle}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 30 }}>
          {footer && (
            <div
              style={{
                display: "flex",
                background: "rgba(224,176,76,0.16)",
                border: "2px solid #e0b04c",
                color: "#f3cd77",
                padding: "10px 24px",
                borderRadius: 999,
                fontSize: 30,
                fontWeight: 800,
              }}
            >
              {footer}
            </div>
          )}
          <span style={{ display: "flex", color: "rgba(255,255,255,0.75)", fontSize: 26, fontWeight: 600 }}>
            vinharound.com
          </span>
        </div>
      </div>

      {/* Vạch nhấn đáy — chi tiết hoàn thiện như bìa tạp chí */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 8, background: "#e0b04c", display: "flex" }} />
    </div>
  );
}
