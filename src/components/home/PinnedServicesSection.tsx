"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/data/siteData";
import { ArrowRight, Code, Smartphone, Video, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const PinnedServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  const currentTab = hoveredTab !== null ? hoveredTab : activeTab;

  const serviceIcons = [
    <Code key="web" className="w-5 h-5 text-white" />,
    <Smartphone key="app" className="w-5 h-5 text-white" />,
    <TrendingUp key="seo" className="w-5 h-5 text-white" />,
    <Video key="influencer" className="w-5 h-5 text-white" />,
  ];

  const serviceImages = [
    "/images/work-web.jpg",
    "/images/work-app.jpg",
    "/images/work-marketing.jpg",
    "/images/work-influencer.jpg",
  ];

  return (
    <section id="services-section" className="py-12 sm:py-16 lg:py-20 bg-[#f8fafc] border-t border-[#e5eaf2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* VoometDesign Section Header: Caption, H2 Two-Tone, Description on right */}
        <SectionHeader
          caption="SERVICES"
          titleLine1="Our Core Capabilities"
          titleLine2="Tailored Digital Products"
          description="Bespoke web architectures, native mobile apps, vetted creator campaigns, and high-growth performance marketing."
        />

        {/* VoometDesign Signature Expandable Accordion Service Cards: Mobile vertical stack, desktop flex-row accordion */}
        <div
          className="flex flex-col gap-4 md:flex-row md:gap-4 w-full md:h-[340px] lg:h-[380px] mt-4 md:mt-10"
        >
          {SERVICES.map((service, idx) => {
            const isSelected = currentTab === idx;
            return (
              <div
                key={service.slug}
                onClick={() => setActiveTab(idx)}
                onMouseEnter={() => setHoveredTab(idx)}
                className={`relative w-full rounded-[24px] sm:rounded-[28px] overflow-hidden group transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer select-none min-h-[240px] md:min-h-0 h-[260px] md:h-full ${
                  isSelected
                    ? "md:flex-[3.5] ring-2 ring-white/40 shadow-[0_25px_60px_rgba(7,22,51,0.22)]"
                    : "md:flex-1 opacity-95 md:opacity-90 hover:opacity-100"
                } hover:-translate-y-[4px] hover:shadow-[0_20px_50px_rgba(11,22,53,0.18)]`}
              >
                {/* Background image preview */}
                <Image
                  src={serviceImages[idx]}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                />

                {/* VoometDesign Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/45 to-transparent group-hover:from-[#0f172a]/95 group-hover:via-[#0f172a]/60 transition-colors duration-500 z-10" />

                {/* Content inside card */}
                <div className="relative z-20 p-6 md:p-8 flex flex-col h-full justify-between">
                  {/* Top: Icon Badge in Frosted Glass Circle */}
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    {serviceIcons[idx]}
                  </div>

                  {/* Collapsed state title for desktop */}
                  <div
                    className={`hidden md:flex flex-col items-start justify-end absolute bottom-7 left-7 pointer-events-none transition-all duration-300 ${
                      isSelected
                        ? "opacity-0 translate-y-3 pointer-events-none"
                        : "opacity-90 translate-y-0"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/70 mb-2 [writing-mode:vertical-rl] rotate-180 font-bold">
                      0{idx + 1}
                    </span>
                    <h3 className="text-white text-[18px] lg:text-[20px] font-bold tracking-tight whitespace-nowrap [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
                      {service.title}
                    </h3>
                  </div>

                  {/* Bottom: Expanded Details */}
                  <div className="w-full flex flex-col items-start mt-auto">
                    <div
                      className={`w-full transition-all duration-300 block ${
                        isSelected
                          ? "md:opacity-100 md:translate-y-0 md:pointer-events-auto md:block"
                          : "md:opacity-0 md:translate-y-3 md:pointer-events-none md:hidden"
                      }`}
                    >
                      <span className="text-[12.5px] font-heading uppercase tracking-[0.16em] text-white/90 block mb-1.5 font-[800]">
                        Service {service.number}
                      </span>
                      <h3 className="text-white text-[22px] lg:text-[26px] font-bold tracking-tight mb-1.5 drop-shadow-md">
                        {service.title}
                      </h3>
                      <p className="text-slate-100 text-[14px] lg:text-[15px] leading-relaxed font-normal line-clamp-2 mb-3.5 max-w-sm">
                        {service.oneLine}
                      </p>
                      <Link
                        href={service.slug === "influencer-marketing" ? "/influencers" : `/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-white uppercase bg-white/10 hover:bg-white hover:text-[#0f172a] backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg shadow-sm transition-all"
                      >
                        <span>{service.slug === "influencer-marketing" ? "View Roster" : "Explore Service"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
