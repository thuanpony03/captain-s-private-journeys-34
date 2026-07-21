"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, RefreshCw, LogOut, Users, MessageSquare, Settings, BarChart3, Calendar, Phone, Clock, Trash2, Image, FileText, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomCursor from "@/components/CustomCursor";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { MediaManager } from "@/components/admin/MediaManager";
import { TourManager } from "@/components/admin/TourManager";
import { BlogManager } from "@/components/admin/BlogManager";
import { TestimonialManager } from "@/components/admin/TestimonialManager";

interface LeadSubmission {
  id: string;
  destination: string;
  group_size: string;
  priority: string;
  contact: string;
  created_at: string;
  status: string;
  notes: string | null;
}

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAdminAuth();
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    convertedLeads: 0,
    conversionRate: 0
  });
  const [activeTab, setActiveTab] = useState("leads");
  const [contentTab, setContentTab] = useState("text");
  const { toast } = useToast();
  const router = useRouter();

  const createTestLead = async () => {
    try {
      const testLead = {
        destination: 'usa',
        group_size: '4-6',
        priority: 'luxury',
        contact: 'Test User - 0987654321'
      };

      const { data, error } = await supabase
        .from('lead_submissions')
        .insert(testLead)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Tạo test lead thành công",
        description: `Lead ID: ${data.id}`,
      });

      fetchLeads(); // Refresh the list
    } catch (error: any) {
      toast({
        title: "Lỗi tạo test lead",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      console.log('Fetching leads...');
      const { data, error } = await supabase
        .from('lead_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Supabase response:', { data, error });

      if (error) throw error;
      
      const leadsData = data || [];
      setLeads(leadsData);
      
      // Calculate stats
      const totalLeads = leadsData.length;
      const newLeads = leadsData.filter(lead => lead.status === 'new').length;
      const convertedLeads = leadsData.filter(lead => lead.status === 'converted').length;
      const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
      
      setStats({
        totalLeads,
        newLeads,
        convertedLeads,
        conversionRate
      });
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
    if (!authLoading && isAdmin) {
      fetchLeads();
    }
  }, [authLoading, isAdmin]);

  const updateLeadStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const { error } = await supabase
        .from('lead_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Đã cập nhật",
        description: "Trạng thái lead đã được cập nhật",
      });

      fetchLeads();
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('lead_submissions')
        .update({ notes })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Đã lưu",
        description: "Ghi chú đã được cập nhật",
      });
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa lead này?")) return;
    
    try {
      const { error } = await supabase
        .from('lead_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Đã xóa",
        description: "Lead đã được xóa khỏi hệ thống",
      });

      fetchLeads();
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { color: "bg-blue-100 text-blue-800", label: "Mới" },
      contacted: { color: "bg-yellow-100 text-yellow-800", label: "Đã liên hệ" },
      quoted: { color: "bg-purple-100 text-purple-800", label: "Đã báo giá" },
      converted: { color: "bg-green-100 text-green-800", label: "Đã chốt" },
      lost: { color: "bg-red-100 text-red-800", label: "Thất bại" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'health': return '🏥';
      case 'experience': return '🎭';
      case 'luxury': return '💎';
      default: return '🌟';
    }
  };

  const getDestinationFlag = (destination: string) => {
    switch (destination) {
      case 'usa': return '🇺🇸';
      case 'australia': return '🇦🇺';
      case 'europe': return '🇪🇺';
      default: return '🌍';
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-primary/80">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <CustomCursor />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/5">
        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => router.push("/")} className="text-primary hover:bg-primary/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Về trang chủ
                </Button>
                <div className="h-6 w-px bg-gray-300" />
                <div>
                  <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
                  <p className="text-sm text-gray-600">Vinh Around Private Tours</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={fetchLeads} disabled={loading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Làm mới
                </Button>
                <Button variant="ghost" onClick={handleSignOut} className="text-red-600 hover:bg-red-50">
                  <LogOut className="w-4 h-4 mr-2" />
                  Đăng xuất
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Tổng Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalLeads}</div>
                <div className="flex items-center text-xs opacity-90 mt-1">
                  <Users className="w-3 h-3 mr-1" />
                  Khách hàng tiềm năng
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Leads Mới</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.newLeads}</div>
                <div className="flex items-center text-xs opacity-90 mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  Cần xử lý
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Đã Chốt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.convertedLeads}</div>
                <div className="flex items-center text-xs opacity-90 mt-1">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  Thành công
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Tỷ Lệ Chốt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.conversionRate.toFixed(1)}%</div>
                <div className="flex items-center text-xs opacity-90 mt-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  Hiệu quả
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white shadow-sm border">
              <TabsTrigger value="leads" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Quản Lý Leads
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Content Management
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Cài Đặt
              </TabsTrigger>
            </TabsList>

            {/* Leads Management */}
            <TabsContent value="leads" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Quản Lý Leads</h3>
                  <p className="text-sm text-gray-600">Tổng cộng: {leads.length} leads</p>
                </div>
                <div className="space-x-2">
                  <Button onClick={fetchLeads} variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Làm mới
                  </Button>
                  <Button onClick={createTestLead} variant="outline" size="sm">
                    Tạo Test Lead
                  </Button>
                </div>
              </div>
              <div className="grid gap-6">
                {leads.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Users className="w-16 h-16 text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">Chưa có leads nào</h3>
                      <p className="text-gray-500 text-center">
                        Khi khách hàng điền form trên website, thông tin sẽ hiển thị ở đây
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  leads.map((lead) => (
                    <Card key={lead.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">
                              {getDestinationFlag(lead.destination)}
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {lead.destination.toUpperCase()} - {lead.group_size} người
                              </CardTitle>
                              <CardDescription className="flex items-center gap-4 mt-1">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(lead.created_at).toLocaleDateString('vi-VN', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                                <span className="flex items-center gap-1">
                                  {getPriorityIcon(lead.priority)}
                                  {lead.priority === 'health' ? 'Sức khỏe' : 
                                   lead.priority === 'experience' ? 'Trải nghiệm' : 'Sang trọng'}
                                </span>
                              </CardDescription>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {getStatusBadge(lead.status)}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteLead(lead.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Contact Info */}
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <Phone className="w-4 h-4 text-primary" />
                          <span className="font-medium">{lead.contact}</span>
                        </div>
                        
                        {/* Status Update */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`status-${lead.id}`}>Cập nhật trạng thái</Label>
                            <Select
                              value={lead.status}
                              onValueChange={(value) => updateLeadStatus(lead.id, value)}
                              disabled={updating === lead.id}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">🔵 Mới</SelectItem>
                                <SelectItem value="contacted">🟡 Đã liên hệ</SelectItem>
                                <SelectItem value="quoted">🟣 Đã báo giá</SelectItem>
                                <SelectItem value="converted">🟢 Đã chốt</SelectItem>
                                <SelectItem value="lost">🔴 Thất bại</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor={`notes-${lead.id}`}>Ghi chú</Label>
                            <Textarea
                              id={`notes-${lead.id}`}
                              placeholder="Thêm ghi chú về lead này..."
                              value={lead.notes || ''}
                              onChange={(e) => {
                                const updatedLeads = leads.map(l => 
                                  l.id === lead.id ? { ...l, notes: e.target.value } : l
                                );
                                setLeads(updatedLeads);
                              }}
                              onBlur={(e) => updateNotes(lead.id, e.target.value)}
                              className="resize-none"
                              rows={3}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Content Management */}
            <TabsContent value="content" className="space-y-6">
              <Tabs value={contentTab} onValueChange={setContentTab} className="space-y-4">
                <TabsList className="bg-white shadow-sm border grid grid-cols-5 w-full md:w-auto">
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="hidden md:inline">Nội dung</span>
                  </TabsTrigger>
                  <TabsTrigger value="media" className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    <span className="hidden md:inline">Media</span>
                  </TabsTrigger>
                  <TabsTrigger value="tours" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="hidden md:inline">Tours</span>
                  </TabsTrigger>
                  <TabsTrigger value="blog" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="hidden md:inline">Blog</span>
                  </TabsTrigger>
                  <TabsTrigger value="testimonials" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span className="hidden md:inline">Đánh giá</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text">
                  <ContentEditor />
                </TabsContent>

                <TabsContent value="media">
                  <MediaManager />
                </TabsContent>

                <TabsContent value="tours">
                  <TourManager />
                </TabsContent>

                <TabsContent value="blog">
                  <BlogManager />
                </TabsContent>

                <TabsContent value="testimonials">
                  <TestimonialManager />
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cài Đặt Hệ Thống</CardTitle>
                  <CardDescription>
                    Quản lý cài đặt website và tài khoản admin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Thông Tin Website</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Tên công ty</Label>
                          <Input defaultValue="Vinh Around Private Tours" />
                        </div>
                        <div>
                          <Label>Email liên hệ</Label>
                          <Input defaultValue="admin@passport.cafe" />
                        </div>
                        <div>
                          <Label>Số điện thoại</Label>
                          <Input placeholder="Nhập số điện thoại" />
                        </div>
                        <div>
                          <Label>Địa chỉ</Label>
                          <Input placeholder="Nhập địa chỉ công ty" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button className="bg-primary hover:bg-primary/90">
                        Lưu Cài Đặt
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;