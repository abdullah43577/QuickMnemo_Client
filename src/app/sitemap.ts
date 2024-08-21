import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics: MetadataRoute.Sitemap = [
    {
      url: process.env.NEXT_PUBLIC_LIVE_URL as string,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${process.env.NEXT_PUBLIC_LIVE_URL}/saved-mnemo`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${process.env.NEXT_PUBLIC_LIVE_URL}/subscription`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${process.env.NEXT_PUBLIC_LIVE_URL}/support`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${process.env.NEXT_PUBLIC_LIVE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return [...statics];
}
