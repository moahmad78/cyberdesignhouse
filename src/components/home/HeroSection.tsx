"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

const HeroCrystalCanvas = dynamic(
  () => import("@/components/3d/HeroCrystalCanvas").then((mod) => mod.HeroCrystalCanvas),
  { ssr: false }
);

export const HeroSection: React.FC = () => {
  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("services-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100svh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#071633]">
      {/* 3D Crystal Background Layer (Section 3.5 & 7 Hero) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroCrystalCanvas />
      </div>

      {/* Deep Navy Hero Overlay vignette */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#071633]/60 via-[#071633]/40 to-[#071633] pointer-events-none" />

      {/* Main Hero Content (SEO-Friendly Real HTML matching VoometDesign Hero styling) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
        {/* Caption */}
        <span className="text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.25em] text-[#94a3b8] font-bold mb-4 sm:mb-6 block">
          A VOOMETDESIGN COMPANY · BANGALORE
        </span>

        {/* Display / H1 */}
        <h1 className="text-white text-[clamp(36px,5vw,74px)] font-bold tracking-tight leading-[1.04] drop-shadow-lg mb-3 sm:mb-4 max-w-4xl">
          Designing Digital Products <br />
          <span className="text-white">That Move Your Business Forward.</span>
        </h1>

        {/* Italicized Subtitle matching VoometDesign */}
        <div className="text-[clamp(18px,2.2vw,32px)] italic font-light text-[#cbd5e1] drop-shadow-md leading-tight mb-6">
          Influencers, Websites, Mobile Apps, SEO & Digital Marketing
        </div>

        <p className="text-[15px] sm:text-[17px] text-slate-300 max-w-2xl font-light leading-relaxed mb-8">
          From Bangalore to global markets, we engineer high-converting web applications, cross-platform mobile apps, vetted creator reels, and full-funnel search strategies with boutique design ownership.
        </p>

        {/* Quick Service Links Bar (VoometDesign signature horizontal links) */}
        <div className="hidden md:flex items-center flex-nowrap gap-x-5 text-white/90 font-semibold text-[14px] tracking-wide mb-10">
          <Link href="/influencers" className="hover:text-white transition-colors uppercase hover:underline underline-offset-4">
            Influencer Marketing
          </Link>
          <span className="text-white/30 font-light">|</span>
          <Link href="/services/web-development" className="hover:text-white transition-colors uppercase hover:underline underline-offset-4">
            Website Development
          </Link>
          <span className="text-white/30 font-light">|</span>
          <Link href="/services/app-development" className="hover:text-white transition-colors uppercase hover:underline underline-offset-4">
            App Development
          </Link>
          <span className="text-white/30 font-light">|</span>
          <Link href="/services/seo-digital-marketing" className="hover:text-white transition-colors uppercase hover:underline underline-offset-4">
            SEO & Digital Marketing
          </Link>
        </div>

        {/* VoometDesign Style Pill Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/contact"
            className="w-full sm:w-auto h-[54px] sm:h-[56px] px-8 rounded-full bg-white text-[#071633] font-bold text-[14px] tracking-wide shadow-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Get Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="#services-section"
            onClick={scrollToServices}
            className="w-full sm:w-auto h-[54px] sm:h-[56px] px-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[14px] font-semibold tracking-wide hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
          >
            <span>Explore Services</span>
          </a>
        </div>

        {/* Scroll to explore hint matching VoometDesign */}
        <div className="mt-14 sm:mt-18 flex flex-col items-center gap-2 opacity-75 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-[11px] uppercase tracking-[0.2em] text-white font-bold">
            Scroll to Explore
          </span>
          <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
