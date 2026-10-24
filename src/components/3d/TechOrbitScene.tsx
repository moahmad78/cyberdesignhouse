"use client";

import React from "react";
import {
  Database,
  Zap,
  KeyRound,
  Flame,
  CheckCircle2
} from "lucide-react";

export const TechOrbitScene: React.FC = () => {
  const scalePillars = [
    {
      metric: "50,000+",
      metricSubtitle: "CONCURRENT RESILIENT",
      title: "Survives Extreme Traffic Surges",
      category: "CLOUD & EDGE INFRASTRUCTURE",
      tagline: "AWS · GCP · Cloudflare · K8s",
      description:
        "Engineered with auto-scaling distributed cloud clusters that absorb 50,000+ simultaneous traffic spikes with zero downtime and sub-second response times.",
      specs: ["Sub-20ms Global Edge Response", "Multi-AZ Auto-Healing Clusters"],
      icon: <Flame className="w-4 h-4 text-blue-500" />,
    },
    {
      metric: "₹100Cr+",
      metricSubtitle: "TRANSACTION SECURITY",
      title: "Bank-Grade Operational Architecture",
      category: "BACKEND & DATA INTEGRITY",
      tagline: "Node.js · Python · Postgres · Redis",
      description:
        "Every database transaction, API route, and payment gateway is fortified with ACID compliance, 256-bit encryption, and zero data leakage tolerance.",
      specs: ["ACID Relational Schemas", "OWASP Security Fortification"],
      icon: <Database className="w-4 h-4 text-emerald-600" />,
    },
    {
      metric: "0.8s",
      metricSubtitle: "ULTRA-FAST LOAD STANDARD",
      title: "Speed is Revenue & Conversions",
      category: "NEXT-GEN CLIENT RUNTIMES",
      tagline: "Next.js 16 · React Native · TypeScript",
      description:
        "Custom Next.js Server Components and serverless edge delivery guaranteeing instant page loads and zero layout shifts across any 4G mobile connection.",
      specs: ["3x Higher Mobile Conversion Lift", "95+ Lighthouse Score Standard"],
      icon: <Zap className="w-4 h-4 text-[#071633]" />,
    },
    {
      metric: "100%",
      metricSubtitle: "CODEBASE SOVEREIGNTY",
      title: "Zero Proprietary Hostage Traps",
      category: "ENTERPRISE AUTONOMY",
      tagline: "Full Git Repos · Independent Cloud",
      description:
        "You own 100% of your Git repositories, Figma design files, database schemas, and cloud accounts on Day 1. Total operational freedom with zero vendor lock-in.",
      specs: ["Complete Clean Git Handover", "Zero Recurring Royalties"],
      icon: <KeyRound className="w-4 h-4 text-[#071633]" />,
    },
  ];

  // Quadruple cards so the marquee is always full on any screen size and loops smoothly
  const infiniteCards = [...scalePillars, ...scalePillars, ...scalePillars, ...scalePillars];

  return (
    <div className="w-full relative overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-12px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-12px),transparent)]">
      {/* Left & Right Minimal Feather Vignettes (Barely touches cards) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-3 sm:w-4 bg-gradient-to-r from-[#f8fafc] to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-3 sm:w-4 bg-gradient-to-l from-[#f8fafc] to-transparent z-20" />

      {/* Continuous Slow Marquee Row */}
      <div className="animate-marquee-slow flex items-stretch gap-4 sm:gap-5 py-3">
        {infiniteCards.map((pillar, idx) => (
          <div
            key={`${pillar.title}-${idx}`}
            className="w-[280px] sm:w-[315px] md:w-[330px] shrink-0 p-4 sm:p-5 rounded-[18px] sm:rounded-[20px] bg-white border border-[#e5eaf2] shadow-xs hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group select-none"
          >
            <div>
              {/* Metric & Category */}
              <div className="flex items-start justify-between gap-2.5 mb-2.5">
                <div>
                  <div className="text-2xl sm:text-[28px] font-black text-[#071633] tracking-tight leading-none group-hover:text-slate-800 transition-colors">
                    {pillar.metric}
                  </div>
                  <div className="text-[9px] sm:text-[9.5px] font-mono font-bold text-[#6E7D9B] uppercase tracking-wider mt-1">
                    {pillar.metricSubtitle}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  {pillar.icon}
                </div>
              </div>

              {/* Category & Title */}
              <div className="mt-2.5 pt-2 border-t border-slate-100">
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#6E7D9B] block mb-0.5">
                  {pillar.category}
                </span>
                <h4 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#071633] leading-snug line-clamp-1">
                  {pillar.title}
                </h4>
                <div className="text-[10px] font-mono font-medium text-[#45556c] bg-[#f8fafc] px-2 py-0.5 rounded border border-[#e5eaf2] mt-1.5 inline-block">
                  {pillar.tagline}
                </div>
              </div>

              {/* Compelling Authority Copy */}
              <p className="text-[11.5px] sm:text-[12px] text-[#45556c] font-normal leading-relaxed mt-2.5 line-clamp-3">
                {pillar.description}
              </p>
            </div>

            {/* Verified Checklist Proof */}
            <div className="mt-3.5 pt-2.5 border-t border-slate-100 space-y-1.5">
              {pillar.specs.map((spec, sIdx) => (
                <div key={sIdx} className="flex items-center gap-1.5 text-[10.5px] font-medium text-[#314158]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="line-clamp-1">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
