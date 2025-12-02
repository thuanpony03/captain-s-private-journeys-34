import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, RefreshCw, Trash2, Edit, Save, X, MapPin } from "lucide-react";

interface TourPackage {
  id: string;
  title: string;
  tagline: string | null;
  route: string | null;
  description: string | null;
  duration: string | null;
  price: string | null;
  image_url: string | null;
  stops: any; // JSONB from database
  is_active: boolean;
  order_index: number;
}

export const TourManager = () => {
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<TourPackage>>({});
  const { toast } = useToast();

  const fetchTours = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tour_packages')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setTours(data || []);
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
    setEditForm(tour);
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditForm({});
  };

  const saveTour = async () => {
    if (!editing) return;

    try {
      const { error } = await supabase
        .from('tour_packages')
        .update(editForm)
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
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
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
                    <Label>Điểm đến (mỗi dòng 1 điểm)</Label>
                    <Textarea
                      value={Array.isArray(editForm.stops) ? editForm.stops.join('\n') : ''}
                      onChange={(e) => setEditForm({ ...editForm, stops: e.target.value.split('\n').filter(s => s.trim()) })}
                      rows={5}
                      placeholder="San Francisco&#10;Los Angeles&#10;Las Vegas"
                    />
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
