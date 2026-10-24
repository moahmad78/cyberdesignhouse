import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SERVICES, SITE_METADATA } from "@/data/siteData";
import {
  ArrowRight,
  Check,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { ServiceHeroVisual } from "@/components/services/ServiceHeroVisual";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const SLUG_ALIASES: Record<string, string> = {
  // Web
  "web-app-development": "web-development",
  "website-development": "web-development",
  web: "web-development",
  // App
  "mobile-app-development": "app-development",
  "mobile-app": "app-development",
  app: "app-development",
  // SEO
  "seo-digital-marketing": "seo",
  "digital-marketing": "seo",
  "search-engine-optimization": "seo",
};

export async function generateStaticParams() {
  const primary = SERVICES.map((service) => ({
    slug: service.slug,
  }));
  const aliases = Object.keys(SLUG_ALIASES).map((slug) => ({ slug }));
  return [...primary, ...aliases];
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const targetSlug = SLUG_ALIASES[slug] || slug;
  const service = SERVICES.find((s) => s.slug === targetSlug);
  if (!service) return {};

  return {
    title: service.meta.title,
    description: service.meta.description,
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      url: `${SITE_METADATA.siteUrl}/services/${service.slug}`,
      siteName: SITE_METADATA.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.meta.title,
      description: service.meta.description,
    },
  };
}

