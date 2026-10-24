"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Globe,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import { useConsultationModal } from "@/context/ConsultationModalContext";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { openModal } = useConsultationModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

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

  // Lock body scroll when mobile sidebar drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Is dark mode active for the header (only on Home page when not scrolled)
  const isDarkHeader = isHomePage && !isScrolled;

  const CORE_SERVICES_NAV = [
    {
      title: "Web Development",
      desc: "Business websites, custom SaaS portals & e-commerce",
      href: "/services/web-development",
      icon: Globe,
    },
    {
      title: "Mobile App Development",
      desc: "Native iOS, Android & Flutter / React Native",
      href: "/services/app-development",
      icon: Smartphone,
    },
    {
      title: "SEO & Digital Marketing",
      desc: "Google rankings, PPC ad funnels & conversion scale",
      href: "/services/seo",
      icon: TrendingUp,
    },
  ];

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
          {/* Logo with dynamic theme */}
          <Logo size="md" theme={isDarkHeader ? "dark" : "light"} />

          {/* Desktop Navigation */}
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
                className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors py-1 cursor-pointer ${
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

              {/* Clean Sleek Popover Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2.5 transition-all duration-200 z-50 ${
                  servicesOpen
                    ? "opacity-100 visible translate-y-0 pointer-events-auto"
                    : "opacity-0 invisible translate-y-2 pointer-events-none"
                }`}
              >
                <div className="w-[340px] rounded-2xl bg-white p-3 border border-[#e5eaf2] shadow-2xl">
                  <div className="text-[10.5px] uppercase font-mono tracking-wider text-[#6e7d9b] px-3 py-1.5 border-b border-slate-100 font-bold flex items-center justify-between">
                    <span>Our Practice Areas</span>
                    <span className="text-[10px] bg-slate-100 text-[#071633] px-2 py-0.5 rounded-full font-mono">
                      03
                    </span>
                  </div>
                  <div className="mt-1.5 space-y-1">
                    {CORE_SERVICES_NAV.map((s) => {
                      const Icon = s.icon;
                      const isActive = pathname === s.href;
                      return (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setServicesOpen(false)}
                          className={`group flex items-start gap-3 p-3 rounded-xl transition-all ${
                            isActive
                              ? "bg-[#071633] text-white"
                              : "hover:bg-[#f8fafc] text-[#071633]"
                          }`}
                        >
                          <span
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 mt-0.5 ${
                              isActive
                                ? "bg-white/10 text-white"
                                : "bg-slate-100 text-[#071633] group-hover:bg-[#071633] group-hover:text-white"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`text-xs font-bold transition-colors flex items-center justify-between ${
                                isActive ? "text-white" : "text-[#071633] group-hover:text-[#0c2452]"
                              }`}
                            >
                              <span>{s.title}</span>
                              <ArrowRight
                                className={`w-3.5 h-3.5 transition-all ${
                                  isActive
                                    ? "opacity-100 text-white"
                                    : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#071633]"
                                }`}
                              />
                            </div>
                            <p
                              className={`text-[11px] line-clamp-1 mt-0.5 ${
                                isActive ? "text-slate-300" : "text-[#62748e]"
                              }`}
                            >
                              {s.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 px-3 py-1 flex items-center justify-between">
                    <span className="text-[11px] text-[#62748e]">Need turnkey execution?</span>
                    <button
                      onClick={() => {
                        setServicesOpen(false);
                        openModal();
                      }}
                      className="text-[11px] font-bold text-[#071633] hover:underline cursor-pointer"
                    >
                      Book Consultation →
                    </button>
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

          {/* Navy Book Consultation Pill Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => openModal()}
              data-consultation-modal
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                isDarkHeader
                  ? "bg-white text-[#071633] hover:bg-slate-100 shadow-md"
                  : "bg-[#071633] text-white hover:bg-[#0f172a] shadow-sm hover:shadow-md"
              }`}
            >
              Book Consultation
            </button>
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

      {/* Mobile Drawer Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-[#071633]/60 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Side Drawer (Slides in from the right) */}
      <aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className={`fixed top-0 right-0 bottom-0 z-50 w-[84vw] max-w-[340px] sm:max-w-[360px] bg-white border-l border-[#e5eaf2] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden flex flex-col justify-between ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header with Brand Logo & Close Button */}
        <div className="p-4 sm:p-5 border-b border-[#e5eaf2] flex items-center justify-between bg-[#fafaf8]">
          <Logo size="sm" theme="light" />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-9 h-9 rounded-xl bg-white border border-[#e5eaf2] text-[#071633] flex items-center justify-center hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
            aria-label="Close Navigation Menu"
          >
            <X className="w-5 h-5 text-[#071633]" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-2">
          {/* Home Link */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              pathname === "/"
                ? "bg-[#071633] text-white"
                : "text-[#071633] hover:bg-slate-100"
            }`}
          >
            <span>Home</span>
            {pathname === "/" && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            )}
          </Link>

          {/* Services Accordion */}
          <div className="rounded-xl border border-[#e5eaf2] bg-[#f8fafc] overflow-hidden">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#071633] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span>Services</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-[#e5eaf2] text-[#6e7d9b]">
                  03
                </span>
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#071633] transition-transform duration-200 ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileServicesOpen && (
              <div className="p-2 pt-0 space-y-1 bg-white border-t border-[#e5eaf2]">
                {CORE_SERVICES_NAV.map((s) => {
                  const Icon = s.icon;
                  const isActive = pathname === s.href;
                  return (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-start gap-2.5 p-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#071633] text-white"
                          : "hover:bg-[#f8fafc] text-[#314158]"
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "bg-slate-100 text-[#071633]"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-xs font-bold leading-tight ${
                            isActive ? "text-white" : "text-[#071633]"
                          }`}
                        >
                          {s.title}
                        </div>
                        <p
                          className={`text-[10.5px] line-clamp-1 mt-0.5 ${
                            isActive ? "text-slate-300" : "text-[#62748e]"
                          }`}
                        >
                          {s.desc}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Influencers Link */}
          <Link
            href="/influencers"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              pathname === "/influencers"
                ? "bg-[#071633] text-white"
                : "text-[#071633] hover:bg-slate-100"
            }`}
          >
            <span>Influencers</span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                pathname === "/influencers"
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-[#071633] border border-[#e5eaf2]"
              }`}
            >
              Reels Network
            </span>
          </Link>

          {/* Voomet Interiors Portal Link */}
          <a
            href="https://voometdesign.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#071633] hover:bg-slate-100 transition-colors"
          >
            <span>Voomet Interiors</span>
            <span className="text-[10.5px] font-mono text-slate-500 flex items-center gap-1">
              voometdesign.com <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* Contact Link */}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              pathname === "/contact"
                ? "bg-[#071633] text-white"
                : "text-[#071633] hover:bg-slate-100"
            }`}
          >
            <span>Contact</span>
            {pathname === "/contact" && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            )}
          </Link>
        </div>

        {/* Drawer Bottom Action & Footer */}
        <div className="p-4 sm:p-5 border-t border-[#e5eaf2] bg-[#fafaf8] space-y-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openModal();
            }}
            data-consultation-modal
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#071633] text-white font-semibold text-xs uppercase tracking-wider shadow-sm hover:bg-[#0c2452] transition-colors cursor-pointer"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#6e7d9b] pt-1">
            <span>Bangalore Studio</span>
            <span>VoometDesign IT</span>
          </div>
        </div>
      </aside>
    </>
  );
};
