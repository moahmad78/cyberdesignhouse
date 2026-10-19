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
  MessageCircle,
} from "lucide-react";
import { ServiceHero3D } from "@/components/services/ServiceHero3D";
import { SectionHeader } from "@/components/ui/SectionHeader";

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
    ],
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#45556c] pt-24">
      {/* Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Section */}
      <section className="relative py-14 sm:py-20 bg-[#fafaf8] overflow-hidden border-b border-[#e5eaf2]">
        <div className="absolute inset-0 bg-architectural-grid pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#6e7d9b] mb-8" aria-label="Breadcrumb">
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold text-[#6E7D9B] block">
                DISCIPLINE 0{serviceIndex + 1}
              </span>

              <h1 className="text-[clamp(34px,4.5vw,60px)] font-bold text-[#071633] tracking-tight leading-[1.04]">
                {service.heroHeadline}
              </h1>

              <p className="text-[16px] sm:text-[18px] text-[#45556c] font-light leading-relaxed max-w-2xl">
                {service.heroSubheading}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto h-[50px] px-8 rounded-full bg-[#071633] hover:bg-[#0f172a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_8px_24px_rgba(7,22,51,0.15)] hover:shadow-[0_12px_30px_rgba(7,22,51,0.22)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
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
                  className="w-full sm:w-auto h-[50px] px-7 rounded-full bg-white text-[#071633] border border-[#e5eaf2] hover:border-slate-300 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right 3D Object with VoometDesign card styling */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] sm:min-h-[440px] bg-white rounded-[28px] border border-[#e5eaf2] p-6 shadow-sm">
              <ServiceHero3D activeIndex={serviceIndex} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overview Section: Left-Right Split */}
      <section className="py-20 bg-white border-b border-[#e5eaf2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            caption="THE ARCHITECTURE"
            titleLine1="Executive Overview"
            titleLine2="Precision Engineering Standards"
            description="End-to-end turnkey development managed by dedicated in-house engineers and interface designers in Bangalore."
          />

          <div className="space-y-6 text-[#45556c] font-light text-[15px] sm:text-[17px] leading-[1.85] bg-[#f8fafc] p-8 sm:p-10 rounded-[28px] border border-[#e5eaf2]">
            {service.overview.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. What We Offer: Left-Right Split */}
      <section className="py-20 lg:py-28 bg-[#fafaf8] border-b border-[#e5eaf2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            caption="CAPABILITIES"
            titleLine1="What We Offer in"
            titleLine2={service.title}
            description="Comprehensive turnkey offerings engineered for performance, security, and measurable conversion gains."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.offerings.map((offering, idx) => (
              <div
                key={offering.title}
                className="light-card p-7 sm:p-8 rounded-[24px] bg-white border border-[#e5eaf2] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#f8fafc] border border-[#e5eaf2] flex items-center justify-center text-xs font-mono font-bold text-[#071633] mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#071633] tracking-tight mb-2">{offering.title}</h3>
                  <p className="text-[14px] text-[#45556c] font-light leading-relaxed">{offering.description}</p>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.process.map((step) => (
              <div
                key={step.step}
                className="light-card p-7 rounded-[24px] bg-[#f8fafc] border border-[#e5eaf2]"
              >
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#e5eaf2] flex items-center justify-center font-mono text-sm font-bold text-[#071633] mb-4 shadow-sm">
                  0{step.step}
                </div>
                <h3 className="text-base font-bold text-[#071633] tracking-tight mb-1.5">{step.title}</h3>
                <p className="text-[14px] text-[#45556c] font-light leading-relaxed">
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
            <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-[28px] border border-[#e5eaf2] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#6e7d9b] font-bold block mb-2">
                  PERFORMANCE BENCHMARKS
                </span>
                <h3 className="text-2xl font-bold text-[#071633] tracking-tight mb-6">
                  Target Standards
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {service.outcomes.map((outcome, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e5eaf2]">
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

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/contact"
                  className="w-full h-[48px] rounded-full bg-[#071633] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#0f172a] transition-all"
                >
                  <span>Book Consultation For {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Related Work: Left-Right Split */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-white border-b border-[#e5eaf2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              caption="SELECTED WORK"
              titleLine1="Representative Projects"
              titleLine2={`In ${service.title}`}
              description="Demonstrations of performance standards, responsive engineering, and motion fidelity."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
              {relatedProjects.map((project) => (
                <div
                  key={project.title}
                  className="light-card rounded-[28px] overflow-hidden bg-white border border-[#e5eaf2]"
                >
                  <div className="relative aspect-video w-full bg-slate-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={340}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-7">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#6e7d9b]">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-[#071633] mt-1 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#45556c] font-light leading-relaxed">
                      {project.result}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. FAQs: Left-Right Split */}
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
                    <p className="text-[14px] sm:text-[15px] text-[#45556c] font-light mt-2 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Bottom CTA: Left-Right Split Banner */}
      <section className="py-20 sm:py-24 bg-[#071633] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.25em] text-slate-300 font-bold block">
                START YOUR PROJECT
              </span>

              <h2 className="text-[clamp(32px,4vw,52px)] font-bold text-white tracking-tight leading-tight">
                Ready to Build Your {service.title}?
              </h2>

              <p className="text-[16px] sm:text-[17px] text-slate-300 font-light max-w-xl leading-relaxed pt-1">
                Schedule a technical discovery session with our senior engineers and product designers in Bangalore.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
              <Link
                href="/contact"
                className="w-full sm:w-auto lg:w-64 h-[52px] px-8 rounded-full bg-white text-[#071633] font-bold text-xs uppercase tracking-wider shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/919845014279?text=${encodeURIComponent(
                  `Hello Cyber Design House! I want to discuss a new ${service.title} project.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto lg:w-64 h-[52px] px-7 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Direct</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
