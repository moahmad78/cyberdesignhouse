"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Sparkles, Layers } from "lucide-react";

interface ServiceHeroVisualProps {
  slug: string;
  title: string;
  serviceIndex: number;
}

const SERVICE_HERO_MEDIA: Record<
  string,
  {
    image: string;
    alt: string;
    badge: string;
    metric1: { value: string; label: string };
    metric2: { value: string; label: string };
    techs: string[];
  }
> = {
  "web-development": {
    image: "/images/work-web.jpg",
    alt: "Custom Web Development & Modern Web Portals",
    badge: "SUB-SECOND PERFORMANCE",
    metric1: { value: "<1.0s", label: "Page Load Time" },
    metric2: { value: "98+", label: "Lighthouse Score" },
    techs: ["Next.js 15", "React 19", "TypeScript", "Tailwind"],
  },
  "app-development": {
    image: "/images/work-app.jpg",
    alt: "Native iOS & Android Mobile Applications",
    badge: "60 FPS FLUID RENDERING",
    metric1: { value: "60 FPS", label: "Native Framerate" },
    metric2: { value: "99.8%", label: "Crash-Free Rate" },
    techs: ["Flutter", "React Native", "Swift", "Kotlin"],
  },
  seo: {
    image: "/images/work-seo.jpg",
    alt: "Search Engine Optimization & Google Ads Performance",
    badge: "ORGANIC TRAFFIC & HIGH ROAS",
    metric1: { value: "Top-10", label: "Google Rankings" },
    metric2: { value: "+280%", label: "Lead Growth" },
    techs: ["Google Ads", "Meta CAPI", "GA4", "Schema.org"],
  },
  "influencer-marketing": {
    image: "/images/work-influencer.jpg",
    alt: "Influencer Marketing & Creator Campaigns",
    badge: "VERIFIED CREATOR NETWORK",
    metric1: { value: "400+", label: "Vetted Creators" },
    metric2: { value: "100%", label: "Escrow Protected" },
    techs: ["Instagram Reels", "YouTube", "Content Licensing"],
  },
};

export const ServiceHeroVisual: React.FC<ServiceHeroVisualProps> = ({
  slug,
  title,
  serviceIndex,
}) => {
  const media = SERVICE_HERO_MEDIA[slug] || SERVICE_HERO_MEDIA["web-development"];

  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[350px] lg:min-h-[370px] max-h-[410px] rounded-[24px] overflow-hidden border border-[#e5eaf2] shadow-[0_16px_40px_rgba(7,22,51,0.12)] bg-[#071633] group select-none">
      {/* Background High-Res Image */}
      <Image
        src={media.image}
        alt={media.alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 42vw"
        className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out z-0"
      />

      {/* Cinematic Dark-to-Transparent Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#071633]/95 via-[#071633]/40 to-transparent z-10" />

      {/* Subtle Inner Glow Border */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[24px] pointer-events-none z-20" />

      {/* Content Overlay */}
      <div className="relative z-30 p-4 sm:p-5 flex flex-col justify-between h-full">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-2">
          {/* Top-Left Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[#071633] shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase">
              {media.badge}
            </span>
          </div>

          {/* Top-Right Discipline Badge */}
          <div className="w-8 h-8 rounded-full bg-[#071633]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-xs font-mono font-bold shadow-md">
            0{serviceIndex + 1}
          </div>
        </div>

        {/* Bottom Metrics & Tech Stack Panel */}
        <div className="space-y-3 mt-auto pt-4">
          {/* Dual Stat Metrics Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg">
              <div className="text-lg sm:text-xl font-bold font-heading tracking-tight text-white drop-shadow-sm">
                {media.metric1.value}
              </div>
              <div className="text-[10.5px] text-slate-200 font-medium tracking-wide mt-0.5">
                {media.metric1.label}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg">
              <div className="text-lg sm:text-xl font-bold font-heading tracking-tight text-emerald-400 drop-shadow-sm">
                {media.metric2.value}
              </div>
              <div className="text-[10.5px] text-slate-200 font-medium tracking-wide mt-0.5">
                {media.metric2.label}
              </div>
            </div>
          </div>

          {/* Tech Stack Chips Bar */}
          <div className="flex flex-wrap items-center gap-1 pt-0.5">
            {media.techs.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono font-semibold text-white/90 px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-md border border-white/15 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
