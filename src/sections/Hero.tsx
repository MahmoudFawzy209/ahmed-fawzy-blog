import Link from "next/link";
import { getAuthor } from "../data";

/**
 * قسم الهيرو الرئيسي (Hero Section)
 * تصميم فني رصين يركز على الكلمة والخط، يرحب بالقارئ ويعبر عن فلسفة الموقع.
 */
export default async function Hero() {
  const author = await getAuthor();

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-[var(--paper)] to-transparent">
      <div className="mx-auto max-w-4xl px-6 md:px-8 text-center flex flex-col items-center gap-6">
        
        {/* كلمة ترحيبية أو وصف مصغر */}
        <span className="font-sans text-[11px] uppercase tracking-widest text-editorial-accent font-semibold px-3 py-1 rounded-full border border-editorial-accent/20 bg-editorial-accent/5">
          منصة فكرية متأنية
        </span>

        {/* العنوان العريض للرؤية الأدبية */}
        <h1 className="font-serif text-3xl md:text-5.5xl font-black leading-tight tracking-tight text-[var(--foreground)] max-w-3xl">
          تفكيك الظواهر الثقافية، ونقد تحولات الحداثة الرقمية
        </h1>

        {/* النص الفرعي */}
        <p className="font-serif text-lg md:text-xl leading-relaxed text-editorial-muted max-w-2xl">
          أطروحات وقراءات هادئة حول قضايا المجتمع والفلسفة والسياسة، يكتبها <strong className="text-[var(--foreground)]">{author.name}</strong> بعيداً عن صخب وتسطيح الإعلام السريع.
        </p>

        {/* أزرار الدعوة للإجراء (Call To Actions) */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <Link
            href="#latest-articles"
            className="px-6 py-3 rounded-full text-[14px] font-semibold text-white bg-editorial-accent hover:bg-editorial-accent/90 transition-all duration-300 shadow-sm"
          >
            اقرأ آخر الأطروحات
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-full text-[14px] font-semibold border border-[var(--border-color)] text-editorial-muted hover:text-[var(--foreground)] hover:bg-editorial-gray-light dark:hover:bg-editorial-gray-dark transition-all duration-300"
          >
            عن الكاتب وفلسفته
          </Link>
        </div>

      </div>
      
      {/* لمسة خلفية فنية خفيفة (Subtle Gradient Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-72 w-72 rounded-full bg-editorial-accent/5 blur-3xl" />
    </section>
  );
}
