"use client";

import React from "react";
import { HOW_WE_WORK_STEPS } from "@/data/siteData";
import { Compass, Palette, Code2, Rocket, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useConsultationModal } from "@/context/ConsultationModalContext";

export const ProcessSection: React.FC = () => {
  const { openModal } = useConsultationModal();
  const stepIcons = [
    <Compass key="1" className="w-5 h-5 text-[#071633]" />,
    <Palette key="2" className="w-5 h-5 text-[#071633]" />,
    <Code2 key="3" className="w-5 h-5 text-[#071633]" />,
    <Rocket key="4" className="w-5 h-5 text-[#071633]" />,
  ];

  return (
    <section className="py-10 sm:py-20 relative bg-[#f8fafc] overflow-hidden border-t border-[#e5eaf2]">
      {/* Architectural Grid Background */}
      <div className="absolute inset-0 bg-architectural-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* VoometDesign Section Header: Left-Right Split */}
        <SectionHeader
          caption="HOW WE WORK"
          titleLine1="From Concept to Scale"
          titleLine2="Structured 4-Phase Delivery"
          description="A disciplined delivery pipeline engineered to eliminate ambiguity, enforce high code standards, and ensure predictable production deployments."
        />

        {/* 4 Process Cards: Mobile vertical stack, desktop 4-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 md:mt-10">
          {HOW_WE_WORK_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="w-full light-card p-6 sm:p-7 rounded-[24px] bg-white border border-[#e5eaf2] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center">
                    {stepIcons[idx]}
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#071633] px-2 py-0.5 rounded-md bg-[#f8fafc] border border-[#e5eaf2]">
                    Phase 0{step.step}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#071633] tracking-tight mb-1">
                  {step.title}
                </h3>
                <p className="text-[11.5px] sm:text-[12.5px] text-[#45556c] mb-2.5 font-bold uppercase tracking-wider font-heading">
                  {step.tagline}
                </p>
                <p className="text-[13.5px] sm:text-[14.5px] text-[#314158] font-normal leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-5 sm:mt-8 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#6e7d9b] font-semibold uppercase tracking-wider">
                <span>Milestone Gate</span>
                <span className="text-[#071633] font-bold">Sign-off ✓</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <button
            type="button"
            onClick={() => openModal()}
            data-consultation-modal
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#071633] hover:text-[#0c2452] underline underline-offset-4 transition-colors group cursor-pointer"
          >
            <span>Schedule a sprint planning session for your project</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
