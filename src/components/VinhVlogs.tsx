import { useState } from "react";
import { Card } from "@/components/ui/card";
import { trackVideoPlay, trackEvent } from "@/lib/analytics";

const VinhVlogs = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const handleVideoClick = (vlog: any) => {
    if (activeVideo === vlog.id) {
      setActiveVideo(null);
    } else {
      setActiveVideo(vlog.id);
      trackVideoPlay(vlog.title);
      trackEvent("engagement", "Video", vlog.topic);
    }
  };

  const vlogs = [
    {
      id: 1,
      title: "Sự KHÁC BIỆT của dịch vụ du lịch cao cấp",
      thumbnail:
        "https://res.cloudinary.com/dvu2csvsg/image/upload/v1764653894/7c62cba1-849e-4f8b-bc0f-b0f87d966106_pd2nt4.jpg",
      duration: "0:46",
      views: "12K",
      topic: "Kinh nghiệm",
      videoUrl: "https://youtube.com/embed/YcDhNx2SHyE?feature=share", // Replace with actual video
      description: "Điều kiện cần và đủ của dịch vụ du lịch cao cấp",
    },
    {
      id: 2,
      title: "Văn hóa tip ở Mỹ",
      thumbnail:
        "https://res.cloudinary.com/dvu2csvsg/image/upload/v1764653895/2e3bd91d-fc9f-4e58-99c5-c1a9e6ed1180_xqfcgn.jpg",
      duration: "0:20",
      views: "18K",
      topic: "Kinh nghiệm",
      videoUrl: "https://youtube.com/embed/ibsTKAaCrF8",
      description: "Vinh chia sẻ về văn hóa tip ở Mỹ cho mọi người",
    },
    {
      id: 3,
      title: "3h sáng ở New York",
      thumbnail: "https://res.cloudinary.com/dvu2csvsg/image/upload/v1764653895/d9ed134d440dcb53921c_cucs4d.jpg",
      duration: "0:31",
      views: "25K",
      topic: "Vlog",
      videoUrl: "https://www.youtube.com/embed/wEmQ40jV8ss",
      description: "3h sáng ở New York bị lệch múi giờ",
    },
    {
      id: 4,
      title: "Tips Chuẩn Bị Hành Lý",
      thumbnail: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=700&fit=crop",
      duration: "2:30",
      views: "9K",
      topic: "Tips",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Checklist cho chuyến đi dài ngày",
    },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white via-[#f8f9fa] to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-secondary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-white shadow-lg border border-secondary/10">
            <span className="text-2xl">🎬</span>
            <span className="text-primary font-bold text-sm uppercase tracking-wider">Vinh's Vlogs</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-primary">
            Kinh Nghiệm & Quan Điểm
            <span className="block bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent mt-2">
              Từ Captain Vinh
            </span>
          </h2>

          <p className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto font-medium">
            Những chia sẻ thực tế từ hàng trăm chuyến đi - Ngắn gọn, dễ hiểu, hữu ích
          </p>
        </div>

        {/* Video Grid - Mobile First Design */}
        <div className="max-w-7xl mx-auto">
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory scroll-smooth hide-scrollbar">
            <div className="flex gap-4 min-w-max">
              {vlogs.map((vlog) => (
                <div
                  key={vlog.id}
                  className="w-[280px] flex-shrink-0 snap-center"
                  onClick={() => handleVideoClick(vlog)}
                >
                  <Card className="overflow-hidden border-2 border-primary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-xl cursor-pointer bg-white">
                    {/* 9:16 Video Container */}
                    <div className="relative aspect-[9/16] overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
                      {activeVideo === vlog.id ? (
                        <iframe
                          src={vlog.videoUrl}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <>
                          <img
                            src={vlog.thumbnail}
                            alt={vlog.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                          {/* Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                              <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                              </svg>
                            </div>
                          </div>

                          {/* Duration Badge */}
                          <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm">
                            <p className="text-white text-xs font-bold">{vlog.duration}</p>
                          </div>

                          {/* Topic Badge */}
                          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-secondary/90 backdrop-blur-sm">
                            <p className="text-white text-xs font-bold uppercase">{vlog.topic}</p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-display text-lg font-bold text-primary mb-2 line-clamp-2">{vlog.title}</h3>
                      <p className="text-sm text-primary/60 mb-3 line-clamp-2">{vlog.description}</p>
                      <div className="flex items-center gap-3 text-xs text-primary/50">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          {vlog.views}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop/Tablet: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vlogs.map((vlog) => (
              <div key={vlog.id} className="group cursor-pointer" onClick={() => handleVideoClick(vlog)}>
                <Card className="overflow-hidden border-2 border-primary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-white">
                  {/* 9:16 Video Container */}
                  <div className="relative aspect-[9/16] overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
                    {activeVideo === vlog.id ? (
                      <iframe
                        src={vlog.videoUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <>
                        <img
                          src={vlog.thumbnail}
                          alt={vlog.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                            <svg className="w-10 h-10 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute top-4 right-4 px-3 py-2 rounded-full bg-black/70 backdrop-blur-sm">
                          <p className="text-white text-sm font-bold">{vlog.duration}</p>
                        </div>

                        {/* Topic Badge */}
                        <div className="absolute top-4 left-4 px-3 py-2 rounded-full bg-secondary/90 backdrop-blur-sm">
                          <p className="text-white text-xs font-bold uppercase tracking-wide">{vlog.topic}</p>
                        </div>

                        {/* Bottom Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="font-display text-xl font-bold text-white mb-2 drop-shadow-lg">
                            {vlog.title}
                          </h3>
                          <p className="text-sm text-white/90 mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {vlog.description}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-white/80">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              {vlog.views} views
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Scroll indicator - mobile */}
          <div className="md:hidden flex items-center justify-center gap-2 mt-6">
            <div className="text-xs text-primary/60 font-medium flex items-center gap-2">
              <span>Vuốt để xem thêm</span>
              <span className="text-base animate-pulse">👉</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-block bg-white p-6 md:p-8 rounded-2xl shadow-xl border-2 border-secondary/10 hover:border-secondary/30 transition-all duration-300">
            <p className="text-xl md:text-2xl font-display font-black mb-2">
              <span className="text-primary">Muốn biết thêm? </span>
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Follow Vinh!
              </span>
            </p>
            <p className="text-sm md:text-base text-primary/60 mb-4">
              Cập nhật video mới mỗi tuần trên YouTube & TikTok
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YouTube
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black hover:bg-gray-900 text-white font-bold text-sm transition-all hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VinhVlogs;
