import { MetadataRoute } from "next";

/**
 * ملف Robots.txt لإدارة سلوك زواحف الأرشفة (Search Crawlers)
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://youssef-abdelrahman.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",          // منع أرشفة الـ APIs الداخلية إن وجدت
        "/_next/",        // منع أرشفة مجلدات النظام الخاصة بـ Next.js
        "/search?*",      // منع أرشفة نتائج البحث العشوائية لمنع تكرار المحتوى (Duplicate Content)
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
