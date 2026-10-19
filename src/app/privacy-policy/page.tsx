import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_METADATA } from "@/data/siteData";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Cyber Design House",
  description: "Privacy Policy and data governance practices for Cyber Design House (by VoometDesign).",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative pt-28 pb-20 overflow-hidden min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 hover:text-sky-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Homepage</span>
        </Link>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-sky-400/20 text-sky-400 font-mono text-xs uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Compliance & Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-2">
            Last updated: October 19, 2026 · Governing entity: Cyber Design House (by VoometDesign)
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Introduction & Overview</h2>
            <p>
              Cyber Design House ("we", "our", or "us"), an IT and digital engineering company operating as part of VoometDesign (established 2010), is committed to respecting your privacy and safeguarding your personal information. This Privacy Policy details how we collect, store, and utilize information collected through our website (<strong className="text-white">{SITE_METADATA.siteUrl}</strong>) and consultation enquiry channels.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
            <p>We collect information that you explicitly submit to us when requesting a consultation or quote, including:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li>Full name and corporate title</li>
              <li>Business email address and telephone/WhatsApp contact details</li>
              <li>Company name and website URL</li>
              <li>Project requirements, estimated budgets, and project scope details</li>
            </ul>
            <p>
              We also automatically collect non-personally identifiable technical telemetry (e.g. browser type, operating system, pages viewed) via privacy-centric Google Tag Manager and GA4 with IP anonymization enabled.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. How We Use Your Information</h2>
            <p>We use collected data solely for legitimate business operations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li>To evaluate project feasibility and prepare customized service proposals</li>
              <li>To schedule discovery calls and project scoping sessions</li>
              <li>To fulfill contractual obligations and provide client support</li>
              <li>To detect and prevent spam, fraud, and security vulnerabilities</li>
            </ul>
            <p>We never sell, rent, or trade your personal information to third-party data brokers or marketing networks.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Cookies and Analytical Tracking</h2>
            <p>
              We employ essential technical cookies required for web application performance and non-essential analytical cookies to measure site engagement. You can modify your preferences at any time via our Cookie Consent banner or through your browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Contact Information</h2>
            <p>
              For questions regarding this policy or to request data erasure under applicable privacy regulations, contact our Data Governance Officer:
            </p>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-mono space-y-1">
              <div>Email: {SITE_METADATA.email}</div>
              <div>Phone: {SITE_METADATA.phone}</div>
              <div>Address: {SITE_METADATA.address}</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
