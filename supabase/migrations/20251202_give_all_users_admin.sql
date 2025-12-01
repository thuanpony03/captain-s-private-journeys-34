-- Give all existing users admin role
INSERT INTO user_roles (user_id, role)
SELECT 
    id as user_id,
    'admin' as role
FROM auth.users 
WHERE id NOT IN (
    SELECT user_id 
    FROM user_roles 
    WHERE role = 'admin'
)
ON CONFLICT (user_id, role) DO NOTHING;

-- Create a function to automatically give admin role to new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically assign admin role to new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();