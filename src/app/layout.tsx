import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ConsentBanner } from "@/components/layout/ConsentBanner";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { ConsultationModalProvider } from "@/context/ConsultationModalContext";
import { GlobalFloatingShard } from "@/components/layout/GlobalFloatingShard";
import { SITE_METADATA } from "@/data/siteData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.siteUrl),
  title: {
    default: "Cyber Design House | Technology Partner by VoometDesign",
    template: "%s | Cyber Design House",
  },
  description:
    "Bangalore-based IT services: custom web applications, native & cross-platform mobile apps, technical SEO, and conversion-focused performance marketing by VoometDesign.",
  keywords: [
    "web & app development company Bangalore",
    "web development company Bangalore",
    "mobile app development Bangalore",
    "SEO services Bangalore",
    "digital marketing agency Bangalore",
    "Cyber Design House",
    "VoometDesign IT",
  ],
  authors: [{ name: "Cyber Design House" }],
  creator: "VoometDesign",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Cyber Design House | Technology Partner by VoometDesign",
    description:
      "Websites, mobile apps, SEO and digital marketing from one dedicated team in Bangalore.",
    url: SITE_METADATA.siteUrl,
    siteName: SITE_METADATA.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/work-web.jpg",
        width: 1200,
        height: 630,
        alt: "Cyber Design House",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Design House | Technology Partner by VoometDesign",
    description: "Bangalore-based digital products, web development, mobile apps and SEO.",
    images: ["/images/work-web.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_METADATA.name,
    alternateName: "Cyber Design House Bangalore",
    url: SITE_METADATA.siteUrl,
    logo: `${SITE_METADATA.siteUrl}/images/cd-mark.png`,
    telephone: SITE_METADATA.phone,
    email: SITE_METADATA.email,
    parentOrganization: {
      "@type": "Organization",
      name: SITE_METADATA.parentCompany,
      url: SITE_METADATA.parentUrl,
      foundingDate: SITE_METADATA.establishedYear,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "5th Floor, Affinity Akash, Avalahalli Village, Yelahanka Hobli",
      addressLocality: SITE_METADATA.city,
      postalCode: "560064",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "13.1023",
      longitude: "77.5901",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:30",
        closes: "18:30",
      },
    ],
    priceRange: "$$",
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} scroll-smooth`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,600,500,400,300&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-[#fafaf8] text-[#45556c] font-sans min-h-screen flex flex-col antialiased selection:bg-[#071633]/15 selection:text-[#071633]">
        {/* WCAG 2.1 AA Skip to Content Link (Section 9) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 px-4 py-2 bg-[#071633] text-white font-bold rounded-lg shadow-xl"
        >
          Skip to main content
        </a>

        {/* Global Motion & Interaction Layer */}
        <SmoothScrollProvider>
          <ConsultationModalProvider>
            {/* 3D Roaming Crystal Shard emerging from Header across all pages */}
            <GlobalFloatingShard />

            {/* Custom Cursor for Desktop (Section 5.5) */}
            <CustomCursor />

            {/* Sticky Header with Elevation (Section 5.2) */}
            <Header />

            {/* Main Content Area */}
            <main id="main-content" className="flex-grow focus:outline-none">
              {children}
            </main>

            {/* Footer (Section 5.3) */}
            <Footer />

            {/* Floating WhatsApp and Back to Top (Section 5.4) */}
            <FloatingActions />

            {/* Cookie & Consent Banner (Section 5.6) */}
            <ConsentBanner />
          </ConsultationModalProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
