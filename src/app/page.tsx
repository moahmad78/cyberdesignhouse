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
import { SectionHeader } from "@/components/ui/SectionHeader";

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
  return (
    <div className="relative w-full">
      {/* 1. Hero Section (Deep Navy overlay with 3D crystal) */}
      <HeroSection />

      {/* 2. Intro Section (Warm off-white #fafaf8, two-tone H2, white cards) */}
      <IntroSection />

      {/* 3. Services Pinned 3D Showcase (Cool off-white #f8fafc, filter pills) */}
      <PinnedServicesSection />

      {/* 4. Process Section (Warm off-white #fafaf8, 4 phase cards) */}
      <ProcessSection />

      {/* 5. Why Cyber Design House (Cool off-white #f8fafc, 6 white cards) */}
      <WhyUsSection />

      {/* 6. Selected Work (Warm off-white #fafaf8, concept demos) */}
      <SelectedWorkSection />

      {/* 7. Technologies Section (Cool off-white #f8fafc, two-tone H2) */}
      <section className="py-24 sm:py-32 relative bg-[#f8fafc] overflow-hidden border-t border-[#e5eaf2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            caption="STACK & FRAMEWORKS"
            titleLine1="Tools We Build With"
            titleLine2="Engineered for Performance"
            description="Modern frontend runtimes, GPU-accelerated graphics libraries, cross-platform mobile frameworks, and high-availability cloud infrastructure."
          />

          <TechOrbitScene />
        </div>
      </section>

      {/* 8. FAQ Section (Warm off-white #fafaf8, white bordered rows) */}
      <FaqSection />

      {/* 9. Final CTA (Deep Navy card with white text & crystal) */}
      <FinalCtaSection />
    </div>
  );
}
