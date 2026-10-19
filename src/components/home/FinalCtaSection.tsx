import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE_METADATA } from "@/data/siteData";

export const FinalCtaSection: React.FC = () => {
  const whatsappMessage = encodeURIComponent(
    "Hello! I want to discuss a new IT / web / app / marketing project with Cyber Design House."
  );

  return (
    <section className="py-24 sm:py-32 relative bg-[#f8fafc] overflow-hidden border-t border-[#e5eaf2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-[#071633] p-8 sm:p-14 lg:p-16 text-center overflow-hidden shadow-xl">
          {/* Subtle watermark in background */}
          <div className="absolute -top-16 -right-16 w-64 h-64 opacity-10 pointer-events-none">
            <Image
              src="/images/cd-mark.png"
              alt=""
              width={250}
              height={250}
              className="object-contain"
            />
          </div>

          <span className="text-[12px] uppercase tracking-[0.25em] text-slate-300 font-medium block mb-4">
            Consultation
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Have a project in mind? <br />
            <span className="font-light text-slate-300">Let's talk.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Whether you need a full enterprise web platform, a mobile application, or high-intent organic search acquisition, our Bangalore team is ready.
          </p>

          {/* Action CTAs: Fully rounded pills (PRD 3.6) */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-[#071633] font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md group"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href={`https://wa.me/919845014279?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <p className="mt-8 text-xs text-slate-400">
            Headquarters: Avalahalli Village, Yelahanka Hobli, Bangalore 560064 · {SITE_METADATA.phone}
          </p>
        </div>
      </div>
    </section>
  );
};
