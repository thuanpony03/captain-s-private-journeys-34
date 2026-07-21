import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="Không tìm thấy trang | Vinh Around"
        description="Trang bạn tìm không tồn tại hoặc đã được chuyển đi."
        noIndex
      />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center px-6">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-2 text-xl text-muted-foreground">
            Không tìm thấy trang bạn đang tìm
          </p>
          <p className="mb-6 text-sm text-muted-foreground">
            Có thể tour này đã kết thúc hoặc đường dẫn bị sai.
          </p>
          <Link to="/" className="text-primary underline hover:text-primary/90">
            Về trang chủ
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
