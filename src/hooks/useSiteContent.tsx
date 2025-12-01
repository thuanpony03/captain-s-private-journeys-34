import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ContentItem {
  id: string;
  section: string;
  key: string;
  value: string;
  type: string;
}

export const useSiteContent = (section?: string) => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        let query = supabase.from('site_content').select('*');
        
        if (section) {
          query = query.eq('section', section);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        // Convert array to key-value object
        const contentMap: Record<string, string> = {};
        data?.forEach((item: ContentItem) => {
          contentMap[item.key] = item.value;
        });

        setContent(contentMap);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching site content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('site-content-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_content',
          ...(section && { filter: `section=eq.${section}` })
        },
        () => {
          fetchContent();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [section]);

  return { content, loading, error };
};

export const useSiteMedia = (section?: string) => {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        let query = supabase
          .from('site_media')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });
        
        if (section) {
          query = query.eq('section', section);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        setMedia(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching site media:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('site-media-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_media',
          ...(section && { filter: `section=eq.${section}` })
        },
        () => {
          fetchMedia();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [section]);

  return { media, loading, error };
};

export const useTourPackages = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('tour_packages')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (fetchError) throw fetchError;

        setTours(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching tour packages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('tour-packages-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tour_packages'
        },
        () => {
          fetchTours();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { tours, loading, error };
};
