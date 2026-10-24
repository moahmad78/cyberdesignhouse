import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { CompanySidebar } from "@/components/layout/CompanySidebar";

export const metadata: Metadata = {
  title: "Terms of Service | Cyber Design House",
  description: "Terms and conditions of engagement for Cyber Design House (by VoometDesign).",
};

export default function TermsPage() {
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
            <CompanySidebar current="terms" />
          </div>

          {/* Right Column: Terms of Service Content */}
          <div className="lg:col-span-8 xl:col-span-8.5 space-y-6">
            <div className="mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#071633] font-mono text-[10.5px] uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#071633]" />
                <span>Legal &amp; Governance</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-[#071633] tracking-tight">
                Terms of Service
              </h1>
              <p className="text-xs font-mono text-slate-500 mt-2">
                Last updated: October 19, 2026 · Cyber Design House (by VoometDesign)
              </p>
            </div>

            <div className="bg-white p-7 sm:p-10 rounded-[28px] border border-[#e5eaf2] shadow-xs space-y-8 text-[#334155] text-sm sm:text-base leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#071633] tracking-tight">
                  1. Agreement to Terms
                </h2>
                <p className="text-[#475569] leading-relaxed">
                  By accessing our website or engaging Cyber Design House for web development, mobile application engineering, SEO, or digital marketing services, you agree to be bound by these Terms of Service.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#071633] tracking-tight">
                  2. Scope of Services &amp; SOW
                </h2>
                <p className="text-[#475569] leading-relaxed">
                  All engineering and design deliverables are governed by formal, mutually signed Statements of Work (SOW) defining milestones, technical acceptance criteria, delivery dates, and fee schedules. Any modifications or feature additions requested outside the approved SOW are managed via formal change orders.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#071633] tracking-tight">
                  3. Intellectual Property &amp; Code Ownership
                </h2>
                <p className="text-[#475569] leading-relaxed">
                  Upon receipt of full and final payment for completed project milestones, Cyber Design House transfers complete, unrestricted ownership of custom application source code, visual designs, assets, and database schemas created specifically for the client, with zero proprietary lock-in.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#071633] tracking-tight">
                  4. Warranty &amp; Post-Launch Support
                </h2>
                <p className="text-[#475569] leading-relaxed">
                  Unless otherwise specified in the SOW, all production deliverables include thirty (30) consecutive calendar days of complimentary post-launch warranty covering bug remediation and platform stability.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold text-[#071633] tracking-tight">
                  5. Governing Law &amp; Jurisdiction
                </h2>
                <p className="text-[#475569] leading-relaxed">
                  These Terms and any project engagements are governed by the laws of India. Any legal disputes shall be subject to the exclusive jurisdiction of the competent courts in Bangalore, Karnataka, India.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
