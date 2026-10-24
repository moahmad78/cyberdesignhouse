"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  ShieldCheck,
  BookOpen,
  Calendar,
  MessageCircle,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useConsultationModal } from "@/context/ConsultationModalContext";
import { SITE_METADATA } from "@/data/siteData";

interface CompanySidebarProps {
  current?: "terms" | "privacy-policy" | "blog" | "contact";
}

export const CompanySidebar: React.FC<CompanySidebarProps> = ({ current }) => {
  const pathname = usePathname();
  const { openModal } = useConsultationModal();

  const links = [
    {
      label: "Terms of Service",
      href: "/terms",
      slug: "terms",
      icon: <FileText className="w-4 h-4" />,
      badge: null,
    },
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
      slug: "privacy-policy",
      icon: <ShieldCheck className="w-4 h-4" />,
      badge: null,
    },
    {
      label: "Engineering Blog",
      href: "/blog",
      slug: "blog",
      icon: <BookOpen className="w-4 h-4" />,
      badge: "NEW",
    },
    {
      label: "Book Consultation",
      href: "/contact",
      slug: "contact",
      icon: <Calendar className="w-4 h-4" />,
      badge: null,
      isModal: true,
    },
  ];

  const whatsappMessage = encodeURIComponent(
    "Hello Cyber Design House! I would like to enquire about your services and book a consultation."
  );

  return (
    <aside className="w-full lg:sticky lg:top-24 self-start">
      {/* Mobile / Tablet Horizontal Navigation Bar (lg:hidden) */}
      <div className="lg:hidden mb-6 overflow-x-auto hide-scrollbar pb-1">
        <div className="flex items-center gap-2 min-w-max p-1 bg-white rounded-2xl border border-[#e5eaf2] shadow-xs">
          {links.map((item) => {
            const isActive = current === item.slug || pathname === item.href;

            if (item.isModal) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => openModal()}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide bg-[#071633] text-white hover:bg-[#0c2452] transition-colors shrink-0 shadow-xs cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all shrink-0 ${
                  isActive
                    ? "bg-[#071633] text-white shadow-xs font-bold"
                    : "text-[#475569] hover:bg-slate-100 hover:text-[#071633]"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-blue-500 text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop Sticky Sidebar Card (hidden lg:block) */}
      <div className="hidden lg:block space-y-4 max-h-[calc(100vh-7.5rem)] overflow-y-auto hide-scrollbar overscroll-contain pr-0.5">
        {/* Navigation Card */}
        <div className="bg-white rounded-[24px] border border-[#e5eaf2] p-5 shadow-xs">
          <div className="flex items-center gap-2 px-3 pb-3 mb-2 border-b border-slate-100">
            <span className="text-[10.5px] font-mono font-bold uppercase tracking-[0.16em] text-[#6E7D9B]">
              COMPANY &amp; GOVERNANCE
            </span>
          </div>

          <nav className="space-y-1.5">
            {links.map((item) => {
              const isActive = current === item.slug || pathname === item.href;

              if (item.isModal) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => openModal()}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-[#071633] hover:bg-slate-50 border border-transparent hover:border-slate-200 group text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? "bg-[#071633] text-white shadow-sm font-bold"
                      : "text-[#334155] hover:bg-slate-50 hover:text-[#071633]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "bg-slate-100 text-[#071633] group-hover:bg-slate-200"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold bg-blue-500 text-white shadow-2xs">
                      {item.badge}
                    </span>
                  ) : (
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-all ${
                        isActive
                          ? "text-white opacity-100"
                          : "text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bangalore Studio Quick Connect Box */}
        <div className="bg-gradient-to-br from-white to-[#f8fafc] rounded-[24px] border border-[#e5eaf2] p-5 shadow-xs space-y-3.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Response &lt; 30 Mins Guaranteed
            </span>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#071633]">Need Direct Tech Lead Guidance?</h4>
            <p className="text-[11.5px] text-[#64748b] leading-relaxed mt-1">
              Connect directly with our Bangalore engineering lead for immediate project scoping and NDA execution.
            </p>
          </div>

          <div className="pt-1 flex flex-col gap-2">
            <a
              href={`https://wa.me/919845014279?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-9 px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Instant WhatsApp Chat</span>
            </a>

            <button
              type="button"
              onClick={() => openModal()}
              className="w-full h-9 px-3.5 rounded-xl bg-[#071633] hover:bg-[#0c2452] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Free Call</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[10.5px] font-mono text-slate-400 space-y-0.5">
            <div>Studio: Bangalore · 5th Floor</div>
            <div>Direct: {SITE_METADATA.phone}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
