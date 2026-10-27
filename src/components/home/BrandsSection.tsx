"use client";

import React, { useState } from "react";
import Image from "next/image";

const LOGOS = [
  { name: "Apps For Bharat", src: "/assets/global/brands/apps for bharath.webp" },
  { name: "Physics Wallah",  src: "/assets/global/brands/pw.webp" },
  { name: "Zluri",           src: "/assets/global/brands/zluri.webp" },
  { name: "Juego",           src: "/assets/global/brands/juego-logo.webp" },
  { name: "QpiAI",           src: "/assets/global/brands/qpi.webp" },
  { name: "Emirates",        src: "/assets/global/brands/Emirates 2.webp" },
  { name: "AirAsia",         src: "/assets/global/brands/Airasia 1.webp" },
  { name: "Scripbox",        src: "/assets/global/brands/Scripbox 6.webp" },
  { name: "Edureka",         src: "/assets/global/brands/Edureka 8.webp" },
  { name: "IndiGo",          src: "/assets/global/brands/Indigo 4.webp" },
  { name: "Gokaldas",        src: "/assets/global/brands/Gokuldas 3.webp" },
  { name: "Intrihub",        src: "/assets/global/brands/intrihub.webp" },
];

export function BrandsSection() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="w-full max-w-full bg-white py-8 sm:py-12 md:py-16 overflow-hidden border-b border-slate-100">
      {/* ── TOP HEADER: Text ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 items-end">
          <div className="md:col-span-6">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-mono font-bold text-[#6E7D9B] mb-2 block">
              TRUSTED BY INDUSTRY LEADERS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#071633] tracking-tight leading-tight">
              Brands We&apos;ve Worked With
            </h2>
          </div>
          <div className="md:col-span-6 flex md:justify-end">
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg">
              Trusted across enterprise technology, aviation, quick-commerce, education &amp; digital growth ecosystems.
            </p>
          </div>
        </div>
      </div>

      {/* ── BOTTOM MARQUEE: Infinite Client Logo Strip ── */}
      <div
        className="w-full max-w-full relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <style>{`
          @keyframes marquee-brands-it {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-brands-track {
            animation: marquee-brands-it 15s linear infinite;
          }
          @media (min-width: 768px) {
            .marquee-brands-track {
              animation: marquee-brands-it 28s linear infinite;
            }
          }
        `}</style>

        <div className="flex flex-nowrap items-center h-[70px] md:h-[90px] min-w-0">
          <div
            className="flex flex-nowrap items-center h-full w-max marquee-brands-track"
            style={{
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {/* First Set of Logos */}
            <div className="flex flex-nowrap items-center gap-8 md:gap-16 lg:gap-20 pr-8 md:pr-16 lg:pr-20">
              {LOGOS.map((logo, index) => (
                <div
                  key={`brand-1-${index}`}
                  className="relative flex-shrink-0 w-[130px] md:w-[160px] h-[40px] md:h-[50px] transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-105"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    sizes="(max-width: 768px) 130px, 160px"
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Second Set (Duplicate for seamless loop) */}
            <div
              className="flex flex-nowrap items-center gap-8 md:gap-16 lg:gap-20 pr-8 md:pr-16 lg:pr-20"
              aria-hidden="true"
            >
              {LOGOS.map((logo, index) => (
                <div
                  key={`brand-2-${index}`}
                  className="relative flex-shrink-0 w-[130px] md:w-[160px] h-[40px] md:h-[50px] transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-105"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    sizes="(max-width: 768px) 130px, 160px"
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandsSection;
