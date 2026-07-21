"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, RefreshCw, Trash2, Edit, Save, X, FileText } from "lucide-react";

interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  status: string;
  category: string;
  destination: string | null;
  tour_slug: string | null;
  reading_time: number | null;
  meta_description: string | null;
  og_image: string | null;
}

const emptyPost = (): Partial<BlogPostRow> => ({
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  featured_image: "",
  status: "draft",
  category: "cam-nang",
  destination: "",
  tour_slug: "",
  meta_description: "",
});

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

const STATUS_LABEL: Record<string, string> = {
  draft: "Nháp",
  published: "Đã đăng",
  archived: "Lưu trữ",
};

export const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [editForm, setEditForm] = useState<Partial<BlogPostRow>>({});
  const { toast } = useToast();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setPosts((data || []) as unknown as BlogPostRow[]);
    } catch (error: any) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const startEdit = (post: BlogPostRow) => {
    setEditing(post.id);
    setEditForm({ ...post });
  };

  const startNew = () => {
    setEditing("new");
    setEditForm(emptyPost());
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditForm({});
  };

  const savePost = async () => {
    if (!editForm.title || !editForm.content) {
      toast({ title: "Thiếu thông tin", description: "Cần tiêu đề và nội dung", variant: "destructive" });
      return;
    }

    const payload = {
      ...editForm,
      slug: editForm.slug || generateSlug(editForm.title),
      published_at: editForm.status === "published" ? new Date().toISOString() : null,
    };

    try {
      if (editing === "new") {
        const { error } = await supabase.from("blog_posts").insert(payload as any);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").update(payload as any).eq("id", editing);
        if (error) throw error;
      }

      toast({ title: "Đã lưu" });
      setEditing(null);
      setEditForm({});
      fetchPosts();
    } catch (error: any) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Xóa bài viết này?")) return;
    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Đã xóa" });
      fetchPosts();
    } catch (error: any) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-primary">Quản lý Blog</h3>
          <p className="text-sm text-muted-foreground">/chuyen-di và /cam-nang</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchPosts} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Làm mới
          </Button>
          <Button onClick={startNew}>
            <Plus className="w-4 h-4 mr-2" />
            Bài mới
          </Button>
        </div>
      </div>

      {editing === "new" && (
        <PostEditor form={editForm} setForm={setEditForm} onSave={savePost} onCancel={cancelEdit} isNew />
      )}

      <div className="grid gap-4">
        {posts.map((post) =>
          editing === post.id ? (
            <PostEditor
              key={post.id}
              form={editForm}
              setForm={setEditForm}
              onSave={savePost}
              onCancel={cancelEdit}
            />
          ) : (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="w-4 h-4" />
                    {post.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={post.status === "published" ? "default" : "outline"}>
                      {STATUS_LABEL[post.status] || post.status}
                    </Badge>
                    <Badge variant="outline">{post.category}</Badge>
                    <Button onClick={() => startEdit(post)} variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => deletePost(post.id)} variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">/{post.category}/{post.slug}</p>
                {post.excerpt && <p className="text-sm mt-2">{post.excerpt}</p>}
              </CardContent>
            </Card>
          )
        )}
      </div>

      {posts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-600">Chưa có bài viết nào</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

function PostEditor({
  form,
  setForm,
  onSave,
  onCancel,
  isNew,
}: {
  form: Partial<BlogPostRow>;
  setForm: (f: Partial<BlogPostRow>) => void;
  onSave: () => void;
  onCancel: () => void;
  isNew?: boolean;
}) {
  return (
    <Card className="border-primary/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{isNew ? "Bài viết mới" : "Sửa bài viết"}</CardTitle>
          <div className="flex gap-2">
            <Button onClick={onSave} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Lưu
            </Button>
            <Button onClick={onCancel} variant="ghost" size="sm">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Tiêu đề</Label>
            <Input
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <Label>Slug (để trống để tự tạo)</Label>
            <Input value={form.slug || ""} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Chuyên mục</Label>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={form.category || "cam-nang"}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="chuyen-di">Chuyến đi</option>
              <option value="cam-nang">Cẩm nang</option>
            </select>
          </div>
          <div>
            <Label>Trạng thái</Label>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={form.status || "draft"}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="draft">Nháp</option>
              <option value="published">Đăng ngay</option>
              <option value="archived">Lưu trữ</option>
            </select>
          </div>
          <div>
            <Label>Thị trường (tuỳ chọn)</Label>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={form.destination || ""}
              onChange={(e) => setForm({ ...form, destination: e.target.value || null })}
            >
              <option value="">—</option>
              <option value="my">Mỹ</option>
              <option value="uc">Úc</option>
              <option value="chau-au">Châu Âu</option>
              <option value="canada">Canada</option>
            </select>
          </div>
        </div>

        <div>
          <Label>Slug tour liên quan (tuỳ chọn — để hiện link "muốn đi chuyến giống vậy")</Label>
          <Input
            placeholder="us-west-coast"
            value={form.tour_slug || ""}
            onChange={(e) => setForm({ ...form, tour_slug: e.target.value })}
          />
        </div>

        <div>
          <Label>Ảnh đại diện (URL)</Label>
          <Input
            value={form.featured_image || ""}
            onChange={(e) => setForm({ ...form, featured_image: e.target.value })}
          />
        </div>

        <div>
          <Label>Mô tả ngắn (excerpt, hiện ở card)</Label>
          <Textarea
            rows={2}
            value={form.excerpt || ""}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
        </div>

        <div>
          <Label>Meta description (SEO, để trống dùng excerpt)</Label>
          <Textarea
            rows={2}
            value={form.meta_description || ""}
            onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
          />
        </div>

        <div>
          <Label>Nội dung (Markdown)</Label>
          <Textarea
            rows={16}
            className="font-mono text-sm"
            placeholder={"## Tiêu đề\n\nViết nội dung ở đây, hỗ trợ **markdown**."}
            value={form.content || ""}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
}
