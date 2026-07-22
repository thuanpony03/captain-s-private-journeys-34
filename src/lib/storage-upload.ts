import { supabase } from "@/integrations/supabase/client";

/** Upload lên bucket "images" (public, admin-only write — xem supabase/migrations/20251201170100_setup_storage.sql). */
export async function uploadToImagesBucket(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("images").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("images").getPublicUrl(path);
  return data.publicUrl;
}
