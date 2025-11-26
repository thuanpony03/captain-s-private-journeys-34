import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
const ContactForm = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    destination: "",
    groupSize: "",
    priority: "",
    contact: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.destination || !formData.groupSize || !formData.priority || !formData.contact) {
      toast({
        title: "Vui lòng điền đầy đủ thông tin",
        description: "Tất cả các câu hỏi đều cần được trả lời",
        variant: "destructive"
      });
      return;
    }
    console.log("Form submitted:", formData);
    toast({
      title: "Đã gửi thành công! 🎉",
      description: "Vinh Around sẽ liên hệ với bạn trong 24h qua Zalo/SĐT đã cung cấp."
    });
    setFormData({
      destination: "",
      groupSize: "",
      priority: "",
      contact: ""
    });
  };
  return <section id="contact-form" className="py-32 md:py-48 bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{
        animationDelay: '2s'
      }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[3px] w-20 md:w-32 bg-gradient-to-r from-transparent via-secondary to-accent rounded-full"></div>
              <div className="w-3 h-3 rounded-full bg-secondary animate-pulse"></div>
              <div className="h-[3px] w-20 md:w-32 bg-gradient-to-l from-transparent via-secondary to-accent rounded-full"></div>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-primary">
              Đừng để chuyến đi mơ ước
              <br />
              <span className="text-secondary italic">chỉ nằm trên giấy</span>
            </h2>
            
            <Card className="inline-block p-6 md:p-8 bg-gradient-to-br from-secondary/20 via-primary/10 to-secondary/20 border-2 border-secondary shadow-gold hover-lift relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
              <div className="relative flex flex-col md:flex-row items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse flex-shrink-0"></div>
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  <span className="font-display font-bold text-xl md:text-2xl text-secondary block md:inline">Tháng này Vinh chỉ nhận giới hạn 02 đoàn</span>
                  {" "}để đảm bảo chất lượng phục vụ tốt nhất. 
                  <span className="block md:inline mt-2 md:mt-0"> Hãy để lại thông tin để Vinh giữ chỗ cho gia đình bạn.</span>
                </p>
              </div>
            </Card>
          </div>

          <Card className="p-10 md:p-16 shadow-float relative overflow-hidden animate-zoom-in border-2 border-border/50">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            
            <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
              {/* Question 1 */}
              <div className="space-y-4 hover-lift transition-all">
                <Label className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-primary-foreground font-bold">1</span>
                  Anh/Chị dự định đi đâu? *
                </Label>
                <RadioGroup value={formData.destination} onValueChange={value => setFormData({
                ...formData,
                destination: value
              })} className="space-y-3">
                  {[{
                  value: "usa",
                  label: "Mỹ (US West Coast)",
                  desc: "San Francisco, LA, San Diego",
                  color: "from-orange-500/20 to-red-500/20"
                }, {
                  value: "australia",
                  label: "Úc (Australia Grand Road)",
                  desc: "Sydney, Melbourne, Gold Coast",
                  color: "from-blue-500/20 to-teal-500/20"
                }, {
                  value: "europe",
                  label: "Âu (Custom Tour)",
                  desc: "Pháp, Ý, Thụy Sĩ",
                  color: "from-purple-500/20 to-pink-500/20"
                }, {
                  value: "other",
                  label: "Khác (Để Vinh tư vấn)",
                  desc: "Địa điểm khác theo yêu cầu",
                  color: "from-emerald-500/20 to-cyan-500/20"
                }].map(option => <div key={option.value} className="relative group">
                      <div className={`flex items-center space-x-4 p-5 rounded-xl border-2 transition-all cursor-pointer relative overflow-hidden ${formData.destination === option.value ? 'border-secondary bg-secondary/10 shadow-md' : 'border-border hover:border-secondary/50 hover:bg-muted'}`}>
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${option.color} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                        <RadioGroupItem value={option.value} id={option.value} className="peer" />
                        <Label htmlFor={option.value} className="cursor-pointer flex-1 relative z-10">
                          <p className="font-semibold text-base md:text-lg">{option.label}</p>
                          <p className="text-sm text-muted-foreground mt-1">{option.desc}</p>
                        </Label>
                      </div>
                    </div>)}
                </RadioGroup>
              </div>

              {/* Question 2 */}
              <div className="space-y-4 hover-lift transition-all">
                <Label className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-primary-foreground font-bold">2</span>
                  Đoàn mình khoảng mấy người? *
                </Label>
                <RadioGroup value={formData.groupSize} onValueChange={value => setFormData({
                ...formData,
                groupSize: value
              })} className="space-y-3">
                  {[{
                  value: "2-4",
                  label: "2-4 người",
                  desc: "Gia đình nhỏ, ấm cúng"
                }, {
                  value: "4-6",
                  label: "4-6 người",
                  desc: "Lý tưởng nhất ⭐"
                }, {
                  value: "6+",
                  label: "Trên 6 người",
                  desc: "Nhóm lớn, vui vẻ"
                }].map(option => <div key={option.value} className="relative group">
                      <div className={`flex items-center space-x-4 p-5 rounded-xl border-2 transition-all cursor-pointer ${formData.groupSize === option.value ? 'border-secondary bg-secondary/10 shadow-md' : 'border-border hover:border-secondary/50 hover:bg-muted'}`}>
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="cursor-pointer flex-1">
                          <p className="font-semibold text-base md:text-lg">{option.label}</p>
                          <p className="text-sm text-muted-foreground mt-1">{option.desc}</p>
                        </Label>
                      </div>
                    </div>)}
                </RadioGroup>
              </div>

              {/* Question 3 */}
              <div className="space-y-4 hover-lift transition-all">
                <Label className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-primary-foreground font-bold">3</span>
                  Anh/Chị ưu tiên điều gì nhất? *
                </Label>
                <RadioGroup value={formData.priority} onValueChange={value => setFormData({
                ...formData,
                priority: value
              })} className="space-y-3">
                  {[{
                  value: "health",
                  label: "Sức khỏe",
                  desc: "Lịch nhẹ nhàng, thoải mái, phù hợp người lớn tuổi"
                }, {
                  value: "experience",
                  label: "Trải nghiệm độc lạ",
                  desc: "Khám phá văn hóa, ẩm thực, gặp gỡ người bản địa"
                }, {
                  value: "luxury",
                  label: "Check-in sang chảnh",
                  desc: "Ảnh đẹp, địa điểm hot, sang trọng đẳng cấp"
                }].map(option => <div key={option.value} className="relative group">
                      <div className={`flex items-center space-x-4 p-5 rounded-xl border-2 transition-all cursor-pointer ${formData.priority === option.value ? 'border-secondary bg-secondary/10 shadow-md' : 'border-border hover:border-secondary/50 hover:bg-muted'}`}>
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="cursor-pointer flex-1">
                          <p className="font-semibold text-base md:text-lg">{option.label}</p>
                          <p className="text-sm text-muted-foreground mt-1">{option.desc}</p>
                        </Label>
                      </div>
                    </div>)}
                </RadioGroup>
              </div>

              {/* Question 4 */}
              <div className="space-y-4 hover-lift transition-all">
                <Label htmlFor="contact" className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-primary-foreground font-bold">4</span>
                  Để lại SĐT/Zalo để Vinh liên hệ *
                </Label>
                <Input id="contact" type="text" placeholder="Nhập số điện thoại hoặc Zalo của bạn" value={formData.contact} onChange={e => setFormData({
                ...formData,
                contact: e.target.value
              })} className="text-lg p-7 border-2 focus:border-secondary rounded-xl" />
              </div>

              {/* Submit Button */}
              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-accent via-secondary to-accent hover:from-accent/90 hover:via-secondary/90 hover:to-accent/90 text-accent-foreground text-lg md:text-xl py-7 md:py-8 shadow-gold hover-lift font-bold rounded-xl relative overflow-hidden group">
                <span className="relative z-10 text-sm">GỬI YÊU CẦU CHO VINH AROUND</span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer"></div>
              </Button>

              <div className="flex items-center justify-center gap-3 pt-4">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                <p className="text-center text-xs md:text-sm text-muted-foreground">
                  Thông tin của bạn được <span className="font-bold text-secondary">bảo mật tuyệt đối</span> và chỉ được sử dụng để tư vấn tour
                </p>
                <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>;
};
export default ContactForm;