"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useConsultationModal } from "@/context/ConsultationModalContext";

export const FinalCtaSection: React.FC = () => {
  const { openModal } = useConsultationModal();
  return (
    <section className="py-14 sm:py-20 relative bg-[#f8fafc] overflow-hidden border-t border-[#e5eaf2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-[28px] bg-[#071633] border border-[#0f2752] p-7 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <span className="font-heading text-[12.5px] sm:text-[13px] uppercase tracking-[0.2em] font-[900] text-slate-300 block">
                LET&apos;S BUILD TOGETHER
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-white leading-[1.15] tracking-tight">
                Ready to Turn Your Idea <br />
                Into a <span className="text-slate-300 font-normal">High-Performing Product?</span>
              </h2>
              <p className="text-[15px] sm:text-[16px] text-slate-200 font-normal leading-relaxed max-w-xl">
                Partner with Cyber Design House for design-driven, high-performance digital products that create real business impact.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openModal()}
                  data-consultation-modal
                  className="h-12 px-7 rounded-xl bg-white hover:bg-slate-100 text-[#071633] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <Link
                  href="/services/web-development"
                  className="h-12 px-5 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Our Work</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Mockup Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[20px] overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
                <Image
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80"
                  alt="Cyber Design House Digital Products"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
