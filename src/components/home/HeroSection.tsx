"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, ShieldCheck, Layers, Globe, Sparkles, ArrowUpRight } from "lucide-react";
import { useConsultationModal } from "@/context/ConsultationModalContext";

const HeroCrystalCanvas = dynamic(
  () => import("@/components/3d/HeroCrystalCanvas").then((mod) => mod.HeroCrystalCanvas),
  { ssr: false }
);

interface ServiceHeroItem {
  heading: string;
  tag: string;
  shortTitle: string;
  serviceSlug: string;
  image: string;
  metricValue: string;
  metricLabel: string;
  statBadge: string;
  chips: string[];
}

const SERVICE_HERO_ITEMS: ServiceHeroItem[] = [
  {
    heading: "Build Web & Platforms That",
    tag: "WEB DEVELOPMENT",
    shortTitle: "Web Dev",
    serviceSlug: "/services/web-development",
    image: "/images/work-web.jpg",
    metricValue: "<1.0s",
    metricLabel: "Speed Standard",
    statBadge: "SUB-SECOND ARCHITECTURE",
    chips: ["Next.js 15", "React 19", "TypeScript", "Tailwind"],
  },
  {
    heading: "Scale Mobile Apps That",
    tag: "APP DEVELOPMENT",
    shortTitle: "App Dev",
    serviceSlug: "/services/app-development",
    image: "/images/work-app.jpg",
    metricValue: "60 FPS",
    metricLabel: "Native Rendering",
    statBadge: "IOS & ANDROID 60FPS",
    chips: ["Flutter", "React Native", "Swift", "Kotlin"],
  },
  {
    heading: "Scale SEO & Marketing That",
    tag: "SEO & DIGITAL MARKETING",
    shortTitle: "SEO & Ads",
    serviceSlug: "/services/seo",
    image: "/images/work-seo.jpg",
    metricValue: "Top-10",
    metricLabel: "Google Rankings",
    statBadge: "HIGH ROAS & RANKINGS",
    chips: ["Google Ads", "Meta CAPI", "GA4", "Schema.org"],
  },
  {
    heading: "Launch Creators That",
    tag: "INFLUENCER MARKETING",
    shortTitle: "Creators",
    serviceSlug: "/influencers",
    image: "/images/work-influencer.jpg",
    metricValue: "400+",
    metricLabel: "Verified Creators",
    statBadge: "TIER-1 CREATOR ROSTER",
    chips: ["Instagram Reels", "YouTube", "Direct ROAS"],
  },
];

