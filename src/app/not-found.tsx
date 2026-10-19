import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home, MessageSquare } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 relative overflow-hidden bg-[#090d16]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full glass-panel p-8 sm:p-10 rounded-3xl border border-sky-400/20 text-center relative z-10 shadow-2xl">
        {/* Floating broken crystal shard (Section 6.5) */}
        <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
          <Image
            src="/images/cd-mark.png"
            alt="Broken crystal shard"
            width={120}
            height={120}
            className="w-20 h-20 object-contain drop-shadow-[0_0_20px_rgba(56,189,248,0.4)] animate-bounce"
          />
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
          Error 404
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-slate-300 leading-relaxed">
          The requested coordinate does not exist or has been relocated to another node.
        </p>

        {/* Buttons to Home and Contact (Section 6.5) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass-card text-white hover:text-sky-300 text-xs font-semibold border border-white/10"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Studio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
