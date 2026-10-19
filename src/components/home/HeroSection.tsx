"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, ChevronDown } from "lucide-react";

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
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#071633]">
      {/* 3D Crystal Background Layer (Section 3.5 & 7 Hero) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroCrystalCanvas />
      </div>

      {/* Deep Navy Hero Overlay vignette */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#071633]/60 via-[#071633]/40 to-[#071633] pointer-events-none" />

      {/* Main Hero Content (SEO-Friendly Real HTML) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
        {/* Endorsement line (Section 6.1) */}
        <p className="text-xs uppercase tracking-[0.25em] text-slate-300 font-medium mb-6">
          A VoometDesign company · Bangalore
        </p>

        {/* Display / H1 (Section 3.3 & 6.1) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-[1.08] max-w-4xl">
          We design and build <br className="hidden sm:inline" />
          digital products that move your business forward.
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
          Websites, mobile apps, SEO and digital marketing from one dedicated team in Bangalore.
        </p>

        {/* Pill Buttons (Section 3.6: fully rounded pills) */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-[#071633] font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg group"
          >
            <span>Get a Free Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="#services-section"
            onClick={scrollToServices}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-all border border-white/20 backdrop-blur-md"
          >
            <span>Explore Services</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Scroll to explore hint */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-[11px] uppercase tracking-[0.25em] text-slate-300 font-medium">
            Scroll to explore
          </span>
          <div className="w-5 h-8 rounded-full border border-slate-400 flex items-start justify-center p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
