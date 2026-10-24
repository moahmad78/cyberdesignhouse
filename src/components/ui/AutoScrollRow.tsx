"use client";

import React, { useRef, useEffect, useState } from "react";

interface AutoScrollRowProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Pixels per frame (default 0.45)
  pauseDelay?: number; // Delay in ms after user touch release before auto-scroll resumes
}

export const AutoScrollRow: React.FC<AutoScrollRowProps> = ({
  children,
  className = "",
  speed = 0.45,
  pauseDelay = 2200,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animId: number;
    let paused = false;
    let direction = 1; // 1 = scroll right, -1 = scroll left
    let waitFrames = 0;

    const onUserTouchStart = () => {
      paused = true;
      setIsInteracting(true);
      if (timerRef.current) clearTimeout(timerRef.current);
    };

    const onUserTouchEnd = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        paused = false;
        setIsInteracting(false);
      }, pauseDelay);
    };

    el.addEventListener("touchstart", onUserTouchStart, { passive: true });
    el.addEventListener("touchend", onUserTouchEnd, { passive: true });
    el.addEventListener("pointerdown", onUserTouchStart, { passive: true });
    el.addEventListener("pointerup", onUserTouchEnd, { passive: true });

    const step = () => {
      animId = requestAnimationFrame(step);

      // Only active on mobile & small viewports (< 768px)
      if (window.innerWidth >= 768) return;
      if (paused) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 2) return;

      if (waitFrames > 0) {
        waitFrames--;
        return;
      }

      // Smooth ping-pong drift so it never jarringly snaps back
      if (direction === 1) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= maxScroll - 1) {
          direction = -1;
          waitFrames = 75; // Pause for ~1.2s at the end before gently scrolling back
        }
      } else {
        el.scrollLeft -= speed;
        if (el.scrollLeft <= 1) {
          direction = 1;
          waitFrames = 60; // Pause for ~1.0s at the start
        }
      }
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
      if (timerRef.current) clearTimeout(timerRef.current);
      el.removeEventListener("touchstart", onUserTouchStart);
      el.removeEventListener("touchend", onUserTouchEnd);
      el.removeEventListener("pointerdown", onUserTouchStart);
      el.removeEventListener("pointerup", onUserTouchEnd);
    };
  }, [speed, pauseDelay]);

  return (
    <div
      ref={containerRef}
      className={`${className} ${
        isInteracting ? "snap-x snap-mandatory" : "snap-none"
      }`}
    >
      {children}
    </div>
  );
};
