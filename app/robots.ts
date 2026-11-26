import { MetadataRoute } from "next";
import { COMPANY_INFO } from "@/data/rayoData";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${COMPANY_INFO.websiteUrl}/sitemap.xml`,
  };
}
