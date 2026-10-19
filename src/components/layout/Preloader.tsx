"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if previously loaded or user prefers reduced motion
    const hasLoaded = sessionStorage.getItem("cdh_preloader_shown");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasLoaded || prefersReducedMotion) {
      setShouldRender(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 250);
          setTimeout(() => {
            setShouldRender(false);
            sessionStorage.setItem("cdh_preloader_shown", "true");
          }, 850);
          return 100;
        }
        // Realistic easing progress
        const increment = Math.max(1, Math.floor((100 - prev) * 0.18));
        return Math.min(100, prev + increment);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090d16] transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isDone ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center">
        {/* Glowing aura */}
        <div className="absolute w-48 h-48 bg-sky-500/20 rounded-full blur-3xl animate-pulse" />

        {/* Faceted Crystal Mark */}
        <div className="relative mb-6">
          <Image
            src="/images/cd-mark.png"
            alt="Cyber Design House Mark"
            width={72}
            height={72}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_20px_rgba(56,189,248,0.6)] animate-[pulse_2s_ease-in-out_infinite]"
            priority
          />
        </div>

        {/* Brand name */}
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.35em] text-sky-400 font-mono font-semibold">
            CYBER DESIGN HOUSE
          </p>
          <p className="text-[10px] tracking-[0.2em] text-slate-500 mt-1 uppercase">
            by VoometDesign
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-48 sm:w-64 bg-slate-800/80 rounded-full h-1 overflow-hidden p-[1px] border border-slate-700/60">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 font-mono text-xs text-sky-300 tracking-wider">
          {progress}%
        </div>
      </div>
    </div>
  );
};
