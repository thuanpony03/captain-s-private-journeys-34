"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface TestimonialData {
  id: string;
  customer_name: string;
  customer_image: string | null;
  rating: number | null;
  content: string;
  destination: string | null;
  tour_date: string | null;
  family_size: number | null;
  highlight: string | null;
  video_url: string | null;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&q=80";

const DESTINATION_LABEL: Record<string, string> = {
  usa: "🇺🇸 Mỹ",
  australia: "🇦🇺 Úc",
  europe: "🇪🇺 Châu Âu",
  my: "🇺🇸 Mỹ",
  uc: "🇦🇺 Úc",
  "chau-au": "🇪🇺 Châu Âu",
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "fill-secondary text-secondary" : "text-primary/20"}`}
        />
      ))}
    </div>
  );
}

export default function TestimonialGallery({ testimonials }: { testimonials: TestimonialData[] }) {
  const [active, setActive] = useState<TestimonialData | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t)}
            className="text-left rounded-2xl overflow-hidden border border-primary/10 bg-white shadow-sm hover:shadow-xl hover:border-secondary/30 transition-all duration-300"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={t.customer_image || FALLBACK_IMAGE}
                alt={t.customer_name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              {t.destination && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-xs font-bold text-primary">
                  {DESTINATION_LABEL[t.destination] || t.destination}
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="font-semibold text-primary text-sm mb-1">{t.customer_name}</p>
              {t.rating && <Stars rating={t.rating} />}
              {(t.highlight || t.content) && (
                <p className="text-primary/60 text-sm mt-2 line-clamp-2">
                  "{t.highlight || t.content}"
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl text-primary">
                  {active.customer_name}
                </DialogTitle>
              </DialogHeader>
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                <Image
                  src={active.customer_image || FALLBACK_IMAGE}
                  alt={active.customer_name}
                  fill
                  sizes="500px"
                  className="object-cover"
                />
              </div>
              {active.rating && <Stars rating={active.rating} />}
              <p className="text-primary/80 leading-relaxed mt-3 whitespace-pre-line">
                {active.content}
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-primary/50 mt-3">
                {active.destination && (
                  <span>{DESTINATION_LABEL[active.destination] || active.destination}</span>
                )}
                {active.family_size && <span>{active.family_size} người</span>}
                {active.tour_date && <span>{active.tour_date}</span>}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
