"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Car } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { trackZaloClick } from "@/lib/analytics";

const NAV_LINKS = [
  { href: "/tour", label: "Tour" },
  { href: "/chuyen-di", label: "Chuyến đi" },
  { href: "/cam-nang", label: "Cẩm nang" },
  { href: "/khach-hang", label: "Khách hàng" },
  { href: "/ve-vinh", label: "Về Vinh" },
  { href: "/lien-he", label: "Liên hệ" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-effect shadow-elegant border-b border-secondary/20 backdrop-blur-xl"
          : "bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-glow transition-transform group-hover:scale-110 ${
                isScrolled ? "shadow-secondary/50" : "shadow-secondary/30"
              }`}
            >
              <Car className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" strokeWidth={2.25} />
            </div>
            <div>
              <span className="font-display text-base sm:text-xl md:text-2xl font-black bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                VINH AROUND
              </span>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-white/70 font-medium tracking-wider hidden xs:block">
                PRIVATE TOURS
              </p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  isScrolled ? "text-primary hover:text-secondary" : "text-white/90 hover:text-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Zalo nhỏ + mobile menu trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://zalo.me/0933344646"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackZaloClick()}
              className={`text-sm font-medium px-3 py-1.5 rounded-full border transition-colors ${
                isScrolled
                  ? "border-primary/20 text-primary hover:border-secondary hover:text-secondary"
                  : "border-white/30 text-white hover:border-secondary hover:text-secondary"
              }`}
            >
              Zalo
            </a>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isScrolled ? "text-primary hover:bg-primary/10" : "text-white hover:bg-white/10"
                  }`}
                  aria-label="Mở menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle className="font-display text-primary">VINH AROUND</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 mt-6">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-3 py-3 rounded-lg text-primary font-semibold hover:bg-primary/5 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
