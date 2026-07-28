import Link from "next/link";
import Image from "next/image";
import { getFeaturedPost } from "../data";
import { formatDate } from "../utils";

/**
 * قسم المقال الرئيسي المميز (FeaturedArticles Section)
 * يعرض المقال القيادي للموقع بنمط مجلات صحفية احترافي واسع النطاق.
 */
export default async function FeaturedArticles() {
  const post = await getFeaturedPost();

  if (!post) return null;

  const { title, slug, mainImage, publishedAt, excerpt, readingTime, categories, author } = post;

  return (
    <section className="py-12 border-y border-[var(--border-color)] bg-[var(--paper)] transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        
        <span className="text-[12px] font-bold uppercase tracking-wider text-editorial-accent block mb-8 font-sans">
          أطروحة رئيسية مميزة
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* الصورة الكبيرة للمقال */}
          <Link
            href={`/posts/${slug}`}
            className="lg:col-span-7 relative aspect-16/10 w-full overflow-hidden rounded-xl bg-editorial-gray-light dark:bg-editorial-gray-dark focus:outline-none"
            tabIndex={-1}
          >
            <Image
              src={mainImage}
              alt={`صورة المقال المميز: ${title}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
              className="object-cover transition-transform duration-700 hover:scale-102"
            />
          </Link>

          {/* تفاصيل المقال الفكرية */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* التصنيف وزمن القراءة */}
            <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="text-editorial-accent hover:underline"
                >
                  {cat.title}
                </Link>
              ))}
              <span className="text-editorial-muted">•</span>
              <time dateTime={publishedAt} className="text-editorial-muted">
                {formatDate(publishedAt)}
              </time>
              <span className="text-editorial-muted">•</span>
              <span className="text-editorial-muted">{readingTime}</span>
            </div>

            {/* العنوان */}
            <h2 className="font-serif text-2xl md:text-3.5xl font-black leading-tight text-[var(--foreground)] hover:text-editorial-accent transition-colors duration-300">
              <Link href={`/posts/${slug}`}>
                {title}
              </Link>
            </h2>

            {/* المقتطف */}
            <p className="text-[15px] leading-relaxed text-editorial-muted">
              {excerpt}
            </p>

            {/* الكاتب والزر */}
            <div className="flex items-center justify-between gap-4 mt-2 pt-4 border-t border-[var(--border-color)]">
              <div className="flex items-center gap-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-full bg-editorial-gray-light dark:bg-editorial-gray-dark">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-[var(--foreground)]">{author.name}</span>
                  <span className="text-[11px] text-editorial-muted">كاتب المنصة الرئيسي</span>
                </div>
              </div>

              <Link
                href={`/posts/${slug}`}
                className="text-[13px] font-semibold text-editorial-accent hover:underline flex items-center gap-1 focus:outline-none"
              >
                اقرأ المزيد 
                <span aria-hidden="true">←</span>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
