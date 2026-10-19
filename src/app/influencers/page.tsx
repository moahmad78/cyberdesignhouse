"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  INFLUENCERS_LIST,
  INFLUENCER_CATEGORIES,
  type Influencer,
} from "@/data/influencerData";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Search,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Eye,
  Users,
  Video,
  Send,
  Loader2,
  Sparkles,
  MessageCircle,
} from "lucide-react";

export default function InfluencersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Creators");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Onboarding Form State
  const [formState, setFormState] = useState({
    name: "",
    handle: "",
    platform: "Instagram Reels",
    category: "Tech & AI",
    followers: "",
    avgViews: "",
    email: "",
    phone: "",
    sampleReel: "",
    message: "",
  });

  const [applyStatus, setApplyStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [applyError, setApplyError] = useState("");

  const filteredInfluencers = INFLUENCERS_LIST.filter((inf) => {
    const matchesCategory =
      selectedCategory === "All Creators" || inf.category === selectedCategory;
    const matchesSearch =
      inf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inf.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inf.niche.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.handle || !formState.email || !formState.phone) {
      setApplyError("Please complete all required fields.");
      setApplyStatus("error");
      return;
    }

    setApplyStatus("loading");
    setApplyError("");

    try {
      const res = await fetch("/api/influencer-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application.");
      }

      setApplyStatus("success");
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#071633", "#2563eb", "#38bdf8", "#10b981"],
      });
    } catch (err: unknown) {
      setApplyStatus("error");
      setApplyError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return (
          <svg className="w-3.5 h-3.5 text-pink-600 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case "YouTube":
        return (
          <svg className="w-3.5 h-3.5 text-red-600 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      case "LinkedIn":
        return (
          <svg className="w-3.5 h-3.5 text-[#0077b5] fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      default:
        return <Video className="w-3.5 h-3.5 text-[#071633]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#45556c] pt-24 pb-20 overflow-hidden">
      {/* 1. Hero Section: Left-Right Split (VoometDesign layout) */}
      <section className="relative py-14 sm:py-20 bg-[#fafaf8] border-b border-[#e5eaf2]">
        <div className="absolute inset-0 bg-architectural-grid pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            caption="CREATOR NETWORK & REELS"
            titleLine1="Find Top Influencers."
            titleLine2="Drive Millions of Reel Views."
            description="Collaborate with vetted creators across tech, software architectures, luxury interiors, and modern design. Hire verified creators or apply to join our creator roster."
          >
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="#find-creators"
                className="h-[48px] px-6 rounded-full bg-[#071633] hover:bg-[#0f172a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Find Creators</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#join-network"
                className="h-[48px] px-6 rounded-full bg-white hover:bg-slate-50 text-[#071633] border border-[#e5eaf2] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span>Join as Creator</span>
              </a>
            </div>
          </SectionHeader>

          {/* Quick Metrics Bar (VoometDesign card style) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="light-card p-6 rounded-[24px] bg-white border border-[#e5eaf2]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center text-[#071633]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#071633]">1.8M+</div>
                  <div className="text-xs uppercase tracking-wider text-[#6e7d9b] font-medium">Total Reach</div>
                </div>
              </div>
            </div>

            <div className="light-card p-6 rounded-[24px] bg-white border border-[#e5eaf2]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center text-[#071633]">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#071633]">3.4M+</div>
                  <div className="text-xs uppercase tracking-wider text-[#6e7d9b] font-medium">Monthly Views</div>
                </div>
              </div>
            </div>

            <div className="light-card p-6 rounded-[24px] bg-white border border-[#e5eaf2]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center text-[#071633]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#071633]">7.4%</div>
                  <div className="text-xs uppercase tracking-wider text-[#6e7d9b] font-medium">Avg Engagement</div>
                </div>
              </div>
            </div>

            <div className="light-card p-6 rounded-[24px] bg-white border border-[#e5eaf2]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center text-[#071633]">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#071633]">100%</div>
                  <div className="text-xs uppercase tracking-wider text-[#6e7d9b] font-medium">Verified Creators</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Find Influencers" Catalog Section */}
      <section id="find-creators" className="py-20 bg-white border-b border-[#e5eaf2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Controls: Left-Right Split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-10">
            <div className="md:col-span-7">
              <span className="text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold text-[#6E7D9B] mb-2 block">
                CREATOR DIRECTORY
              </span>
              <h2 className="text-[#071633] text-[clamp(32px,3.5vw,48px)] font-bold leading-[1.05] tracking-tight">
                Onboarded Influencers <br />
                <span className="text-slate-500 font-light">Available for Reels & Campaigns</span>
              </h2>
            </div>

            {/* Search Box on Right */}
            <div className="md:col-span-5 flex md:justify-end">
              <div className="relative w-full max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by creator, niche, or handle..."
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-[#f8fafc] border border-[#e5eaf2] text-sm text-[#071633] placeholder-slate-400 focus:bg-white focus:border-[#071633] transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Category Filter Pills (VoometDesign style) */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {INFLUENCER_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === category
                    ? "bg-[#071633] text-white shadow-sm"
                    : "bg-white text-[#45556c] border border-[#e5eaf2] hover:border-slate-300 hover:text-[#071633]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Influencer Profile Cards Grid (VoometDesign light card style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInfluencers.map((inf) => {
              const whatsappCollabMsg = encodeURIComponent(
                `Hello! I would like to book an influencer reel/campaign collaboration with ${inf.name} (${inf.handle}) through Cyber Design House.`
              );

              return (
                <div
                  key={inf.id}
                  className="light-card rounded-[28px] p-7 bg-white border border-[#e5eaf2] flex flex-col justify-between"
                >
                  <div>
                    {/* Top Creator Header */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-[#e5eaf2]">
                        <Image
                          src={inf.avatar}
                          alt={inf.name}
                          fill
                          sizes="64px"
                          unoptimized
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <h3 className="text-lg font-bold text-[#071633] truncate">
                            {inf.name}
                          </h3>
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        </div>
                        <p className="text-xs font-mono text-[#6e7d9b] font-medium truncate">
                          {inf.handle}
                        </p>
                        <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-[#f8fafc] border border-[#e5eaf2] text-[11px] font-semibold text-[#071633]">
                          {inf.badge}
                        </span>
                      </div>
                    </div>

                    <p className="text-[13px] text-[#45556c] font-light leading-relaxed mb-6">
                      {inf.niche}
                    </p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-[#f8fafc] border border-[#e5eaf2] mb-6 text-center">
                      <div>
                        <div className="text-sm font-bold text-[#071633]">{inf.followers}</div>
                        <div className="text-[10px] uppercase tracking-wider text-[#6e7d9b] font-medium mt-0.5">
                          Followers
                        </div>
                      </div>
                      <div className="border-x border-slate-200">
                        <div className="text-sm font-bold text-[#071633]">{inf.avgReelViews}</div>
                        <div className="text-[10px] uppercase tracking-wider text-[#6e7d9b] font-medium mt-0.5">
                          Reel Views
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-emerald-600">{inf.engagementRate}</div>
                        <div className="text-[10px] uppercase tracking-wider text-[#6e7d9b] font-medium mt-0.5">
                          Engagement
                        </div>
                      </div>
                    </div>

                    {/* Platforms & Deliverables */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-wider text-[#6e7d9b] font-medium">
                          Platforms:
                        </span>
                        <div className="flex items-center gap-1.5">
                          {inf.platforms.map((p) => (
                            <span
                              key={p}
                              className="w-7 h-7 rounded-full bg-white border border-[#e5eaf2] flex items-center justify-center shadow-xs"
                              title={p}
                            >
                              {getPlatformIcon(p)}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {inf.deliverables.map((del) => (
                          <span
                            key={del}
                            className="px-2.5 py-1 rounded-md bg-white border border-[#e5eaf2] text-[11px] text-[#45556c]"
                          >
                            {del}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <a
                      href={`https://wa.me/919845014279?text=${whatsappCollabMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-[44px] rounded-full bg-[#071633] hover:bg-[#0f172a] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Hire For Reel</span>
                    </a>

                    <Link
                      href="/contact"
                      className="h-[44px] px-4 rounded-full border border-[#071633]/15 text-[#071633] font-semibold text-xs uppercase tracking-wider flex items-center justify-center hover:bg-slate-50 transition-colors"
                    >
                      Inquire
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredInfluencers.length === 0 && (
            <div className="text-center py-16 bg-[#f8fafc] rounded-[28px] border border-[#e5eaf2]">
              <p className="text-base text-[#45556c]">No influencers found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All Creators");
                  setSearchQuery("");
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#071633] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. "Join Our Creator Network" Onboarding Form Section */}
      <section id="join-network" className="py-20 sm:py-28 bg-[#fafaf8] border-b border-[#e5eaf2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            caption="CREATOR ONBOARDING"
            titleLine1="Are You an Influencer?"
            titleLine2="Join Our Bangalore Creator Network."
            description="We connect content creators with paid brand campaigns, product launches, luxury spatial tours, and high-budget video reel collaborations."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Form: White Card (VoometDesign Card Style) */}
            <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-[28px] border border-[#e5eaf2] shadow-sm">
              {applyStatus === "success" ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#071633]">Creator Application Received!</h3>
                  <p className="text-[#45556c] text-sm font-light max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#071633]">{formState.name}</strong>. Our creator partnerships manager will review your reels and profile and connect via WhatsApp within 2 business days.
                  </p>
                  <div className="pt-6">
                    <button
                      onClick={() => {
                        setApplyStatus("idle");
                        setFormState({
                          name: "",
                          handle: "",
                          platform: "Instagram Reels",
                          category: "Tech & AI",
                          followers: "",
                          avgViews: "",
                          email: "",
                          phone: "",
                          sampleReel: "",
                          message: "",
                        });
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#f8fafc] border border-[#e5eaf2] hover:bg-slate-100 text-[#071633] text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Submit Another Application
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#314158] font-semibold mb-2">
                        Creator / Full Name <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] placeholder-slate-400 text-sm transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#314158] font-semibold mb-2">
                        Social Handle / Profile Link <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.handle}
                        onChange={(e) => setFormState({ ...formState, handle: e.target.value })}
                        placeholder="e.g. @rahul_tech or instagram.com/..."
                        className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] placeholder-slate-400 text-sm transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#314158] font-semibold mb-2">
                        Primary Platform
                      </label>
                      <select
                        value={formState.platform}
                        onChange={(e) => setFormState({ ...formState, platform: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] text-sm transition-all outline-none cursor-pointer"
                      >
                        <option value="Instagram Reels">Instagram Reels</option>
                        <option value="YouTube Shorts / Longform">YouTube</option>
                        <option value="LinkedIn Creator">LinkedIn</option>
                        <option value="Multi-Platform">Multi-Platform</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#314158] font-semibold mb-2">
                        Primary Niche
                      </label>
                      <select
                        value={formState.category}
                        onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] text-sm transition-all outline-none cursor-pointer"
                      >
                        <option value="Tech & AI">Tech & AI</option>
                        <option value="Interior & Architecture">Interior & Architecture</option>
                        <option value="SaaS & Startups">SaaS & Startups</option>
                        <option value="3D & Design">3D & Design</option>
                        <option value="Lifestyle & Growth">Lifestyle & Growth</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#314158] font-semibold mb-2">
                        Total Followers
                      </label>
                      <input
                        type="text"
                        value={formState.followers}
                        onChange={(e) => setFormState({ ...formState, followers: e.target.value })}
                        placeholder="e.g. 50K+, 200K"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] placeholder-slate-400 text-sm transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#314158] font-semibold mb-2">
                        Email Address <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="contact@creator.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] placeholder-slate-400 text-sm transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#314158] font-semibold mb-2">
                        WhatsApp Number <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] placeholder-slate-400 text-sm transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#314158] font-semibold mb-2">
                      Sample Reel Link / Best Collaboration Video
                    </label>
                    <input
                      type="url"
                      value={formState.sampleReel}
                      onChange={(e) => setFormState({ ...formState, sampleReel: e.target.value })}
                      placeholder="https://www.instagram.com/reel/..."
                      className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] placeholder-slate-400 text-sm transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#314158] font-semibold mb-2">
                      Short Bio & Collaboration Preferences
                    </label>
                    <textarea
                      rows={3}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell us what formats you love creating (reels, unboxing, site tours, coding live)..."
                      className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] placeholder-slate-400 text-sm transition-all outline-none resize-none"
                    />
                  </div>

                  {applyStatus === "error" && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                      {applyError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={applyStatus === "loading"}
                    className="w-full h-[52px] rounded-full bg-[#071633] hover:bg-[#0f172a] text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {applyStatus === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Creator Application</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Information Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 sm:p-9 rounded-[28px] border border-[#e5eaf2] shadow-sm space-y-6">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#6e7d9b] font-bold block mb-1">
                    WHY JOIN CDH ROSTER
                  </span>
                  <h3 className="text-2xl font-bold text-[#071633] tracking-tight">Creator Benefits</h3>
                </div>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm text-[#45556c]">
                    <div className="w-5 h-5 rounded-full bg-[#f8fafc] border border-[#e5eaf2] text-[#071633] flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>
                      <strong className="text-[#071633]">High-Budget Brand Deals:</strong> Access paid campaigns from venture-backed tech startups, enterprise SaaS, and premium turnkey interior brands.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#45556c]">
                    <div className="w-5 h-5 rounded-full bg-[#f8fafc] border border-[#e5eaf2] text-[#071633] flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>
                      <strong className="text-[#071633]">On-Time Payments:</strong> Guaranteed milestone payments managed cleanly by Cyber Design House and VoometDesign.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#45556c]">
                    <div className="w-5 h-5 rounded-full bg-[#f8fafc] border border-[#e5eaf2] text-[#071633] flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>
                      <strong className="text-[#071633]">Production & Motion Support:</strong> Access our in-house 3D animation, scriptwriting, and color grading resources.
                    </span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-[#6e7d9b]">
                    Questions? Reach our Bangalore creator partnerships team directly on WhatsApp at{" "}
                    <a
                      href="https://wa.me/919845014279?text=Hi%20Cyber%20Design%20House!%20I%20have%20a%20question%20about%20your%20influencer%20creator%20network."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#071633] font-bold underline"
                    >
                      +91 98450 14279
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. For Brands Banner: Left-Right Split (VoometDesign layout) */}
      <section className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] bg-[#071633] p-8 sm:p-12 lg:p-14 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-[11px] uppercase tracking-[0.25em] text-slate-300 font-bold block">
                  BRAND CAMPAIGNS
                </span>
                <h2 className="text-[clamp(28px,3.5vw,46px)] font-bold tracking-tight leading-tight">
                  Want an End-to-End Reels Campaign for Your Brand?
                </h2>
                <p className="text-sm sm:text-base text-slate-300 font-light max-w-xl leading-relaxed">
                  We handle talent selection, creative scripting, production supervision, and performance amplification across Instagram and YouTube.
                </p>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end">
                <Link
                  href="/contact"
                  className="h-[52px] px-8 rounded-full bg-white text-[#071633] font-bold text-xs uppercase tracking-wider shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <span>Book Influencer Campaign</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
