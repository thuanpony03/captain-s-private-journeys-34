import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload, Image as ImageIcon, Trash2, Eye, Plus, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Gallery {
  id: string;
  name: string;
  description?: string;
  cover_image?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

interface GalleryImage {
  id: string;
  gallery_id: string;
  image_url: string;
  title?: string;
  description?: string;
  sort_order: number;
  created_at: string;
}

const GalleryManagement = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newGalleryName, setNewGalleryName] = useState('');
  const [newGalleryDescription, setNewGalleryDescription] = useState('');
  const { toast } = useToast();

  const fetchGalleries = async () => {
    try {
      const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleries(data || []);
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

  const fetchGalleryImages = async (galleryId: string) => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('gallery_id', galleryId)
        .order('sort_order');

      if (error) throw error;
      setGalleryImages(data || []);
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  useEffect(() => {
    if (selectedGallery) {
      fetchGalleryImages(selectedGallery.id);
    }
  }, [selectedGallery]);

  const createGallery = async () => {
    if (!newGalleryName.trim()) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng nhập tên gallery',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('galleries')
        .insert({
          name: newGalleryName.trim(),
          description: newGalleryDescription.trim() || null,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Thành công',
        description: 'Gallery đã được tạo',
      });

      setNewGalleryName('');
      setNewGalleryDescription('');
      setIsCreateDialogOpen(false);
      fetchGalleries();
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const uploadImage = async (file: File, galleryId: string) => {
    if (!file || !file.type.startsWith('image/')) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng chọn file ảnh',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `gallery/${galleryId}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // Save to database
      const { error: dbError } = await supabase
        .from('gallery_images')
        .insert({
          gallery_id: galleryId,
          image_url: publicUrl,
          title: file.name.split('.')[0],
          sort_order: galleryImages.length,
        });

      if (dbError) throw dbError;

      toast({
        title: 'Thành công',
        description: 'Ảnh đã được upload',
      });

      fetchGalleryImages(galleryId);
    } catch (error: any) {
      toast({
        title: 'Lỗi upload',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (imageId: string, imageUrl: string) => {
    if (!confirm('Bạn có chắc muốn xóa ảnh này?')) return;

    try {
      // Delete from database
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;

      // Delete from storage (extract path from URL)
      const urlParts = imageUrl.split('/');
      const path = urlParts.slice(-3).join('/'); // gallery/{galleryId}/{filename}
      
      await supabase.storage
        .from('images')
        .remove([path]);

      toast({
        title: 'Đã xóa',
        description: 'Ảnh đã được xóa khỏi hệ thống',
      });

      if (selectedGallery) {
        fetchGalleryImages(selectedGallery.id);
      }
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description: error.message,
        variant: 'destructive',
      });
    }
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
          <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
          <p className="text-gray-600">Quản lý bộ sưu tập hình ảnh cho website</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tạo Gallery Mới
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo Gallery Mới</DialogTitle>
              <DialogDescription>
                Tạo một bộ sưu tập hình ảnh mới cho website
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="gallery-name">Tên Gallery</Label>
                <Input
                  id="gallery-name"
                  value={newGalleryName}
                  onChange={(e) => setNewGalleryName(e.target.value)}
                  placeholder="Ví dụ: Du lịch Mỹ 2024"
                />
              </div>
              
              <div>
                <Label htmlFor="gallery-description">Mô tả (tùy chọn)</Label>
                <Textarea
                  id="gallery-description"
                  value={newGalleryDescription}
                  onChange={(e) => setNewGalleryDescription(e.target.value)}
                  placeholder="Mô tả về bộ sưu tập này..."
                  rows={3}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={createGallery}>
                Tạo Gallery
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gallery List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Danh Sách Gallery
            </CardTitle>
          </CardHeader>
          <CardContent>
            {galleries.length === 0 ? (
              <div className="text-center py-8">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 mb-3">Chưa có gallery nào</p>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(true)}>
                  Tạo gallery đầu tiên
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {galleries.map((gallery) => (
                  <div
                    key={gallery.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedGallery?.id === gallery.id
                        ? 'bg-primary/10 border-primary'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedGallery(gallery)}
                  >
                    <h4 className="font-medium">{gallery.name}</h4>
                    {gallery.description && (
                      <p className="text-sm text-gray-600 mt-1 truncate">
                        {gallery.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(gallery.created_at).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gallery Images */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedGallery ? selectedGallery.name : 'Chọn một gallery'}
            </CardTitle>
            {selectedGallery && (
              <CardDescription>{selectedGallery.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {!selectedGallery ? (
              <div className="text-center py-12">
                <Eye className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Chọn một gallery để xem và quản lý ảnh</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      files.forEach(file => uploadImage(file, selectedGallery.id));
                    }}
                    className="hidden"
                    id="image-upload"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`cursor-pointer ${uploading ? 'pointer-events-none opacity-50' : ''}`}
                  >
                    {uploading ? (
                      <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    )}
                    <p className="text-gray-600 font-medium">
                      {uploading ? 'Đang upload...' : 'Click để chọn ảnh hoặc kéo thả vào đây'}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Hỗ trợ JPG, PNG, GIF. Có thể chọn nhiều ảnh cùng lúc.
                    </p>
                  </label>
                </div>

                {/* Images Grid */}
                {galleryImages.length === 0 ? (
                  <div className="text-center py-8">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">Chưa có ảnh nào trong gallery này</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryImages.map((image) => (
                      <div
                        key={image.id}
                        className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100"
                      >
                        <img
                          src={image.image_url}
                          alt={image.title || 'Gallery image'}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => window.open(image.image_url, '_blank')}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteImage(image.id, image.image_url)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        {/* Title */}
                        {image.title && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-xs truncate">
                            {image.title}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GalleryManagement;