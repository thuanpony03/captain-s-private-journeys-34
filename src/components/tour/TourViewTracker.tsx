"use client";

import { useEffect } from "react";
import { trackTourView } from "@/lib/analytics";

export default function TourViewTracker({ tourName }: { tourName: string }) {
  useEffect(() => {
    trackTourView(tourName);
  }, [tourName]);

  return null;
}
