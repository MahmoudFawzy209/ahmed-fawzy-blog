import Link from "next/link";
import { mockCategories } from "../../data/mockData";

/**
 * الفوتر الرئيسي للموقع (Footer)
 * تصميم هادئ مع روابط منظمة ومعلومات الكاتب والشبكات الاجتماعية.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--border-color)] bg-[var(--paper)] py-16 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          
          {/* العمود الأول: نبذة عن الكاتب */}
          <div className="flex flex-col gap-4 sm:col-span-2">
            <span className="font-serif text-xl font-bold text-[var(--foreground)]">
              د. يوسف عبدالرحمن
            </span>
            <p className="max-w-md text-[14px] leading-relaxed text-editorial-muted">
              منصة فكرية مخصصة للتحليل الثقافي والاجتماعي والفلسفي. نسعى لتقديم قراءات هادئة وعميقة تفكك تعقيدات الحاضر بعيداً عن صخب وتسطيح العالم الرقمي.
            </p>
            <div className="flex gap-4 mt-2">
              {/* أيقونات التواصل الاجتماعي */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-editorial-muted hover:text-editorial-accent transition-colors"
                aria-label="حساب تويتر الكاتب"
              >
                تويتر
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-editorial-muted hover:text-editorial-accent transition-colors"
                aria-label="حساب فيسبوك الكاتب"
              >
                فيسبوك
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-editorial-muted hover:text-editorial-accent transition-colors"
                aria-label="حساب إنستغرام الكاتب"
              >
                إنستغرام
              </a>
            </div>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div className="flex flex-col gap-4">
            <span className="text-[12px] font-bold uppercase tracking-wider text-editorial-accent font-sans">
              خريطة الموقع
            </span>
            <ul className="flex flex-col gap-2.5 text-[14px]">
              <li>
                <Link href="/" className="text-editorial-muted hover:text-[var(--foreground)] transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-editorial-muted hover:text-[var(--foreground)] transition-colors">
                  كافة التصنيفات
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-editorial-muted hover:text-[var(--foreground)] transition-colors">
                  عن الكاتب
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-editorial-muted hover:text-[var(--foreground)] transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الثالث: أبرز التصنيفات */}
          <div className="flex flex-col gap-4">
            <span className="text-[12px] font-bold uppercase tracking-wider text-editorial-accent font-sans">
              أبرز الأقسام
            </span>
            <ul className="flex flex-col gap-2.5 text-[14px]">
              {mockCategories.slice(0, 4).map((cat) => (
                <li key={cat.slug}>
                  <Link 
                    href={`/categories/${cat.slug}`} 
                    className="text-editorial-muted hover:text-[var(--foreground)] transition-colors"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* خط النهاية وحقوق الملكية */}
        <div className="mt-16 border-t border-[var(--border-color)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-editorial-muted">
          <span>
            © {currentYear} د. يوسف عبدالرحمن. جميع الحقوق محفوظة.
          </span>
          <span className="flex gap-4">
            <Link href="/about" className="hover:text-editorial-accent">فلسفة الكتابة</Link>
            <span className="text-editorial-gray-light dark:text-editorial-gray-dark">|</span>
            <Link href="/contact" className="hover:text-editorial-accent">الدعم والاستشارات</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
