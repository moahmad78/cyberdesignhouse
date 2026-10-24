export interface ServiceCategoryGroup {
  category: string;
  tag: string;
  description: string;
  items: string[];
}

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
  categoriesList?: ServiceCategoryGroup[];
  offerings: {
    title: string;
    description: string;
    tag?: string;
    bullets?: string[];
    image?: string;
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
    id: "web-development",
    slug: "web-development",
    number: "01",
    title: "Web Development",
    shortTitle: "Web Dev",
    heroHeadline: "Business websites, e-commerce stores aur custom web applications.",
    heroSubheading: "From scalable corporate portals and high-conversion e-commerce stores to custom SaaS frontends and CMS platforms, we design and engineer lightning-fast web solutions built for conversion.",
    oneLine: "High-performance business websites, e-commerce & web portals.",
    bullets: [
      "Business & Corporate Authority Websites",
      "High-Converting E-Commerce Stores (Shopify & Headless)",
      "Custom Web Applications, SaaS Dashboards & CMS Portals"
    ],
    overview: [
      "In modern business, your website is your highest-leverage sales asset and digital headquarters. At Cyber Design House, we treat web development with the turnkey architectural precision of our parent company VoometDesign. We engineer lightning-fast web applications, corporate platforms, and interactive portals built for maximum conversion, rock-solid security, and effortless scalability.",
      "By combining modern frontend architectures (Next.js 15, React 19, TypeScript) with serverless edge rendering and headless cloud backends, our web builds achieve sub-second execution, 98+ Google Lighthouse scores, and bespoke aesthetic tactile beauty."
    ],
    offerings: [
      {
        title: "Business & Corporate Websites",
        tag: "Corporate Authority",
        image: "/images/offerings/web-corporate.jpg",
        description: "Bespoke digital presence crafted to establish immediate market authority, articulate value propositions, and generate high-value consultation leads.",
        bullets: [
          "Executive corporate credibility & brand storytelling",
          "Fast, mobile-first responsive architecture",
          "Direct lead capture & consultation funnels"
        ]
      },
      {
        title: "E-commerce Websites",
        tag: "High Conversion",
        image: "/images/offerings/web-ecommerce.jpg",
        description: "Custom Shopify, WooCommerce, and headless e-commerce solutions optimized for frictionless one-click checkouts and high average order value (AOV).",
        bullets: [
          "Shopify & Headless Next.js storefronts",
          "One-click checkout & instant payment gateways",
          "Automated inventory sync & fast catalog search"
        ]
      },
      {
        title: "Custom Web Applications",
        tag: "Scalable SaaS",
        image: "/images/offerings/web-saas.jpg",
        description: "Complex workflow engines, client dashboards, and internal business tools built with strict TypeScript, relational databases, and secure RBAC auth.",
        bullets: [
          "Multi-tenant SaaS & interactive client dashboards",
          "Role-based access control (RBAC) & secure auth",
          "PostgreSQL & Supabase cloud database architectures"
        ]
      },
      {
        title: "CMS & WordPress Development",
        tag: "No-Code Publishing",
        image: "/images/offerings/web-cms.jpg",
        description: "Intuitive headless CMS (Sanity, Strapi) and enterprise WordPress setups allowing marketing teams to easily publish content without developer bottlenecks.",
        bullets: [
          "Headless CMS (Sanity, Strapi) & custom WordPress",
          "Zero-developer friction marketing updates",
          "Custom post types, ACF & block Gutenberg builders"
        ]
      },
      {
        title: "Landing Pages",
        tag: "High-ROI Launches",
        image: "/images/offerings/web-landing.jpg",
        description: "Laser-focused single-page conversion funnels engineered for paid ad campaigns and lead capture with sub-2s load times and visual hierarchy.",
        bullets: [
          "Sub-second (<1s) page load execution",
          "High-conversion copywriting & visual hierarchy",
          "Integrated GA4, Meta CAPI & CRM lead routing"
        ]
      },
      {
        title: "Website Maintenance",
        tag: "24/7 SLA Care",
        image: "/images/offerings/web-maintenance.jpg",
        description: "Proactive 24/7 uptime monitoring, security patch deployments, database backups, automated dependency updates, and guaranteed SLA response times.",
        bullets: [
          "24/7 uptime monitoring & instant alert triage",
          "Automated daily cloud backups & rollback readiness",
          "Security patches, SSL renewals & dependency upgrades"
        ]
      }
    ],
    process: [
      { step: "01", title: "Discovery & Information Architecture", description: "User journeys, system architecture, tech stack selection, and milestone roadmapping." },
      { step: "02", title: "Bespoke UI/UX & Design Systems", description: "Responsive Figma layouts with tactile micro-interactions and dark/light modes." },
      { step: "03", title: "Next.js & TypeScript Sprints", description: "Modular component-driven development with strict typing and weekly sprint demo builds." },
      { step: "04", title: "Cross-Browser & Lighthouse QA", description: "Real-world browser testing, sub-2s Core Web Vitals compliance, and accessibility audits." },
      { step: "05", title: "Edge CDN & Production Launch", description: "Edge CDN caching, custom domain SSL, DNS configuration, and live search indexing." },
      { step: "06", title: "Ongoing SLA & Telemetry", description: "Continuous uptime monitoring, performance telemetry, and technical support." }
    ],
    deliverables: [
      "Fully responsive production web application with modular component architecture",
      "Full source code ownership repository with deployment CI/CD documentation",
      "SEO-ready semantic structure, schema markup, and OpenGraph social preview assets",
      "Intuitive Admin / CMS content publishing access & backend API schemas",
      "Integrated analytics & telemetry (Google Analytics 4, Tag Manager, Sentry)",
      "30-day post-launch warranty and bug-fix guarantee"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Shopify", "WordPress", "Vercel"],
    outcomes: [
      { metric: "<1.0s", label: "Average page load speed" },
      { metric: "98+", label: "Mobile Lighthouse score" },
      { metric: "100%", label: "Clean source code ownership" },
      { metric: "99.9%", label: "Production uptime resilience" }
    ],
    faqs: [
      {
        question: "How long does a custom business website or web application take to build?",
        answer: "A bespoke corporate website typically takes 3 to 5 weeks. A custom web application, portal, or SaaS dashboard ranges between 6 to 12 weeks depending on database complexity and role-based permissions."
      },
      {
        question: "Can our non-technical team update website text, blogs, and images easily?",
        answer: "Yes. We configure intuitive content management systems (such as Headless CMS or customized WordPress) that empower your team to update text, publish blogs, and add products without writing a single line of code."
      },
      {
        question: "Do you build e-commerce stores on Shopify or custom code?",
        answer: "We support both. For rapid catalog launches, we build high-converting bespoke Shopify stores. For unique product configurators or complex subscription models, we build custom headless commerce on Next.js."
      },
      {
        question: "Who owns the intellectual property and source code after launch?",
        answer: "You own 100% of the intellectual property, design assets, and source code. Upon final settlement, we transfer full Git repository access and hosting credentials with zero proprietary vendor lock-in."
      }
    ],
    meta: {
      title: "Web Development Company in Bangalore | Cyber Design House",
      description: "Custom business websites, e-commerce stores and high-converting web applications engineered for speed, security and growth. Bangalore & Global."
    }
  },
  {
    id: "app-development",
    slug: "app-development",
    number: "02",
    title: "App Development",
    shortTitle: "App Dev",
    heroHeadline: "Native iOS, Android aur cross-platform mobile apps.",
    heroSubheading: "We design, build and launch 60 FPS fluid mobile applications across iOS and Android with strict offline sync, biometric security, and turnkey App Store & Play Store publishing.",
    oneLine: "Fluid 60 FPS iOS, Android & cross-platform mobile applications.",
    bullets: [
      "Native iOS (Swift) & Android (Kotlin) development",
      "Cross-Platform Flutter & React Native architectures",
      "On-Demand apps, marketplaces & turnkey app store launch"
    ],
    overview: [
      "A winning mobile application must feel like an extension of the user's fingers—instant, tactile, and completely dependable. We engineer buttery-smooth mobile apps across iOS and Android that combine 60 FPS rendering, thumb-zone ergonomic navigation, and robust cloud data synchronization.",
      "Whether building a consumer on-demand platform, an enterprise field utility, or a cross-platform MVP using Flutter or React Native, our mobile engineering team delivers end-to-end execution from architecture through Apple App Store and Google Play Console approvals."
    ],
    categoriesList: [
      {
        category: "Mobile Platforms",
        tag: "Native & Cross-Platform",
        description: "High-performance mobile architectures delivering fluid 60 FPS performance and native device capabilities.",
        items: [
          "Android App Development",
          "iOS App Development",
          "Flutter Development",
          "React Native Development"
        ]
      },
      {
        category: "Business Applications",
        tag: "Turnkey Digital Solutions",
        description: "Bespoke digital product architectures engineered to scale transactions and enterprise operations.",
        items: [
          "E-commerce Apps",
          "Marketplace Apps",
          "On-Demand Apps",
          "Enterprise Apps"
        ]
      },
      {
        category: "Design & Engineering",
        tag: "Architecture & Quality",
        description: "Human-centric mobile design paired with robust backend APIs, third-party integrations, and automated QA.",
        items: [
          "Mobile UI/UX Design",
          "Backend & API Development",
          "Third-Party Integrations",
          "App Testing & QA"
        ]
      },
      {
        category: "Launch & Support",
        tag: "App Store & Lifecycle",
        description: "Frictionless App Store publishing, 24/7 SLA maintenance, performance profiling, and ASO growth.",
        items: [
          "App Store Publishing",
          "App Maintenance",
          "Performance Optimization",
          "App Store Optimization (ASO)"
        ]
      }
    ],
    offerings: [
      {
        title: "Mobile Platforms",
        tag: "Native & Cross-Platform",
        image: "/images/offerings/app-platforms.jpg",
        description: "High-performance mobile architectures delivering fluid 60 FPS performance, thumb-zone ergonomics, and native device capabilities across iOS and Android.",
        bullets: [
          "Android App Development",
          "iOS App Development",
          "Flutter Development",
          "React Native Development"
        ]
      },
      {
        title: "Business Applications",
        tag: "Turnkey Digital Solutions",
        image: "/images/offerings/app-marketplace.jpg",
        description: "Bespoke digital product architectures engineered to scale transactions, support multi-vendor marketplaces, and automate complex enterprise workflows.",
        bullets: [
          "E-commerce Apps",
          "Marketplace Apps",
          "On-Demand Apps",
          "Enterprise Apps"
        ]
      },
      {
        title: "Design & Engineering",
        tag: "Architecture & Quality",
        image: "/images/offerings/app-engineering.jpg",
        description: "Human-centric mobile design paired with robust backend engineering, microservices, third-party API connectivity, and end-to-end QA validation.",
        bullets: [
          "Mobile UI/UX Design",
          "Backend & API Development",
          "Third-Party Integrations",
          "App Testing & QA"
        ]
      },
      {
        title: "Launch & Support",
        tag: "App Store & Lifecycle",
        image: "/images/offerings/app-launch.jpg",
        description: "Frictionless App Store and Play Store releases, continuous performance telemetry, ongoing SLA maintenance, and search visibility optimization.",
        bullets: [
          "App Store Publishing",
          "App Maintenance",
          "Performance Optimization",
          "App Store Optimization (ASO)"
        ]
      }
    ],
    process: [
      { step: "01", title: "User Flows & Architecture", description: "Screen state maps, offline caching strategy, and cloud backend design." },
      { step: "02", title: "Interactive Mobile UI/UX", description: "Tap-tested Figma prototypes evaluating thumb zones and micro-gestures." },
      { step: "03", title: "Native & Framework Sprints", description: "Clean React Native/Flutter/Swift development with weekly TestFlight/APK builds." },
      { step: "04", title: "Real-Device Hardware QA", description: "Battery drain profiling, low-network latency tests, and multi-device stress checks." },
      { step: "05", title: "Store Compliance & Launch", description: "App Store Connect & Google Play Console submission, privacy declarations, and approval." },
      { step: "06", title: "Telemetry & Release Care", description: "Crash monitoring, crash-free user rate tracking, and post-launch maintenance." }
    ],
    deliverables: [
      "Compiled production APK / AAB (Android) and IPA (iOS) application bundles",
      "Full source code Git repository with build scripts and credentials",
      "App Store and Google Play Store metadata, promotional screenshots, and copy",
      "Integrated Firebase Auth, push notifications (FCM & APNs), and crash analytics",
      "Admin web portal for managing users, content, and real-time app notifications",
      "30-day post-launch warranty and app store approval guarantee"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "TypeScript", "Firebase", "PostgreSQL", "Node.js", "GraphQL"],
    outcomes: [
      { metric: "60 FPS", label: "Fluid mobile rendering" },
      { metric: "99.8%", label: "Crash-free session rate" },
      { metric: "100%", label: "App Store approval guarantee" },
      { metric: "<50ms", label: "Touch interaction latency" }
    ],
    faqs: [
      {
        question: "Should we build native apps (Swift/Kotlin) or cross-platform (React Native/Flutter)?",
        answer: "For 90% of business and consumer applications, cross-platform frameworks like React Native or Flutter offer identical 60 FPS performance while saving 40-50% in development and maintenance costs. If your app requires low-level kernel drivers, deep Bluetooth protocols, or high-frequency ARKit, we recommend native Swift and Kotlin."
      },
      {
        question: "Do you handle the App Store and Google Play submission process?",
        answer: "Yes, completely. We manage account verification, privacy policy compliance, screenshot generation, store descriptions, and coordinate directly with Apple and Google review teams until your app is officially approved and live."
      },
      {
        question: "Can our mobile app work without an internet connection (offline mode)?",
        answer: "Yes. We build resilient local caching layers using SQLite/WatermelonDB so users can view data, prepare drafts, and interact with the app offline. Data automatically syncs with the server when connectivity restores."
      },
      {
        question: "How are app updates and new features deployed after launch?",
        answer: "We support over-the-air (OTA) JavaScript code updates for React Native apps for immediate UI bug fixes, as well as formal binary store releases for major feature additions."
      }
    ],
    meta: {
      title: "Mobile App Development Company in Bangalore | Cyber Design House",
      description: "Custom iOS, Android and cross-platform Flutter/React Native mobile applications built for fluid performance, security and scale. Bangalore & Global."
    }
  },
  {
    id: "seo",
    slug: "seo",
    number: "03",
    title: "SEO & Digital Marketing",
    shortTitle: "SEO & Marketing",
    heroHeadline: "Search rankings, Google Ads, Meta video campaigns aur lead generation.",
    heroSubheading: "Data-backed Search Engine Optimization synchronized with high-ROI paid advertising across Google, Meta, and social channels to drive qualified enterprise inquiries.",
    oneLine: "Organic search growth, high-ROI ads & conversion funnels.",
    bullets: [
      "Google Top-10 search rankings & technical Core Web Vitals",
      "High-intent Google Search, PMax & Meta video advertising",
      "End-to-end conversion funnels with instant lead attribution"
    ],
    overview: [
      "SEO and paid digital marketing are two halves of the same growth engine. Organic SEO builds compounding search authority and zero-cost traffic over time, while targeted paid advertising captures high-intent buyers immediately.",
      "We orchestrate end-to-end customer acquisition: technical crawl fixes, keyword clustering, Google Ads, Meta video campaigns, conversion tracking, and automated WhatsApp lead follow-ups."
    ],
    categoriesList: [
      {
        category: "SEO Services",
        tag: "Organic Search Authority",
        description: "Comprehensive search dominance across technical audits, on-page optimization, local maps rankings, and e-commerce schema.",
        items: [
          "Technical SEO",
          "On-Page SEO",
          "Local SEO",
          "Off-Page SEO",
          "Content SEO",
          "E-commerce SEO"
        ]
      },
      {
        category: "Digital Marketing",
        tag: "High-ROI Paid Acquisition",
        description: "Multi-channel advertising funnels across Google and Meta engineered to capture high-intent buyers and drive qualified pipeline.",
        items: [
          "Google Ads",
          "Social Media Marketing",
          "Content Marketing",
          "Email Marketing",
          "Lead Generation",
          "Performance Marketing"
        ]
      },
      {
        category: "Analytics & Optimization",
        tag: "Telemetry & Attribution",
        description: "Eliminate conversion blind spots with server-side CAPI event tracking, advanced GA4/GTM setup, and systematic CRO testing.",
        items: [
          "SEO Audits",
          "GA4 & GTM Setup",
          "Conversion Tracking",
          "Conversion Rate Optimization"
        ]
      },
      {
        category: "Creative Services",
        tag: "High-CTR Creative Studio",
        description: "Scroll-stopping ad creatives, short-form video reels, conversion landing page designs, and cohesive social brand kits.",
        items: [
          "Social Media Design",
          "Ad Creatives",
          "Video Marketing",
          "Landing Page Design"
        ]
      }
    ],
    offerings: [
      {
        title: "SEO Services",
        tag: "Organic Search Authority",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        description: "Comprehensive search engine optimization establishing compounding organic search rankings, domain authority, and zero-ad-cost commercial buyer traffic.",
        bullets: [
          "Technical SEO",
          "On-Page SEO",
          "Local SEO",
          "Off-Page SEO",
          "Content SEO",
          "E-commerce SEO"
        ]
      },
      {
        title: "Digital Marketing",
        tag: "High-ROI Paid Acquisition",
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80",
        description: "Data-driven multi-channel customer acquisition designed to capture high-intent buyers, generate verified leads, and maximize return on ad spend (ROAS).",
        bullets: [
          "Google Ads",
          "Social Media Marketing",
          "Content Marketing",
          "Email Marketing",
          "Lead Generation",
          "Performance Marketing"
        ]
      },
      {
        title: "Analytics & Optimization",
        tag: "Telemetry & Attribution",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
        description: "Eliminate conversion blind spots with server-side event tracking, in-depth technical audits, and systematic conversion rate optimization (CRO).",
        bullets: [
          "SEO Audits",
          "GA4 & GTM Setup",
          "Conversion Tracking",
          "Conversion Rate Optimization"
        ]
      },
      {
        title: "Creative Services",
        tag: "High-CTR Creative Studio",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
        description: "Scroll-stopping ad creatives, viral video reels, high-converting landing page designs, and cohesive social brand identities engineered to convert.",
        bullets: [
          "Social Media Design",
          "Ad Creatives",
          "Video Marketing",
          "Landing Page Design"
        ]
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
      title: "Digital Marketing & SEO Services in Bangalore | Cyber Design House",
      description: "Search rankings, Google Ads, Meta campaigns and lead generation funnels engineered for real business revenue. Bangalore & Pan-India."
    }
  },
  {
    id: "influencer-marketing",
    slug: "influencer-marketing",
    number: "03",
    title: "Influencer Marketing",
    shortTitle: "Influencers",
    heroHeadline: "Creator profiles, rates, audience details aur campaign booking.",
    heroSubheading: "Collaborate with verified tech, luxury interior, SaaS, and lifestyle creators. Verified audience engagement, transparent rates, and end-to-end viral reel production.",
    oneLine: "Creator campaigns & viral video reels.",
    bullets: [
      "Vetted creator profiles & verified audience metrics",
      "High-retention video editing & graphic design kits",
      "Viral video reels & end-to-end campaign booking"
    ],
    overview: [
      "Modern buyers don't trust faceless corporate ads—they trust creators who build in public, review real products, and command engaged communities. Alongside verified influencers, our in-house creative production studio delivers elite video editing and high-CTR graphic design.",
      "We manage the full creative stack: influencer matchmaking, script angles, professional 4K filming, dynamic reel editing with sound design, thumbnail & graphic asset production, and paid ad boosting for guaranteed viral reach."
    ],
    offerings: [
      {
        title: "Vetted Creator Matchmaking",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        description: "Direct access to our curated roster of creators across Tech & AI, Interior Design, SaaS, and Modern Growth with authentic engagement."
      },
      {
        title: "Elite Short-Form Video Editing",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
        description: "High-retention reel edits, dynamic captions, sound design, B-roll pacing, and motion graphics tailored for Instagram & YouTube Shorts."
      },
      {
        title: "High-CTR Graphic & Brand Design",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
        description: "Eye-catching YouTube thumbnails, social carousel decks, banner ads, and luxury visual collateral that convert viewers into clients."
      },
      {
        title: "Transparent Rate Cards & Booking",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
        description: "Clear per-reel pricing, video editing packages, and commercial usage rights without hidden agency markups."
      },
      {
        title: "Co-Author Collaborative Publishing",
        image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=800&q=80",
        description: "Publishing directly to the creator's profile as an Instagram/LinkedIn collaborator to tap into their loyal followers immediately."
      },
      {
        title: "Paid Boost & Lead Retargeting",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
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
    description: "One unified team from concept to production, with zero agency handoffs."
  },
  {
    title: "Design-Led Engineering",
    tagline: "Aesthetics meet robust architecture",
    description: "Turnkey architectural precision backed by clean, scalable enterprise code."
  },
  {
    title: "3D & Motion Expertise",
    tagline: "Memorable interactive experiences",
    description: "Lightweight, hardware-accelerated 3D animations engineered for speed."
  },
  {
    title: "Performance & SEO Built-In",
    tagline: "Sub-2s Core Web Vitals standard",
    description: "Sub-2s page load speeds, semantic markup, and instant search indexing."
  },
  {
    title: "Clear Communication & Timelines",
    tagline: "No jargon, honest weekly updates",
    description: "Weekly demo builds and direct milestone tracking with lead engineers."
  },
  {
    title: "Post-Launch Warranty & Support",
    tagline: "Long-term partnership after go-live",
    description: "30-day post-launch warranty with proactive monitoring and retainer care."
  }
];

export const SELECTED_WORK_PROJECTS: Array<{
  title: string;
  category: string;
  service: string;
  year: string;
  result: string;
  image: string;
  tags: string[];
  liveUrl?: string;
}> = [
  {
    title: "Shiva Sai Prints",
    category: "Commercial Printing & Digital Showcase",
    service: "Web & App Development",
    year: "2026",
    result: "Digital product showcase & instant quote conversion engine for Bangalore enterprises",
    image: "/images/portfolio/shivasaiprints.png",
    tags: ["Web Platform", "Quote Funnel", "Bangalore"],
    liveUrl: "https://shivasaiprints.com/"
  },
  {
    title: "BISI Engineering",
    category: "Industrial Steel & Manufacturing Portal",
    service: "Web & App Development",
    year: "2026",
    result: "Sub-second product catalog & automated quote RFQ pipeline for global engineering buyers",
    image: "/images/portfolio/bisi.png",
    tags: ["Next.js", "Industrial B2B", "Bengaluru"],
    liveUrl: "https://bisi-seven.vercel.app/"
  },
  {
    title: "VogueNest Creator Launch",
    category: "Influencer Video Reel & Creator Campaign",
    service: "Influencer Marketing",
    year: "2026",
    result: "1.4M+ reel views and 6,200+ direct app installs within 72 hours",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Creator Collab", "Instagram Reels", "Viral Video"]
  },
  {
    title: "Zenith Commerce Growth",
    category: "SEO & Content Architecture",
    service: "SEO & Digital Marketing",
    year: "2025",
    result: "280% organic impression growth across target buyer keywords",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["Technical SEO", "Schema", "Core Web Vitals"]
  },
  {
    title: "Aura Lifestyle Acquisition",
    category: "Performance Marketing Funnel",
    service: "SEO & Digital Marketing",
    year: "2025",
    result: "3.4x ROAS on Meta and Google Ads with automated WhatsApp routing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Meta Ads", "Google Ads", "WhatsApp API"]
  },
  {
    title: "Krypton Cloud Console",
    category: "Multi-Cloud Analytics Portal",
    service: "Web & App Development",
    year: "2026",
    result: "Real-time telemetry streaming with sub-50ms query response",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
    tags: ["Next.js 16", "PostgreSQL", "WebSockets"]
  },
  {
    title: "PulseFit Health Telemetry",
    category: "Cross-Platform iOS & Android App",
    service: "Web & App Development",
    year: "2026",
    result: "Zero-latency Bluetooth sensor sync and 4.9 App Store rating",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80",
    tags: ["React Native", "BLE Sync", "Node.js"]
  },
  {
    title: "GlamourIQ Creator Roster",
    category: "Viral Brand Ambassador Rollout",
    service: "Influencer Marketing",
    year: "2026",
    result: "4.2M+ organic impressions across 80+ creator reel collaborations",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    tags: ["Macro Creators", "Reels", "Full Attribution"]
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
