import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import incrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

/**
 * Cấu hình OpenNext cho Cloudflare Workers.
 *
 * incrementalCache dùng Workers KV để lưu kết quả ISR — nhờ đó trang tour
 * render sẵn được chia sẻ giữa các isolate ở mọi khu vực, thay vì mỗi edge
 * location phải tự render lại.
 *
 * Cần tạo KV namespace và khai binding NEXT_INC_CACHE_KV trong wrangler.jsonc
 * trước khi deploy (xem DEPLOY.md).
 */
export default defineCloudflareConfig({
  incrementalCache,
});
