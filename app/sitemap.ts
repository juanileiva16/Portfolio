import type { MetadataRoute } from "next";
import { site } from "@/content";

// Genera /sitemap.xml. El sitio es una sola página; la fecha es la del último build.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
