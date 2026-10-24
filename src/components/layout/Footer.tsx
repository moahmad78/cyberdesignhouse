import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/brand/Logo";
import { SERVICES, SITE_METADATA } from "@/data/siteData";
import { Phone, Mail, MapPin, ExternalLink, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#030712] text-slate-300 border-t border-slate-800 overflow-hidden pt-16 pb-12">
      {/* Large faceted CD watermark in background (Section 5.3) */}
      <div className="absolute -bottom-24 -right-24 pointer-events-none opacity-5 select-none w-96 h-96 sm:w-[500px] sm:h-[500px]">
        <Image
          src="/images/cd-mark.png"
          alt=""
          width={500}
          height={500}
          className="w-full h-full object-contain filter grayscale invert"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand & VoometDesign Endorsement */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" theme="dark" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mt-2">
              Cyber Design House is the dedicated technology and digital growth arm of{" "}
              <a
                href={SITE_METADATA.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-slate-200 underline underline-offset-2 transition-colors inline-flex items-center gap-1 font-medium"
              >
                VoometDesign
                <ArrowUpRight className="w-3 h-3 inline text-white" />
              </a>
              . Delivering high-precision web development, native mobile apps, technical SEO, and conversion marketing since 2010.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Bangalore Studio · Accepting New Q4 Projects</span>
            </div>
          </div>

          {/* Core Services Links */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white mb-4 font-bold">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-[10px] font-mono text-slate-500 group-hover:text-white">
                      {s.number}
                    </span>
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white mb-4 font-bold">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/influencers" className="text-slate-400 hover:text-white transition-colors flex items-center justify-between">
                  <span>Influencers Network</span>
                  <span className="text-[10px] font-mono text-white bg-white/10 px-1.5 py-0.5 rounded border border-white/20">New</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-white transition-colors flex items-center justify-between">
                  <span>Engineering &amp; Tech Blog</span>
                  <span className="text-[10px] font-mono text-white bg-blue-600/30 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30">New</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact & Consultation
                </Link>
              </li>
              <li>
                <a
                  href={SITE_METADATA.parentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>VoometDesign Interiors</span>
                  <ExternalLink className="w-3 h-3 text-white" />
                </a>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Bangalore Headquarters */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white mb-4 font-bold">
              Bangalore Studio
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  {SITE_METADATA.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a
                  href={`tel:${SITE_METADATA.phoneRaw}`}
                  className="text-xs hover:text-white font-mono transition-colors"
                >
                  {SITE_METADATA.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a
                  href={`mailto:${SITE_METADATA.email}`}
                  className="text-xs hover:text-white transition-colors"
                >
                  {SITE_METADATA.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar (Section 5.3 & 2.3) */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <p>© 2026 Cyber Design House. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-700">•</span>
            <p className="flex items-center gap-1">
              <span>Developed by</span>
              <a
                href="https://www.instagram.com/sahil_sheikh78"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-200 font-semibold hover:text-white hover:underline transition-colors"
              >
                Sahil Sheikh
              </a>
            </p>
          </div>

          <p className="flex items-center gap-1.5">
            <span>Powered by</span>
            <a
              href={SITE_METADATA.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 font-semibold hover:text-white transition-colors"
            >
              VoometDesign
            </a>
            <span>Group.</span>
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Consultation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
