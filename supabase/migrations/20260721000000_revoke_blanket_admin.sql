-- =============================================================================
-- SECURITY FIX 1/2 — Thu hồi quyền admin cấp hàng loạt
-- =============================================================================
-- Bối cảnh: migration 20251202_give_all_users_admin.sql đã ghi đè trigger
-- handle_new_user() để cấp role 'admin' cho MỌI user đăng ký mới, đồng thời
-- nâng toàn bộ user hiện có lên admin. Kết hợp với public signup đang bật,
-- bất kỳ ai cũng có thể tự cấp quyền admin cho mình.
--
-- Migration này khôi phục hành vi gốc của 20251201180142:
--   user đầu tiên -> 'admin', các user sau -> 'user'.
--
-- !! TRƯỚC KHI CHẠY: đặt email admin thật của bạn vào biến bên dưới. !!
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Bước 1: Khôi phục trigger về logic an toàn
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO admin_count
  FROM public.user_roles
  WHERE role = 'admin';

  -- Chỉ cấp admin khi hệ thống chưa có admin nào (bootstrap lần đầu).
  -- Mọi trường hợp còn lại đều là 'user'.
  IF admin_count = 0 THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- -----------------------------------------------------------------------------
-- Bước 2: Thu hồi admin của mọi tài khoản trừ danh sách cho phép
-- -----------------------------------------------------------------------------
-- >>> SỬA DANH SÁCH EMAIL NÀY TRƯỚC KHI CHẠY <<<
DO $$
DECLARE
  allowed_admin_emails text[] := ARRAY[
    'luongcongthuann@gmail.com'
    -- , 'email-admin-thu-hai@example.com'
  ];
  revoked_count INTEGER;
BEGIN
  -- An toàn: không xoá sạch admin nếu danh sách cho phép không khớp ai cả
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = ANY(allowed_admin_emails)
  ) THEN
    RAISE EXCEPTION
      'Không tìm thấy tài khoản nào khớp allowed_admin_emails (%). '
      'Hãy sửa danh sách email trong migration rồi chạy lại — '
      'nếu không bạn sẽ tự khoá mình khỏi trang admin.',
      allowed_admin_emails;
  END IF;

  -- Đảm bảo các email được phép đều có role admin
  INSERT INTO public.user_roles (user_id, role)
  SELECT id, 'admin'
  FROM auth.users
  WHERE email = ANY(allowed_admin_emails)
  ON CONFLICT (user_id, role) DO NOTHING;

  -- Thu hồi admin của tất cả tài khoản còn lại
  WITH deleted AS (
    DELETE FROM public.user_roles
    WHERE role = 'admin'
      AND user_id NOT IN (
        SELECT id FROM auth.users WHERE email = ANY(allowed_admin_emails)
      )
    RETURNING 1
  )
  SELECT COUNT(*) INTO revoked_count FROM deleted;

  RAISE NOTICE 'Đã thu hồi quyền admin của % tài khoản.', revoked_count;

  -- Các tài khoản vừa bị hạ quyền vẫn cần có role 'user'
  INSERT INTO public.user_roles (user_id, role)
  SELECT u.id, 'user'
  FROM auth.users u
  WHERE NOT EXISTS (
    SELECT 1 FROM public.user_roles r WHERE r.user_id = u.id
  )
  ON CONFLICT (user_id, role) DO NOTHING;
END $$;
