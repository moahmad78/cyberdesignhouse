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
  MessageCircle,
} from "lucide-react";

export default function InfluencersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Talent");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Onboarding Form State
  const [formState, setFormState] = useState({
    name: "",
    handle: "",
    platform: "Instagram Reels",
    category: "Video Editors",
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
      selectedCategory === "All Talent" ||
      selectedCategory === "All Creators" ||
      inf.category === selectedCategory;
    const matchesSearch =
      inf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inf.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inf.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inf.roleTitle && inf.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()));
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
        colors: ["#071633", "#2563eb", "#ffffff", "#10b981"],
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
    <div className="min-h-screen bg-[#fafaf8] text-[#45556c] pt-[72px] sm:pt-[80px] pb-14">
      {/* 1. Hero Section: Fresh & Clean */}
      <section className="relative pt-10 pb-8 sm:pt-12 sm:pb-10 bg-[#fafaf8] border-b border-[#e5eaf2]">
        <div className="absolute inset-0 bg-architectural-grid pointer-events-none opacity-25" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <div className="max-w-2xl">
              <span className="font-heading text-[12.5px] sm:text-[13px] md:text-[14px] uppercase tracking-[0.2em] font-[900] text-[#6E7D9B] mb-2 block">
                CREATORS, EDITORS, DESIGNERS & WRITERS
              </span>
              <h1 className="font-heading text-[#071633] text-[clamp(28px,3vw,44px)] font-[700] tracking-[-0.04em] leading-[1.05] md:leading-[0.98]">
                Find Top Influencers & Talent. <br className="hidden sm:inline" />
                <span className="text-slate-600 font-normal">Video Editors, Designers & Writers.</span>
              </h1>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#find-creators"
                className="h-11 px-6 rounded-full bg-[#071633] hover:bg-[#0f172a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <span>Find Talent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#join-network"
                className="h-11 px-6 rounded-full bg-white hover:bg-slate-50 text-[#071633] border border-[#e5eaf2] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
              >
                <span>Join as Creator</span>
              </a>
            </div>
          </div>

          {/* Clean Floating Metrics (Fresh, No Boxy Heavy Borders) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-5 border-t border-slate-200/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e5eaf2] flex items-center justify-center text-[#071633] shrink-0 shadow-2xs">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#071633] leading-none mb-1">1.8M+</div>
                <div className="text-[11px] uppercase tracking-wider text-[#6e7d9b] font-medium leading-none">Creator Reach</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e5eaf2] flex items-center justify-center text-[#071633] shrink-0 shadow-2xs">
                <Video className="w-4 h-4 text-[#071633]" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#071633] leading-none mb-1">10+ Vetted</div>
                <div className="text-[11px] uppercase tracking-wider text-[#6e7d9b] font-medium leading-none">Editors & Talent</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e5eaf2] flex items-center justify-center text-[#071633] shrink-0 shadow-2xs">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#071633] leading-none mb-1">7.4%</div>
                <div className="text-[11px] uppercase tracking-wider text-[#6e7d9b] font-medium leading-none">Avg Engagement</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e5eaf2] flex items-center justify-center text-[#071633] shrink-0 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#071633]" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#071633] leading-none mb-1">100%</div>
                <div className="text-[11px] uppercase tracking-wider text-[#6e7d9b] font-medium leading-none">Verified Talent</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Find Influencers" Catalog Section: Spacious & Clean */}
      <section id="find-creators" className="py-8 sm:py-16 bg-white border-b border-[#e5eaf2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Search Toolbar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 pb-6 border-b border-slate-100">
            <div>
              <span className="font-heading text-[12.5px] sm:text-[13px] uppercase tracking-[0.2em] font-[900] text-[#3b4c68] mb-1.5 block">
                CREATOR DIRECTORY
              </span>
              <h2 className="text-[#071633] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Onboarded Influencers <span className="text-slate-600 font-normal">& Talent</span>
              </h2>
            </div>

            {/* Search Box on Right */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search creator, niche, handle..."
                className="w-full h-11 pl-11 pr-4 rounded-full bg-[#f8fafc] border border-[#e5eaf2] text-xs text-[#071633] placeholder-slate-400 focus:bg-white focus:border-[#071633] transition-all outline-none"
              />
            </div>
          </div>

          {/* Clean, Fresh Filter Tabs Bar (No awkward breaking, no cramped sidebar) */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-2 mb-6 sm:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
            {INFLUENCER_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              const count =
                category === "All Talent"
                  ? INFLUENCERS_LIST.length
                  : INFLUENCERS_LIST.filter(
                      (i) => i.category === category || i.badge === category
                    ).length;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 ${
                    isSelected
                      ? "bg-[#071633] text-white shadow-sm"
                      : "bg-[#f8fafc] text-[#45556c] border border-[#e5eaf2] hover:bg-slate-100 hover:text-[#071633]"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full leading-none ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-white border border-[#e5eaf2] text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 3-Column Creator Cards Grid (Spacious, Airy & Modern) */}
          {filteredInfluencers.length === 0 ? (
            <div className="text-center py-20 bg-[#f8fafc] rounded-3xl border border-[#e5eaf2] p-8 max-w-lg mx-auto">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#071633]">No creators found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try searching with another keyword or reset the category filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All Talent");
                  setSearchQuery("");
                }}
                className="mt-5 px-6 py-2.5 rounded-full bg-[#071633] hover:bg-[#0c2452] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-sm transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredInfluencers.map((inf) => {
                return (
                  <div
                    key={inf.id}
                    className="w-full group rounded-2xl p-4 sm:p-5 bg-white border border-[#e5eaf2] hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Creator Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-[#e5eaf2] shadow-2xs">
                            <Image
                              src={inf.avatar}
                              alt={inf.name}
                              fill
                              sizes="48px"
                              unoptimized
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h3 className="text-[15px] font-bold text-[#071633] truncate">
                                {inf.name}
                              </h3>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            </div>
                            <p className="text-[11px] font-mono text-[#6e7d9b] truncate">
                              {inf.handle}
                            </p>
                          </div>
                        </div>

                        {/* Platforms */}
                        <div className="flex items-center gap-1 shrink-0 pt-0.5">
                          {inf.platforms.map((p) => (
                            <span
                              key={p}
                              className="w-6 h-6 rounded-md bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center"
                              title={p}
                            >
                              {getPlatformIcon(p)}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Role & Bio */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-semibold text-[#071633] shrink-0">
                          {inf.roleTitle || inf.category}
                        </span>
                        <p className="text-xs text-[#314158] font-medium truncate">
                          {inf.niche}
                        </p>
                      </div>

                      {/* Clean Compact Metrics */}
                      <div className="grid grid-cols-3 gap-1 py-2 px-2.5 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] text-center mb-3">
                        <div>
                          <div className="text-xs font-bold text-[#071633]">{inf.followers}</div>
                          <div className="text-[9px] uppercase tracking-wider text-[#6e7d9b]">Reach</div>
                        </div>
                        <div className="border-x border-slate-200/80">
                          <div className="text-xs font-bold text-[#071633]">{inf.avgReelViews}</div>
                          <div className="text-[9px] uppercase tracking-wider text-[#6e7d9b]">Views</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-emerald-600">{inf.engagementRate}</div>
                          <div className="text-[9px] uppercase tracking-wider text-[#6e7d9b]">Engage</div>
                        </div>
                      </div>
                    </div>

                    {/* Single Sleek CTA */}
                    <div className="pt-1">
                      <a
                        href={`https://wa.me/919845014279?text=${encodeURIComponent(
                          `Hi Cyber Design House! I want to hire ${inf.name} (${inf.roleTitle || inf.category}) for our upcoming project.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-9 rounded-xl bg-[#071633] hover:bg-[#0c2452] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>
                          {inf.category === "Video Editors"
                            ? "Hire Editor"
                            : inf.category === "Graphic Designers"
                            ? "Hire Designer"
                            : inf.category === "Content Writers"
                            ? "Hire Writer"
                            : "Hire Creator"}
                        </span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. "Join Our Creator Network" Onboarding Form Section */}
      <section id="join-network" className="py-10 sm:py-24 bg-[#fafaf8] border-b border-[#e5eaf2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            caption="CREATOR ONBOARDING"
            titleLine1="Are You an Influencer?"
            titleLine2="Join Our Bangalore Creator Network."
            description="We connect content creators with paid brand campaigns, product launches, luxury spatial tours, and high-budget video reel collaborations."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Form: White Card (VoometDesign Card Style) */}
            <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-[28px] border border-[#e5eaf2] shadow-sm flex flex-col justify-between h-full">
              {applyStatus === "success" ? (
                <div className="text-center py-12 space-y-4 my-auto">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#071633]">Creator Application Received!</h3>
                  <p className="text-[#314158] text-sm font-normal max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#071633]">{formState.name}</strong>. Our creator partnerships manager will review your reels and profile and connect via WhatsApp within 2 business days.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setApplyStatus("idle");
                        setFormState({
                          name: "",
                          handle: "",
                          platform: "Instagram Reels",
                          category: "Video Editors",
                          followers: "",
                          avgViews: "",
                          email: "",
                          phone: "",
                          sampleReel: "",
                          message: "",
                        });
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#f8fafc] border border-[#e5eaf2] hover:bg-slate-100 text-[#071633] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
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
                        Creator / Full Name <span className="text-rose-500">*</span>
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
                        Social Handle / Profile Link <span className="text-rose-500">*</span>
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
                        Role / Specialty
                      </label>
                      <select
                        value={formState.category}
                        onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] text-sm transition-all outline-none cursor-pointer"
                      >
                        <option value="Video Editors">Video Editor (Reels, Long-Form, VFX)</option>
                        <option value="Graphic Designers">Graphic Designer (Thumbnails, Branding)</option>
                        <option value="Content Writers">Content Writer & Scriptwriter (SEO, Scripts, Copy)</option>
                        <option value="Tech & AI">Tech & AI Creator</option>
                        <option value="Interior & Architecture">Interior & Architecture Creator</option>
                        <option value="SaaS & Startups">SaaS & Startups Creator</option>
                        <option value="3D & Design">3D & Motion Artist</option>
                        <option value="Lifestyle & Growth">Lifestyle & Growth Creator</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#314158] font-semibold mb-2">
                        Total Followers / Reach
                      </label>
                      <input
                        type="text"
                        value={formState.followers}
                        onChange={(e) => setFormState({ ...formState, followers: e.target.value })}
                        placeholder="e.g. 50K+, 200K or Portfolio"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] placeholder-slate-400 text-sm transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#314158] font-semibold mb-2">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="rahul@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#e5eaf2] focus:border-[#071633] focus:bg-white text-[#071633] placeholder-slate-400 text-sm transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#314158] font-semibold mb-2">
                        WhatsApp Number <span className="text-rose-500">*</span>
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
                      Portfolio / Showreel / Sample Work Link
                    </label>
                    <input
                      type="url"
                      value={formState.sampleReel}
                      onChange={(e) => setFormState({ ...formState, sampleReel: e.target.value })}
                      placeholder="https://behance.net/..., youtube.com/..., or instagram.com/..."
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
                    className="w-full h-[52px] rounded-full bg-[#071633] hover:bg-[#0f172a] text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
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

            {/* Right Information Card (Matches Height of Left Card) */}
            <div className="lg:col-span-5 flex flex-col h-full">
              <div className="bg-white p-8 sm:p-10 rounded-[28px] border border-[#e5eaf2] shadow-sm flex flex-col justify-between flex-1 h-full">
                <div>
                  <div className="mb-6">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#6e7d9b] font-bold block mb-1">
                      WHY JOIN CDH ROSTER
                    </span>
                    <h3 className="text-2xl font-bold text-[#071633] tracking-tight">Creator Benefits</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Dedicated representation & premium brand collaborations for high-caliber creators.
                    </p>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-sm text-[#45556c]">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </div>
                      <span>
                        <strong className="text-[#071633]">High-Budget Brand Deals:</strong> Access paid campaigns from venture-backed tech startups, enterprise SaaS, and premium turnkey interior brands.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-[#45556c]">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </div>
                      <span>
                        <strong className="text-[#071633]">Guaranteed On-Time Payments:</strong> Milestone payments managed cleanly by Cyber Design House and VoometDesign with 0% delay.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-[#45556c]">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </div>
                      <span>
                        <strong className="text-[#071633]">Production & Motion Support:</strong> Access our in-house 3D animation, scriptwriting, VFX assets, and professional editing team.
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-[#45556c]">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </div>
                      <span>
                        <strong className="text-[#071633]">Talent Representation:</strong> Get pitched directly to top brands without handling cold outreach or awkward contract negotiations.
                      </span>
                    </li>
                  </ul>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 my-6 p-4 rounded-2xl bg-[#f8fafc] border border-[#e5eaf2]">
                    <div className="p-3 bg-white rounded-xl border border-slate-200/60 text-center shadow-2xs">
                      <div className="text-xl font-bold text-[#071633]">100%</div>
                      <div className="text-[10px] uppercase text-slate-500 font-medium mt-0.5">Retained Revenue</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200/60 text-center shadow-2xs">
                      <div className="text-xl font-bold text-emerald-600">48h</div>
                      <div className="text-[10px] uppercase text-slate-500 font-medium mt-0.5">Roster Review</div>
                    </div>
                  </div>
                </div>

                {/* Bottom WhatsApp Contact */}
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-[#6e7d9b] mb-3">
                    Have questions about contracts, rates, or campaigns?
                  </p>
                  <a
                    href="https://wa.me/919845014279?text=Hi%20Cyber%20Design%20House!%20I%20have%20a%20question%20about%20your%20influencer%20creator%20network."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 rounded-full border border-emerald-500/40 text-emerald-700 hover:bg-emerald-50 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Creator Lead (+91 98450 14279)</span>
                  </a>
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
                <span className="font-heading text-[12.5px] uppercase tracking-[0.25em] text-slate-200 font-[900] block">
                  BRAND CAMPAIGNS
                </span>
                <h2 className="text-[clamp(28px,3.5vw,46px)] font-bold tracking-tight leading-tight">
                  Want an End-to-End Reels Campaign for Your Brand?
                </h2>
                <p className="text-sm sm:text-base text-slate-200 font-normal max-w-xl leading-relaxed">
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
