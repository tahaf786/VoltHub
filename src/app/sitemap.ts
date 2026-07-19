import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Single long-scroll page. Section anchors aren't separate URLs, so the sitemap
// lists the one canonical route. (No `lastModified` = deterministic output.)
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
