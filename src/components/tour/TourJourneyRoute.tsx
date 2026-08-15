import { MapPin } from "lucide-react";

/**
 * Dải hành trình dạng bản đồ điểm dừng — cho cảm giác "đang lên kế hoạch một
 * chuyến đi thật" ngay khi lướt qua, thay vì chỉ đọc chữ. Dữ liệu lấy từ
 * tour.stops (đã có sẵn, đúng thứ tự chặng).
 */
export default function TourJourneyRoute({ stops }: { stops: string[] }) {
  if (stops.length < 2) return null;

  return (
    <section className="relative bg-primary py-10 md:py-12 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex items-center gap-2 justify-center mb-7">
          <MapPin className="w-4 h-4 text-secondary" />
          <p className="text-secondary text-xs font-bold uppercase tracking-[0.2em]">
            Hành trình {stops.length} chặng
          </p>
        </div>
        <div className="flex items-start overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-start mx-auto px-2">
            {stops.map((stop, i) => (
              <div key={i} className="flex items-start flex-shrink-0">
                <div className="flex flex-col items-center w-[92px] md:w-[112px]">
                  <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full bg-secondary text-primary font-display font-bold flex items-center justify-center text-sm md:text-base shadow-lg shadow-black/20 ring-4 ring-primary flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-white text-[11px] md:text-xs font-semibold text-center mt-2.5 leading-tight px-0.5">
                    {stop}
                  </p>
                </div>
                {i < stops.length - 1 && (
                  <div
                    className="h-px w-6 md:w-10 bg-gradient-to-r from-secondary/70 via-secondary/40 to-secondary/70 mt-5 md:mt-[22px] flex-shrink-0"
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
