import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SERVICES, SELECTED_WORK_PROJECTS, SITE_METADATA } from "@/data/siteData";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  ExternalLink,
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

  // Relevant showcase project
  const relatedProjects = SELECTED_WORK_PROJECTS.filter(
    (p) => p.service.toLowerCase().includes(service.title.toLowerCase()) || p.service === service.title
  );

  // JSON-LD schemas: Service & FAQPage & BreadcrumbList
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
    <div className="relative pt-24 pb-20 overflow-hidden">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Section */}
      <section className="relative py-12 lg:py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href="/#services-section" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-sky-400 font-semibold">{service.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">


              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
                {service.heroHeadline}
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                {service.heroSubheading}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(56,189,248,0.35)] group"
                >
                  <span>Request a Free Quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href={`https://wa.me/919845014279?text=${encodeURIComponent(
                    `Hi Cyber Design House! I'm interested in your ${service.title} services.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass-card text-white hover:text-sky-300 text-sm font-semibold transition-all border border-white/10"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right 3D Object (Section 6.2 template) */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] sm:min-h-[460px] glass-panel rounded-3xl border border-sky-400/20 p-6 bg-slate-900/60 shadow-2xl">
              <ServiceHero3D activeIndex={serviceIndex} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overview Section */}
      <section className="py-20 bg-[#0b111c] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-2">
              The Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Executive Overview
            </h2>
          </div>

          <div className="space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed glass-card p-8 sm:p-10 rounded-3xl border border-white/5">
            {service.overview.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. What We Offer (Cards) */}
      <section className="py-20 lg:py-28 bg-[#090e17] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-2">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              What we offer in <span className="text-gradient-cyan">{service.title}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.offerings.map((offering, idx) => (
              <div
                key={offering.title}
                className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-sky-400/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-sky-400 mb-3 font-semibold">
                    0{idx + 1} //
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{offering.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{offering.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Process (Service-Specific Steps) */}
      <section className="py-20 lg:py-28 bg-[#0b111c] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-2">
              Execution Lifecycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Our Step-by-Step Delivery Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.process.map((step) => (
              <div
                key={step.step}
                className="glass-card p-6 rounded-2xl border border-white/10 hover:border-sky-400/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-sm font-bold text-sky-400 mb-4">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Deliverables & 6. Tech Stack & 7. Outcomes */}
      <section className="py-20 bg-[#090e17] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Deliverables Checklist */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block">
                Deliverables & Tangibles
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                What You Receive Upon Handover
              </h2>
              <ul className="space-y-3.5 pt-2">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies Row */}
              <div className="pt-6 border-t border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                  Technologies & Frameworks
                </span>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Concrete Outcomes */}
            <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-sky-400/20 bg-slate-900/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-2">
                  Business Impact
                </span>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Target Performance Benchmarks
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {service.outcomes.map((outcome, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                      <div className="text-2xl sm:text-3xl font-extrabold font-mono text-sky-400">
                        {outcome.metric}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 leading-tight">
                        {outcome.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every metric is monitored live through Google Tag Manager and GA4 with zero vanity data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Related Work */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-[#0b111c] border-b border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-2">
                Demonstration
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Featured {service.title} Architecture
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((p) => (
                <div
                  key={p.title}
                  className="glass-card rounded-2xl overflow-hidden border border-white/10"
                >
                  <div className="relative aspect-video w-full">
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={600}
                      height={340}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white">{p.title}</h3>
                    <p className="text-xs text-sky-400 font-mono mt-1">{p.category}</p>
                    <p className="text-xs text-slate-300 mt-2">{p.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. FAQs Accordion */}
      <section className="py-20 bg-[#090e17] border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 block mb-2">
              Clarifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {service.title} FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl border border-white/5">
                <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-sky-400 shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA Band */}
      <section className="py-16 bg-[#0f172a] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Ready to build your next {service.title} project?
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-xl mx-auto">
            Speak directly with our Bangalore engineering lead and get an itemized scope and proposal.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-sky-500/25"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#services-section"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl glass-card text-white hover:text-sky-300 text-sm font-semibold border border-white/10"
            >
              <span>View All Services</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
