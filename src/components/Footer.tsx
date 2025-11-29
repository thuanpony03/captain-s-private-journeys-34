const Footer = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <footer className="relative overflow-hidden">
      {/* Hero-style CTA Section with Background Image */}
      <div className="relative py-20 md:py-28 lg:py-32">
        {/* Background Image - Premium beach/travel scene */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
            alt="Travel destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/60 to-primary/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">Bắt đầu hành trình</span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Sẵn sàng cho chuyến đi
              <span className="block text-secondary">đáng nhớ nhất?</span>
            </h2>

            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Hãy để Vinh Around đồng hành cùng gia đình bạn trên mọi cung đường
            </p>

            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary to-accent font-bold text-lg px-10 py-5 rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-secondary/30 text-white"
            >
              Đặt lịch tư vấn ngay
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content - Soft neutral background */}
      <div className="bg-gradient-to-b from-[#2c3e3a] via-[#324440] to-[#2c3e3a] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-12">
              {/* Brand Column */}
              <div className="lg:col-span-1 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center border border-secondary/30">
                    <span className="text-secondary font-bold text-xl">VA</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">Vinh Around</h3>
                    <p className="text-white/60 text-xs">by Passport Lounge</p>
                  </div>
                </div>

                <p className="text-white/70 text-sm leading-relaxed">
                  Private Tour cao cấp cho gia đình Việt. Trải nghiệm
                  <span className="text-secondary font-semibold"> "Du thuyền trên mặt đất"</span> cùng Vinh.
                </p>

                <div className="flex items-center gap-2 text-xs text-white/50 italic">
                  <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Travel with Passion, Serve with Heart
                </div>
              </div>

              {/* Destinations */}
              <div className="space-y-5">
                <h4 className="font-display text-lg font-bold text-secondary">Điểm đến</h4>
                <ul className="space-y-3">
                  {[
                    "USA - West Coast",
                    "Australia - Great Ocean Road",
                    "Europe - Châu Âu",
                    "Canada - Rocky Mountains",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-white/70 text-sm hover:text-secondary transition-colors cursor-pointer group"
                    >
                      <svg
                        className="w-4 h-4 text-secondary/50 group-hover:text-secondary transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="space-y-5">
                <h4 className="font-display text-lg font-bold text-secondary">Liên hệ</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs mb-0.5">Hotline 24/7</p>
                      <p className="text-white font-semibold text-sm">0933344646</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs mb-0.5">Email</p>
                      <p className="text-white font-semibold text-sm">admin@passport.cafe</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs mb-0.5">Văn phòng</p>
                      <p className="text-white font-semibold text-sm">
                        192 Trần Quang Khải, Phường Tân Định, Quận 1, TP Hồ Chí Minh.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Social & Legal */}
              <div className="space-y-5">
                <h4 className="font-display text-lg font-bold text-secondary">Kết nối</h4>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-secondary transition-all group border border-white/10"
                    aria-label="Facebook"
                  >
                    <svg
                      className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-secondary transition-all group border border-white/10"
                    aria-label="YouTube"
                  >
                    <svg
                      className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-secondary transition-all group border border-white/10"
                    aria-label="Zalo"
                  >
                    <span className="text-white/70 group-hover:text-primary font-bold text-sm transition-colors">
                      Zalo
                    </span>
                  </a>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
                  <p className="text-white/60 text-xs">
                    <span className="text-secondary font-semibold">MST:</span> 0314702049
                  </p>
                  {/* <p className="text-white/60 text-xs">
                    <span className="text-secondary font-semibold">GP LHQT:</span> 79-xxx/2024/TCDL
                  </p> */}
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-white/50 text-xs text-center md:text-left">
                  © 2024 Passport Lounge. All rights reserved.
                </p>
                <div className="flex items-center gap-6 text-xs text-white/50">
                  <a href="#" className="hover:text-secondary transition-colors">
                    Điều khoản
                  </a>
                  <a href="#" className="hover:text-secondary transition-colors">
                    Chính sách
                  </a>
                  <a href="#" className="hover:text-secondary transition-colors">
                    FAQ
                  </a>
                </div>
                <p className="text-secondary/80 font-medium text-xs text-center md:text-right italic">
                  Operated by Vinh Around & Team
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
