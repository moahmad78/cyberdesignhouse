import React from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroSection } from "@/components/home/IntroSection";
import { PinnedServicesSection } from "@/components/home/PinnedServicesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { SelectedWorkSection } from "@/components/home/SelectedWorkSection";
import { TechOrbitScene } from "@/components/3d/TechOrbitScene";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { SITE_METADATA } from "@/data/siteData";
import { Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Cyber Design House | 3D Web, App & Digital Growth by VoometDesign",
  description:
    "Cyber Design House is the modern technology and digital growth arm of VoometDesign (Est. 2010) in Bangalore. Web development, mobile apps, technical SEO and performance marketing.",
  openGraph: {
    title: "Cyber Design House | Technology Partner by VoometDesign",
    description:
      "Websites, mobile apps, SEO and digital marketing from one dedicated team in Bangalore. 100% code ownership & sub-2s speed standard.",
    url: "https://cyberdesignhouse.com",
    siteName: "Cyber Design House",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/work-web.jpg",
        width: 1200,
        height: 630,
        alt: "Cyber Design House - Digital Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Design House | Technology Partner by VoometDesign",
    description: "Bangalore-based digital products, web development, mobile apps and SEO.",
    images: ["/images/work-web.jpg"],
  },
};

export default function HomePage() {
  const testimonials = [
    {
      quote:
        "The transition from standard marketing sites to Cyber Design House's 3D web platform gave us an immediate 40% uptick in qualified consultation leads. Their attention to design detail is unmatched.",
      author: "Rajesh Murthy",
      role: "Managing Director",
      company: "Apex Tech Labs, Bangalore",
    },
    {
      quote:
        "Having worked with VoometDesign for our corporate architecture, bringing Cyber Design House in for our cross-platform mobile app was seamless. They shipped in 10 weeks with zero downtime.",
      author: "Sneha Kapur",
      role: "Product Lead",
      company: "NovaPay India",
    },
  ];

  return (
    <div className="relative w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Intro Section */}
      <IntroSection />

      {/* 3. Services Pinned 3D Showcase */}
      <PinnedServicesSection />

      {/* 4. Process Section */}
      <ProcessSection />

      {/* 5. Why Cyber Design House */}
      <WhyUsSection />

      {/* 6. Selected Work */}
      <SelectedWorkSection />

      {/* 7. Technologies Section */}
      <section className="py-24 sm:py-32 relative bg-[#090e17] overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Tools we <span className="text-gradient-cyan">build with</span>.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400">
              Modern frontend runtimes, GPU-accelerated graphics libraries, and cloud infrastructure engineered for zero-latency execution.
            </p>
          </div>

          <TechOrbitScene />
        </div>
      </section>

      {/* 8. Partner Endorsements & Testimonials */}
      <section className="py-20 sm:py-28 relative bg-[#0b111c] overflow-hidden border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-2">
              Client Feedback
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Trusted by Bangalore Founders & Enterprise Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="glass-card p-8 rounded-3xl border border-white/10 relative flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-8 h-8 text-sky-400/40 mb-4" />
                  <p className="text-slate-200 text-base leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-white font-bold text-sm">{t.author}</p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <FaqSection />

      {/* 10. Final CTA */}
      <FinalCtaSection />
    </div>
  );
}
