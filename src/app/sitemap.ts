import type { MetadataRoute } from "next";
import { posts } from "./blog/posts";

const BASE = "https://menteeai.org";

const staticRoutes: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { url: "/",             priority: 1.0, changeFrequency: "weekly"  },
  { url: "/research",     priority: 0.9, changeFrequency: "monthly" },
  { url: "/embed-models", priority: 0.9, changeFrequency: "monthly" },
  { url: "/blog",         priority: 0.8, changeFrequency: "weekly"  },
  { url: "/products",     priority: 0.7, changeFrequency: "monthly" },
  { url: "/about",        priority: 0.6, changeFrequency: "monthly" },
  { url: "/careers",      priority: 0.6, changeFrequency: "monthly" },
  { url: "/contact",      priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const statics = staticRoutes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const blogPosts = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...statics, ...blogPosts];
}
