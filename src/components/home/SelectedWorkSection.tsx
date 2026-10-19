import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SELECTED_WORK_PROJECTS } from "@/data/siteData";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const SelectedWorkSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-[#fafaf8] overflow-hidden border-t border-[#e5eaf2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Caption label, Two-tone H2, Description on right (PRD 3.6) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[12px] uppercase tracking-[0.25em] text-[#6e7d9b] font-medium block mb-2">
              Demonstrations
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold text-[#071633] tracking-tight leading-tight">
              Selected Work. <br />
              <span className="font-light text-[#62748e]">Architecture and visual fidelity.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#45556c] font-light max-w-md">
            Representative concepts and engineering prototypes showing performance standards and interface craft.
          </p>
        </div>

        {/* Project Cards Grid (White cards, thin light border, soft shadow - PRD 3.6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SELECTED_WORK_PROJECTS.map((project) => (
            <div
              key={project.title}
              className="light-card rounded-3xl overflow-hidden bg-white border border-[#e5eaf2] flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/95 text-[#071633] shadow-sm">
                    {project.service}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#071633]">
                      {project.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center text-[#071633]">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-[#62748e] font-medium mt-1">{project.category}</p>

                  <p className="text-sm text-[#45556c] font-light mt-3 leading-relaxed">
                    <strong className="text-[#071633] font-medium">Result:</strong> {project.result}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-[#6e7d9b] px-2.5 py-1 rounded-md bg-[#f8fafc] border border-[#e5eaf2]"
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
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#071633] hover:text-blue-600 transition-colors group"
          >
            <span>Have a custom project? Request an Architecture Review</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
