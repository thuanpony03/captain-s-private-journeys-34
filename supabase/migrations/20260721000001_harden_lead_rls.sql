-- =============================================================================
-- SECURITY FIX 2/2 — Siết RLS cho lead_submissions
-- =============================================================================
-- Bối cảnh: migration 20251202_fix_lead_rls_policies.sql thêm 4 policy dạng
--   TO authenticated USING (true)
-- lên trên bộ policy admin-only đã có sẵn từ 20251201175504.
--
-- Trong Postgres, nhiều PERMISSIVE policy được OR với nhau, nên policy
-- USING(true) nới lỏng vô hiệu hoá hoàn toàn kiểm tra has_role() bên dưới:
-- mọi tài khoản đã đăng nhập đều đọc/sửa/xoá được TOÀN BỘ lead khách hàng.
--
-- Migration này gỡ các policy quá rộng nhưng GIỮ LẠI quyền insert cho anon —
-- form thu lead ở trang chủ cần nó (đó là lý do migration 02/12 ra đời).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Bước 1: Gỡ các policy quá rộng
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow authenticated read on lead_submissions"   ON public.lead_submissions;
DROP POLICY IF EXISTS "Allow authenticated update on lead_submissions" ON public.lead_submissions;
DROP POLICY IF EXISTS "Allow authenticated delete on lead_submissions" ON public.lead_submissions;
DROP POLICY IF EXISTS "Allow public insert on lead_submissions"        ON public.lead_submissions;

-- -----------------------------------------------------------------------------
-- Bước 2: Chỉ cho phép GỬI lead (không đọc lại được)
-- -----------------------------------------------------------------------------
-- Khách vãng lai được submit form, nhưng không có policy SELECT nào cho anon
-- nên họ không thể đọc lại bất kỳ lead nào — kể cả lead của chính mình.
CREATE POLICY "Anyone can submit a lead"
ON public.lead_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- Bước 3: Tái lập policy admin-only (idempotent)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Admins can view all leads"   ON public.lead_submissions;
DROP POLICY IF EXISTS "Admins can update leads"     ON public.lead_submissions;
DROP POLICY IF EXISTS "Admins can delete leads"     ON public.lead_submissions;
DROP POLICY IF EXISTS "Admins can insert leads"     ON public.lead_submissions;

CREATE POLICY "Admins can view all leads"
ON public.lead_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads"
ON public.lead_submissions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads"
ON public.lead_submissions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Service role (edge function send-lead-notification) bỏ qua RLS,
-- nhưng khai báo tường minh cho rõ ý định.
DROP POLICY IF EXISTS "Service role can insert leads" ON public.lead_submissions;
CREATE POLICY "Service role full access to leads"
ON public.lead_submissions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- Bước 4: Chặn user thường tự nâng quyền qua bảng user_roles
-- -----------------------------------------------------------------------------
-- Nếu user thường ghi được vào user_roles thì mọi thứ ở trên đều vô nghĩa.
DROP POLICY IF EXISTS "Users can view own roles"     ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles"  ON public.user_roles;

CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Không có policy INSERT/UPDATE/DELETE nào cho user thường:
-- việc gán role chỉ diễn ra qua trigger handle_new_user() (SECURITY DEFINER)
-- hoặc do admin thao tác.
