"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SERVICES } from "@/data/siteData";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// Client-only dynamic import of the 3D Viewer (Section 4.1 Architecture Rules)
const Services3DViewer = dynamic(
  () => import("@/components/3d/Services3DViewer").then((mod) => mod.Services3DViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
      </div>
    ),
  }
);

export const PinnedServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeService = SERVICES[activeTab];

  return (
    <section id="services-section" className="relative py-24 sm:py-32 bg-[#090e17] overflow-hidden border-t border-b border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">

          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Four Core Disciplines. <br />
              <span className="text-gradient-cyan">One Cohesive Technology House.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md">
            Scroll or select a discipline below to explore our interactive 3D architecture, technical capabilities, and deliverable standards.
          </p>
        </div>

        {/* Interactive Progress Tabs (01 to 04) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-10">
          {SERVICES.map((s, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={s.slug}
                onClick={() => setActiveTab(idx)}
                className={`text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                  isActive
                    ? "bg-slate-800/90 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                    : "bg-slate-900/40 border-white/5 hover:border-white/20 hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? "text-sky-400" : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  >
                    {s.number}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                  )}
                </div>
                <h3
                  className={`text-sm sm:text-base font-semibold truncate ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                >
                  {s.title}
                </h3>

                {/* Progress bar line under tab */}
                <div
                  className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${
                    isActive
                      ? "w-full bg-gradient-to-r from-sky-400 to-indigo-500"
                      : "w-0 bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Pinned Showcase Grid: Left Content Panel + Right 3D Scene */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-3xl glass-panel p-6 sm:p-10 lg:p-12 border border-sky-500/20 bg-gradient-to-b from-slate-900/80 to-[#0b121e]/90 shadow-2xl">
          {/* Left Column: Service Details & Real Semantic HTML */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-sky-400">
                {activeService.number}
              </span>
              <div className="h-6 w-[1px] bg-slate-700" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Service Specification
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                {activeService.title}
              </h3>
              <p className="text-base sm:text-lg text-sky-200 font-medium mt-2">
                {activeService.oneLine}
              </p>
            </div>

            {/* Bullets List */}
            <ul className="space-y-3 pt-2">
              {activeService.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Technologies snippet */}
            <div className="pt-2">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-500 block mb-2">
                Core Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {activeService.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Learn More Link to Detail Page */}
            <div className="pt-4">
              <Link
                href={`/services/${activeService.slug}`}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-sky-500/25 group"
              >
                <span>Explore {activeService.title} Details</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Scene Layer */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
            {/* Glowing backdrop circle */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-sky-600/15 to-indigo-600/15 blur-2xl pointer-events-none" />

            <Services3DViewer activeIndex={activeTab} />
          </div>
        </div>
      </div>
    </section>
  );
};
