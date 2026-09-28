import type { MetadataRoute } from "next";
import { site } from "@/content";

// Genera /robots.txt: permite indexar todo e indica dónde está el sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
