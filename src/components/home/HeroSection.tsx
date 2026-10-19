"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, ChevronDown, Sparkles, ShieldCheck } from "lucide-react";
import { SITE_METADATA } from "@/data/siteData";

// Dynamically import 3D Hero Crystal (client-only, ssr: false)
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
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* 3D Crystal Background Layer (Section 7 Hero) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroCrystalCanvas />
      </div>

      {/* Subtle radial background vignette */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0f172a]/40 via-transparent to-[#0f172a] pointer-events-none" />

      {/* Main Hero Content (SEO-Friendly Real HTML) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">


        {/* H1 Headline (Section 6.1) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl">
          We design and build{" "}
          <span className="text-gradient-cyan">digital products</span> that move your business forward.
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
          Websites, mobile apps, SEO and digital marketing from one dedicated technology team in Bangalore.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:shadow-[0_0_35px_rgba(56,189,248,0.55)] group"
          >
            <span>Get a Free Consultation</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="#services-section"
            onClick={scrollToServices}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl glass-card text-white hover:text-sky-300 text-sm font-semibold transition-all border border-white/10 hover:border-sky-400/40"
          >
            <span>Explore Services</span>
            <ChevronDown className="w-4 h-4 text-sky-400" />
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>100% Code Ownership</span>
          </div>
          <span className="text-slate-600">•</span>
          <div>Sub-2s Core Web Vitals Standard</div>
          <span className="text-slate-600">•</span>
          <div>Bangalore Local & Global Delivery</div>
        </div>

        {/* Scroll to explore indicator */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-slate-400">
            Scroll to explore
          </span>
          <div className="w-5 h-9 rounded-full border border-slate-500 flex items-start justify-center p-1">
            <div className="w-1.5 h-2 rounded-full bg-sky-400 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