async function ServiceDetailContent({ params }: ServicePageProps) {
  const { slug } = await params;
  const targetSlug = SLUG_ALIASES[slug] || slug;
  const service = SERVICES.find((s) => s.slug === targetSlug);
  if (!service) notFound();

  const serviceIndex = SERVICES.findIndex((s) => s.slug === targetSlug);
  const isSimplifiedPage = ["web-development", "app-development", "seo"].includes(service.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_METADATA.siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE_METADATA.siteUrl}/#services-section`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `${SITE_METADATA.siteUrl}/services/${service.slug}`,
          },
        ],
      },
      {
        "@type": "Service",
        name: service.title,
        description: service.meta.description,
        provider: {
          "@type": "Organization",
          name: SITE_METADATA.name,
          url: SITE_METADATA.siteUrl,
          parentOrganization: {
            "@type": "Organization",
            name: SITE_METADATA.parentCompany,
            url: SITE_METADATA.parentUrl,
          },
        },
        areaServed: {
          "@type": "City",
          name: "Bangalore",
        },
      },
      ...(!isSimplifiedPage
        ? [
            {
              "@type": "FAQPage",
              mainEntity: service.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#45556c] pt-20 sm:pt-24">
      {/* Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Section - Balanced Viewport Fit */}
      <section className="relative pt-6 sm:pt-9 pb-10 sm:pb-12 bg-[#fafaf8] overflow-hidden border-b border-[#e5eaf2]">
        <div className="absolute inset-0 bg-architectural-grid pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#6e7d9b] mb-5 sm:mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#071633] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/#services-section" className="hover:text-[#071633] transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#071633]">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-3.5">
              <span className="font-heading text-[11.5px] sm:text-xs uppercase tracking-[0.2em] font-[900] text-[#3b4c68] block">
                DISCIPLINE 0{serviceIndex + 1}
              </span>

              <h1 className="font-heading text-[clamp(26px,3.2vw,42px)] font-[700] text-[#071633] tracking-[-0.035em] leading-[1.06] md:leading-[1.02]">
                {service.heroHeadline}
              </h1>

              <p className="text-[14px] sm:text-[15.5px] text-[#314158] font-normal leading-relaxed max-w-xl">
                {service.heroSubheading}
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-1.5">
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#6e7d9b] font-bold mr-1">
                  Core Offerings:
                </span>
                {service.offerings.map((o) => (
                  <a
                    key={o.title}
                    href={`#capability-${o.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#071633] text-[#314158] hover:text-white border border-slate-200 transition-all cursor-pointer"
                  >
                    {o.title}
                  </a>
                ))}
              </div>

              <div className="pt-2.5 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto h-[46px] sm:h-[48px] px-7 rounded-full bg-[#071633] hover:bg-[#0f172a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_8px_24px_rgba(7,22,51,0.15)] hover:shadow-[0_12px_30px_rgba(7,22,51,0.22)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                  <span>Request a Free Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href={`https://wa.me/919845014279?text=${encodeURIComponent(
                    `Hi Cyber Design House! I'm interested in your ${service.title} services.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto h-[46px] sm:h-[48px] px-6 rounded-full bg-white text-[#071633] border border-[#e5eaf2] hover:border-slate-300 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center"
                >
                  <span>Chat on WhatsApp</span>
                </a>

                {service.slug === "influencer-marketing" && (
                  <Link
                    href="/influencers"
                    className="w-full sm:w-auto h-[46px] sm:h-[48px] px-6 rounded-full bg-[#f8fafc] text-[#071633] border border-[#e5eaf2] hover:bg-slate-100 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Browse Creators</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>

            {/* Right Showcase Visual Card with VoometDesign styling */}
            <div className="lg:col-span-5 relative w-full h-full flex items-center justify-center">
              <ServiceHeroVisual
                slug={service.slug}
                title={service.title}
                serviceIndex={serviceIndex}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overview Section: Left-Right Split (hidden on web, app, seo pages) */}
      {!isSimplifiedPage && (
        <section className="py-20 bg-white border-b border-[#e5eaf2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              caption="THE ARCHITECTURE"
              titleLine1="Executive Overview"
              titleLine2="Precision Engineering Standards"
              description="End-to-end turnkey development managed by dedicated in-house engineers and interface designers in Bangalore."
            />

            <div className="space-y-6 text-[#314158] font-normal text-[15px] sm:text-[17px] leading-[1.85] bg-[#f8fafc] p-8 sm:p-10 rounded-[28px] border border-[#e5eaf2]">
              {service.overview.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. What We Offer: Left-Right Split */}
      <section id="capabilities-section" className="py-20 lg:py-28 bg-[#fafaf8] border-b border-[#e5eaf2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            caption="CAPABILITIES"
            titleLine1="What We Offer in"
            titleLine2={service.title}
            description="Comprehensive turnkey offerings engineered for performance, security, and measurable conversion gains."
          />

          <div
            className={`grid grid-cols-1 ${
              service.offerings.length === 4
                ? "md:grid-cols-2 gap-6 md:gap-8"
                : "md:grid-cols-2 lg:grid-cols-3 gap-6"
            }`}
          >
            {service.offerings.map((offering, idx) => (
              <div
                key={offering.title}
                id={`capability-${offering.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="w-full light-card rounded-[24px] bg-white border border-[#e5eaf2] flex flex-col justify-between hover:border-slate-300 hover:shadow-xl transition-all duration-300 scroll-mt-28 overflow-hidden group"
              >
                {/* Offering Visual Image Banner */}
                {offering.image && (
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#071633]">
                    <Image
                      src={offering.image}
                      alt={offering.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Floating Tag and Discipline Index Badges on Image */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      {offering.tag && (
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#071633] px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-white/60 shadow-sm">
                          {offering.tag}
                        </span>
                      )}
                      <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-[11px] font-mono font-bold text-white shadow-sm ml-auto">
                        0{idx + 1}
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    {!offering.image && (
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center text-xs font-mono font-bold text-[#071633]">
                          0{idx + 1}
                        </div>
                        {offering.tag && (
                          <span className="text-[10.5px] font-mono font-semibold uppercase tracking-wider text-[#071633] px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
                            {offering.tag}
                          </span>
                        )}
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-[#071633] tracking-tight mb-2">
                      {offering.title}
                    </h3>

                    <p className="text-[14px] text-[#314158] font-normal leading-relaxed mb-4">
                      {offering.description}
                    </p>

                    {offering.bullets && offering.bullets.length > 0 && (
                      <div className="pt-3.5 border-t border-slate-100 mb-4">
                        <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#6e7d9b] font-bold block mb-2">
                          Core Capabilities:
                        </span>
                        <div className={service.offerings.length === 4 ? "grid grid-cols-1 sm:grid-cols-2 gap-1.5" : "space-y-1.5"}>
                          {offering.bullets.map((b, bIdx) => (
                            <div
                              key={bIdx}
                              className={
                                service.offerings.length === 4
                                  ? "flex items-center gap-2 text-[12.5px] font-medium text-[#314158] bg-[#f8fafc] px-2.5 py-1.5 rounded-lg border border-[#e5eaf2]"
                                  : "flex items-start gap-2 text-xs text-[#45556c]"
                              }
                            >
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className={service.offerings.length === 4 ? "font-semibold" : ""}>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <a
                    href={`https://wa.me/919845014279?text=${encodeURIComponent(
                      `Hi Cyber Design House! I would like to get a quote and timeline for ${offering.title}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#071633] group-hover:text-[#0c2452] mt-auto"
                  >
                    <span className="truncate pr-2">Inquire for {offering.title}</span>
                    <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#071633] text-[#071633] group-hover:text-white flex items-center justify-center transition-all shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Process: Left-Right Split */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#e5eaf2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            caption="EXECUTION LIFECYCLE"
            titleLine1="Step-by-Step Delivery"
            titleLine2="Predictable Milestone Sign-offs"
            description="Structured execution phases that eliminate uncertainty, guarantee code quality, and keep stakeholders aligned."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {service.process.map((step) => (
              <div
                key={step.step}
                className="w-full light-card p-6 sm:p-7 rounded-[24px] bg-[#f8fafc] border border-[#e5eaf2] flex flex-col justify-between"
              >
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#e5eaf2] flex items-center justify-center font-mono text-sm font-bold text-[#071633] mb-4 shadow-sm">
                  0{step.step}
                </div>
                <h3 className="text-base font-bold text-[#071633] tracking-tight mb-1.5">{step.title}</h3>
                <p className="text-[14.5px] text-[#314158] font-normal leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Deliverables & Outcomes: Left-Right Split */}
      <section className="py-20 bg-[#fafaf8] border-b border-[#e5eaf2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Deliverables Checklist */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold text-[#6E7D9B] block">
                DELIVERABLES & TANGIBLES
              </span>
              <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold text-[#071633] tracking-tight leading-tight">
                What You Receive Upon Handover
              </h2>
              <ul className="space-y-3.5 pt-2">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 text-[14px] md:text-[15px] font-[500] leading-snug">
                    <div className="w-5 h-5 rounded-full bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center shrink-0 mt-0.5 text-[#071633]">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies Row */}
              <div className="pt-6 border-t border-[#e5eaf2]">
                <span className="text-xs uppercase tracking-[0.15em] text-[#6e7d9b] block mb-3 font-semibold">
                  Technologies & Frameworks
                </span>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 rounded-full bg-white border border-[#e5eaf2] text-xs font-mono font-medium text-[#071633] shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Target Benchmarks Card */}
            <div className="lg:col-span-5 bg-white p-5 sm:p-10 rounded-[28px] border border-[#e5eaf2] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#6e7d9b] font-bold block mb-2">
                  PERFORMANCE BENCHMARKS
                </span>
                <h3 className="text-2xl font-bold text-[#071633] tracking-tight mb-6">
                  Target Standards
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {service.outcomes.map((outcome, idx) => (
                    <div key={idx} className="p-3.5 sm:p-4 rounded-2xl bg-[#f8fafc] border border-[#e5eaf2]">
                      <div className="text-xl sm:text-2xl font-bold text-[#071633]">
                        {outcome.metric}
                      </div>
                      <div className="text-xs text-[#62748e] font-medium mt-1 leading-snug">
                        {outcome.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100">
                <Link
                  href="/contact"
                  className="w-full min-h-[48px] py-3 px-5 sm:px-6 rounded-full bg-[#071633] hover:bg-[#0c2452] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all whitespace-nowrap"
                >
                  <span className="hidden sm:inline">Book Consultation for {service.title}</span>
                  <span className="sm:hidden">Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQs: Left-Right Split (hidden on web, app, seo pages) */}
      {!isSimplifiedPage && (
        <section className="py-20 bg-[#fafaf8] border-b border-[#e5eaf2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              caption="CLARIFICATIONS"
              titleLine1="Common Questions"
              titleLine2={`About ${service.title}`}
              description="Clear details on development timelines, code ownership, tech stacks, and warranty support."
            />

            <div className="max-w-4xl space-y-4">
              {service.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-[20px] bg-white border border-[#e5eaf2] p-6 sm:p-7 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f8fafc] border border-[#e5eaf2] text-[#071633] flex items-center justify-center shrink-0 mt-0.5">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#071633]">
                        {faq.question}
                      </h3>
                      <p className="text-[14.5px] sm:text-[15.5px] text-[#314158] font-normal mt-2 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA: Same as Home Page */}
      <FinalCtaSection />
    </div>
  );
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fafaf8] pt-36 pb-20 flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-[#071633] border-t-transparent animate-spin mb-4" />
          <p className="text-xs uppercase tracking-[0.2em] text-[#6e7d9b] font-bold">
            Loading Specification...
          </p>
        </div>
      }
    >
      <ServiceDetailContent params={params} />
    </Suspense>
  );
}
