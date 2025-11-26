import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    destination: "",
    groupSize: "",
    priority: "",
    contact: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.destination || !formData.groupSize || !formData.priority || !formData.contact) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Tất cả các câu hỏi đều cần được trả lời",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    
    toast({
      title: "Đã gửi thành công! 🎉",
      description: "Captain Vinh sẽ liên hệ với bạn trong 24h qua Zalo/SĐT đã cung cấp.",
    });
    
    // Reset form
    setFormData({
      destination: "",
      groupSize: "",
      priority: "",
      contact: ""
    });
  };

  return (
    <section id="contact-form" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Đừng để chuyến đi mơ ước chỉ nằm trên giấy
            </h2>
            <Card className="inline-block p-6 bg-secondary/10 border-secondary">
              <p className="text-lg text-foreground">
                ⏰ <span className="font-bold">Tháng này Vinh chỉ nhận giới hạn 02 đoàn</span> để đảm bảo 
                chất lượng phục vụ tốt nhất. Hãy để lại thông tin để Vinh giữ chỗ cho gia đình bạn.
              </p>
            </Card>
          </div>

          <Card className="p-8 shadow-elegant">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Question 1: Destination */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-foreground">
                  1. Anh/Chị dự định đi đâu? *
                </Label>
                <RadioGroup 
                  value={formData.destination}
                  onValueChange={(value) => setFormData({...formData, destination: value})}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-smooth">
                    <RadioGroupItem value="usa" id="usa" />
                    <Label htmlFor="usa" className="cursor-pointer flex-1">🇺🇸 Mỹ (US West Coast)</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-smooth">
                    <RadioGroupItem value="australia" id="australia" />
                    <Label htmlFor="australia" className="cursor-pointer flex-1">🇦🇺 Úc (Australia Grand Road)</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-smooth">
                    <RadioGroupItem value="europe" id="europe" />
                    <Label htmlFor="europe" className="cursor-pointer flex-1">🇪🇺 Âu (Custom Tour)</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-smooth">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer flex-1">🌍 Khác (Để Vinh tư vấn)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Question 2: Group Size */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-foreground">
                  2. Đoàn mình khoảng mấy người? *
                </Label>
                <RadioGroup 
                  value={formData.groupSize}
                  onValueChange={(value) => setFormData({...formData, groupSize: value})}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-smooth">
                    <RadioGroupItem value="2-4" id="2-4" />
                    <Label htmlFor="2-4" className="cursor-pointer flex-1">2-4 người (Gia đình nhỏ)</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-smooth">
                    <RadioGroupItem value="4-6" id="4-6" />
                    <Label htmlFor="4-6" className="cursor-pointer flex-1">4-6 người (Lý tưởng nhất) ⭐</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-smooth">
                    <RadioGroupItem value="6+" id="6+" />
                    <Label htmlFor="6+" className="cursor-pointer flex-1">Trên 6 người (Nhóm lớn)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Question 3: Priority */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-foreground">
                  3. Anh/Chị ưu tiên điều gì nhất? *
                </Label>
                <RadioGroup 
                  value={formData.priority}
                  onValueChange={(value) => setFormData({...formData, priority: value})}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-smooth">
                    <RadioGroupItem value="health" id="health" />
                    <Label htmlFor="health" className="cursor-pointer flex-1">💪 Sức khỏe (Lịch nhẹ nhàng, thoải mái)</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-smooth">
                    <RadioGroupItem value="experience" id="experience" />
                    <Label htmlFor="experience" className="cursor-pointer flex-1">🎭 Trải nghiệm độc lạ (Khám phá văn hóa)</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-smooth">
                    <RadioGroupItem value="luxury" id="luxury" />
                    <Label htmlFor="luxury" className="cursor-pointer flex-1">📸 Check-in sang chảnh (Ảnh đẹp, địa điểm hot)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Question 4: Contact */}
              <div className="space-y-4">
                <Label htmlFor="contact" className="text-lg font-semibold text-foreground">
                  4. Để lại SĐT/Zalo để Vinh liên hệ gửi lịch trình mẫu *
                </Label>
                <Input
                  id="contact"
                  type="text"
                  placeholder="Nhập số điện thoại hoặc Zalo của bạn"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  className="text-lg p-6"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 shadow-gold hover-lift font-bold"
              >
                <Send className="mr-2 w-5 h-5" />
                GỬI YÊU CẦU CHO CAPTAIN VINH
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                🔒 Thông tin của bạn được bảo mật tuyệt đối và chỉ được sử dụng để tư vấn tour
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
