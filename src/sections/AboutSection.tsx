import Link from "next/link";
import Image from "next/image";
import { getAuthor } from "../data";

/**
 * قسم "عن الكاتب" التعريفي على الصفحة الرئيسية (About Section)
 */
export default async function AboutSection() {
  const author = await getAuthor();

  return (
    <section className="py-16 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center rounded-xl border border-[var(--border-color)] bg-[var(--paper)] p-8 md:p-12">
          
          {/* الصورة التعبيرية للكاتب */}
          <div className="md:col-span-4 relative aspect-square w-full max-w-[280px] mx-auto md:max-w-none overflow-hidden rounded-xl bg-editorial-gray-light dark:bg-editorial-gray-dark shadow-sm">
            <Image
              src={author.avatar}
              alt={`صورة الكاتب الشخصية: ${author.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-cover"
            />
          </div>

          {/* نص النبذة التعريفية للكاتب */}
          <div className="md:col-span-8 flex flex-col gap-4 text-center md:text-right">
            <span className="text-[12px] font-bold uppercase tracking-wider text-editorial-accent font-sans">
              عن صاحب القلم والمنصة
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight text-[var(--foreground)]">
              {author.name}
            </h2>
            <p className="text-[14px] leading-relaxed text-editorial-muted">
              {author.bio} يسعى من خلال هذه المنصة لطرح كتابات مستقلة تماماً ومراجعات نقدية تسبر أغوار الثقافة المعاصرة، وتبحث في فلسفة التكنولوجيا الرقمية وما تشكله من منعطفات أخلاقية واجتماعية في تكوين الفرد والمجتمع العربي.
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <Link
                href="/about"
                className="text-[13px] font-semibold text-editorial-accent hover:underline flex items-center gap-1 focus:outline-none"
              >
                اقرأ السيرة الأكاديمية الكاملة وفلسفة النشر 
                <span aria-hidden="true">←</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
