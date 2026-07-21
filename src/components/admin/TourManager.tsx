"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, RefreshCw, Trash2, Edit, Save, X, MapPin } from "lucide-react";

interface ItineraryDay {
  day: number;
  title: string;
  description?: string;
  image_url?: string;
  meals?: string;
  hotel?: string;
}

interface TourFaq {
  question: string;
  answer: string;
}

interface TourPackage {
  id: string;
  title: string;
  tagline: string | null;
  route: string | null;
  description: string | null;
  duration: string | null;
  price: string | null;
  image_url: string | null;
  slug: string | null;
  stops: any; // JSONB from database
  is_active: boolean;
  order_index: number;
  destination: string | null;
  price_from: number | null;
  departure_note: string | null;
  max_group_size: number | null;
  video_url: string | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  gallery_urls: string[] | null;
  related_story_slugs: string[] | null;
  itinerary: ItineraryDay[] | null;
  faqs: TourFaq[] | null;
}

const emptyItineraryDay = (day: number): ItineraryDay => ({
  day,
  title: "",
  description: "",
  image_url: "",
  meals: "",
  hotel: "",
});

const emptyFaq = (): TourFaq => ({ question: "", answer: "" });

export const TourManager = () => {
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<TourPackage>>({});
  const { toast } = useToast();

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tour_packages')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setTours((data || []) as unknown as TourPackage[]);
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const startEdit = (tour: TourPackage) => {
    setEditing(tour.id);
    setEditForm({
      ...tour,
      slug: tour.slug || generateSlug(tour.title)
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditForm({});
  };

  const saveTour = async () => {
    if (!editing) return;

    try {
      const updatedForm = {
        ...editForm,
        slug: editForm.slug || (editForm.title ? generateSlug(editForm.title) : undefined)
      };

      const { error } = await supabase
        .from('tour_packages')
        .update(updatedForm as any)
        .eq('id', editing);

      if (error) throw error;

      toast({
        title: "Đã lưu",
        description: "Tour đã được cập nhật",
      });

      setEditing(null);
      setEditForm({});
      fetchTours();
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteTour = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa tour này?")) return;

    try {
      const { error } = await supabase
        .from('tour_packages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Đã xóa",
        description: "Tour đã được xóa",
      });

      fetchTours();
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('tour_packages')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Cập nhật",
        description: `Tour đã được ${!isActive ? 'kích hoạt' : 'tắt'}`,
      });

      fetchTours();
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
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
          <h3 className="text-2xl font-bold text-primary">Quản lý Tour</h3>
          <p className="text-sm text-muted-foreground">Chỉnh sửa thông tin các tour du lịch</p>
        </div>
        <Button onClick={fetchTours} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Làm mới
        </Button>
      </div>

      <div className="grid gap-4">
        {tours.map((tour) => (
          <Card key={tour.id} className={!tour.is_active ? 'opacity-50' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {editing === tour.id ? (
                    <Input
                      value={editForm.title || ''}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        setEditForm({ 
                          ...editForm, 
                          title: newTitle,
                          slug: editForm.slug || generateSlug(newTitle)
                        });
                      }}
                      className="max-w-xs"
                    />
                  ) : (
                    tour.title
                  )}
                </CardTitle>
                {editing === tour.id ? (
                  <div className="flex gap-2">
                    <Button onClick={saveTour} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Lưu
                    </Button>
                    <Button onClick={cancelEdit} variant="ghost" size="sm">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={() => startEdit(tour)} variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => toggleActive(tour.id, tour.is_active)}
                      variant="outline"
                      size="sm"
                    >
                      {tour.is_active ? 'Tắt' : 'Bật'}
                    </Button>
                    <Button onClick={() => deleteTour(tour.id)} variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {editing === tour.id ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Tagline</Label>
                      <Input
                        value={editForm.tagline || ''}
                        onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Route</Label>
                      <Input
                        value={editForm.route || ''}
                        onChange={(e) => setEditForm({ ...editForm, route: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Mô tả</Label>
                    <Textarea
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Thời gian</Label>
                      <Input
                        value={editForm.duration || ''}
                        onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Giá</Label>
                      <Input
                        value={editForm.price || ''}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Thứ tự</Label>
                      <Input
                        type="number"
                        value={editForm.order_index || 0}
                        onChange={(e) => setEditForm({ ...editForm, order_index: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={editForm.image_url || ''}
                      onChange={(e) => setEditForm({ ...editForm, image_url: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>URL Slug (SEO-friendly)</Label>
                    <Input
                      placeholder="usa-west-coast-tour"
                      value={editForm.slug || ''}
                      onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Để trống để tự động tạo từ tiêu đề
                    </p>
                  </div>

                  <div>
                    <Label>Điểm đến (mỗi dòng 1 điểm)</Label>
                    <Textarea
                      value={Array.isArray(editForm.stops) ? editForm.stops.join('\n') : ''}
                      onChange={(e) => setEditForm({ ...editForm, stops: e.target.value.split('\n').filter(s => s.trim()) })}
                      rows={5}
                      placeholder="San Francisco&#10;Los Angeles&#10;Las Vegas"
                    />
                  </div>

                  <div className="border-t pt-4 mt-2">
                    <p className="text-sm font-semibold text-primary mb-3">Nâng cấp trang tour (tuỳ chọn)</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label>Thị trường (cho landing page)</Label>
                        <select
                          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                          value={editForm.destination || ''}
                          onChange={(e) => setEditForm({ ...editForm, destination: e.target.value || null })}
                        >
                          <option value="">— Chưa gắn —</option>
                          <option value="my">Mỹ</option>
                          <option value="uc">Úc</option>
                          <option value="chau-au">Châu Âu</option>
                          <option value="canada">Canada</option>
                        </select>
                      </div>
                      <div>
                        <Label>Cỡ nhóm tối đa</Label>
                        <Input
                          type="number"
                          value={editForm.max_group_size ?? ''}
                          onChange={(e) => setEditForm({ ...editForm, max_group_size: e.target.value ? parseInt(e.target.value) : null })}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label>Ghi chú khởi hành</Label>
                      <Input
                        placeholder="Khởi hành theo lịch gia đình bạn"
                        value={editForm.departure_note || ''}
                        onChange={(e) => setEditForm({ ...editForm, departure_note: e.target.value })}
                      />
                    </div>

                    <div className="mb-4">
                      <Label>Video URL (embed, vd: youtube.com/embed/...)</Label>
                      <Input
                        value={editForm.video_url || ''}
                        onChange={(e) => setEditForm({ ...editForm, video_url: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label>Bao gồm (mỗi dòng 1 ý)</Label>
                        <Textarea
                          rows={4}
                          value={(editForm.inclusions || []).join('\n')}
                          onChange={(e) => setEditForm({ ...editForm, inclusions: e.target.value.split('\n').filter(s => s.trim()) })}
                        />
                      </div>
                      <div>
                        <Label>Không bao gồm (mỗi dòng 1 ý)</Label>
                        <Textarea
                          rows={4}
                          value={(editForm.exclusions || []).join('\n')}
                          onChange={(e) => setEditForm({ ...editForm, exclusions: e.target.value.split('\n').filter(s => s.trim()) })}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label>Ảnh gallery (mỗi dòng 1 URL)</Label>
                      <Textarea
                        rows={4}
                        value={(editForm.gallery_urls || []).join('\n')}
                        onChange={(e) => setEditForm({ ...editForm, gallery_urls: e.target.value.split('\n').filter(s => s.trim()) })}
                        placeholder="https://res.cloudinary.com/..."
                      />
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Label>Lịch trình ngày-theo-ngày</Label>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const current = editForm.itinerary || [];
                            setEditForm({ ...editForm, itinerary: [...current, emptyItineraryDay(current.length + 1)] });
                          }}
                        >
                          <Plus className="w-3.5 h-3.5 mr-1" /> Thêm ngày
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {(editForm.itinerary || []).map((day, i) => (
                          <div key={i} className="border rounded-lg p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-muted-foreground">Ngày {day.day}</span>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  const next = (editForm.itinerary || []).filter((_, idx) => idx !== i);
                                  setEditForm({ ...editForm, itinerary: next });
                                }}
                              >
                                <Trash2 className="w-3.5 h-3.5 text-destructive" />
                              </Button>
                            </div>
                            <Input
                              placeholder="Tiêu đề ngày"
                              value={day.title}
                              onChange={(e) => {
                                const next = [...(editForm.itinerary || [])];
                                next[i] = { ...next[i], title: e.target.value };
                                setEditForm({ ...editForm, itinerary: next });
                              }}
                            />
                            <Textarea
                              placeholder="Mô tả chi tiết"
                              rows={2}
                              value={day.description || ''}
                              onChange={(e) => {
                                const next = [...(editForm.itinerary || [])];
                                next[i] = { ...next[i], description: e.target.value };
                                setEditForm({ ...editForm, itinerary: next });
                              }}
                            />
                            <div className="grid grid-cols-3 gap-2">
                              <Input
                                placeholder="Ảnh URL"
                                value={day.image_url || ''}
                                onChange={(e) => {
                                  const next = [...(editForm.itinerary || [])];
                                  next[i] = { ...next[i], image_url: e.target.value };
                                  setEditForm({ ...editForm, itinerary: next });
                                }}
                              />
                              <Input
                                placeholder="Bữa ăn"
                                value={day.meals || ''}
                                onChange={(e) => {
                                  const next = [...(editForm.itinerary || [])];
                                  next[i] = { ...next[i], meals: e.target.value };
                                  setEditForm({ ...editForm, itinerary: next });
                                }}
                              />
                              <Input
                                placeholder="Khách sạn"
                                value={day.hotel || ''}
                                onChange={(e) => {
                                  const next = [...(editForm.itinerary || [])];
                                  next[i] = { ...next[i], hotel: e.target.value };
                                  setEditForm({ ...editForm, itinerary: next });
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>FAQ riêng của tour</Label>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => setEditForm({ ...editForm, faqs: [...(editForm.faqs || []), emptyFaq()] })}
                        >
                          <Plus className="w-3.5 h-3.5 mr-1" /> Thêm câu hỏi
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {(editForm.faqs || []).map((faq, i) => (
                          <div key={i} className="border rounded-lg p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-muted-foreground">Câu {i + 1}</span>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditForm({ ...editForm, faqs: (editForm.faqs || []).filter((_, idx) => idx !== i) })}
                              >
                                <Trash2 className="w-3.5 h-3.5 text-destructive" />
                              </Button>
                            </div>
                            <Input
                              placeholder="Câu hỏi"
                              value={faq.question}
                              onChange={(e) => {
                                const next = [...(editForm.faqs || [])];
                                next[i] = { ...next[i], question: e.target.value };
                                setEditForm({ ...editForm, faqs: next });
                              }}
                            />
                            <Textarea
                              placeholder="Câu trả lời"
                              rows={2}
                              value={faq.answer}
                              onChange={(e) => {
                                const next = [...(editForm.faqs || [])];
                                next[i] = { ...next[i], answer: e.target.value };
                                setEditForm({ ...editForm, faqs: next });
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-4">
                    {tour.image_url && (
                      <img
                        src={tour.image_url}
                        alt={tour.title}
                        className="w-40 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1 space-y-2">
                      <p className="text-sm text-muted-foreground">{tour.tagline}</p>
                      <p className="text-sm font-semibold">{tour.route}</p>
                      <p className="text-sm">{tour.description}</p>
                      <div className="flex gap-4 text-sm">
                        <span className="text-primary font-semibold">{tour.duration}</span>
                        <span className="text-secondary font-semibold">{tour.price}</span>
                      </div>
                    </div>
                  </div>

                  {tour.stops && Array.isArray(tour.stops) && tour.stops.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {tour.stops.join(' → ')}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {tours.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-600">Chưa có tour nào</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
