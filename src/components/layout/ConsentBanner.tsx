"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

export const ConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cdh_cookie_consent");
    if (!consent) {
      // Delay presentation slightly for non-intrusive appearance
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cdh_cookie_consent", "accepted");
    setShowBanner(false);
    // Push GTM consent update event
    if (typeof window !== "undefined" && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: "consent_update",
        analytics_storage: "granted",
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem("cdh_cookie_consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-6 left-6 right-6 sm:right-auto sm:max-w-md z-40 p-4 rounded-2xl glass-panel bg-slate-900/95 border border-sky-400/20 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h2 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Privacy & Cookie Preferences
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            We use technical and anonymous performance analytics to measure experience quality.
            Learn more in our{" "}
            <Link
              href="/privacy-policy"
              className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            >
              Decline
            </button>
          </div>
        </div>
        <button
          onClick={handleDecline}
          className="text-slate-500 hover:text-slate-300 p-1"
          aria-label="Close cookie consent banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
