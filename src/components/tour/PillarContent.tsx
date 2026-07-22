import { marked } from "marked";

/**
 * Nội dung dài dạng markdown (content/tour/*, content/articles) render thành HTML thật —
 * bảng markdown ra bảng HTML thật, không phải ảnh — cùng cách BlogPostPage đang dùng.
 */
export default function PillarContent({ markdown }: { markdown: string }) {
  const html = marked.parse(markdown, { async: false }) as string;

  return (
    <section className="py-14 md:py-20 bg-white border-t border-primary/5">
      <div className="container mx-auto px-4">
        <article
          className="prose prose-lg max-w-3xl mx-auto prose-headings:font-display prose-headings:text-primary prose-a:text-secondary prose-strong:text-primary prose-table:text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </section>
  );
}
