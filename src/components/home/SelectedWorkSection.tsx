"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SELECTED_WORK_PROJECTS } from "@/data/siteData";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const SelectedWorkSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", "Web Platforms", "Mobile Apps", "SEO & Digital Marketing", "Influencers"];

  const filteredProjects = SELECTED_WORK_PROJECTS.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Web Platforms") return project.service.includes("Web");
    if (activeFilter === "Mobile Apps") return project.service.includes("App");
    if (activeFilter === "SEO & Digital Marketing") return project.service.includes("SEO") || project.service.includes("Marketing");
    if (activeFilter === "Influencers") return project.service.includes("Influencer");
    return true;
  });

  return (
    <section className="py-20 sm:py-28 relative bg-[#fafaf8] overflow-hidden border-t border-[#e5eaf2]">
      {/* Architectural Grid Background */}
      <div className="absolute inset-0 bg-architectural-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* VoometDesign Section Header with Filter Pills on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end mb-10 sm:mb-14">
          <div className="md:col-span-6 lg:col-span-6">
            <span className="text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold text-[#6E7D9B] mb-2 sm:mb-3 block">
              SELECTED WORK
            </span>
            <h2 className="text-[#071633] text-[clamp(32px,3.5vw,52px)] font-bold leading-[1.05] md:leading-[0.98] tracking-[-0.03em] md:tracking-[-0.04em]">
              Projects We Built
              <br />
              <span className="text-slate-500 font-light">Crafted for Scale</span>
            </h2>
          </div>

          {/* VoometDesign Filter Pills */}
          <div className="md:col-span-6 lg:col-span-6 flex items-center md:justify-end mt-4 md:mt-0">
            <div className="flex flex-row md:flex-wrap overflow-x-auto whitespace-nowrap hide-scrollbar gap-2 pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 h-[34px] flex items-center justify-center rounded-full text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 cursor-pointer ${
                    activeFilter === cat
                      ? "bg-[#071633] text-white shadow-sm"
                      : "bg-white text-[#6E7D9B] border border-[#e5eaf2] hover:border-slate-300 hover:text-[#071633]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Cards Grid with VoometDesign 28px rounded cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="light-card rounded-[28px] overflow-hidden bg-white border border-[#e5eaf2] flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/95 text-[#071633] shadow-sm backdrop-blur-sm">
                    {project.service}
                  </span>
                </div>
              </div>

              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#071633] tracking-tight">
                      {project.title}
                    </h3>
                    <div className="w-9 h-9 rounded-full bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center text-[#071633]">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-[#62748e] font-semibold uppercase tracking-wider mt-1">
                    {project.category}
                  </p>

                  <p className="text-[14px] text-[#45556c] font-light mt-3 leading-relaxed">
                    <strong className="text-[#071633] font-semibold">Outcome:</strong> {project.result}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-[#6e7d9b] px-3 py-1 rounded-full bg-[#f8fafc] border border-[#e5eaf2]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#071633] hover:text-blue-600 transition-colors group"
          >
            <span>Have an enterprise requirement? Request a technical consultation</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
