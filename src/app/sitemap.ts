import { MetadataRoute } from "next";
import { getPosts, getCategories } from "../data";

/**
 * ملف Sitemap.xml الديناميكي (Dynamic Sitemap)
 * يضمن أرشفة كافة المقالات والتصنيفات والصفحات الثابتة فور نشرها تلقائياً.
 */
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://youssef-abdelrahman.com";

  // الصفحات الثابتة الأساسية
  const staticPages = [
    "",
    "/categories",
    "/about",
    "/contact",
    "/search",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // جلب المقالات ديناميكياً لإدراجها في الخريطة
  const posts = await getPosts();
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.publishedAt.split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // جلب التصنيفات ديناميكياً
  const categories = await getCategories();
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...postUrls, ...categoryUrls];
}
