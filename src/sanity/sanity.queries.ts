/**
 * استعلامات GROQ المخصصة لجلب البيانات من Sanity CMS
 * يمكنك استخدام هذه الاستعلامات مباشرة عند ربط المشروع بـ Sanity.
 */

// جلب تفاصيل كاتب معين مع حساباته الاجتماعية
export const authorQuery = `
  *[_type == "author"][0] {
    _id,
    name,
    "slug": slug.current,
    "avatar": avatar.asset->url,
    bio,
    facebook,
    twitter,
    instagram
  }
`;

// جلب قائمة بكافة التصنيفات المتاحة
export const categoriesQuery = `
  *[_type == "category"] {
    _id,
    title,
    "slug": slug.current,
    description
  }
`;

// جلب المقال المميز (الرئيسي)
export const featuredPostQuery = `
  *[_type == "post" && isFeatured == true][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body,
    "mainImage": mainImage.asset->url,
    readingTime,
    author-> {
      name,
      "slug": slug.current,
      "avatar": avatar.asset->url
    },
    categories[]-> {
      title,
      "slug": slug.current
    }
  }
`;

// جلب المقالات الأحدث مع إمكانية التحديد والترتيب
export const latestPostsQuery = `
  *[_type == "post" && isFeatured != true] | order(publishedAt desc)[0...$limit] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "mainImage": mainImage.asset->url,
    readingTime,
    author-> {
      name,
      "avatar": avatar.asset->url
    },
    categories[]-> {
      title,
      "slug": slug.current
    }
  }
`;

// جلب مقال محدد عبر الرابط الفريد (Slug)
export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body,
    "mainImage": mainImage.asset->url,
    readingTime,
    author-> {
      name,
      bio,
      "slug": slug.current,
      "avatar": avatar.asset->url,
      facebook,
      twitter,
      instagram
    },
    categories[]-> {
      title,
      "slug": slug.current
    },
    "relatedPosts": *[_type == "post" && slug.current != $slug && references(^.categories[]._ref)][0...3] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      "mainImage": mainImage.asset->url,
      readingTime
    }
  }
`;

// جلب مقالات تصنيف معين
export const postsByCategoryQuery = `
  *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "mainImage": mainImage.asset->url,
    readingTime,
    author-> {
      name,
      "avatar": avatar.asset->url
    },
    categories[]-> {
      title,
      "slug": slug.current
    }
  }
`;

// البحث في المقالات
export const searchPostsQuery = `
  *[_type == "post" && (title match $searchQuery || excerpt match $searchQuery || body match $searchQuery)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "mainImage": mainImage.asset->url,
    readingTime,
    author-> {
      name,
      "avatar": avatar.asset->url
    },
    categories[]-> {
      title,
      "slug": slug.current
    }
  }
`;
