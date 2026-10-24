"use client";

import React, { useEffect, useState } from "react";

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Check touch devices or reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouchDevice) {
      setIsTouch(true);
      return;
    }

    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Track hovered elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = !!target.closest("a, button, input, textarea, select, [role='button'], canvas");
      setIsHovered(isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Center dot */}
      <div
        className="fixed w-2 h-2 rounded-full bg-[#071633] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      {/* Surrounding smooth glowing ring */}
      <div
        className={`fixed rounded-full border border-[#071633]/30 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
          isHovered
            ? "w-12 h-12 bg-[#071633]/10 border-[#071633] scale-125"
            : "w-8 h-8 scale-100"
        }`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </div>
  );
};
