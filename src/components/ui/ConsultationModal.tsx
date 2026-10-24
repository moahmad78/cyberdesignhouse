"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  User,
  Building,
  MessageSquare,
  MessageCircle,
  ShieldCheck,
  Loader2,
  Clock,
} from "lucide-react";
import confetti from "canvas-confetti";
import { SITE_METADATA } from "@/data/siteData";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const AVAILABLE_SERVICES = [
  "Select Service",
  "Web & App Development",
  "SEO & Digital Marketing",
  "Influencer Marketing",
  "Other",
];

const DURATION_OPTIONS = [
  "Select Expected Duration",
  "Immediate (Within 1-2 Weeks)",
  "1 Month (Fast Sprint)",
  "2-3 Months (Standard Build)",
  "3-6 Months (Custom Enterprise)",
  "Flexible / Ongoing",
];

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultService,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    services: defaultService ? [defaultService] : ["Web & App Development"],
    duration: "",
    message: "",
    consent: true,
  });

  const [otherServiceText, setOtherServiceText] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Sync default service when opened
  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({
        ...prev,
        services: [defaultService],
      }));
    }
  }, [defaultService]);

  // Lock body scroll and pause Lenis smooth scrolling when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const getLenis = () =>
      typeof window !== "undefined"
        ? (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
        : undefined;

    const lenis = getLenis();
    lenis?.stop();

    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;

    // Prevent layout shift from scrollbar
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      lenis?.start();
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in your name, business email, and project scope.");
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
        body: JSON.stringify({ ...formData, budget: formData.duration, duration: formData.duration, services: finalServices }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setStatus("success");
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.5 },
        colors: ["#071633", "#2563eb", "#ffffff", "#10b981"],
      });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or WhatsApp us directly."
      );
    }
  };

  const selectedServiceLabel =
    formData.services[0] === "Other" && otherServiceText.trim()
      ? `Other (${otherServiceText.trim()})`
      : formData.services.join(", ") || "Consultation";

  const whatsappMessage = encodeURIComponent(
    `Hello! I'm interested in booking a consultation for Cyber Design House services (${selectedServiceLabel}).`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-[#071633]/75 backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      data-lenis-prevent="true"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-[24px] sm:rounded-[28px] shadow-[0_25px_70px_rgba(7,22,51,0.35)] border border-[#e2e8f0] overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200 overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Top Header Banner */}
        <div className="relative bg-[#071633] text-white p-5 sm:p-6 pb-6 shrink-0 overflow-hidden">
          {/* Subtle glow behind header */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <h2 id="modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Let&apos;s Build Something Great Together
              </h2>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div
          className="p-5 sm:p-7 overflow-y-auto flex-1 text-[#334155] overscroll-contain"
          data-lenis-prevent="true"
        >
          {status === "success" ? (
            <div className="py-8 sm:py-10 text-center flex flex-col items-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-400/40 text-emerald-600 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-9 h-9 text-emerald-600" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#071633] tracking-tight mb-1">
                Consultation Request Received!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Thank you, <strong>{formData.name}</strong>. Your requirement has been prioritized.
              </p>

              {/* 30 Minutes Highlight Card */}
              <div className="w-full max-w-md my-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50/90 via-slate-50 to-white border border-emerald-200 text-center shadow-xs">
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
                  Our senior engineering lead is reviewing your scope and will reach out via Phone / WhatsApp or Email.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center">
                <a
                  href={`https://wa.me/919845014279?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Follow-up</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-[#071633] text-white font-semibold text-xs tracking-wide hover:bg-[#0c2452] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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

              {/* Service Selection (30%) & Estimated Budget (70%) */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-3.5">
                  {/* Service Needed Dropdown (30% width) */}
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
                      {AVAILABLE_SERVICES.map((opt) => (
                        <option key={opt} value={opt === "Select Service" ? "" : opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Expected Duration (70% width) */}
                  <div className="w-full sm:flex-1">
                    <label className="block text-xs font-semibold text-[#071633] mb-1">
                      Project Duration
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#071633] focus:ring-2 focus:ring-[#071633]/15 text-xs text-slate-800 outline-none transition-all bg-white"
                    >
                      {DURATION_OPTIONS.map((opt) => (
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
                    rows={3}
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
                  id="modal-consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="w-4 h-4 rounded text-[#071633] focus:ring-[#071633] border-slate-300"
                />
                <label htmlFor="modal-consent" className="text-[11px] text-slate-500 flex items-center gap-1 cursor-pointer">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline shrink-0" />
                  <span>I agree to receive a direct consultation from Cyber Design House engineers.</span>
                </label>
              </div>

              {/* Error Alert */}
              {status === "error" && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Actions Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={status === "loading" || !formData.consent}
                  className="w-full sm:flex-1 h-11 rounded-full bg-[#071633] hover:bg-[#0c2452] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Consultation Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                {/* Direct WhatsApp Alternative */}
                <a
                  href={`https://wa.me/919845014279?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto h-11 px-5 rounded-full border border-emerald-600/30 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Directly</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;
