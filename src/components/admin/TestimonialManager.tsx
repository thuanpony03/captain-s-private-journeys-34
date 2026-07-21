"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, RefreshCw, Trash2, Edit, Save, X, Star } from "lucide-react";

interface TestimonialRow {
  id: string;
  customer_name: string;
  customer_image: string | null;
  rating: number | null;
  content: string;
  destination: string | null;
  tour_date: string | null;
  status: string;
  featured: boolean | null;
  video_url: string | null;
  tour_slug: string | null;
  family_size: number | null;
  highlight: string | null;
}

const emptyTestimonial = (): Partial<TestimonialRow> => ({
  customer_name: "",
  customer_image: "",
  rating: 5,
  content: "",
  destination: "",
  status: "published",
  featured: false,
  highlight: "",
});

export const TestimonialManager = () => {
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [editForm, setEditForm] = useState<Partial<TestimonialRow>>({});
  const { toast } = useToast();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setItems((data || []) as unknown as TestimonialRow[]);
    } catch (error: any) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const startEdit = (t: TestimonialRow) => {
    setEditing(t.id);
    setEditForm({ ...t });
  };

  const startNew = () => {
    setEditing("new");
    setEditForm(emptyTestimonial());
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditForm({});
  };

  const saveItem = async () => {
    if (!editForm.customer_name || !editForm.content) {
      toast({ title: "Thiếu thông tin", description: "Cần tên khách và nội dung", variant: "destructive" });
      return;
    }

    try {
      if (editing === "new") {
        const { error } = await supabase.from("testimonials").insert(editForm as any);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").update(editForm as any).eq("id", editing);
        if (error) throw error;
      }

      toast({ title: "Đã lưu" });
      setEditing(null);
      setEditForm({});
      fetchItems();
    } catch (error: any) {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Xóa đánh giá này?")) return;
    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Đã xóa" });
      fetchItems();
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
          <h3 className="text-2xl font-bold text-primary">Quản lý Đánh giá</h3>
          <p className="text-sm text-muted-foreground">/khach-hang + review theo tour</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchItems} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Làm mới
          </Button>
          <Button onClick={startNew}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm đánh giá
          </Button>
        </div>
      </div>

      {editing === "new" && (
        <TestimonialEditor form={editForm} setForm={setEditForm} onSave={saveItem} onCancel={cancelEdit} isNew />
      )}

      <div className="grid gap-4">
        {items.map((t) =>
          editing === t.id ? (
            <TestimonialEditor key={t.id} form={editForm} setForm={setEditForm} onSave={saveItem} onCancel={cancelEdit} />
          ) : (
            <Card key={t.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    {t.customer_name}
                    {t.rating && (
                      <span className="flex items-center gap-0.5 text-secondary">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-secondary" />
                        ))}
                      </span>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {t.featured && <Badge>Nổi bật</Badge>}
                    <Badge variant={t.status === "published" ? "default" : "outline"}>{t.status}</Badge>
                    <Button onClick={() => startEdit(t)} variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => deleteItem(t.id)} variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{t.content}</p>
              </CardContent>
            </Card>
          )
        )}
      </div>

      {items.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-600">Chưa có đánh giá nào</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

function TestimonialEditor({
  form,
  setForm,
  onSave,
  onCancel,
  isNew,
}: {
  form: Partial<TestimonialRow>;
  setForm: (f: Partial<TestimonialRow>) => void;
  onSave: () => void;
  onCancel: () => void;
  isNew?: boolean;
}) {
  return (
    <Card className="border-primary/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{isNew ? "Đánh giá mới" : "Sửa đánh giá"}</CardTitle>
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
            <Label>Tên khách hàng</Label>
            <Input
              value={form.customer_name || ""}
              onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
            />
          </div>
          <div>
            <Label>Ảnh (URL)</Label>
            <Input
              value={form.customer_image || ""}
              onChange={(e) => setForm({ ...form, customer_image: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <Label>Rating (1-5)</Label>
            <Input
              type="number"
              min={1}
              max={5}
              value={form.rating ?? 5}
              onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <Label>Thị trường</Label>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={form.destination || ""}
              onChange={(e) => setForm({ ...form, destination: e.target.value || null })}
            >
              <option value="">—</option>
              <option value="usa">Mỹ</option>
              <option value="australia">Úc</option>
              <option value="europe">Châu Âu</option>
            </select>
          </div>
          <div>
            <Label>Số người</Label>
            <Input
              type="number"
              value={form.family_size ?? ""}
              onChange={(e) => setForm({ ...form, family_size: e.target.value ? parseInt(e.target.value) : null })}
            />
          </div>
          <div>
            <Label>Ngày đi tour</Label>
            <Input
              type="date"
              value={form.tour_date || ""}
              onChange={(e) => setForm({ ...form, tour_date: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label>Slug tour (để gắn review vào đúng trang tour)</Label>
          <Input
            placeholder="us-west-coast"
            value={form.tour_slug || ""}
            onChange={(e) => setForm({ ...form, tour_slug: e.target.value })}
          />
        </div>

        <div>
          <Label>Video URL (tuỳ chọn, embed link)</Label>
          <Input value={form.video_url || ""} onChange={(e) => setForm({ ...form, video_url: e.target.value })} />
        </div>

        <div>
          <Label>Pull-quote ngắn (câu đắt nhất, hiện ở card)</Label>
          <Input value={form.highlight || ""} onChange={(e) => setForm({ ...form, highlight: e.target.value })} />
        </div>

        <div>
          <Label>Nội dung đầy đủ</Label>
          <Textarea
            rows={5}
            value={form.content || ""}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={form.featured || false}
              onCheckedChange={(v) => setForm({ ...form, featured: !!v })}
            />
            <Label>Nổi bật (ưu tiên hiện trước)</Label>
          </div>
          <div>
            <Label>Trạng thái</Label>
            <select
              className="h-9 rounded-md border border-input bg-background px-3 text-sm ml-2"
              value={form.status || "published"}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="draft">Nháp</option>
              <option value="published">Hiện công khai</option>
              <option value="hidden">Ẩn</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
