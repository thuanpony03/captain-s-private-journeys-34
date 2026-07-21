import { Users, ShieldCheck, Clock3 } from "lucide-react";

const ITEMS = [
  { icon: Users, text: "100+ gia đình đã đi" },
  { icon: Clock3, text: "10+ năm kinh nghiệm dẫn đoàn" },
  { icon: ShieldCheck, text: "Private 100% · Không shopping stop" },
];

export default function TrustBar() {
  return (
    <div className="bg-primary py-3 md:py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {ITEMS.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-white/90">
              <item.icon className="w-4 h-4 text-secondary flex-shrink-0" />
              <span className="text-xs md:text-sm font-semibold whitespace-nowrap">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
