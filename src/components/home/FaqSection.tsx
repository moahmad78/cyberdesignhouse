"use client";

import React, { useState } from "react";
import { HOME_FAQS } from "@/data/siteData";
import { ChevronDown, Send, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  // Short form state
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    service: "Web Platform",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const servicesList = [
    "Web Platform",
    "Mobile App",
    "SEO & Marketing",
    "Influencer Campaign",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) {
      setErrorMessage("Please enter your name and contact info.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const isEmail = formData.contact.includes("@");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: isEmail ? formData.contact : `${formData.name.toLowerCase().replace(/\s+/g, "")}@inquiry.voometdesign.com`,
          phone: !isEmail ? formData.contact : "",
          company: "",
          services: [formData.service],
          budget: "",
          message: formData.message || `Quick inquiry via FAQ section regarding ${formData.service}`,
          consent: true,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: "", contact: "", service: "Web Platform", message: "" });
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please try again or WhatsApp us directly.");
    } finally {
      setIsSubmitting(false);
    }
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
    <section className="py-14 sm:py-20 lg:py-24 relative bg-[#fafaf8] overflow-hidden border-t border-[#e5eaf2]">
      {/* Inject FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader
          caption="CLARIFICATIONS & SCOPING"
          titleLine1="Frequently Asked Questions"
          titleLine2="Clear Terms & Honest Scopes"
          description="Direct details regarding project timelines, full IP ownership, technology selection, and long-term production maintenance plans."
        />

        {/* 2-Column Layout: FAQs on Left (7 cols) + Short Inquiry Form on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mt-8 sm:mt-10">
          {/* Left Column: FAQ Accordions */}
          <div className="lg:col-span-7 space-y-3.5">
            {HOME_FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-[18px] sm:rounded-[20px] bg-white border border-[#e5eaf2] transition-all overflow-hidden shadow-xs hover:border-slate-300"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-[#071633] tracking-tight">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-[#071633] text-white rotate-180"
                          : "bg-[#f8fafc] border border-[#e5eaf2] text-[#45556c]"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out px-5 sm:px-6 ${
                      isOpen ? "max-h-96 pb-5 sm:pb-6 opacity-100" : "max-h-0 pb-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <p className="text-[14px] sm:text-[15px] text-[#314158] font-normal leading-relaxed border-t border-slate-100 pt-3.5">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Architectural Short Inquiry Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="light-card p-6 sm:p-7 rounded-[22px] sm:rounded-[24px] bg-white border border-[#e5eaf2] shadow-sm">
              <div className="mb-5 pb-4 border-b border-slate-100">
                <span className="font-heading text-[12px] sm:text-[12.5px] uppercase tracking-[0.2em] font-[900] text-[#3b4c68] block mb-1">
                  DIRECT TECHNICAL CONSULTATION
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#071633] tracking-tight">
                  Have a Specific Requirement?
                </h3>
                <p className="text-[13px] sm:text-[13.5px] text-[#45556c] font-normal mt-1 leading-relaxed">
                  Drop a quick message. We review and respond within 4 hours.
                </p>
              </div>

              {isSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#071633]">Inquiry Received</h4>
                  <p className="text-xs text-[#45556c] max-w-xs mx-auto">
                    Thank you. We have received your scope details. Our senior architect will review and reach out shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs font-semibold text-[#071633] hover:underline pt-2 cursor-pointer"
                  >
                    Send another question
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Name */}
                  <div>
                    <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#45556c] block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg bg-[#f8fafc] border border-[#e5eaf2] text-[13px] text-[#071633] placeholder:text-[#6e7d9b]/60 focus:outline-none focus:border-[#071633] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Email or Phone */}
                  <div>
                    <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#45556c] block mb-1">
                      Email or WhatsApp *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="rahul@company.com or +91 98765 43210"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg bg-[#f8fafc] border border-[#e5eaf2] text-[13px] text-[#071633] placeholder:text-[#6e7d9b]/60 focus:outline-none focus:border-[#071633] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Service Chips */}
                  <div>
                    <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#45556c] block mb-1.5">
                      Service Area
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {servicesList.map((svc) => (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: svc })}
                          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all text-center border cursor-pointer ${
                            formData.service === svc
                              ? "bg-[#071633] text-white border-[#071633] shadow-xs"
                              : "bg-[#f8fafc] text-[#45556c] border-[#e5eaf2] hover:border-slate-300"
                          }`}
                        >
                          {svc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brief Note / Question */}
                  <div>
                    <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#45556c] block mb-1">
                      Brief Scope or Question
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Briefly describe your objectives, deliverables (e.g. web application, native mobile app, creator launch), or timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-[#f8fafc] border border-[#e5eaf2] text-[12.5px] text-[#071633] placeholder:text-[#6e7d9b]/60 focus:outline-none focus:border-[#071633] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-[11.5px] text-red-600 font-medium">{errorMessage}</p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 rounded-lg bg-[#071633] hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all duration-300 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <span>Request Architecture Scope</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  {/* Micro Trust Note */}
                  <div className="pt-2 flex items-center justify-center gap-1.5 text-[10.5px] font-mono text-[#6e7d9b]">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>100% Confidential · Zero Spam · Direct to Senior Architect</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
