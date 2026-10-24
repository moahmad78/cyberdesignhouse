import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_METADATA } from "@/data/siteData";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { CompanySidebar } from "@/components/layout/CompanySidebar";

export const metadata: Metadata = {
  title: "Privacy Policy | Cyber Design House",
  description: "Privacy Policy and data governance practices for Cyber Design House (by VoometDesign).",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative pt-28 pb-20 min-h-screen bg-[#fafaf8]">
      {/* Architectural Grid Background */}
      <div className="absolute inset-0 bg-architectural-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#071633] font-bold uppercase tracking-wider hover:text-slate-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Homepage</span>
        </Link>

        {/* 2-Column Responsive Layout: Sidebar Left, Content Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Navigation Sidebar (Sticky Pinned) */}
          <div className="lg:col-span-4 xl:col-span-3.5 lg:sticky lg:top-24 self-start">
            <CompanySidebar current="privacy-policy" />
          </div>

          {/* Right Column: Privacy Policy Content */}
          <div className="lg:col-span-8 xl:col-span-8.5 space-y-6">
            <div className="mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#071633] font-mono text-[10.5px] uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#071633]" />
                <span>Privacy &amp; Governance</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-[#071633] tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-xs font-mono text-slate-500 mt-2">
                Last updated: October 19, 2026 · Governing entity: Cyber Design House (by VoometDesign)
              </p>
            </div>

            <div className="bg-white p-7 sm:p-10 rounded-[28px] border border-[#e5eaf2] shadow-xs space-y-8 text-[#334155] text-sm sm:text-base leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#071633] tracking-tight">
                  1. Introduction &amp; Overview
                </h2>
                <p className="text-[#475569] leading-relaxed">
                  Cyber Design House (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), an IT and digital engineering company operating as part of VoometDesign (established 2010), is committed to respecting your privacy and safeguarding your personal information. This Privacy Policy details how we collect, store, and utilize information collected through our website (<strong className="text-[#071633] font-semibold">{SITE_METADATA.siteUrl}</strong>) and consultation enquiry channels.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#071633] tracking-tight">
                  2. Information We Collect
                </h2>
                <p className="text-[#475569] leading-relaxed">
                  We collect information that you explicitly submit to us when requesting a consultation or quote, including:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-[#475569]">
                  <li>Full name and corporate title</li>
                  <li>Business email address and telephone/WhatsApp contact details</li>
                  <li>Company name and website URL</li>
                  <li>Project requirements, estimated budgets, and project scope details</li>
                </ul>
                <p className="text-[#475569] leading-relaxed">
                  We also automatically collect non-personally identifiable technical telemetry (e.g. browser type, operating system, pages viewed) via privacy-centric Google Tag Manager and GA4 with IP anonymization enabled.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#071633] tracking-tight">
                  3. How We Use Your Information
                </h2>
                <p className="text-[#475569] leading-relaxed">
                  We use collected data solely for legitimate business operations:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-[#475569]">
                  <li>To evaluate project feasibility and prepare customized service proposals</li>
                  <li>To schedule discovery calls and project scoping sessions</li>
                  <li>To fulfill contractual obligations and provide client support</li>
                  <li>To detect and prevent spam, fraud, and security vulnerabilities</li>
                </ul>
                <p className="text-[#475569] leading-relaxed">
                  We never sell, rent, or trade your personal information to third-party data brokers or marketing networks.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#071633] tracking-tight">
                  4. Cookies and Analytical Tracking
                </h2>
                <p className="text-[#475569] leading-relaxed">
                  We employ essential technical cookies required for web application performance and non-essential analytical cookies to measure site engagement. You can modify your preferences at any time via our Cookie Consent banner or through your browser settings.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#071633] tracking-tight">
                  5. Contact Information
                </h2>
                <p className="text-[#475569] leading-relaxed">
                  For questions regarding this policy or to request data erasure under applicable privacy regulations, contact our Data Governance Officer:
                </p>
                <div className="p-5 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] text-xs font-mono text-[#071633] space-y-1.5 shadow-2xs">
                  <div><strong className="text-slate-500 font-semibold">Email:</strong> {SITE_METADATA.email}</div>
                  <div><strong className="text-slate-500 font-semibold">Phone:</strong> {SITE_METADATA.phone}</div>
                  <div><strong className="text-slate-500 font-semibold">Address:</strong> {SITE_METADATA.address}</div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
