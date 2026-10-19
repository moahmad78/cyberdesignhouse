import { MetadataRoute } from "next";
import { SITE_METADATA } from "@/data/siteData";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_METADATA.siteUrl}/sitemap.xml`,
  };
}
