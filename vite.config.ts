import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Trước đây toàn bộ app gói thành 1 chunk 864 kB: khách vào trang chủ phải
    // tải cả thư viện 3D, GSAP và biểu đồ của trang admin. Tách ra để giảm
    // JS chặn render — ảnh hưởng trực tiếp tới LCP, thứ hạng SEO và điểm
    // chất lượng của Google Ads.
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // Chỉ trang có hiệu ứng 3D mới cần
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          // Chỉ dùng cho animation ở landing page
          animation: ["gsap", "@studio-freight/lenis"],
          // Chỉ dùng ở dashboard admin
          charts: ["recharts"],
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
