import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Phone, Sparkles } from "lucide-react";
import { SITE_METADATA } from "@/data/siteData";

export const FinalCtaSection: React.FC = () => {
  const whatsappMessage = encodeURIComponent(
    "Hello! I want to discuss a new IT / web / app / marketing project with Cyber Design House."
  );

  return (
    <section className="py-24 sm:py-32 relative bg-[#090e17] overflow-hidden">
      {/* Background radial glow & crystal watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl glass-panel p-8 sm:p-14 lg:p-16 border border-sky-400/30 bg-gradient-to-b from-slate-900/90 via-[#0f172a]/95 to-[#0b121e]/95 text-center overflow-hidden shadow-2xl">
          {/* Decorative faceted mark watermark */}
          <div className="absolute -top-16 -right-16 w-64 h-64 opacity-10 pointer-events-none">
            <Image
              src="/images/cd-mark.png"
              alt=""
              width={250}
              height={250}
              className="object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-sky-400/30 text-sky-400 font-mono text-xs uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for Q4 / 2027 Roadmaps</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Have a project in mind? <br />
            <span className="text-gradient-cyan">Let's talk</span>.
          </h2>

          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether you need a full enterprise web platform, a mobile application, or high-intent organic and paid client acquisition, our team in Bangalore is ready.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.4)] group"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href={`https://wa.me/919845014279?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/30"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Direct Line */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-400 font-mono">
            <span>Direct Bangalore Studio Hotline:</span>
            <a
              href={`tel:${SITE_METADATA.phoneRaw}`}
              className="text-sky-400 hover:text-white transition-colors flex items-center gap-1 font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              {SITE_METADATA.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
