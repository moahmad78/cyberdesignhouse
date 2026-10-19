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
  Sparkles,
  ArrowRight,
} from "lucide-react";

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
    "Web Development",
    "App Development",
    "SEO & Technical Audit",
    "Digital Marketing & Ads",
    "Other Custom Solution",
  ];

  const budgetOptions = [
    "Under ₹50,000 (~$600)",
    "₹50,000 - ₹1,50,000 ($600 - $1,800)",
    "₹1,50,000 - ₹5,00,000 ($1,800 - $6,000)",
    "₹5,00,000+ ($6,000+)",
    "Not yet decided / Need guidance",
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
      setErrorMessage("Please fill in your name, email, message and agree to privacy terms.");
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
      // Trigger festive delight confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#818cf8", "#34d399", "#e2e8f0"],
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
    <div className="relative pt-28 pb-20 overflow-hidden min-h-screen">
      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Let's build something <span className="text-gradient-cyan">great together</span>.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Tell us about your upcoming web app, mobile product, SEO, or growth objectives. We reply within one business day with clear timelines and recommendations.
          </p>
        </div>

        {/* 2-Column Layout (Section 6.3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-10 rounded-3xl border border-sky-400/20 bg-slate-900/90 shadow-2xl">
            {status === "success" ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white">Consultation Request Received!</h2>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Our senior engineering lead in Bangalore will review your requirements and follow up via email or phone within one business day.
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
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-mono font-medium transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field (hidden from real users) */}
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
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Full Name <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-white placeholder-slate-500 text-sm transition-all outline-none"
                    />
                  </div>

                  {/* Business Email */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Email Address <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vikram@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-white placeholder-slate-500 text-sm transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-white placeholder-slate-500 text-sm transition-all outline-none"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your Brand or Startup"
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-white placeholder-slate-500 text-sm transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Service Multi-Select */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Services of Interest (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {availableServices.map((service) => {
                      const isSelected = formData.services.includes(service);
                      return (
                        <button
                          type="button"
                          key={service}
                          onClick={() => handleServiceToggle(service)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
                            isSelected
                              ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.25)]"
                              : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600"
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
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Estimated Budget Range (Optional)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-sky-400 text-white text-sm transition-all outline-none"
                  >
                    <option value="">Select budget tier</option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-slate-900 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Project Goals & Requirements <span className="text-sky-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your objectives, existing stack or links, target launch date, and key features..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 text-white placeholder-slate-500 text-sm transition-all outline-none resize-none"
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
                    className="w-4 h-4 mt-0.5 rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-sky-400"
                  />
                  <label htmlFor="consent" className="text-xs text-slate-400 leading-relaxed">
                    I agree to allow Cyber Design House to process my details to respond to this consultation inquiry in accordance with the{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Consultation Scope...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Consultation Enquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Card, WhatsApp, Map */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Studio Card */}
            <div className="glass-panel p-8 rounded-3xl border border-sky-400/20 bg-slate-900/80 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-1">
                  Bangalore Studio
                </span>
                <h2 className="text-2xl font-bold text-white">Direct Contacts</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Technology Arm of VoometDesign (Est. 2010)
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-white/10 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-xs font-mono uppercase">
                      Office Address
                    </strong>
                    <span className="text-slate-300 text-xs leading-relaxed">
                      {SITE_METADATA.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-xs font-mono uppercase">
                      Phone / Inquiries
                    </strong>
                    <a
                      href={`tel:${SITE_METADATA.phoneRaw}`}
                      className="text-slate-300 hover:text-white font-mono text-xs transition-colors"
                    >
                      {SITE_METADATA.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-xs font-mono uppercase">
                      Email
                    </strong>
                    <a
                      href={`mailto:${SITE_METADATA.email}`}
                      className="text-slate-300 hover:text-white text-xs transition-colors"
                    >
                      {SITE_METADATA.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-xs font-mono uppercase">
                      Working Hours
                    </strong>
                    <span className="text-slate-300 text-xs">
                      Monday to Friday: 9:30 AM – 6:30 PM IST
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href={`https://wa.me/919845014279?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/30"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Google Maps Embed (Section 6.3) */}
            <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 h-64 relative bg-slate-950">
              <iframe
                title="Cyber Design House Bangalore Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.082531649666!2d77.590135!3d13.102287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae18608e2f8373%3A0x6476106606ea2bf7!2sYelahanka%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
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