export const HeroSection: React.FC = () => {
  const { openModal } = useConsultationModal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Automatically cycle through services every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SERVICE_HERO_ITEMS.length);
        setIsFading(false);
      }, 260);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleSelectService = (idx: number) => {
    if (idx === currentIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setIsFading(false);
    }, 200);
  };

  const activeItem = SERVICE_HERO_ITEMS[currentIndex];

  return (
    <section className="relative min-h-[100svh] lg:min-h-screen flex items-center justify-start pt-28 pb-16 overflow-hidden bg-[#071633]">
      {/* 3D Crystal Canvas Layer (Ambient 3D Depth in Background) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-35 sm:opacity-60 lg:opacity-75">
        <HeroCrystalCanvas />
      </div>

      {/* Ambient Blue Volumetric Glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[480px] lg:w-[650px] h-[480px] lg:h-[650px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Deep Navy Gradient Vignette */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#071633] via-[#071633]/80 to-transparent pointer-events-none" />

      {/* Main Hero Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl lg:max-w-3xl text-left flex flex-col items-start">
          {/* Eyebrow / Tag with Dynamic Service Tag & Indicator Pills */}
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <span
              className={`text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] uppercase transition-all duration-300 ${
                isFading ? "text-slate-500 opacity-60" : "text-slate-300 opacity-100"
              }`}
            >
              {activeItem.tag}
            </span>
            <div className="h-[2px] w-10 sm:w-12 bg-[#3b82f6] rounded-full" />

            {/* Micro Indicator Pills for the Services */}
            <div className="flex items-center gap-1.5 ml-1">
              {SERVICE_HERO_ITEMS.map((item, idx) => (
                <button
                  key={item.tag}
                  onClick={() => handleSelectService(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-5 bg-[#3b82f6]"
                      : "w-1.5 bg-white/25 hover:bg-white/50"
                  }`}
                  aria-label={`Switch to ${item.tag}`}
                />
              ))}
            </div>
          </div>

          {/* Dynamic Rotating H1 Headline */}
          <h1 className="text-white text-[clamp(28px,3.8vw,56px)] font-bold tracking-tight leading-[1.08] drop-shadow-md mb-4 sm:mb-5 min-h-[2.15em] sm:min-h-[2.2em]">
            <span
              className={`inline-block transition-all duration-300 ease-out transform ${
                isFading ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              {activeItem.heading}
            </span>
            <br />
            <span className="text-[#3b82f6] drop-shadow-[0_0_35px_rgba(59,130,246,0.35)]">
              Move Business Forward.
            </span>
          </h1>

          {/* Paragraph / Subtitle */}
          <p className="text-[15.5px] sm:text-[17.5px] text-slate-200 max-w-xl font-normal leading-relaxed mb-6 sm:mb-8">
            Web & app development, digital marketing & SEO, and verified influencer marketing — designed to turn attention into measurable growth.
          </p>

          {/* Interactive Service Switcher Pills - All 4 pills fit seamlessly on mobile without clipping */}
          <div className="w-full grid grid-cols-4 sm:flex sm:w-auto sm:items-center gap-1 sm:gap-2 mb-6 sm:mb-8 py-1">
            <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-wider text-white/50 font-bold mr-1 shrink-0 whitespace-nowrap">
              Explore:
            </span>
            {SERVICE_HERO_ITEMS.map((item, idx) => (
              <button
                key={item.tag}
                onClick={() => handleSelectService(idx)}
                className={`text-[10px] sm:text-xs font-semibold px-1 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap text-center ${
                  idx === currentIndex
                    ? "bg-white text-[#071633] font-bold shadow-md"
                    : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/15"
                }`}
              >
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                <span>{item.shortTitle}</span>
              </button>
            ))}
          </div>

          {/* CTA Buttons - Side-by-Side In One Line on Both Mobile & Desktop */}
          <div className="flex flex-row items-center gap-2.5 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-12">
            <button
              onClick={() => openModal()}
              data-consultation-modal
              className="flex-1 sm:flex-initial h-[46px] sm:h-[54px] px-3.5 sm:px-8 rounded-full bg-white text-[#071633] font-bold text-xs sm:text-sm tracking-wide shadow-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            </button>

            <Link
              href={activeItem.serviceSlug}
              className="flex-1 sm:flex-initial h-[46px] sm:h-[54px] px-3.5 sm:px-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold tracking-wide hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>
                <span className="hidden sm:inline">Explore </span>
                {activeItem.shortTitle}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 shrink-0" />
            </Link>
          </div>

          {/* Bottom 3-Metric Stats Bar */}
          <div className="w-full flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 pt-6 border-t border-white/10 text-white/80">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#3b82f6] shrink-0" />
              <span className="text-xs sm:text-[13px] font-medium tracking-wide text-slate-200">
                14+ Years of Design Thinking
              </span>
            </div>

            <span className="text-white/20 hidden sm:inline select-none">|</span>

            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-[#3b82f6] shrink-0" />
              <span className="text-xs sm:text-[13px] font-medium tracking-wide text-slate-200">
                3 Core Growth Services
              </span>
            </div>

            <span className="text-white/20 hidden sm:inline select-none">|</span>

            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#3b82f6] shrink-0" />
              <span className="text-xs sm:text-[13px] font-medium tracking-wide text-slate-200">
                Bangalore • Global Reach
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
