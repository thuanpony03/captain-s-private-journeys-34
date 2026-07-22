"use client";

import { useRef, useState } from "react";
import { marked } from "marked";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bold, Italic, Heading2, Link2, ImagePlus, Eye, Pencil, Loader2 } from "lucide-react";
import { uploadToImagesBucket } from "@/lib/storage-upload";

/**
 * Editor markdown cho bài viết — thay Textarea trơn trước đây. Ba điểm chính
 * giải quyết phản hồi "khó dùng, phức tạp":
 * 1. Dán ảnh trực tiếp (Ctrl+V ảnh chụp màn hình / copy từ đâu đó) tự động
 *    upload lên Storage và chèn markdown ảnh vào đúng vị trí con trỏ —
 *    không cần upload riêng rồi copy URL vào tay.
 * 2. Kéo-thả file ảnh vào khung soạn cũng tự upload + chèn tương tự.
 * 3. Nút "Xem trước" render đúng như bài viết thật trên site (dùng chung
 *    marked + class prose với trang bài viết), khỏi phải đăng thử mới biết.
 */
export default function MarkdownEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const insertAtCursor = (before: string, after = "", placeholder = "") => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || placeholder;
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const cursor = start + before.length + selected.length + after.length;
      el.setSelectionRange(cursor, cursor);
    });
  };

  const insertImageMarkdown = (url: string, atCursor = true) => {
    const markdown = `\n![ảnh](${url})\n`;
    if (atCursor && textareaRef.current) {
      const el = textareaRef.current;
      const start = el.selectionStart;
      const next = value.slice(0, start) + markdown + value.slice(start);
      onChange(next);
    } else {
      onChange(value + markdown);
    }
  };

  const handleImageFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToImagesBucket(file, "blog");
      insertImageMarkdown(url);
      toast({ title: "Đã chèn ảnh" });
    } catch (error: any) {
      toast({ title: "Lỗi upload ảnh", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = Array.from(e.clipboardData.items);
    const imageItem = items.find((i) => i.type.startsWith("image/"));
    if (!imageItem) return;
    e.preventDefault();
    const file = imageItem.getAsFile();
    if (file) handleImageFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    const file = Array.from(e.dataTransfer.files).find((f) => f.type.startsWith("image/"));
    if (!file) return;
    e.preventDefault();
    handleImageFile(file);
  };

  const previewHtml = mode === "preview" ? (marked.parse(value || "", { async: false }) as string) : "";

  return (
    <div className="border border-input rounded-md overflow-hidden">
      <div className="flex items-center gap-1 border-b border-input bg-muted/40 px-2 py-1.5">
        <ToolbarButton icon={Bold} label="Đậm" onClick={() => insertAtCursor("**", "**", "chữ đậm")} disabled={mode === "preview"} />
        <ToolbarButton icon={Italic} label="Nghiêng" onClick={() => insertAtCursor("*", "*", "chữ nghiêng")} disabled={mode === "preview"} />
        <ToolbarButton icon={Heading2} label="Tiêu đề nhỏ" onClick={() => insertAtCursor("\n## ", "", "Tiêu đề")} disabled={mode === "preview"} />
        <ToolbarButton icon={Link2} label="Link" onClick={() => insertAtCursor("[", "](https://)", "chữ hiển thị")} disabled={mode === "preview"} />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleImageFile(e.target.files?.[0])}
        />
        <ToolbarButton
          icon={uploading ? Loader2 : ImagePlus}
          label="Chèn ảnh"
          onClick={() => fileInputRef.current?.click()}
          disabled={mode === "preview" || uploading}
          spin={uploading}
        />

        <div className="flex-1" />

        <Button
          type="button"
          variant={mode === "write" ? "secondary" : "ghost"}
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={() => setMode("write")}
        >
          <Pencil className="w-3.5 h-3.5 mr-1" />
          Viết
        </Button>
        <Button
          type="button"
          variant={mode === "preview" ? "secondary" : "ghost"}
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={() => setMode("preview")}
        >
          <Eye className="w-3.5 h-3.5 mr-1" />
          Xem trước
        </Button>
      </div>

      {mode === "write" ? (
        <>
          <Textarea
            ref={textareaRef}
            rows={18}
            className="font-mono text-sm border-0 rounded-none focus-visible:ring-0"
            placeholder={"Viết nội dung ở đây — hỗ trợ **markdown**.\n\nDán ảnh (Ctrl+V) hoặc kéo-thả ảnh vào đây để tự động upload."}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onPaste={handlePaste}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          />
          <p className="text-xs text-muted-foreground px-3 py-1.5 bg-muted/30 border-t border-input">
            Mẹo: dán ảnh trực tiếp (Ctrl+V) hoặc kéo-thả file ảnh vào khung — tự động upload và chèn vào bài.
          </p>
        </>
      ) : (
        <div
          className="prose prose-sm max-w-none p-4 min-h-[300px] prose-headings:font-display prose-a:text-secondary"
          dangerouslySetInnerHTML={{ __html: previewHtml || "<p class='text-muted-foreground'>Chưa có nội dung để xem trước.</p>" }}
        />
      )}
    </div>
  );
}

function ToolbarButton({
  icon: Icon,
  label,
  onClick,
  disabled,
  spin,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  spin?: boolean;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-7 w-7 p-0"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className={`w-4 h-4 ${spin ? "animate-spin" : ""}`} />
    </Button>
  );
}
