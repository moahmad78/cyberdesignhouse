"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
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
          setTimeout(() => setIsDone(true), 200);
          setTimeout(() => {
            setShouldRender(false);
            sessionStorage.setItem("cdh_preloader_shown", "true");
          }, 700);
          return 100;
        }
        const increment = Math.max(1, Math.floor((100 - prev) * 0.2));
        return Math.min(100, prev + increment);
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fafaf8] transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isDone ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center">
        {/* Faceted Crystal Mark in crisp white card */}
        <div className="relative mb-5 p-3 rounded-2xl bg-white shadow-md border border-[#e5eaf2]">
          <Image
            src="/images/cd-mark.png"
            alt="Cyber Design House Mark"
            width={64}
            height={64}
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
            priority
          />
        </div>

        {/* Brand Caption */}
        <div className="text-center mb-5">
          <p className="text-[12px] uppercase tracking-[0.25em] text-[#071633] font-mono font-bold">
            CYBER DESIGN HOUSE
          </p>
          <p className="text-[11px] tracking-[0.18em] text-[#6e7d9b] mt-0.5 uppercase">
            by VoometDesign
          </p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-40 sm:w-52 bg-[#e5eaf2] rounded-full h-1 overflow-hidden">
          <div
            className="h-full bg-[#071633] rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-2.5 font-mono text-[11px] text-[#6e7d9b] tracking-wider font-medium">
          {progress}%
        </div>
      </div>
    </div>
  );
};
