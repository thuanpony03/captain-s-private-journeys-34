import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Star, Plus, Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Testimonial {
  id: string;
  customer_name: string;
  customer_image?: string;
  rating: number;
  content: string;
  destination?: string;
  tour_date?: string;
  status: 'draft' | 'published' | 'hidden';
  featured: boolean;
  created_at: string;
  updated_at: string;
}

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_image: '',
    rating: 5,
    content: '',
    destination: '',
    tour_date: '',
    status: 'published' as const,
    featured: false,
  });
  const { toast } = useToast();

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const resetForm = () => {
    setFormData({
      customer_name: '',
      customer_image: '',
      rating: 5,
      content: '',
      destination: '',
      tour_date: '',
      status: 'published',
      featured: false,
    });
    setEditingTestimonial(null);
  };

  const handleSubmit = async () => {
    if (!formData.customer_name.trim() || !formData.content.trim()) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng điền đầy đủ tên khách hàng và nội dung đánh giá',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingTestimonial) {
        // Update existing testimonial
        const { error } = await supabase
          .from('testimonials')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingTestimonial.id);

        if (error) throw error;

        toast({
          title: 'Thành công',
          description: 'Đánh giá đã được cập nhật',
        });
      } else {
        // Create new testimonial
        const { error } = await supabase
          .from('testimonials')
          .insert(formData);

        if (error) throw error;

        toast({
          title: 'Thành công',
          description: 'Đánh giá mới đã được tạo',
        });
      }

      setIsCreateDialogOpen(false);
      resetForm();
      fetchTestimonials();
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      customer_name: testimonial.customer_name,
      customer_image: testimonial.customer_image || '',
      rating: testimonial.rating,
      content: testimonial.content,
      destination: testimonial.destination || '',
      tour_date: testimonial.tour_date || '',
      status: testimonial.status,
      featured: testimonial.featured,
    });
    setIsCreateDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa đánh giá này?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Đã xóa',
        description: 'Đánh giá đã được xóa khỏi hệ thống',
      });

      fetchTestimonials();
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ featured: !featured })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Đã cập nhật',
        description: `Đánh giá đã được ${!featured ? 'đánh dấu nổi bật' : 'bỏ đánh dấu nổi bật'}`,
      });

      fetchTestimonials();
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: 'bg-gray-100 text-gray-800', label: 'Bản nháp' },
      published: { color: 'bg-green-100 text-green-800', label: 'Đã xuất bản' },
      hidden: { color: 'bg-red-100 text-red-800', label: 'Ẩn' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="ml-2">Đang tải...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản Lý Testimonials</h2>
          <p className="text-gray-600">Quản lý đánh giá và phản hồi từ khách hàng</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm Đánh Giá
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTestimonial ? 'Chỉnh Sửa Đánh Giá' : 'Thêm Đánh Giá Mới'}
              </DialogTitle>
              <DialogDescription>
                Thêm hoặc chỉnh sửa đánh giá từ khách hàng
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer-name">Tên khách hàng</Label>
                  <Input
                    id="customer-name"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    placeholder="Tên khách hàng"
                  />
                </div>
                
                <div>
                  <Label htmlFor="rating">Đánh giá</Label>
                  <Select
                    value={formData.rating.toString()}
                    onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          <div className="flex items-center gap-1">
                            {renderStars(rating)}
                            <span className="ml-2">{rating} sao</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="content">Nội dung đánh giá</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Nội dung đánh giá từ khách hàng..."
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="destination">Điểm đến</Label>
                  <Input
                    id="destination"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="Ví dụ: Mỹ, Úc, Châu Âu..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="tour-date">Ngày tour</Label>
                  <Input
                    id="tour-date"
                    type="date"
                    value={formData.tour_date}
                    onChange={(e) => setFormData({ ...formData, tour_date: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="customer-image">URL ảnh khách hàng (tùy chọn)</Label>
                <Input
                  id="customer-image"
                  value={formData.customer_image}
                  onChange={(e) => setFormData({ ...formData, customer_image: e.target.value })}
                  placeholder="https://example.com/customer-photo.jpg"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Bản nháp</SelectItem>
                      <SelectItem value="published">Đã xuất bản</SelectItem>
                      <SelectItem value="hidden">Ẩn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="featured">Đánh dấu nổi bật</Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleSubmit}>
                {editingTestimonial ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Testimonials List */}
      <div className="grid gap-6">
        {testimonials.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Star className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Chưa có đánh giá nào</h3>
              <p className="text-gray-500 text-center mb-6">
                Thêm đánh giá từ khách hàng để xây dựng uy tín và thu hút khách hàng mới
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                Thêm đánh giá đầu tiên
              </Button>
            </CardContent>
          </Card>
        ) : (
          testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {testimonial.customer_image ? (
                      <img
                        src={testimonial.customer_image}
                        alt={testimonial.customer_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold text-lg">
                          {testimonial.customer_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {testimonial.customer_name}
                        {testimonial.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Star className="w-3 h-3 mr-1" />
                            Nổi bật
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          {renderStars(testimonial.rating)}
                        </div>
                        {testimonial.destination && (
                          <span className="text-sm text-gray-500">
                            • {testimonial.destination}
                          </span>
                        )}
                        {testimonial.tour_date && (
                          <span className="text-sm text-gray-500">
                            • {new Date(testimonial.tour_date).toLocaleDateString('vi-VN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusBadge(testimonial.status)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFeatured(testimonial.id, testimonial.featured)}
                      className={testimonial.featured ? 'text-yellow-600' : 'text-gray-500'}
                    >
                      <Star className={`w-4 h-4 ${testimonial.featured ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(testimonial)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(testimonial.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <blockquote className="text-gray-700 italic border-l-4 border-primary/20 pl-4">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="mt-4 text-sm text-gray-500">
                  Tạo: {new Date(testimonial.created_at).toLocaleDateString('vi-VN')}
                  {testimonial.updated_at !== testimonial.created_at && (
                    <span> • Cập nhật: {new Date(testimonial.updated_at).toLocaleDateString('vi-VN')}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TestimonialManagement;