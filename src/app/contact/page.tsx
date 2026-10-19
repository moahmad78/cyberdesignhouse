"use client";

import React, { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { SITE_METADATA } from "@/data/siteData";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Send,
  Loader2,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    services: [] as string[],
    budget: "",
    message: "",
    consent: false,
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const availableServices = [
    "Influencer Marketing",
    "Website Development",
    "App Development",
    "SEO & Digital Marketing",
    "Video Editing & Graphic Design",
    "Other IT Consulting",
  ];

  const budgetOptions = [
    "Under ₹1 Lakh",
    "₹1 Lakh - ₹3 Lakhs",
    "₹3 Lakhs - ₹10 Lakhs",
    "₹10 Lakhs+",
    "To be discussed on discovery call",
  ];

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !formData.consent) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields and accept the privacy consent.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
        colors: ["#071633", "#2563eb", "#38bdf8", "#10b981"],
      });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again or WhatsApp us directly."
      );
    }
  };

  const whatsappMessage = encodeURIComponent(
    "Hello! I am reaching out to Cyber Design House from the contact page to request a consultation."
  );

  return (
    <div className="relative pt-24 pb-20 overflow-hidden min-h-screen bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* VoometDesign Section Header: Left-Right Split */}
        <SectionHeader
          caption="CONSULTATION & ENQUIRIES"
          titleLine1="Let's Build Something"
          titleLine2="Great Together."
          description="Tell us about your upcoming project, scope, or timeline goals. Our Bangalore engineering lead reviews all requirements and responds within one business day."
        />

        {/* 2-Column Layout (Section 6.3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form on White Card (PRD 3.2 & 3.6) */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-[28px] border border-[#e5eaf2] shadow-sm">
            {status === "success" ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-semibold text-[#071633]">Consultation Request Received!</h2>
                <p className="text-[#45556c] text-sm font-light max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#071633]">{formData.name}</strong>. Our senior lead in Bangalore will review your requirements and respond within one business day.
                </p>
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
                        budget: "",
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#314158] font-medium mb-2">
                      Full Name <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] placeholder-slate-400 text-sm transition-all outline-none"
                    />
                  </div>

                  {/* Business Email */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#314158] font-medium mb-2">
                      Email Address <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] placeholder-slate-400 text-sm transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#314158] font-medium mb-2">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98450 14279"
                      className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] placeholder-slate-400 text-sm transition-all outline-none"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#314158] font-medium mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company or project name"
                      className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] placeholder-slate-400 text-sm transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Service Multi-Select Chips (PRD 3.6: small uppercase pills, active one filled) */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#314158] font-medium mb-2">
                    Services of Interest
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableServices.map((service) => {
                      const isSelected = formData.services.includes(service);
                      return (
                        <button
                          type="button"
                          key={service}
                          onClick={() => handleServiceToggle(service)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                            isSelected
                              ? "bg-[#071633] text-white shadow-sm"
                              : "bg-[#f8fafc] border border-[#e5eaf2] text-[#45556c] hover:border-slate-300 hover:text-[#071633]"
                          }`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Range Dropdown */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#314158] font-medium mb-2">
                    Estimated Budget Range (Optional)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] text-[#071633] text-sm transition-all outline-none"
                  >
                    <option value="">Select an approximate scope</option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#314158] font-medium mb-2">
                    Project Brief & Scope <span className="text-blue-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your objectives, target timeline, and specific requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] placeholder-slate-400 text-sm transition-all outline-none resize-none"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#071633] focus:ring-[#071633]"
                  />
                  <label htmlFor="consent" className="text-xs text-[#62748e] leading-relaxed">
                    I agree to allow Cyber Design House to process my details to respond to this consultation enquiry in accordance with the{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-[#071633] underline underline-offset-2 hover:text-blue-600"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Primary Button: Navy Rounded Pill (PRD 3.6) */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 rounded-full bg-[#071633] hover:bg-[#0f172a] text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Consultation Scope...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Consultation Enquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
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
                    <span className="text-[#45556c] text-xs leading-relaxed font-light">
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
                      className="text-[#45556c] hover:text-[#071633] font-mono text-xs transition-colors"
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
                      className="text-[#45556c] hover:text-[#071633] text-xs transition-colors"
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
                    <span className="text-[#45556c] text-xs font-light">
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

            {/* Google Maps Embed */}
            <div className="rounded-3xl overflow-hidden border border-[#e5eaf2] h-64 relative bg-slate-100 shadow-sm">
              <iframe
                title="Cyber Design House Bangalore Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.082531649666!2d77.590135!3d13.102287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae18608e2f8373%3A0x6476106606ea2bf7!2sYelahanka%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
