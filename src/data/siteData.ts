export interface ServiceData {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  heroHeadline: string;
  heroSubheading: string;
  oneLine: string;
  bullets: string[];
  overview: string[];
  offerings: {
    title: string;
    description: string;
  }[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  deliverables: string[];
  technologies: string[];
  outcomes: {
    metric: string;
    label: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  meta: {
    title: string;
    description: string;
  };
}

export const SITE_METADATA = {
  name: "Cyber Design House",
  tagline: "Technology with the precision of a design house",
  parentCompany: "VoometDesign",
  parentUrl: "https://voometdesign.com",
  establishedYear: "2010",
  phone: "+91 98450 14279",
  phoneRaw: "+919845014279",
  email: "voometd@gmail.com",
  address: "5th Floor, Affinity Akash, Avalahalli Village, Yelahanka Hobli, Bangalore 560064",
  city: "Bangalore",
  country: "India",
  siteUrl: "https://cyberdesignhouse.com",
};

export const SERVICES: ServiceData[] = [
  {
    id: "influencer-marketing",
    slug: "influencer-marketing",
    number: "01",
    title: "Influencer Marketing",
    shortTitle: "Influencers",
    heroHeadline: "Creator profiles, rates, audience details aur campaign booking.",
    heroSubheading: "Collaborate with verified tech, luxury interior, SaaS, and lifestyle creators. Verified audience engagement, transparent rates, and end-to-end viral reel production.",
    oneLine: "Creator profiles, rates, audience details aur campaign booking.",
    bullets: [
      "Vetted creator profiles with verified metrics",
      "Transparent creator rates & deliverables",
      "Viral video reels & end-to-end campaign booking"
    ],
    overview: [
      "Modern buyers don't trust faceless corporate ads—they trust creators who build in public, review real products, and command engaged communities. Our Influencer Marketing service gives your brand immediate access to our verified creator network.",
      "We manage everything: audience vetting, rate negotiations, script angles, 4K reel filming, and collaborative co-author distribution with paid ad boosting for guaranteed viral reach and inbound enquiries."
    ],
    offerings: [
      {
        title: "Vetted Creator Matchmaking",
        description: "Direct access to our curated roster of creators across Tech & AI, Interior Design, SaaS, and Modern Growth with authentic engagement."
      },
      {
        title: "Transparent Rate Cards & Booking",
        description: "Clear per-reel pricing, story packages, and usage rights without hidden agency markups or confusing terms."
      },
      {
        title: "Short-Form Video & Reel Production",
        description: "Engaging 9:16 vertical video concepts, hook-driven scripts, high-production filming, and conversion-optimized edits."
      },
      {
        title: "Audience Demographics & Audit",
        description: "Deep audience analysis ensuring 85%+ genuine regional followers, target age groups, and real comment engagement."
      },
      {
        title: "Co-Author Collaborative Publishing",
        description: "Publishing directly to the creator's profile as an Instagram/LinkedIn collaborator to tap into their loyal followers immediately."
      },
      {
        title: "Paid Boost & Lead Retargeting",
        description: "Amplifying winning creator reels through Meta Partnership Ads to drive measurable leads and website visits."
      }
    ],
    process: [
      { step: "01", title: "Brand Brief & ICP", description: "Define campaign objectives, target audience demographics, value propositions, and key talking points." },
      { step: "02", title: "Creator Selection", description: "Pick from verified creator profiles with confirmed availability, past performance metrics, and rates." },
      { step: "03", title: "Hook & Script Writing", description: "Crafting attention-grabbing hooks within the first 3 seconds and natural product integration scripts." },
      { step: "04", title: "Filming & Editing", description: "Creators record in high-end studios with professional audio, B-roll, dynamic subtitles, and brand assets." },
      { step: "05", title: "Collaborative Launch", description: "Co-authored live release, scheduled at peak engagement hours with active comment moderation." },
      { step: "06", title: "Analytics & Telemetry", description: "Detailed campaign performance tracking: total views, shares, saves, website visits, and direct inquiries." }
    ],
    deliverables: [
      "Finished 4K 60FPS vertical video reels (9:16 format)",
      "Co-author collaborative post on verified creator profile",
      "Engaging copy, hashtags, and pinned CTA comment",
      "30 to 90 days commercial digital ad usage rights",
      "Raw b-roll footage and outtakes for your brand archive",
      "Comprehensive post-campaign view and conversion report"
    ],
    technologies: ["Instagram Reels", "YouTube Shorts", "LinkedIn Creator", "Meta Partnership Ads", "Creator Studio", "CapCut Pro", "WhatsApp Business API"],
    outcomes: [
      { metric: "1.8M+", label: "Verified network reach" },
      { metric: "4.8%", label: "Average engagement rate" },
      { metric: "100%", label: "Authentic human creators" },
      { metric: "48h", label: "Fast brief-to-draft turnaround" }
    ],
    faqs: [
      {
        question: "How do you select and vet influencers for campaigns?",
        answer: "We manually audit every creator on our roster for audience authenticity, comment-to-view ratios, past sponsor performance, and technical niche authority. We never work with bot-boosted accounts."
      },
      {
        question: "Can we review and approve the reel before it goes live?",
        answer: "Yes, 100%. Creators submit rough cuts and final edits for your review. You have revision rounds to guarantee that your brand message, pronunciation, and visuals match guidelines before publication."
      },
      {
        question: "Do we get rights to run the video as a paid ad?",
        answer: "Yes, all our creator agreements include digital commercial usage rights so you can run Partnership Ads on Meta and TikTok directly from the creator's handle."
      },
      {
        question: "Can new creators apply to join your network?",
        answer: "Yes! Independent tech, design, and business creators can submit their profile, average views, and portfolio on our /influencers page for vetting and onboarding."
      }
    ],
    meta: {
      title: "Influencer Marketing & Creator Reels | Cyber Design House",
      description: "Book verified tech, interior, SaaS and design influencers. Transparent rates, audience analytics and viral reel production in Bangalore."
    }
  },
  {
    id: "web-development",
    slug: "web-development",
    number: "02",
    title: "Website Development",
    shortTitle: "Website Dev",
    heroHeadline: "Business websites, e-commerce aur custom web platforms.",
    heroSubheading: "From business websites to custom web platforms and e-commerce stores, we design, build and launch with one dedicated engineering and design team.",
    oneLine: "Business websites, e-commerce aur custom web platforms.",
    bullets: [
      "Business websites & corporate digital presence",
      "Custom web platforms, portals and SaaS frontends",
      "High-converting, frictionless e-commerce stores"
    ],
    overview: [
      "Your website is the digital storefront, sales engineer, and brand anchor of your business. We build lightning-fast web applications and corporate websites engineered for maximum conversion, rock-solid security, and effortless scalability.",
      "By combining modern frontend architectures with headless backends and bespoke 3D motion design, our web products stand out from cookie-cutter templates while delivering sub-second load times."
    ],
    offerings: [
      {
        title: "Business & Corporate Websites",
        description: "Bespoke digital presence crafted to establish immediate authority, articulate value propositions, and generate high-value consultation leads."
      },
      {
        title: "High-Converting Landing Pages",
        description: "Laser-focused campaign pages engineered for paid traffic, A/B testing, and rapid lead capture."
      },
      {
        title: "Custom Web Apps & Portals",
        description: "Complex workflow tools, client dashboards, SaaS frontends, and customer portals built with Next.js and TypeScript."
      },
      {
        title: "E-Commerce Experiences",
        description: "Custom Shopify and headless commerce solutions optimized for frictionless checkout, high AOV, and catalog speed."
      },
      {
        title: "CMS & Admin Panels",
        description: "Intuitive content management setups that empower non-technical marketing teams to publish without breaking layouts."
      },
      {
        title: "Performance & Speed Optimization",
        description: "Core Web Vitals remediation, code splitting, asset pipeline tuning, and serverless edge delivery."
      }
    ],
    process: [
      { step: "01", title: "Plan & Sitemap", description: "Architecture planning, user journeys, content hierarchy, and technical stack selection." },
      { step: "02", title: "UI & Motion Design", description: "Figma wireframes, interactive component prototypes, and bespoke micro-interactions." },
      { step: "03", title: "Clean Development", description: "Modern React/Next.js implementation with strict TypeScript typing and responsive CSS." },
      { step: "04", title: "Rigorous QA Testing", description: "Cross-device responsiveness, browser compatibility, accessibility, and Core Web Vitals audit." },
      { step: "05", title: "Deployment & Launch", description: "Edge CDN routing, custom domain SSL, DNS configuration, and automated CI/CD pipelines." },
      { step: "06", title: "Growth & Support", description: "Post-launch telemetry, proactive monitoring, security patches, and ongoing enhancements." }
    ],
    deliverables: [
      "Fully responsive, production-ready web application",
      "SEO-ready semantic structure & JSON-LD schema",
      "Intuitive Admin / CMS content publishing access",
      "Google Tag Manager & GA4 conversion analytics setup",
      "Full source code ownership & deployment documentation",
      "30-day post-launch warranty and monitoring"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "Shopify", "WordPress", "PostgreSQL"],
    outcomes: [
      { metric: "<1.2s", label: "Average page load on 4G" },
      { metric: "95+", label: "Target mobile Lighthouse score" },
      { metric: "100%", label: "Clean source code ownership" },
      { metric: "24/7", label: "Production uptime resilience" }
    ],
    faqs: [
      {
        question: "How long does a typical website take to design and launch?",
        answer: "A standard corporate or marketing website takes 3 to 6 weeks from initial discovery to deployment. Custom web applications and complex portals typically take 8 to 12 weeks depending on features and API integrations."
      },
      {
        question: "Do you build on WordPress, Shopify, or custom code?",
        answer: "We select the right tool for your specific business requirements. For marketing sites and SaaS, we specialize in custom Next.js and React. For e-commerce, we build on Shopify. For content-heavy publications, we implement modern headless WordPress or Sanity CMS."
      },
      {
        question: "Will my website be mobile-friendly and optimized for SEO?",
        answer: "Every website we engineer is built mobile-first and strictly adheres to WCAG accessibility and technical SEO best practices, including semantic HTML, OpenGraph tags, schema markup, and sub-2 second Core Web Vitals."
      },
      {
        question: "Who owns the code and intellectual property after launch?",
        answer: "You own 100% of the intellectual property, design assets, and source code upon final project settlement. We hand over clean repositories and hosting credentials without proprietary vendor locks."
      }
    ],
    meta: {
      title: "Website Development Company in Bangalore | Cyber Design House",
      description: "Custom business websites, web apps and e-commerce platforms built for speed, security and conversions. Talk to Cyber Design House."
    }
  },
  {
    id: "app-development",
    slug: "app-development",
    number: "03",
    title: "App Development",
    shortTitle: "App Dev",
    heroHeadline: "Android, iOS aur custom applications.",
    heroSubheading: "We turn ambitious ideas into reliable, buttery-smooth Android and iOS applications, from first prototype to App Store launch.",
    oneLine: "Android, iOS aur custom applications.",
    bullets: [
      "Native and cross-platform mobile apps (iOS & Android)",
      "Fluid UI and intuitive thumb-zone UX architecture",
      "Resilient cloud backend and real-time API integrations"
    ],
    overview: [
      "Mobile applications require ruthless attention to performance, offline capabilities, and delight at every touch. We engineer consumer and enterprise mobile apps that run natively on Android and iOS devices.",
      "From fintech and e-commerce to productivity and on-demand delivery, we engineer apps with scalable cloud backends, secure authentication, and seamless payment gateway integrations."
    ],
    offerings: [
      {
        title: "iOS App Development",
        description: "Native Swift and SwiftUI applications taking full advantage of Apple ecosystem hardware and design guidelines."
      },
      {
        title: "Android App Development",
        description: "High-performance Kotlin applications optimized across thousands of diverse Android screen resolutions and chipsets."
      },
      {
        title: "Cross-Platform Apps",
        description: "Single codebase React Native and Flutter applications that slash development costs without compromising 60 FPS performance."
      },
      {
        title: "Mobile UI/UX Design",
        description: "Gesture-driven user experiences, design systems, and micro-animations tailored to human hand anatomy and thumb zones."
      },
      {
        title: "Backend & API Engineering",
        description: "Cloud-native microservices, WebSocket real-time sync, push notification systems, and relational databases."
      },
      {
        title: "App Store Publishing & Compliance",
        description: "End-to-end management of Google Play Console and Apple App Store review guidelines, metadata, and compliance."
      }
    ],
    process: [
      { step: "01", title: "Idea & Functional Scope", description: "Feature definition, user persona mapping, and technical feasibility validation." },
      { step: "02", title: "Interactive Wireframing", description: "Figma clickable prototypes testing complete user flows and interface ergonomics." },
      { step: "03", title: "Sprint-Based Build", description: "Agile 2-week iterations with functional demo builds sent directly to your phone." },
      { step: "04", title: "Real-Device Testing", description: "Rigorous stress testing on low-end, mid-tier, and flagship Android and iOS hardware." },
      { step: "05", title: "Store Submission", description: "App Store & Play Store asset preparation, privacy questionnaires, and approval management." },
      { step: "06", title: "Continuous Updates", description: "Crash analytics monitoring, OS version compatibility updates, and feature rollouts." }
    ],
    deliverables: [
      "Complete compiled Android (APK/AAB) & iOS (IPA) release packages",
      "Clean, modular source code repository with comprehensive documentation",
      "App Store & Google Play product pages and promotional graphics",
      "Scalable backend API source code and database schemas",
      "Integrated analytics & crash logging (Firebase / Sentry)",
      "App store approval support guarantee"
    ],
    technologies: ["React Native", "Flutter", "Kotlin", "Swift", "Node.js", "Firebase", "PostgreSQL", "GraphQL"],
    outcomes: [
      { metric: "60 FPS", label: "Fluid rendering target" },
      { metric: "<0.1%", label: "Target crash-free rate" },
      { metric: "Dual-OS", label: "Android & iOS unified code" },
      { metric: "100%", label: "Store approval assistance" }
    ],
    faqs: [
      {
        question: "Should I build native apps (Swift/Kotlin) or cross-platform (React Native/Flutter)?",
        answer: "For 90% of business and consumer applications, cross-platform frameworks like React Native or Flutter offer identical 60 FPS performance while saving 40-50% in development and maintenance costs. If your app requires deep Bluetooth, ARKit, or low-level kernel APIs, we recommend native Swift and Kotlin."
      },
      {
        question: "How long does mobile app development take?",
        answer: "An MVP mobile app generally takes 8 to 14 weeks from concept through store submission. More complex platforms with custom backends and real-time features take between 14 to 20 weeks."
      },
      {
        question: "Do you handle the Apple App Store and Google Play Store submission process?",
        answer: "Yes, we handle the entire submission lifecycle, including provisioning certificates, privacy disclosures, store assets, screenshots, and review feedback until your app is live."
      }
    ],
    meta: {
      title: "App Development Company in Bangalore | Cyber Design House",
      description: "Android, iOS and custom mobile application development with intuitive UI design, resilient backend and launch support."
    }
  },
  {
    id: "seo-digital-marketing",
    slug: "seo-digital-marketing",
    number: "04",
    title: "SEO & Digital Marketing",
    shortTitle: "SEO & Marketing",
    heroHeadline: "Search rankings, social media, ads aur lead generation.",
    heroSubheading: "Data-backed Search Engine Optimization synchronized with high-converting paid advertising across Google, Meta, and social channels to drive qualified inquiries.",
    oneLine: "Search rankings, social media, ads aur lead generation.",
    bullets: [
      "Google search rankings & Core Web Vitals SEO",
      "High-intent search & precision social media ads",
      "Lead generation funnels with instant conversion tracking"
    ],
    overview: [
      "SEO and paid digital marketing are two halves of the same growth engine. Organic SEO builds compounding search authority and zero-cost traffic over time, while targeted paid advertising captures high-intent buyers immediately.",
      "We orchestrate end-to-end customer acquisition: technical crawl fixes, keyword clustering, Google Ads, Meta video campaigns, conversion tracking, and automated WhatsApp lead follow-ups."
    ],
    offerings: [
      {
        title: "Technical SEO & Core Web Vitals",
        description: "Full crawl inspection analyzing indexation hurdles, schema markup, mobile speed, canonical integrity, and ranking signals."
      },
      {
        title: "High-Intent Keyword Intelligence",
        description: "Targeting commercial and transactional search queries with high buyer intent, balancing search volume against competitive difficulty."
      },
      {
        title: "Google Search & Performance Max Ads",
        description: "Laser-targeted pay-per-click (PPC) campaigns capturing prospects actively searching for your services."
      },
      {
        title: "Meta (Instagram & Facebook) Ads",
        description: "Engaging scroll-stopping video and visual creatives combined with lookalike and retargeting audiences."
      },
      {
        title: "Local SEO & Google Maps Optimization",
        description: "Google Business Profile optimization, regional citations, and review acquisition for Bangalore and Pan-India visibility."
      },
      {
        title: "Full-Funnel Analytics & Lead Attribution",
        description: "Server-side tracking (CAPI), GTM event attribution, and cost-per-acquisition (CPA) dashboards."
      }
    ],
    process: [
      { step: "01", title: "Audit & Economics", description: "Comprehensive crawl of existing site structure, index health, target CPA, and ideal customer profile (ICP)." },
      { step: "02", title: "Search & Keyword Strategy", description: "Mapping primary and secondary transactional keywords to designated page URLs and campaign ad sets." },
      { step: "03", title: "Technical & Creative Sprint", description: "Direct developer-level fixes for speed and schema, paired with high-impact conversion creatives." },
      { step: "04", title: "Tracking & Conversion Tagging", description: "Deploying Meta Conversions API (CAPI), Google Enhanced Conversions, and custom event triggers." },
      { step: "05", title: "Campaign Launch & Optimization", description: "Deploying campaigns with smart bidding, trimming negative keywords, and improving landing page conversion." },
      { step: "06", title: "Telemetry & Growth Reports", description: "Transparent monthly ranking reports, Google Search Console impressions, and qualified lead tracking." }
    ],
    deliverables: [
      "Comprehensive 40+ point Technical SEO Audit Report",
      "Keyword mapping spreadsheet with volume and difficulty metrics",
      "Complete ad account setup and governance across Google & Meta",
      "Bespoke creative design assets (static, carousel, and video scripts)",
      "Server-side Meta Conversions API & Google Tag Manager tracking",
      "Monthly transparent organic ranking and traffic performance reports"
    ],
    technologies: ["Google Search Console", "Google Analytics 4", "Google Ads", "Meta Ads Manager", "Ahrefs", "Semrush", "Meta CAPI", "Schema.org"],
    outcomes: [
      { metric: "100%", label: "White-hat sustainable techniques" },
      { metric: "<60s", label: "WhatsApp lead routing response" },
      { metric: "Weekly", label: "Budget and CPA optimization" },
      { metric: "Zero", label: "Vanity metrics focus" }
    ],
    faqs: [
      {
        question: "How do SEO and paid advertising work together?",
        answer: "Paid ads deliver immediate traffic and validate which keywords and messaging convert prospects into paying customers. We then inject those proven high-converting keywords into your organic SEO strategy for sustainable, compounding long-term search dominance."
      },
      {
        question: "How long does SEO take to produce measurable business results?",
        answer: "Initial technical fixes and index improvements typically reflect in search consoles within 4 to 8 weeks. Noticeable ranking shifts and organic inquiry growth generally materialize between month 3 and month 6."
      },
      {
        question: "What advertising budget do I need to get started?",
        answer: "We typically recommend a minimum ad spend of ₹35,000 to ₹75,000 per month per platform to generate statistically significant data for testing and steady lead volume. Our management fee is structured transparently as a flat monthly retainer."
      },
      {
        question: "How do you track and report campaign results?",
        answer: "We connect Google Tag Manager, GA4, and server-side tracking (Meta CAPI) so you can clearly see how many qualified consultation forms and WhatsApp inquiries were generated, and what your exact cost-per-acquisition (CPA) is."
      }
    ],
    meta: {
      title: "SEO & Digital Marketing Services | Cyber Design House",
      description: "Search rankings, social media ads and lead generation funnels engineered for real business revenue. Bangalore & Pan-India."
    }
  }
];

export const HOW_WE_WORK_STEPS = [
  {
    step: "01",
    title: "Discover",
    tagline: "Uncover real goals & market reality",
    description: "We dive deep into your business objectives, target buyer personas, technical constraints, and competitors to define a bulletproof scope and roadmap."
  },
  {
    step: "02",
    title: "Design",
    tagline: "Faceted precision & interactive prototypes",
    description: "We craft interactive wireframes, tactile 3D visual language, and cohesive design systems that your stakeholders can test and approve before coding starts."
  },
  {
    step: "03",
    title: "Develop",
    tagline: "Clean code & relentless real-device QA",
    description: "Our engineers build with modern TypeScript, Next.js, and scalable cloud architectures. We share functional sprint demos and test on real devices."
  },
  {
    step: "04",
    title: "Launch & Grow",
    tagline: "Zero-downtime deployment & compounding growth",
    description: "We handle production launch, CDN edge caching, security configurations, analytics instrumentation, and ongoing growth support."
  }
];

export const WHY_CHOOSE_US_CARDS = [
  {
    title: "End-to-End Ownership",
    tagline: "One team from idea to production",
    description: "No disjointed handoffs between separate design agencies and coding shops. We own the complete pipeline from discovery through post-launch scale."
  },
  {
    title: "Design-Led Engineering",
    tagline: "Aesthetics meet robust architecture",
    description: "Backed by VoometDesign's 15-year design legacy, we treat typography, spacing, and tactile micro-interactions as first-class citizens alongside clean code."
  },
  {
    title: "3D & Motion Expertise",
    tagline: "Memorable interactive experiences",
    description: "We implement lightweight, hardware-accelerated 3D and scroll-driven animations that captivate users without compromising mobile battery or speed."
  },
  {
    title: "Performance & SEO Built-In",
    tagline: "Sub-2s Core Web Vitals standard",
    description: "Every page is engineered for instant indexing, semantic markup, high-contrast accessibility, and top-tier mobile Lighthouse scores."
  },
  {
    title: "Clear Communication & Timelines",
    tagline: "No jargon, honest weekly updates",
    description: "Direct access to lead engineers and designers, structured weekly demo builds, and transparent milestone tracking throughout your project."
  },
  {
    title: "Post-Launch Warranty & Support",
    tagline: "Long-term partnership after go-live",
    description: "We stay in your corner after launch with 30-day warranty coverage, proactive server monitoring, and flexible ongoing retainer support."
  }
];

export const SELECTED_WORK_PROJECTS = [
  {
    title: "Apex Quantum OS",
    category: "Web Platform & 3D Interface",
    service: "Web Development",
    year: "2026",
    result: "Sub-second dashboard load time & 42% lift in trial activations",
    image: "/images/work-web.jpg",
    tags: ["Next.js", "Three.js", "TypeScript"]
  },
  {
    title: "NovaPay Mobile Suite",
    category: "Fintech Mobile Application",
    service: "App Development",
    year: "2026",
    result: "60 FPS native performance with 99.9% crash-free sessions",
    image: "/images/work-app.jpg",
    tags: ["React Native", "Node.js", "Security"]
  },
  {
    title: "Zenith Commerce Growth",
    category: "SEO & Content Architecture",
    service: "SEO",
    year: "2025",
    result: "280% organic impression growth across target buyer keywords",
    image: "/images/work-seo.jpg",
    tags: ["Technical SEO", "Schema", "Core Web Vitals"]
  },
  {
    title: "Aura Lifestyle Acquisition",
    category: "Performance Marketing Funnel",
    service: "Digital Marketing",
    year: "2025",
    result: "3.4x ROAS on Meta and Google Ads with automated WhatsApp routing",
    image: "/images/work-marketing.jpg",
    tags: ["Meta Ads", "Google Ads", "WhatsApp API"]
  }
];

export const TECH_STACK = [
  { name: "Next.js", category: "Frontend Framework", tag: "App Router / Turbopack" },
  { name: "React", category: "UI Library", tag: "React 19 / Server Components" },
  { name: "TypeScript", category: "Language", tag: "Strict Type Safety" },
  { name: "Three.js", category: "3D Graphics", tag: "WebGL / Custom Shaders" },
  { name: "Node.js", category: "Backend Runtime", tag: "Microservices & APIs" },
  { name: "React Native", category: "Mobile Apps", tag: "iOS & Android" },
  { name: "Tailwind CSS", category: "Design System", tag: "Tokens & Responsive" },
  { name: "GSAP & Lenis", category: "Motion", tag: "ScrollTrigger & Smooth Scroll" },
  { name: "Google Analytics 4", category: "Analytics", tag: "Enhanced Ecommerce & CAPI" },
  { name: "Google & Meta Ads", category: "Acquisition", tag: "Full-Funnel Attribution" }
];

export const HOME_FAQS = [
  {
    question: "How much does a website or mobile app typically cost?",
    answer: "Project pricing depends on scope, complexity, and custom features. A standard modern business website typically starts between ₹45,000 to ₹1,20,000, while custom web applications or mobile apps range from ₹1,50,000 upwards. We provide a transparent, itemized fixed-price proposal following a short discovery consultation."
  },
  {
    question: "How long does a project take from start to finish?",
    answer: "A standard corporate or marketing website is typically completed in 3 to 6 weeks. Custom web platforms, e-commerce stores, and cross-platform mobile apps generally take 8 to 14 weeks. We establish clear milestone delivery dates during kickoff."
  },
  {
    question: "Do you provide maintenance and technical support after launch?",
    answer: "Yes, every project includes 30 days of complimentary post-launch warranty support. We also offer affordable monthly maintenance plans covering security patches, backups, uptime monitoring, and ongoing feature updates."
  },
  {
    question: "Will I completely own the code, assets, and content?",
    answer: "Yes, absolutely. Once final invoices are settled, full intellectual property rights, source code repositories, design files, and hosting accounts are completely transferred to your organization with zero proprietary vendor lock-in."
  },
  {
    question: "Where is Cyber Design House based?",
    answer: "We are headquartered in Bangalore, India (operating from 5th Floor, Affinity Akash, Avalahalli Village, Yelahanka Hobli, Bangalore 560064). We work with startups, businesses, and enterprise clients across Bangalore, Pan-India, and internationally."
  }
];
