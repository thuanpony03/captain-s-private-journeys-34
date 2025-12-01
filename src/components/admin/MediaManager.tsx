import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, RefreshCw, Trash2, Image as ImageIcon, Video } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MediaItem {
  id: string;
  name: string;
  section: string;
  media_url: string;
  media_type: string;
  alt_text: string | null;
  is_active: boolean;
}

export const MediaManager = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia(data || []);
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
    fetchMedia();
  }, []);

  const handleAddMedia = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setUploading(true);
    try {
      const mediaUrl = formData.get('media_url') as string;
      const section = formData.get('section') as string;
      const mediaType = formData.get('media_type') as string;
      const altText = formData.get('alt_text') as string;
      const name = formData.get('name') as string;

      const { error } = await supabase
        .from('site_media')
        .insert({
          name,
          section,
          media_url: mediaUrl,
          media_type: mediaType,
          alt_text: altText,
        });

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Media đã được thêm",
      });

      (e.target as HTMLFormElement).reset();
      fetchMedia();
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteMedia = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa media này?")) return;

    try {
      const { error } = await supabase
        .from('site_media')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Đã xóa",
        description: "Media đã được xóa",
      });

      fetchMedia();
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
        .from('site_media')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Cập nhật",
        description: `Media đã được ${!isActive ? 'kích hoạt' : 'tắt'}`,
      });

      fetchMedia();
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
          <h3 className="text-2xl font-bold text-primary">Quản lý Media</h3>
          <p className="text-sm text-muted-foreground">Upload và quản lý ảnh, video</p>
        </div>
        <Button onClick={fetchMedia} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Làm mới
        </Button>
      </div>

      {/* Add Media Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Thêm Media Mới
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddMedia} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Tên</Label>
                <Input id="name" name="name" placeholder="Hero Background" required />
              </div>
              <div>
                <Label htmlFor="section">Section</Label>
                <Select name="section" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero</SelectItem>
                    <SelectItem value="personal_story">Personal Story</SelectItem>
                    <SelectItem value="gallery">Gallery</SelectItem>
                    <SelectItem value="tours">Tours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="media_type">Loại</Label>
                <Select name="media_type" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="media_url">URL</Label>
                <Input 
                  id="media_url" 
                  name="media_url" 
                  type="url" 
                  placeholder="https://..." 
                  required 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="alt_text">Alt Text (SEO)</Label>
              <Input 
                id="alt_text" 
                name="alt_text" 
                placeholder="Mô tả ngắn gọn cho SEO" 
              />
            </div>

            <Button type="submit" disabled={uploading} className="w-full md:w-auto">
              {uploading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Đang thêm...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Thêm Media
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((item) => (
          <Card key={item.id} className={!item.is_active ? 'opacity-50' : ''}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  {item.media_type === 'video' ? (
                    <Video className="w-4 h-4" />
                  ) : (
                    <ImageIcon className="w-4 h-4" />
                  )}
                  {item.name}
                </CardTitle>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {item.section}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Preview */}
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                {item.media_type === 'video' ? (
                  <video src={item.media_url} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={item.media_url} alt={item.alt_text || ''} className="w-full h-full object-cover" />
                )}
              </div>

              <p className="text-xs text-muted-foreground truncate">{item.media_url}</p>

              <div className="flex gap-2">
                <Button
                  onClick={() => toggleActive(item.id, item.is_active)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  {item.is_active ? 'Tắt' : 'Bật'}
                </Button>
                <Button
                  onClick={() => deleteMedia(item.id)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {media.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-600">Chưa có media nào</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
