import React from "react";
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { PinnedServicesSection } from "@/components/home/PinnedServicesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

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
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Services */}
      <PinnedServicesSection />

      {/* 3. The Advantage (Why Cyber Design House) */}
      <WhyUsSection />

      {/* 4. How We Work (Process Section) */}
      <ProcessSection />

      {/* 5. FAQ Section (Warm off-white #fafaf8, white bordered rows) */}
      <FaqSection />

      {/* 6. Final CTA (Deep Navy card with white text & crystal) */}
      <FinalCtaSection />
    </div>
  );
}
