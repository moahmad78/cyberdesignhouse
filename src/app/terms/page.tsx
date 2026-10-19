import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_METADATA } from "@/data/siteData";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Cyber Design House",
  description: "Terms and conditions of engagement for Cyber Design House (by VoometDesign).",
};

export default function TermsPage() {
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
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-2">
            Last updated: October 19, 2026 · Cyber Design House (by VoometDesign)
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Agreement to Terms</h2>
            <p>
              By accessing our website or engaging Cyber Design House for web development, mobile application engineering, SEO, or digital marketing services, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Scope of Services & SOW</h2>
            <p>
              All engineering and design deliverables are governed by formal, mutually signed Statements of Work (SOW) defining milestones, technical acceptance criteria, delivery dates, and fee schedules. Any modifications or feature additions requested outside the approved SOW are managed via formal change orders.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Intellectual Property & Code Ownership</h2>
            <p>
              Upon receipt of full and final payment for completed project milestones, Cyber Design House transfers complete, unrestricted ownership of custom application source code, visual designs, assets, and database schemas created specifically for the client, with zero proprietary lock-in.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Warranty & Post-Launch Support</h2>
            <p>
              Unless otherwise specified in the SOW, all production deliverables include thirty (30) consecutive calendar days of complimentary post-launch warranty covering bug remediation and platform stability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Governing Law & Jurisdiction</h2>
            <p>
              These Terms and any project engagements are governed by the laws of India. Any legal disputes shall be subject to the exclusive jurisdiction of the competent courts in Bangalore, Karnataka, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
