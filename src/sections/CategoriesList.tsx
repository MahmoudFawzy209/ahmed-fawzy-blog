import Link from "next/link";
import { getCategories } from "../data";

/**
 * قسم التصنيفات (CategoriesList Section)
 * شبكة من البطاقات المنسقة بأناقة تستعرض تصنيفات الموقع مع الوصف.
 */
export default async function CategoriesList() {
  const categories = await getCategories();

  return (
    <section className="py-12 bg-gradient-to-b from-transparent to-[var(--paper)]">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        
        <span className="text-[12px] font-bold uppercase tracking-wider text-editorial-accent block mb-8 font-sans">
          تصفح الأطروحات حسب المحور
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col justify-between p-6 rounded-xl border border-[var(--border-color)] bg-[var(--background)] hover:border-editorial-accent transition-all duration-300 focus:outline-none"
            >
              <div>
                {/* العنوان */}
                <h3 className="font-serif text-lg font-bold text-[var(--foreground)] group-hover:text-editorial-accent transition-colors duration-300">
                  {cat.title}
                </h3>
                {/* الوصف */}
                <p className="text-[12px] leading-relaxed text-editorial-muted mt-2">
                  {cat.description || "قراءات وتحليلات فكرية معمقة في هذا المجال الاجتماعي والثقافي."}
                </p>
              </div>

              {/* عدد المقالات والزر */}
              <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-[var(--border-color)]/50">
                <span className="text-[11px] text-editorial-muted font-sans uppercase">
                  {cat.count === 1 ? "أطروحة واحدة" : cat.count === 2 ? "أطروحتان" : `${cat.count} أطروحات`}
                </span>
                <span className="text-[14px] text-editorial-accent font-semibold group-hover:translate-x-[-4px] transition-transform duration-300">
                  ←
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
