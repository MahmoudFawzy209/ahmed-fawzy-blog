/**
 * إعدادات اتصال Sanity Client
 * عند ربط Sanity CMS بالمشروع، قم بتثبيت `@sanity/client` و `next-sanity`
 * واستبدل هذا الكود بالإعدادات الحقيقية.
 */

// في المستقبل يمكنك تثبيت المكتبة: npm install @sanity/client next-sanity
// واستيراد: import { createClient } from '@sanity/client'

const clientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-03-15", // تاريخ إصدار الـ API المستخدم
  useCdn: process.env.NODE_ENV === "production", // استخدام شبكة CDN في الإنتاج لتسريع الاستجابة
};

export const sanityClient = {
  // محاكاة لدالة fetch الخاصة بـ Sanity لجلب البيانات
  fetch: async <T>(query: string, params: Record<string, any> = {}): Promise<T> => {
    console.warn("Sanity client is running in mock mode. Modify sanity.client.ts to query live CMS data.");
    throw new Error("Sanity client is in mock mode. Use the mock data layer in src/data instead.");
  }
};

export default sanityClient;
