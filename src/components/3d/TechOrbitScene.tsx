"use client";

import React from "react";
import { TECH_STACK } from "@/data/siteData";
import { Cpu, Globe, Layers, Code, Smartphone, BarChart3, Database, Sparkles } from "lucide-react";

export const TechOrbitScene: React.FC = () => {
  const getTechIcon = (name: string) => {
    switch (name) {
      case "Next.js":
      case "React":
        return <Code className="w-5 h-5 text-[#071633]" />;
      case "TypeScript":
        return <Cpu className="w-5 h-5 text-[#071633]" />;
      case "Three.js":
        return <Sparkles className="w-5 h-5 text-blue-600" />;
      case "Node.js":
        return <Database className="w-5 h-5 text-emerald-600" />;
      case "React Native":
        return <Smartphone className="w-5 h-5 text-[#071633]" />;
      case "Tailwind CSS":
        return <Layers className="w-5 h-5 text-cyan-600" />;
      case "Google Analytics 4":
      case "Google & Meta Ads":
        return <BarChart3 className="w-5 h-5 text-amber-600" />;
      default:
        return <Globe className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8">
      {/* Grid of Technology Tiles (White cards, thin light border - PRD 3.6) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
        {TECH_STACK.map((tech, idx) => (
          <div
            key={tech.name}
            className="light-card p-5 rounded-2xl bg-white border border-[#e5eaf2] flex flex-col items-start justify-between min-h-[140px] hover:border-slate-300 transition-all duration-300"
          >
            <div className="flex items-center justify-between w-full">
              <div className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#e5eaf2]">
                {getTechIcon(tech.name)}
              </div>
              <span className="text-[11px] font-mono font-medium text-[#6e7d9b]">
                {idx < 9 ? `0${idx + 1}` : idx + 1}
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-base font-semibold text-[#071633]">
                {tech.name}
              </h3>
              <p className="text-xs text-[#62748e] mt-0.5 line-clamp-1">{tech.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
