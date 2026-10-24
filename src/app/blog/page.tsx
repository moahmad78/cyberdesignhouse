"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, BookOpen, Clock, Calendar, Tag } from "lucide-react";
import { CompanySidebar } from "@/components/layout/CompanySidebar";
import { BLOG_POSTS, BlogPost } from "@/data/blogData";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = [
    "All",
    "Web & App Development",
    "Influencer Marketing",
    "SEO & Digital Marketing",
    "Engineering Architecture",
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (activeCategory === "All") return true;
    return post.category === activeCategory;
  });

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
            <CompanySidebar current="blog" />
          </div>

          {/* Right Column: Blog Feed & Insights */}
          <div className="lg:col-span-8 xl:col-span-8.5 space-y-6 sm:space-y-8">
            {/* Page Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#071633] font-mono text-[10.5px] uppercase tracking-wider mb-3">
                <BookOpen className="w-3.5 h-3.5 text-[#071633]" />
                <span>Engineering &amp; Growth Insights</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-[#071633] tracking-tight">
                Cyber Design House Journal
              </h1>
              <p className="text-sm sm:text-base text-[#475569] mt-2 max-w-2xl leading-relaxed">
                Architectural patterns, creator economy benchmarks, and technical search playbooks from our Bangalore engineering studio.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-row overflow-x-auto whitespace-nowrap hide-scrollbar gap-1.5 pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#071633] text-white shadow-xs"
                      : "bg-white text-[#475569] border border-[#e5eaf2] hover:bg-slate-50 hover:text-[#071633]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Featured Hero Article */}
            {filteredPosts.length > 0 && (
              <div
                onClick={() => setSelectedPost(filteredPosts[0])}
                className="group relative bg-white rounded-[26px] border border-[#e5eaf2] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col md:flex-row"
              >
                <div className="relative md:w-5/12 aspect-[16/10] md:aspect-auto overflow-hidden bg-slate-100">
                  <Image
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#071633] text-white shadow-xs">
                      Featured
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 md:w-7/12 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-[#6E7D9B] mb-2">
                      <span className="font-semibold text-[#071633]">{filteredPosts[0].category}</span>
                      <span>·</span>
                      <span>{filteredPosts[0].readTime}</span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-[#071633] group-hover:text-blue-600 transition-colors tracking-tight leading-snug">
                      {filteredPosts[0].title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed line-clamp-3">
                      {filteredPosts[0].excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="text-xs text-[#64748b] font-medium">
                      By {filteredPosts[0].author.name} · {filteredPosts[0].date}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#071633] group-hover:bg-[#071633] group-hover:text-white transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {filteredPosts.slice(1).map((post) => (
                <article
                  key={post.slug}
                  onClick={() => setSelectedPost(post)}
                  className="group bg-white rounded-[24px] border border-[#e5eaf2] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 rounded-md text-[9.5px] font-semibold uppercase tracking-wider bg-white/95 text-[#071633] shadow-xs">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[10.5px] font-mono text-[#6E7D9B] mb-1.5">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                        <span>·</span>
                        <span>{post.date}</span>
                      </div>

                      <h3 className="text-base font-bold text-[#071633] group-hover:text-blue-600 transition-colors tracking-tight leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs text-[#475569] mt-2 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9.5px] font-mono text-[#6E7D9B] px-2 py-0.5 rounded-md bg-[#f8fafc] border border-[#e5eaf2]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-50 text-xs">
                    <span className="text-slate-500 font-medium">Read Article</span>
                    <div className="w-6 h-6 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-[#071633] group-hover:bg-[#071633] group-hover:text-white transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Article Detail Reading Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#071633]/70 backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-[26px] shadow-2xl border border-[#e2e8f0] overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative aspect-[16/8] w-full overflow-hidden bg-slate-100 shrink-0">
              <Image
                src={selectedPost.image}
                alt={selectedPost.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071633] via-[#071633]/40 to-transparent" />
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors text-xs"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[10.5px] font-mono uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  {selectedPost.category}
                </span>
                <h2 className="text-lg sm:text-2xl font-bold tracking-tight mt-1.5 leading-snug">
                  {selectedPost.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-4 text-[#334155] text-sm sm:text-base leading-relaxed">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-3 border-b border-slate-100">
                <span>By {selectedPost.author.name} · {selectedPost.author.role}</span>
                <span>{selectedPost.readTime}</span>
              </div>

              {selectedPost.content.map((paragraph, idx) => (
                <p key={idx} className="text-[#475569] leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Ready to apply these architectural standards to your product?
                </div>
                <Link
                  href="/contact"
                  className="px-5 py-2 rounded-full bg-[#071633] text-white text-xs font-semibold hover:bg-[#0c2452] transition-colors"
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
