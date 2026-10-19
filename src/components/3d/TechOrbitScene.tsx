"use client";

import React, { useState } from "react";
import { TECH_STACK } from "@/data/siteData";
import { Cpu, Globe, Layers, Code, Smartphone, BarChart3, Database, Sparkles } from "lucide-react";

export const TechOrbitScene: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getTechIcon = (name: string) => {
    switch (name) {
      case "Next.js":
      case "React":
        return <Code className="w-5 h-5 text-sky-400" />;
      case "TypeScript":
        return <Cpu className="w-5 h-5 text-blue-400" />;
      case "Three.js":
        return <Sparkles className="w-5 h-5 text-cyan-300" />;
      case "Node.js":
        return <Database className="w-5 h-5 text-emerald-400" />;
      case "React Native":
        return <Smartphone className="w-5 h-5 text-sky-400" />;
      case "Tailwind CSS":
        return <Layers className="w-5 h-5 text-teal-400" />;
      case "Google Analytics 4":
      case "Google & Meta Ads":
        return <BarChart3 className="w-5 h-5 text-amber-400" />;
      default:
        return <Globe className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12">
      {/* Background Orbit Visualizer Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full border border-sky-400/40 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[450px] h-[450px] sm:w-[700px] sm:h-[700px] rounded-full border border-dashed border-slate-600/50 animate-[spin_90s_linear_infinite_reverse]" />
        <div className="absolute w-[200px] h-[200px] rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      {/* Grid of Interactive Technology Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
        {TECH_STACK.map((tech, idx) => {
          const isHovered = hoveredIndex === idx;
          return (
            <div
              key={tech.name}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="glass-card group relative p-5 rounded-xl border border-white/10 hover:border-sky-400/50 transition-all duration-300 flex flex-col items-start justify-between min-h-[140px] cursor-pointer overflow-hidden"
            >
              {/* Subtle glowing corner highlight */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-sky-500/10 rounded-full blur-xl group-hover:bg-sky-400/25 transition-all duration-500" />

              <div className="flex items-center justify-between w-full">
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 group-hover:border-sky-400/40 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all">
                  {getTechIcon(tech.name)}
                </div>
                <span className="text-[10px] font-mono tracking-wider text-slate-500 group-hover:text-sky-300 uppercase">
                  {idx < 9 ? `0${idx + 1}` : idx + 1}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-base font-semibold text-white group-hover:text-sky-300 transition-colors">
                  {tech.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{tech.tag}</p>
              </div>

              {/* Bottom active bar */}
              <div
                className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-500 ${
                  isHovered ? "w-full" : "w-0"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
