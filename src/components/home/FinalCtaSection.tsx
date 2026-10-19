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
    <section className="py-20 sm:py-28 relative bg-[#f8fafc] overflow-hidden border-t border-[#e5eaf2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-[32px] bg-[#071633] p-8 sm:p-14 lg:p-16 text-center overflow-hidden shadow-2xl">
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

          <span className="text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.25em] text-slate-300 font-bold block mb-4">
            GET IN TOUCH
          </span>

          <h2 className="text-[clamp(32px,4.5vw,56px)] font-bold text-white tracking-tight leading-[1.05] max-w-3xl mx-auto">
            Have a Project in Mind? <br />
            <span className="text-slate-300 font-light">Let's Build It Together.</span>
          </h2>

          <p className="mt-6 text-[15px] sm:text-[17px] text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Whether you need a high-performance web platform, an enterprise mobile application, or technical SEO that drives real leads in Bangalore, our engineering team is ready.
          </p>

          {/* Action CTAs: Fully rounded pills matching VoometDesign */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto h-[54px] sm:h-[56px] px-8 rounded-full bg-white text-[#071633] font-bold text-[14px] tracking-wide shadow-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/919845014279?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto h-[54px] sm:h-[56px] px-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[14px] tracking-wide shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <p className="mt-8 text-xs text-slate-400 font-light">
            Studio Headquarters: 5th Floor, Affinity Akash, Avalahalli Village, Yelahanka Hobli, Bangalore 560064 · {SITE_METADATA.phone}
          </p>
        </div>
      </div>
    </section>
  );
};
