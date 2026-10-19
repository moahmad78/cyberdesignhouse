"use client";

import React, { useState } from "react";
import { HOME_FAQS } from "@/data/siteData";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Generate structured FAQPage schema
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
    <section className="py-24 sm:py-32 relative bg-[#0b111c] overflow-hidden border-t border-white/5">
      {/* Inject FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="text-gradient-cyan">Questions</span>.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Direct answers regarding project pricing, delivery timelines, code ownership, and ongoing technical support.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {HOME_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-white/5 hover:border-sky-400/30 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-sky-500/20 text-sky-400" : "text-slate-400"
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
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/5 pt-4">
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
