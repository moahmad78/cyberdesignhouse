"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { SERVICES } from "@/data/siteData";
import { ChevronDown, Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If we are on subpages (e.g. /services/*, /contact, /privacy-policy), always use light header
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 160 && currentScrollY > lastScrollY && !mobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Is dark mode active for the header (only on Home page when not scrolled)
  const isDarkHeader = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled || !isHomePage
            ? "bg-white/95 backdrop-blur-md border-b border-[#e5eaf2] shadow-sm py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with dynamic theme */}
          <Logo
            size="md"
            theme={isDarkHeader ? "dark" : "light"}
          />

          {/* Desktop Navigation (Uppercase Links - PRD 5.2) */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                isDarkHeader
                  ? "text-white font-bold"
                  : pathname === "/"
                  ? "text-[#071633] font-bold"
                  : "text-[#45556c] hover:text-[#071633]"
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors py-1 ${
                  isDarkHeader
                    ? "text-slate-300 hover:text-white"
                    : pathname.startsWith("/services")
                    ? "text-[#071633] font-bold"
                    : "text-[#45556c] hover:text-[#071633]"
                }`}
                onClick={() => setServicesOpen(!servicesOpen)}
                aria-expanded={servicesOpen}
              >
                Services
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                  servicesOpen
                    ? "opacity-100 visible translate-y-0 pointer-events-auto"
                    : "opacity-0 invisible translate-y-2 pointer-events-none"
                }`}
              >
                <div className="w-80 rounded-2xl bg-white p-3 border border-[#e5eaf2] shadow-xl">
                  <div className="text-[11px] uppercase font-mono tracking-wider text-[#6e7d9b] px-3 py-1.5 border-b border-slate-100 font-semibold">
                    Capabilities
                  </div>
                  <div className="mt-1 space-y-1">
                    {SERVICES.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f8fafc] transition-all"
                      >
                        <span className="text-xs font-mono text-[#071633] mt-0.5 font-bold">
                          {service.number}
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-[#071633] group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                            {service.title}
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
                          </div>
                          <p className="text-[11px] text-[#62748e] line-clamp-1 mt-0.5">
                            {service.oneLine}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Influencers Network */}
            <Link
              href="/influencers"
              className={`text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                isDarkHeader
                  ? "text-slate-300 hover:text-white"
                  : pathname === "/influencers"
                  ? "text-[#071633] font-bold"
                  : "text-[#45556c] hover:text-[#071633]"
              }`}
            >
              Influencers
            </Link>

            {/* VoometDesign Luxury Interiors Portal Link */}
            <a
              href="https://voometdesign.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-semibold uppercase tracking-[0.15em] transition-colors flex items-center gap-1 px-2.5 py-1 rounded-full border ${
                isDarkHeader
                  ? "border-white/20 text-slate-200 hover:text-white hover:border-white/40 bg-white/5"
                  : "border-[#e5eaf2] text-[#314158] hover:text-[#071633] hover:border-slate-300 bg-slate-50/70"
              }`}
              title="VoometDesign Luxury Interior Architecture"
            >
              <span>Voomet Interiors</span>
              <ArrowUpRight className="w-3 h-3 opacity-70" />
            </a>

            <Link
              href="/contact"
              className={`text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                isDarkHeader
                  ? "text-slate-300 hover:text-white"
                  : pathname === "/contact"
                  ? "text-[#071633] font-bold"
                  : "text-[#45556c] hover:text-[#071633]"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Navy Book Consultation Pill Button (PRD 3.6 & 5.2) */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                isDarkHeader
                  ? "bg-white text-[#071633] hover:bg-slate-100 shadow-md"
                  : "bg-[#071633] text-white hover:bg-[#0f172a] shadow-sm hover:shadow-md"
              }`}
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              isDarkHeader
                ? "text-white bg-slate-800/60"
                : "text-[#071633] bg-slate-100"
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-white transition-all duration-400 md:hidden flex flex-col justify-between p-6 pt-24 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="space-y-6">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-2xl font-bold text-[#071633] py-2 border-b border-slate-100"
            >
              Home
            </Link>
            <div className="py-2 border-b border-slate-100">
              <span className="text-xs font-mono uppercase tracking-widest text-[#6e7d9b] block mb-3">
                Services
              </span>
              <div className="grid grid-cols-1 gap-2.5 pl-2">
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-base font-medium text-[#314158] hover:text-[#071633] py-1"
                  >
                    <span>{s.title}</span>
                    <span className="text-xs font-mono text-[#6e7d9b]">{s.number}</span>
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/influencers"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-2xl font-bold text-[#071633] py-2 border-b border-slate-100"
            >
              <span>Influencers</span>
              <span className="text-xs font-mono font-normal text-blue-600 px-2.5 py-0.5 rounded-full bg-blue-50">
                Reels Network
              </span>
            </Link>
            <a
              href="https://voometdesign.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-2xl font-bold text-[#071633] py-2 border-b border-slate-100"
            >
              <span>Voomet Interiors</span>
              <span className="text-xs font-mono font-normal text-slate-500 flex items-center gap-1">
                voometdesign.com <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-2xl font-bold text-[#071633] py-2 border-b border-slate-100"
            >
              Contact
            </Link>
          </div>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#071633] text-white font-semibold text-xs uppercase tracking-wider shadow-md"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-100 text-xs text-[#6e7d9b]">
          Cyber Design House · Bangalore Studio
        </div>
      </div>
    </>
  );
};
