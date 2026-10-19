"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { SERVICES } from "@/data/siteData";
import { ChevronDown, Menu, X, ArrowRight, Sparkles, Phone } from "lucide-react";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, reveal on scroll up
      if (currentScrollY > 180 && currentScrollY > lastScrollY && !mobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-[#0f172a]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-sky-400 ${
                pathname === "/" ? "text-sky-400 font-semibold" : "text-slate-300"
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
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-sky-400 py-1 ${
                  pathname.startsWith("/services") ? "text-sky-400 font-semibold" : "text-slate-300"
                }`}
                onClick={() => setServicesOpen(!servicesOpen)}
                aria-expanded={servicesOpen}
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180 text-sky-400" : "text-slate-400"
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
                <div className="w-80 rounded-2xl glass-panel p-3 border border-sky-400/20 shadow-2xl shadow-sky-950/50 backdrop-blur-xl bg-[#0f172a]/95">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 px-3 py-1.5 border-b border-white/10 flex items-center justify-between">
                    <span>Engineering & Growth</span>
                    <Sparkles className="w-3 h-3 text-sky-400" />
                  </div>
                  <div className="mt-1 space-y-1">
                    {SERVICES.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-all border border-transparent hover:border-sky-400/30"
                      >
                        <span className="text-xs font-mono text-sky-400 mt-0.5 font-bold">
                          {service.number}
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                            {service.title}
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sky-400" />
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {service.oneLine}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-sky-400 ${
                pathname === "/contact" ? "text-sky-400 font-semibold" : "text-slate-300"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 rounded-xl overflow-hidden group border border-sky-400/40 hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/60 border border-white/10 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-sky-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu (Section 5.2) */}
      <div
        className={`fixed inset-0 z-30 bg-[#090d16]/98 backdrop-blur-2xl transition-all duration-500 md:hidden flex flex-col justify-between p-6 pt-24 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="space-y-6">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-2xl font-bold text-white hover:text-sky-400 transition-colors py-2 border-b border-white/5"
            >
              Home
            </Link>
            <div className="py-2 border-b border-white/5">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-3">
                Services
              </span>
              <div className="grid grid-cols-1 gap-2.5 pl-2">
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-base font-medium text-slate-200 hover:text-sky-300 py-1"
                  >
                    <span>{s.title}</span>
                    <span className="text-xs font-mono text-slate-500">{s.number}</span>
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-2xl font-bold text-white hover:text-sky-400 transition-colors py-2 border-b border-white/5"
            >
              Contact
            </Link>
          </div>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-sm uppercase tracking-wider shadow-lg shadow-sky-500/25"
          >
            <span>Get a Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu footer with phone & VoometDesign heritage */}
        <div className="pt-6 border-t border-white/10 text-xs text-slate-400 space-y-2">
          <a
            href="tel:+919845014279"
            className="flex items-center gap-2 text-sky-400 font-mono"
          >
            <Phone className="w-4 h-4" />
            +91 98450 14279
          </a>
          <p className="text-[11px] text-slate-500">
            A VoometDesign company · Established 2010 · Bangalore, India
          </p>
        </div>
      </div>
    </>
  );
};
