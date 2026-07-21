"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check initial session
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push("/auth");
          return;
        }

        setUser(session.user);

        // Check if user has admin role
        const { data: roles, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .single();

        if (error || !roles) {
          setIsAdmin(false);
          router.push("/");
          return;
        }

        setIsAdmin(true);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/auth");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!session) {
          setUser(null);
          setIsAdmin(false);
          router.push("/auth");
          return;
        }

        setUser(session.user);

        // Re-check admin status
        setTimeout(async () => {
          try {
            const { data: roles } = await supabase
              .from("user_roles")
              .select("role")
              .eq("user_id", session.user.id)
              .eq("role", "admin")
              .single();

            if (!roles) {
              setIsAdmin(false);
              router.push("/");
            } else {
              setIsAdmin(true);
            }
          } catch (error) {
            console.error("Role check error:", error);
          }
        }, 0);
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  return { user, isAdmin, loading };
};
