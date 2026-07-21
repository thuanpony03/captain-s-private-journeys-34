// vite.config.ts
import { defineConfig } from "file:///sessions/festive-gallant-dijkstra/mnt/Downloads/captain-private-journeys/node_modules/vite/dist/node/index.js";
import react from "file:///sessions/festive-gallant-dijkstra/mnt/Downloads/captain-private-journeys/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///sessions/festive-gallant-dijkstra/mnt/Downloads/captain-private-journeys/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "/sessions/festive-gallant-dijkstra/mnt/Downloads/captain-private-journeys";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
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
          supabase: ["@supabase/supabase-js"]
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvc2Vzc2lvbnMvZmVzdGl2ZS1nYWxsYW50LWRpamtzdHJhL21udC9Eb3dubG9hZHMvY2FwdGFpbi1wcml2YXRlLWpvdXJuZXlzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvc2Vzc2lvbnMvZmVzdGl2ZS1nYWxsYW50LWRpamtzdHJhL21udC9Eb3dubG9hZHMvY2FwdGFpbi1wcml2YXRlLWpvdXJuZXlzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9zZXNzaW9ucy9mZXN0aXZlLWdhbGxhbnQtZGlqa3N0cmEvbW50L0Rvd25sb2Fkcy9jYXB0YWluLXByaXZhdGUtam91cm5leXMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIixcbiAgICBwb3J0OiA4MDgwLFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKSwgbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiICYmIGNvbXBvbmVudFRhZ2dlcigpXS5maWx0ZXIoQm9vbGVhbiksXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICAvLyBUclx1MDFCMFx1MUVEQmMgXHUwMTExXHUwMEUyeSB0b1x1MDBFMG4gYlx1MUVEOSBhcHAgZ1x1MDBGM2kgdGhcdTAwRTBuaCAxIGNodW5rIDg2NCBrQjoga2hcdTAwRTFjaCB2XHUwMEUwbyB0cmFuZyBjaFx1MUVFNyBwaFx1MUVBM2lcbiAgICAvLyB0XHUxRUEzaSBjXHUxRUEzIHRoXHUwMUIwIHZpXHUxRUM3biAzRCwgR1NBUCB2XHUwMEUwIGJpXHUxRUMzdSBcdTAxMTFcdTFFRDMgY1x1MUVFN2EgdHJhbmcgYWRtaW4uIFRcdTAwRTFjaCByYSBcdTAxMTFcdTFFQzMgZ2lcdTFFQTNtXG4gICAgLy8gSlMgY2hcdTFFQjduIHJlbmRlciBcdTIwMTQgXHUxRUEzbmggaFx1MDFCMFx1MUVERm5nIHRyXHUxRUYxYyB0aVx1MUVCRnAgdFx1MUVEQmkgTENQLCB0aFx1MUVFOSBoXHUxRUExbmcgU0VPIHZcdTAwRTAgXHUwMTExaVx1MUVDM21cbiAgICAvLyBjaFx1MUVBNXQgbFx1MDFCMFx1MUVFM25nIGNcdTFFRTdhIEdvb2dsZSBBZHMuXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIFwicmVhY3QtdmVuZG9yXCI6IFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCIsIFwicmVhY3Qtcm91dGVyLWRvbVwiXSxcbiAgICAgICAgICAvLyBDaFx1MUVDOSB0cmFuZyBjXHUwMEYzIGhpXHUxRUM3dSBcdTFFRTluZyAzRCBtXHUxRURCaSBjXHUxRUE3blxuICAgICAgICAgIHRocmVlOiBbXCJ0aHJlZVwiLCBcIkByZWFjdC10aHJlZS9maWJlclwiLCBcIkByZWFjdC10aHJlZS9kcmVpXCJdLFxuICAgICAgICAgIC8vIENoXHUxRUM5IGRcdTAwRjluZyBjaG8gYW5pbWF0aW9uIFx1MUVERiBsYW5kaW5nIHBhZ2VcbiAgICAgICAgICBhbmltYXRpb246IFtcImdzYXBcIiwgXCJAc3R1ZGlvLWZyZWlnaHQvbGVuaXNcIl0sXG4gICAgICAgICAgLy8gQ2hcdTFFQzkgZFx1MDBGOW5nIFx1MUVERiBkYXNoYm9hcmQgYWRtaW5cbiAgICAgICAgICBjaGFydHM6IFtcInJlY2hhcnRzXCJdLFxuICAgICAgICAgIHN1cGFiYXNlOiBbXCJAc3VwYWJhc2Uvc3VwYWJhc2UtanNcIl0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA2MDAsXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZZLFNBQVMsb0JBQW9CO0FBQzFhLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFIaEMsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLGlCQUFpQixnQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sT0FBTztBQUFBLEVBQzlFLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBS0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osZ0JBQWdCLENBQUMsU0FBUyxhQUFhLGtCQUFrQjtBQUFBO0FBQUEsVUFFekQsT0FBTyxDQUFDLFNBQVMsc0JBQXNCLG1CQUFtQjtBQUFBO0FBQUEsVUFFMUQsV0FBVyxDQUFDLFFBQVEsdUJBQXVCO0FBQUE7QUFBQSxVQUUzQyxRQUFRLENBQUMsVUFBVTtBQUFBLFVBQ25CLFVBQVUsQ0FBQyx1QkFBdUI7QUFBQSxRQUNwQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxFQUN6QjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
