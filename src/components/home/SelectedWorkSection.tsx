import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SELECTED_WORK_PROJECTS } from "@/data/siteData";
import { ArrowUpRight, Sparkles } from "lucide-react";

export const SelectedWorkSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative bg-[#090e17] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Selected <span className="text-gradient-cyan">Work & Architecture</span>.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md">
            Representative concepts and engineering demonstrations showing our visual fidelity and performance benchmarks.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SELECTED_WORK_PROJECTS.map((project, idx) => (
            <div
              key={project.title}
              className="group glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-sky-400/50 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-900/90 text-sky-300 border border-sky-400/30 backdrop-blur-md">
                    {project.service}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-slate-900/80 text-slate-400 border border-white/10">
                    Concept Architecture
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">
                      {project.title}
                    </h3>
                    <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-sky-400 transition-all">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <p className="text-xs text-sky-400 font-mono mt-1">{project.category}</p>

                  <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                    <strong className="text-white font-medium">Result:</strong> {project.result}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consultation Callout */}
        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 font-semibold group"
          >
            <span>Have an ambitious product in mind? Let's review your architecture</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
