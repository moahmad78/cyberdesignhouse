"use client";

import React, { useState } from "react";
import { HOME_FAQS } from "@/data/siteData";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-20 sm:py-28 relative bg-[#fafaf8] overflow-hidden border-t border-[#e5eaf2]">
      {/* Inject FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* VoometDesign Section Header: Centered */}
        <SectionHeader
          caption="CLARIFICATIONS"
          titleLine1="Frequently Asked Questions"
          titleLine2="Clear Terms & Honest Scopes"
          description="Direct details regarding project timelines, full IP ownership, technology selection, and long-term production maintenance."
          centered
        />

        {/* FAQ: rounded bordered rows with chevron that turns navy when open (PRD 3.6) */}
        <div className="space-y-3.5">
          {HOME_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-[20px] bg-white border border-[#e5eaf2] transition-all overflow-hidden shadow-sm hover:border-slate-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#071633] tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-[#071633] text-white rotate-180"
                        : "bg-[#f8fafc] border border-[#e5eaf2] text-[#45556c]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out px-6 sm:px-7 ${
                    isOpen ? "max-h-96 pb-6 sm:pb-7 opacity-100" : "max-h-0 pb-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="text-[14px] sm:text-[15px] text-[#45556c] font-light leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
