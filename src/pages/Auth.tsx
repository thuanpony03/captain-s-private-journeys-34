import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEOHead from "@/components/SEOHead";
import CustomCursor from "@/components/CustomCursor";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User, Shield, Loader2 } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/admin");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu xác nhận không khớp",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu phải có ít nhất 6 ký tự",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      });

      if (error) throw error;

      toast({
        title: "Đăng ký thành công",
        description: "Đăng nhập ngay để truy cập admin. Không cần xác thực email.",
      });
      
      // Switch to sign in tab
      setActiveTab("signin");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast({
        title: "Lỗi đăng ký",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng quay lại! Bạn có quyền admin đầy đủ.",
      });

      navigate("/admin");
    } catch (error: any) {
      toast({
        title: "Lỗi đăng nhập",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead 
        title="Đăng nhập Admin - Vinh Around Private Tours"
        description="Đăng nhập vào trang quản trị Vinh Around để quản lý tour du lịch riêng."
      />
      <CustomCursor />
      
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 flex items-center justify-center p-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6 text-white hover:bg-white/10 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Về trang chủ
          </Button>

          {/* Auth Card */}
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Admin Portal
              </CardTitle>
              <CardDescription className="text-white/80">
                Đăng nhập để quản lý hệ thống Vinh Around
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-xl">
                  <TabsTrigger 
                    value="signin" 
                    className="text-white data-[state=active]:bg-white data-[state=active]:text-primary"
                  >
                    Đăng nhập
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="text-white data-[state=active]:bg-white data-[state=active]:text-primary"
                  >
                    Đăng ký
                  </TabsTrigger>
                </TabsList>

                {/* Sign In Tab */}
                <TabsContent value="signin" className="space-y-4 mt-6">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white font-medium">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="admin@example.com"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 backdrop-blur-xl"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white font-medium">
                        Mật khẩu
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 backdrop-blur-xl"
                          disabled={loading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-white/60 hover:text-white hover:bg-white/10"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-white text-primary hover:bg-white/90 font-bold py-6 text-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Đang đăng nhập...
                        </>
                      ) : (
                        "Đăng nhập"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Sign Up Tab */}
                <TabsContent value="signup" className="space-y-4 mt-6">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-white font-medium">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                        <Input
                          id="signup-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 backdrop-blur-xl"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-white font-medium">
                        Mật khẩu
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Ít nhất 6 ký tự"
                          className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 backdrop-blur-xl"
                          disabled={loading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-white/60 hover:text-white hover:bg-white/10"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-white font-medium">
                        Xác nhận mật khẩu
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Nhập lại mật khẩu"
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 backdrop-blur-xl"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-white text-primary hover:bg-white/90 font-bold py-6 text-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Đang tạo tài khoản...
                        </>
                      ) : (
                        "Tạo tài khoản"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Info Note */}
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10 backdrop-blur-xl">
                <p className="text-white/80 text-sm text-center">
                  <User className="w-4 h-4 inline mr-2" />
                  Chỉ admin được phép truy cập hệ thống quản lý
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2024 Vinh Around Private Tours. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;