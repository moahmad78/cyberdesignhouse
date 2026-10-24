"use client";

import React from "react";
import Image from "next/image";
import { WHY_CHOOSE_US_CARDS } from "@/data/siteData";
import {
  Layers,
  Palette,
  Zap,
  TrendingUp,
  MessageSquare,
  LifeBuoy,
  ArrowRight
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const WhyUsSection: React.FC = () => {
  const icons = [
    <Layers key="1" className="w-5 h-5 text-[#071633]" />,
    <Palette key="2" className="w-5 h-5 text-[#071633]" />,
    <Zap key="3" className="w-5 h-5 text-[#071633]" />,
    <TrendingUp key="4" className="w-5 h-5 text-[#071633]" />,
    <MessageSquare key="5" className="w-5 h-5 text-[#071633]" />,
    <LifeBuoy key="6" className="w-5 h-5 text-[#071633]" />,
  ];

  const cardImages = [
    // 01: Coding laptop on desk with warm light
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    // 02: Architectural blueprint sketching with pencil
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    // 03: 3D interactive neon and holography experience
    "/images/3d-motion-interactive.jpg",
    // 04: Laptop with analytics dashboard and plant on desk
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    // 05: Hands holding tablet with UI in collaborative discussion
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=900&q=80",
    // 06: Dark sleek headphones on dark desk (matching reference screenshot)
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
  ];

  return (
    <section className="py-10 sm:py-20 relative bg-[#fafaf8] overflow-hidden border-t border-[#e5eaf2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Left-Right Split */}
        <SectionHeader
          caption="THE ADVANTAGE"
          titleLine1="Why Cyber Design House"
          titleLine2="Precision Meets Performance"
          description="We combine the meticulous turnkey execution of VoometDesign with deep engineering expertise to deliver software that drives business growth."
        />

        {/* 6 Cards Grid: Mobile vertical stack, desktop 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-6 md:mt-10">
          {WHY_CHOOSE_US_CARDS.map((card, idx) => (
            <div
              key={card.title}
              className="w-full relative rounded-[22px] overflow-hidden bg-[#071633] border border-[#1e293b] group shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[320px]"
            >
              {/* Full Background Image spanning card with gradient overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={cardImages[idx]}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Smooth gradient overlay: transparent at top to reveal photo, smoothly fading to deep navy for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#071633]/70 via-30% to-[#071633]" />
              </div>

              {/* Content Layer sitting on top of the gradient */}
              <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between h-full">
                <div>
                  {/* Floating Icon Box & Number */}
                  <div className="pt-2 sm:pt-4 flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-lg text-[#071633] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {icons[idx]}
                    </div>
                    <span className="font-mono text-xs font-bold text-white/80 tracking-wider">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Text Content */}
                  <h3 className="text-white text-[17.5px] sm:text-[19px] font-bold tracking-tight mb-2 leading-snug font-heading">
                    {card.title}
                  </h3>
                  <p className="text-slate-200 text-[13.5px] sm:text-[14px] font-normal leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Footer Row - naturally touching the text area with tight clean spacing */}
                <div className="pt-3.5 mt-4 border-t border-white/15 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-heading">
                    Quality Standard
                  </span>
                  <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#071633] transition-all">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
