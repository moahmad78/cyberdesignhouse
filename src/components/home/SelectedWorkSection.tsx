"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SELECTED_WORK_PROJECTS } from "@/data/siteData";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useConsultationModal } from "@/context/ConsultationModalContext";

export const SelectedWorkSection: React.FC = () => {
  const { openModal } = useConsultationModal();
  // All projects loop seamlessly in the marquee slider
  const infiniteAllProjects = [...SELECTED_WORK_PROJECTS, ...SELECTED_WORK_PROJECTS];

  const renderProjectCard = (project: (typeof SELECTED_WORK_PROJECTS)[0], keyId: string | number) => {
    const isLink = Boolean(project.liveUrl);
    const CardElement = isLink ? "a" : "div";
    const linkProps = isLink
      ? {
          href: project.liveUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Visit ${project.title} (Live Website)`
        }
      : {};

    return (
      <CardElement
        key={keyId}
        {...linkProps}
        className="project-card shrink-0 w-[260px] sm:w-[285px] md:w-[300px] light-card rounded-[18px] sm:rounded-[20px] overflow-hidden bg-white border border-[#e5eaf2] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(11,22,53,0.08)] group select-none cursor-pointer"
      >
      {/* Compact Thumbnail Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={375}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2 py-0.5 rounded-md text-[9.5px] font-semibold uppercase tracking-wider bg-white/95 text-[#071633] shadow-xs backdrop-blur-xs">
            {project.service}
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5">
          <span className="px-2 py-0.5 rounded-md text-[9.5px] font-mono font-bold bg-[#071633]/85 text-white backdrop-blur-xs shadow-xs">
            {project.year}
          </span>
        </div>
      </div>

      {/* Compact Card Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-1.5">
            <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#071633] tracking-tight group-hover:text-slate-800 transition-colors line-clamp-1">
              {project.title}
            </h3>
            <div className="w-5 h-5 rounded-md bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center text-[#071633] shrink-0 group-hover:bg-[#071633] group-hover:text-white transition-all">
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>

          <p className="text-[11.5px] text-[#314158] font-bold uppercase tracking-wider mt-0.5 line-clamp-1 font-heading">
            {project.category}
          </p>

          <p className="text-[13px] sm:text-[13.5px] text-[#314158] font-normal mt-2 leading-relaxed line-clamp-2">
            <strong className="text-[#071633] font-bold">Outcome:</strong> {project.result}
          </p>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap gap-1">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono font-medium text-[#45556c] px-2 py-0.5 rounded-md bg-[#f8fafc] border border-[#e5eaf2]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </CardElement>
  );
};

  return (
    <section className="py-8 sm:py-10 lg:py-12 relative bg-[#fafaf8] overflow-hidden border-t border-[#e5eaf2]">
      {/* Architectural Grid Background */}
      <div className="absolute inset-0 bg-architectural-grid pointer-events-none opacity-40" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-4 sm:mb-6">
        <div>
          <span className="font-heading text-[13px] sm:text-[14px] md:text-[14.5px] uppercase tracking-[0.2em] font-[900] text-[#3b4c68] mb-1.5 block">
            SELECTED WORK
          </span>
          <h2 className="text-[#071633] text-[clamp(24px,2.4vw,36px)] font-bold leading-[1.1] tracking-[-0.03em]">
            Projects We Built{" "}
            <span className="text-slate-600 font-normal text-[clamp(18px,1.8vw,28px)]">· Crafted for Scale</span>
          </h2>
        </div>
      </div>

      {/* Infinite Marquee Slider with Minimal Edge Feather */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative w-full overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-12px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-12px),transparent)]">
          {/* Left & Right Minimal Feather Vignettes (Barely touches cards) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-3 sm:w-4 bg-gradient-to-r from-[#fafaf8] to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-3 sm:w-4 bg-gradient-to-l from-[#fafaf8] to-transparent z-20" />

          <div className="animate-marquee-slow flex items-stretch gap-4 sm:gap-5 py-3">
            {infiniteAllProjects.map((project, idx) =>
              renderProjectCard(project, `${project.title}-${idx}`)
            )}
          </div>
        </div>
      </div>

      {/* Compact Bottom Consultation Trigger Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-4 sm:mt-5 text-center">
        <button
          type="button"
          onClick={() => openModal()}
          data-consultation-modal
          className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#071633] hover:text-[#0c2452] underline underline-offset-4 transition-colors group cursor-pointer"
        >
          <span>Have an enterprise requirement? Request a consultation</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};
