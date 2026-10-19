"use client";

import React, { useState } from "react";
import { HOME_FAQS } from "@/data/siteData";
import { ChevronDown } from "lucide-react";

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
    <section className="py-24 sm:py-32 relative bg-[#fafaf8] overflow-hidden border-t border-[#e5eaf2]">
      {/* Inject FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Caption label, Two-tone H2 (PRD 3.6) */}
        <div className="text-center mb-16">
          <span className="text-[12px] uppercase tracking-[0.25em] text-[#6e7d9b] font-medium block mb-2">
            Clarifications
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold text-[#071633] tracking-tight leading-tight">
            Frequently Asked Questions. <br />
            <span className="font-light text-[#62748e]">Clear terms and transparent answers.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#45556c] font-light">
            Direct details regarding scopes, delivery timelines, code ownership, and ongoing technical support.
          </p>
        </div>

        {/* FAQ: rounded bordered rows with chevron that turns navy when open (PRD 3.6) */}
        <div className="space-y-3.5">
          {HOME_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#e5eaf2] transition-all overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-[#071633]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-[#071633] text-white rotate-180"
                        : "bg-[#f8fafc] border border-[#e5eaf2] text-[#45556c]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out px-6 ${
                    isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 pb-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="text-sm sm:text-base text-[#45556c] font-light leading-relaxed border-t border-slate-100 pt-4">
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
