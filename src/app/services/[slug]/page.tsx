import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SERVICES, SELECTED_WORK_PROJECTS, SITE_METADATA } from "@/data/siteData";
import {
  ArrowRight,
  Check,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { ServiceHero3D } from "@/components/services/ServiceHero3D";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
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

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const serviceIndex = SERVICES.findIndex((s) => s.slug === slug);

  const relatedProjects = SELECTED_WORK_PROJECTS.filter(
    (p) => p.service.toLowerCase().includes(service.title.toLowerCase()) || p.service === service.title
  );

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
        description: service.heroSubheading,
        provider: {
          "@type": "ProfessionalService",
          name: SITE_METADATA.name,
          parentOrganization: {
            "@type": "Organization",
            name: SITE_METADATA.parentCompany,
            url: SITE_METADATA.parentUrl,
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: SITE_METADATA.city,
            addressCountry: SITE_METADATA.country,
          },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="relative pt-20 pb-20 overflow-hidden bg-[#fafaf8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Section (Clean Light Hero with 3D Object) */}
      <section className="relative py-12 lg:py-20 border-b border-[#e5eaf2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-mono text-[#6e7d9b] mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#071633] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/#services-section" className="hover:text-[#071633] transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#071633] font-semibold">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[12px] uppercase tracking-[0.25em] text-[#6e7d9b] font-medium block">
                Discipline {service.number}
              </span>

              <h1 className="text-4xl sm:text-6xl font-semibold text-[#071633] tracking-tight leading-tight">
                {service.heroHeadline}
              </h1>

              <p className="text-lg text-[#45556c] font-light leading-relaxed max-w-2xl">
                {service.heroSubheading}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#071633] hover:bg-[#0f172a] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm group"
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-[#071633] border border-[#e5eaf2] hover:border-slate-300 text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right 3D Object */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] sm:min-h-[460px] bg-white rounded-3xl border border-[#e5eaf2] p-6 shadow-sm">
              <ServiceHero3D activeIndex={serviceIndex} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overview Section */}
      <section className="py-20 bg-white border-b border-[#e5eaf2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[12px] uppercase tracking-[0.25em] text-[#6e7d9b] font-medium block mb-2">
              The Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-semibold text-[#071633]">
              Executive Overview
            </h2>
          </div>

          <div className="space-y-6 text-[#45556c] font-light text-base sm:text-lg leading-relaxed bg-[#f8fafc] p-8 sm:p-10 rounded-3xl border border-[#e5eaf2]">
            {service.overview.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. What We Offer (Cards) */}
      <section className="py-20 lg:py-28 bg-[#fafaf8] border-b border-[#e5eaf2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[12px] uppercase tracking-[0.25em] text-[#6e7d9b] font-medium block mb-2">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#071633]">
              What we offer in {service.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.offerings.map((offering, idx) => (
              <div
                key={offering.title}
                className="light-card p-6 sm:p-8 rounded-2xl bg-white border border-[#e5eaf2] flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-[#071633] mb-3 font-semibold">
                    0{idx + 1} //
                  </div>
                  <h3 className="text-lg font-semibold text-[#071633] mb-2">{offering.title}</h3>
                  <p className="text-sm text-[#45556c] font-light leading-relaxed">{offering.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Process (Service-Specific Steps) */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#e5eaf2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[12px] uppercase tracking-[0.25em] text-[#6e7d9b] font-medium block mb-2">
              Execution Lifecycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#071633]">
              Step-by-Step Delivery Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.process.map((step) => (
              <div
                key={step.step}
                className="light-card p-6 rounded-2xl bg-[#f8fafc] border border-[#e5eaf2]"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#e5eaf2] flex items-center justify-center font-mono text-sm font-bold text-[#071633] mb-4">
                  {step.step}
                </div>
                <h3 className="text-base font-semibold text-[#071633] mb-1.5">{step.title}</h3>
                <p className="text-sm text-[#45556c] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Deliverables & Outcomes */}
      <section className="py-20 bg-[#fafaf8] border-b border-[#e5eaf2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Deliverables Checklist */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[12px] uppercase tracking-[0.25em] text-[#6e7d9b] font-medium block">
                Deliverables & Tangibles
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#071633]">
                What You Receive Upon Handover
              </h2>
              <ul className="space-y-3.5 pt-2">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#314158] text-sm sm:text-base">
                    <div className="p-0.5 rounded bg-slate-200/60 text-[#071633] mt-0.5 shrink-0">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies Row */}
              <div className="pt-6 border-t border-[#e5eaf2]">
                <span className="text-xs uppercase tracking-wider text-[#6e7d9b] block mb-3 font-medium">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#e5eaf2] text-xs font-mono text-[#071633]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Target Benchmarks */}
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-[#e5eaf2] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[12px] uppercase tracking-[0.25em] text-[#6e7d9b] font-medium block mb-2">
                  Impact
                </span>
                <h3 className="text-2xl font-semibold text-[#071633] mb-6">
                  Target Performance Standards
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {service.outcomes.map((outcome, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e5eaf2]">
                      <div className="text-2xl sm:text-3xl font-bold font-mono text-[#071633]">
                        {outcome.metric}
                      </div>
                      <div className="text-xs text-[#6e7d9b] mt-1 font-medium leading-tight">
                        {outcome.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-xs text-[#62748e]">
                  Measured on mid-range devices over 4G networks according to Core Web Vitals standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQs Accordion */}
      <section className="py-20 bg-white border-b border-[#e5eaf2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[12px] uppercase tracking-[0.25em] text-[#6e7d9b] font-medium block mb-2">
              Clarifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#071633]">
              {service.title} FAQs
            </h2>
          </div>

          <div className="space-y-3.5">
            {service.faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-[#f8fafc] border border-[#e5eaf2] p-6">
                <h3 className="text-base font-semibold text-[#071633] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#071633] shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-sm text-[#45556c] font-light leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA Band (Deep Navy Card) */}
      <section className="py-20 bg-[#fafaf8] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#071633] rounded-3xl p-10 sm:p-14 text-white shadow-xl">
            <h2 className="text-2xl sm:text-4xl font-semibold text-white">
              Ready to build your next {service.title} project?
            </h2>
            <p className="mt-3 text-slate-300 font-light text-base max-w-xl mx-auto">
              Speak directly with our Bangalore engineering lead and get an itemized scope and proposal.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#071633] font-semibold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#services-section"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold uppercase tracking-wider border border-white/20"
              >
                <span>View All Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
