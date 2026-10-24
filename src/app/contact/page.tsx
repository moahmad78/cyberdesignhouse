"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { SITE_METADATA } from "@/data/siteData";
import {
  Phone,
  Mail,
  User,
  Building,
  MessageSquare,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Send,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    services: ["Web & App Development"],
    duration: "",
    message: "",
    consent: true,
    honeypot: "",
  });

  const [otherServiceText, setOtherServiceText] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const availableServices = [
    "Select Service",
    "Web & App Development",
    "SEO & Digital Marketing",
    "Influencer Marketing",
    "Other",
  ];

  const durationOptions = [
    "Select Expected Duration",
    "Immediate (Within 1-2 Weeks)",
    "1 Month (Fast Sprint)",
    "2-3 Months (Standard Build)",
    "3-6 Months (Custom Enterprise)",
    "Flexible / Ongoing",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim() || !formData.consent) {
      setStatus("error");
      setErrorMessage("Please fill in your name, work email, and project scope details.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const finalServices = formData.services.map((s) =>
      s === "Other" && otherServiceText.trim() ? `Other (${otherServiceText.trim()})` : s
    );

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          budget: formData.duration,
          duration: formData.duration,
          services: finalServices,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setStatus("success");
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#071633", "#2563eb", "#ffffff", "#10b981"],
      });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again or WhatsApp us directly."
      );
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello! I am reaching out to Cyber Design House from the contact page to request a consultation${formData.duration ? ` (Expected Duration: ${formData.duration})` : ""}.`
  );

  return (
    <div className="relative pt-24 pb-20 overflow-hidden min-h-screen bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* VoometDesign Section Header: Left-Right Split */}
        <SectionHeader
          caption="CONSULTATION & ENQUIRIES"
          titleLine1="Let's Build Something"
          titleLine2="Great Together."
          description="Tell us about your project scope or goals. We review and respond within 1 business day."
        />

        {/* 2-Column Layout (Section 6.3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form on White Card (PRD 3.2 & 3.6) */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-[28px] border border-[#e5eaf2] shadow-sm">
            {status === "success" ? (
              <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-400/40 flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#071633]">Consultation Request Received!</h2>
                
                {/* 30 Minutes Highlight Card */}
                <div className="w-full max-w-md mx-auto my-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-50/90 via-slate-50 to-white border border-emerald-200 text-center shadow-xs">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white font-mono text-[10.5px] font-bold uppercase tracking-wider mb-2.5 shadow-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Fast Response Commitment</span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-[#071633] tracking-tight">
                    We will contact you soon within{" "}
                    <span className="text-emerald-600 underline decoration-emerald-300 underline-offset-4">
                      30 minutes
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Our senior engineering lead in Bangalore is reviewing your scope and will reach out shortly.
                  </p>
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        services: [],
                        duration: "",
                        message: "",
                        consent: false,
                        honeypot: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#f8fafc] border border-[#e5eaf2] hover:bg-slate-100 text-[#071633] text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name & Email (2-col) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#071633] mb-1">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#071633] focus:ring-2 focus:ring-[#071633]/15 text-xs text-slate-800 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#071633] mb-1">
                      Work Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        placeholder="rahul@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#071633] focus:ring-2 focus:ring-[#071633]/15 text-xs text-slate-800 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone & Company (2-col) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#071633] mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#071633] focus:ring-2 focus:ring-[#071633]/15 text-xs text-slate-800 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#071633] mb-1">
                      Company / Organization
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="e.g. Acme Studio"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#071633] focus:ring-2 focus:ring-[#071633]/15 text-xs text-slate-800 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Selection (30%) & Project Duration (70%) */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-3.5">
                    {/* Service Needed Dropdown (32% width) */}
                    <div className="w-full sm:w-[32%] shrink-0">
                      <label className="block text-xs font-semibold text-[#071633] mb-1">
                        Service Needed *
                      </label>
                      <select
                        value={formData.services[0] || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData({
                            ...formData,
                            services: val ? [val] : [],
                          });
                        }}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#071633] focus:ring-2 focus:ring-[#071633]/15 text-xs text-slate-800 outline-none transition-all bg-white"
                      >
                        {availableServices.map((opt) => (
                          <option key={opt} value={opt === "Select Service" ? "" : opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Expected Duration (68% width) */}
                    <div className="w-full sm:flex-1">
                      <label className="block text-xs font-semibold text-[#071633] mb-1">
                        Project Duration
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#071633] focus:ring-2 focus:ring-[#071633]/15 text-xs text-slate-800 outline-none transition-all bg-white"
                      >
                        {durationOptions.map((opt) => (
                          <option key={opt} value={opt === "Select Expected Duration" ? "" : opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* If "Other" is selected, show an inline input */}
                  {formData.services[0] === "Other" && (
                    <div className="pt-0.5">
                      <input
                        type="text"
                        placeholder="Please specify your custom requirement (e.g. 3D Branding, Custom SaaS, etc.)"
                        value={otherServiceText}
                        onChange={(e) => setOtherServiceText(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-[#071633] focus:ring-2 focus:ring-[#071633]/15 text-xs text-slate-800 outline-none transition-all bg-slate-50"
                      />
                    </div>
                  )}
                </div>

                {/* Project Scope / Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#071633] mb-1">
                    Project Scope & Timeline Details *
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <textarea
                      required
                      rows={4}
                      placeholder="Briefly describe your objectives, deliverables (e.g. web application, native mobile app, creator launch), or timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#071633] focus:ring-2 focus:ring-[#071633]/15 text-xs text-slate-800 outline-none transition-all resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Privacy Consent Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="w-4 h-4 rounded text-[#071633] focus:ring-[#071633] border-slate-300"
                  />
                  <label htmlFor="consent" className="text-[11.5px] text-slate-500 flex items-center gap-1 cursor-pointer">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline shrink-0" />
                    <span>I agree to receive a direct consultation from Cyber Design House engineers.</span>
                  </label>
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Action Buttons Row */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={status === "loading" || !formData.consent}
                    className="w-full sm:flex-1 h-12 rounded-full bg-[#071633] hover:bg-[#0c2452] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/919845014279?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 h-12 rounded-full border border-emerald-500/40 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Directly</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Card, WhatsApp, Map (PRD 6.3) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 sm:p-9 rounded-[28px] border border-[#e5eaf2] shadow-sm space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#6e7d9b] font-bold block mb-1">
                  BANGALORE STUDIO
                </span>
                <h2 className="text-2xl font-bold text-[#071633] tracking-tight">Direct Contacts</h2>
                <p className="text-xs text-[#62748e] mt-1">
                  Technology Arm of VoometDesign (Established 2010)
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#071633] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071633] block text-xs uppercase tracking-wider font-semibold">
                      Office Address
                    </strong>
                    <span className="text-[#314158] text-[13px] leading-relaxed font-normal">
                      {SITE_METADATA.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#071633] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071633] block text-xs uppercase tracking-wider font-semibold">
                      Phone / WhatsApp
                    </strong>
                    <a
                      href={`tel:${SITE_METADATA.phoneRaw}`}
                      className="text-[#314158] hover:text-[#071633] font-mono text-xs transition-colors"
                    >
                      {SITE_METADATA.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#071633] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071633] block text-xs uppercase tracking-wider font-semibold">
                      Email
                    </strong>
                    <a
                      href={`mailto:${SITE_METADATA.email}`}
                      className="text-[#314158] hover:text-[#071633] text-xs transition-colors"
                    >
                      {SITE_METADATA.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#071633] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#071633] block text-xs uppercase tracking-wider font-semibold">
                      Working Hours
                    </strong>
                    <span className="text-[#314158] text-[13px] font-normal">
                      Monday to Friday: 9:30 AM – 6:30 PM IST
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-2 border-t border-slate-100">
                <a
                  href={`https://wa.me/919845014279?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
