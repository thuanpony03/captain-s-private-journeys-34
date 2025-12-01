import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, RefreshCw, Type, Link as LinkIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContentItem {
  id: string;
  section: string;
  key: string;
  value: string;
  type: string;
}

export const ContentEditor = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .order('section', { ascending: true });

      if (error) throw error;
      setContent(data || []);
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
    fetchContent();
  }, []);

  const updateContent = async (id: string, value: string) => {
    setSaving(id);
    try {
      const { error } = await supabase
        .from('site_content')
        .update({ value })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Đã lưu",
        description: "Nội dung đã được cập nhật",
      });

      fetchContent();
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, ContentItem[]>);

  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      hero: "Hero Section",
      personal_story: "Personal Story",
      tours: "Tours",
      footer: "Footer"
    };
    return titles[section] || section;
  };

  const getIcon = (type: string) => {
    return type === 'url' ? <LinkIcon className="w-4 h-4" /> : <Type className="w-4 h-4" />;
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
          <h3 className="text-2xl font-bold text-primary">Chỉnh sửa nội dung</h3>
          <p className="text-sm text-muted-foreground">Thay đổi text, link trên website</p>
        </div>
        <Button onClick={fetchContent} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Làm mới
        </Button>
      </div>

      <Tabs defaultValue={Object.keys(groupedContent)[0]} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          {Object.keys(groupedContent).map((section) => (
            <TabsTrigger key={section} value={section}>
              {getSectionTitle(section)}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(groupedContent).map(([section, items]) => (
          <TabsContent key={section} value={section} className="space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getIcon(item.type)}
                      <CardTitle className="text-base">{item.key}</CardTitle>
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {item.type}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {item.type === 'text' && item.value.length > 100 ? (
                    <Textarea
                      value={item.value}
                      onChange={(e) => {
                        const newContent = content.map(c => 
                          c.id === item.id ? { ...c, value: e.target.value } : c
                        );
                        setContent(newContent);
                      }}
                      rows={4}
                      className="resize-none"
                    />
                  ) : (
                    <Input
                      value={item.value}
                      onChange={(e) => {
                        const newContent = content.map(c => 
                          c.id === item.id ? { ...c, value: e.target.value } : c
                        );
                        setContent(newContent);
                      }}
                      type={item.type === 'url' ? 'url' : 'text'}
                    />
                  )}
                  <Button
                    onClick={() => updateContent(item.id, item.value)}
                    disabled={saving === item.id}
                    size="sm"
                    className="w-full md:w-auto"
                  >
                    {saving === item.id ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Đang lưu...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Lưu thay đổi
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
