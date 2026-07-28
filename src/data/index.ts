import { Author, Category, Post } from "../sanity/sanity.types";
import { mockAuthor, mockCategories, mockPosts, mockQuotes } from "./mockData";

/**
 * طبقة جلب البيانات (Mock Data Layer API)
 * تم بناء هذه الدوال لتشابه تماماً التوقيع البرمجي (Signature) للاتصال بـ Sanity CMS.
 * مستقبلاً، لاستبدال هذه البيانات بـ Sanity، قم فقط بتحديث الكود داخل هذه الدوال
 * ليقوم بالجلب الفعلي باستخدام sanityClient.fetch(query, params)
 */

// جلب تفاصيل الكاتب
export async function getAuthor(): Promise<Author> {
  // محاكاة تأخير بسيط للشبكة (اختياري)
  // await new Promise((resolve) => setTimeout(resolve, 50));
  return mockAuthor;
}

// جلب كل التصنيفات
export async function getCategories(): Promise<Category[]> {
  // نقوم بحساب عدد المقالات الفعلي في كل تصنيف لتكون ديناميكية
  return mockCategories.map(cat => ({
    ...cat,
    count: mockPosts.filter(post => post.categories.some(c => c.slug === cat.slug)).length
  }));
}

// جلب كل المقالات
export async function getPosts(): Promise<Post[]> {
  return mockPosts;
}

// جلب المقال الرئيسي المميز
export async function getFeaturedPost(): Promise<Post | null> {
  const featured = mockPosts.find(post => post.isFeatured);
  return featured || mockPosts[0] || null;
}

// جلب المقالات الأحدث مع استثناء المقال المميز (أو تضمينه حسب الطلب)
export async function getLatestPosts(limit = 6): Promise<Post[]> {
  return mockPosts
    .filter(post => !post.isFeatured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

// جلب مقال محدد بواسطة الرابط الفريد (Slug)
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = mockPosts.find(post => post.slug === slug);
  if (!post) return null;
  return post;
}

// جلب مقالات مرتبطة بمقال معين (بناءً على التصنيفات المشتركة)
export async function getRelatedPosts(currentSlug: string, limit = 3): Promise<Post[]> {
  const currentPost = mockPosts.find(p => p.slug === currentSlug);
  if (!currentPost) return [];

  const currentCategorySlugs = currentPost.categories.map(c => c.slug);

  return mockPosts
    .filter(post => {
      // استثناء المقال الحالي نفسه
      if (post.slug === currentSlug) return false;
      // التحقق من وجود تصنيف مشترك واحد على الأقل
      return post.categories.some(cat => currentCategorySlugs.includes(cat.slug));
    })
    .slice(0, limit);
}

// جلب مقالات تصنيف معين
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  return mockPosts.filter(post => 
    post.categories.some(cat => cat.slug === categorySlug)
  );
}

// البحث في المقالات
export async function searchPosts(query: string): Promise<Post[]> {
  if (!query) return [];
  const normalizedQuery = query.toLowerCase().trim();
  
  return mockPosts.filter(post => 
    post.title.toLowerCase().includes(normalizedQuery) ||
    post.excerpt.toLowerCase().includes(normalizedQuery) ||
    post.body.toLowerCase().includes(normalizedQuery)
  );
}

// جلب الاقتباسات الفكرية للمؤلف
export async function getQuotes() {
  return mockQuotes;
}
