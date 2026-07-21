import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&q=80";

export interface TourCardData {
  slug: string | null;
  title: string;
  tagline: string | null;
  route: string | null;
  duration: string | null;
  price: string | null;
  image_url: string | null;
}

export default function TourCard({ tour }: { tour: TourCardData }) {
  if (!tour.slug) return null;

  return (
    <Link
      href={`/tour/${tour.slug}`}
      className="group block rounded-2xl overflow-hidden border border-primary/10 bg-white shadow-sm hover:shadow-xl hover:border-secondary/30 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={tour.image_url || FALLBACK_IMAGE}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {tour.price && (
          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm">
            <p className="text-primary font-bold text-sm">{tour.price}</p>
          </div>
        )}
      </div>
      <div className="p-5">
        {tour.tagline && (
          <p className="text-secondary text-xs font-bold uppercase tracking-wide mb-1">
            {tour.tagline}
          </p>
        )}
        <h3 className="font-display text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
          {tour.title}
        </h3>
        <div className="flex items-center gap-4 text-xs text-primary/60">
          {tour.route && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {tour.route}
            </span>
          )}
          {tour.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {tour.duration}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
