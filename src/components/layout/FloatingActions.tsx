"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";
import { SITE_METADATA } from "@/data/siteData";

export const FloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappMessage = encodeURIComponent(
    "Hello Cyber Design House! I would like to enquire about your web development, mobile app, and digital growth services."
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Back to top button (Section 5.4) */}
      <button
        onClick={scrollToTop}
        className={`p-3 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700 hover:border-white/50 shadow-xl backdrop-blur-md transition-all duration-300 ${
          showBackToTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </button>

      {/* WhatsApp Button (Section 5.4 & 11) */}
      <a
        href={`https://wa.me/919845014279?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center p-3.5 rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        aria-label="Chat with Cyber Design House on WhatsApp"
      >
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-slate-900/95 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none shadow-xl">
          Chat on WhatsApp
        </span>
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>
    </div>
  );
};
