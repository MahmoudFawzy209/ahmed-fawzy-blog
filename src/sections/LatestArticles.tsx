import Link from "next/link";
import Image from "next/image";
import ArticleCard from "../components/blog/ArticleCard";
import { getLatestPosts, getCategories, getAuthor } from "../data";

/**
 * قسم أحدث المقالات (LatestArticles Section)
 * يعرض المقالات الأحدث مع قائمة جانبية تضم التصنيفات ونبذة مصغرة للكاتب.
 */
export default async function LatestArticles() {
  const latestPosts = await getLatestPosts();
  const categories = await getCategories();
  const author = await getAuthor();

  return (
    <section id="latest-articles" className="py-16 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* العمود الرئيسي: قائمة المقالات (Left Column) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-editorial-accent font-sans mb-2">
              آخر الأطروحات الفكرية
            </h2>
            
            {latestPosts.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-[var(--border-color)] rounded-xl">
                <span className="font-serif text-lg text-editorial-muted">لا توجد مقالات منشورة حالياً.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-10">
                {latestPosts.map((post, index) => (
                  <ArticleCard key={post.slug} post={post} priority={index === 0} />
                ))}
              </div>
            )}
          </div>

          {/* العمود الجانبي: أدوات إضافية (Right Column - Sidebar) */}
          <aside className="lg:col-span-4 flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
            
            {/* ويدجت 1: نبذة عن الكاتب */}
            <div className="rounded-xl border border-[var(--border-color)] bg-[var(--paper)] p-6 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-editorial-gray-light dark:bg-editorial-gray-dark">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-md font-bold text-[var(--foreground)]">{author.name}</span>
                  <span className="text-[10px] text-editorial-muted font-sans uppercase">صاحب القلم</span>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-editorial-muted mb-4">
                {author.bio}
              </p>
              <Link
                href="/about"
                className="text-[12px] font-semibold text-editorial-accent hover:underline flex items-center gap-1 focus:outline-none"
              >
                المزيد عن رؤيتي الأكاديمية والفلسفية 
                <span aria-hidden="true">←</span>
              </Link>
            </div>

            {/* ويدجت 2: التصنيفات */}
            <div className="rounded-xl border border-[var(--border-color)] bg-[var(--paper)] p-6 transition-colors duration-300">
              <span className="text-[12px] font-bold uppercase tracking-wider text-editorial-accent block mb-4 font-sans">
                أبرز محاور البحث
              </span>
              <nav aria-label="أقسام الموقع" className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="group flex items-center justify-between py-2 text-[14px] text-editorial-muted hover:text-[var(--foreground)] border-b border-[var(--border-color)]/30 last:border-0"
                  >
                    <span>{cat.title}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-editorial-gray-light dark:bg-editorial-gray-dark text-editorial-muted group-hover:bg-editorial-accent group-hover:text-white transition-all">
                      {cat.count || 0}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

          </aside>

        </div>

      </div>
    </section>
  );
}
