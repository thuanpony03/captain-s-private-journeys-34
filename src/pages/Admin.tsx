import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const Admin = () => {
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('lead_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
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
    fetchLeads();
  }, []);

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

  const destinationLabels: Record<string, string> = {
    'usa': 'USA - West Coast',
    'australia': 'Australia - Great Ocean Road',
    'europe': 'Europe',
    'other': 'Khác'
  };

  const priorityLabels: Record<string, string> = {
    'health': 'Sức khỏe',
    'experience': 'Trải nghiệm',
    'luxury': 'Sang trọng'
  };

  const statusColors: Record<string, string> = {
    'new': 'bg-blue-500',
    'contacted': 'bg-yellow-500',
    'converted': 'bg-green-500',
    'lost': 'bg-red-500'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">Quản Lý Leads</h1>
              <p className="text-muted-foreground">Danh sách khách hàng tiềm năng</p>
            </div>
          </div>
          <Button onClick={fetchLeads} disabled={loading} variant="outline">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Đang tải...</p>
          </div>
        ) : leads.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Chưa có lead nào</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {leads.map((lead) => (
              <Card key={lead.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-primary">
                        {destinationLabels[lead.destination]}
                      </CardTitle>
                      <CardDescription>
                        {new Date(lead.created_at).toLocaleString('vi-VN')}
                      </CardDescription>
                    </div>
                    <Badge className={`${statusColors[lead.status]} text-white`}>
                      {lead.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">Số lượng</p>
                      <p className="text-lg font-bold">{lead.group_size} người</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">Ưu tiên</p>
                      <p className="text-lg font-bold">{priorityLabels[lead.priority]}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm font-semibold text-muted-foreground mb-1">Liên hệ</p>
                      <p className="text-lg font-bold text-primary">{lead.contact}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Ghi chú</p>
                    <Textarea
                      placeholder="Thêm ghi chú..."
                      value={lead.notes || ''}
                      onChange={(e) => updateNotes(lead.id, e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant={lead.status === 'new' ? 'default' : 'outline'}
                      onClick={() => updateLeadStatus(lead.id, 'new')}
                      disabled={updating === lead.id}
                    >
                      Mới
                    </Button>
                    <Button
                      size="sm"
                      variant={lead.status === 'contacted' ? 'default' : 'outline'}
                      onClick={() => updateLeadStatus(lead.id, 'contacted')}
                      disabled={updating === lead.id}
                    >
                      Đã liên hệ
                    </Button>
                    <Button
                      size="sm"
                      variant={lead.status === 'converted' ? 'default' : 'outline'}
                      onClick={() => updateLeadStatus(lead.id, 'converted')}
                      disabled={updating === lead.id}
                    >
                      Thành công
                    </Button>
                    <Button
                      size="sm"
                      variant={lead.status === 'lost' ? 'default' : 'outline'}
                      onClick={() => updateLeadStatus(lead.id, 'lost')}
                      disabled={updating === lead.id}
                    >
                      Thất bại
                    </Button>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      ID: <code className="bg-muted px-2 py-1 rounded">{lead.id}</code>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
