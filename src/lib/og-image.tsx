export const OG_SIZE = { width: 1200, height: 630 };

/** Layout dùng chung cho mọi opengraph-image.tsx — branded, khác biệt trong feed Zalo/Facebook. */
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
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        backgroundColor: "#1a5f5a",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        width={OG_SIZE.width}
        height={OG_SIZE.height}
        style={{ position: "absolute", inset: 0, objectFit: "cover", width: "100%", height: "100%" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(0deg, rgba(26,95,90,0.95) 0%, rgba(26,95,90,0.55) 45%, rgba(26,95,90,0.2) 100%)",
          display: "flex",
        }}
      />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", padding: "64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: "#e0b04c", display: "flex" }} />
          <span style={{ color: "#e0b04c", fontSize: 28, fontWeight: 700, letterSpacing: 1 }}>
            {badge.toUpperCase()}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 60,
            fontWeight: 900,
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 32 }}>
          {footer && (
            <div
              style={{
                display: "flex",
                background: "#e0b04c",
                color: "#1a5f5a",
                padding: "12px 28px",
                borderRadius: 999,
                fontSize: 32,
                fontWeight: 900,
              }}
            >
              {footer}
            </div>
          )}
          <span style={{ color: "white", fontSize: 32, fontWeight: 700 }}>Vinh Around</span>
        </div>
      </div>
    </div>
  );
}
