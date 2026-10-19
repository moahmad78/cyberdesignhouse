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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-[32px] bg-[#071633] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Column: Caption + Heading + Paragraph (VoometDesign Left-Right Split) */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.25em] text-slate-300 font-bold block">
                GET IN TOUCH
              </span>

              <h2 className="text-[clamp(32px,4vw,54px)] font-bold text-white tracking-tight leading-[1.05]">
                Have a Project in Mind? <br />
                <span className="text-slate-300 font-light">Let's Build It Together.</span>
              </h2>

              <p className="text-[15px] sm:text-[17px] text-slate-300 font-light max-w-xl leading-relaxed pt-2">
                Whether you need a high-performance web platform, an enterprise mobile application, or technical SEO that drives real leads in Bangalore, our engineering team is ready.
              </p>
            </div>

            {/* Right Column: Action Buttons & Location Details */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center gap-4">
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto lg:w-72">
                <Link
                  href="/contact"
                  className="w-full h-[52px] px-8 rounded-full bg-white text-[#071633] font-bold text-[14px] tracking-wide shadow-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/919845014279?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-[52px] px-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[14px] tracking-wide shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <p className="text-xs text-slate-400 font-light text-left lg:text-right max-w-xs mt-2">
                Bangalore Studio: Avalahalli Village, Yelahanka Hobli · {SITE_METADATA.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
