"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  text: string;
  id: string;
}

interface TableOfContentsProps {
  bodyHtml: string;
}

/**
 * جدول المحتويات (Table of Contents)
 * يقوم باستخراج العناوين الرئيسية <h2> من المقال وتوليد روابط تنقل سريعة وسلسة.
 */
export default function TableOfContents({ bodyHtml }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // استخراج كافة نصوص الـ <h2> من كود الـ HTML للمقال
    const parser = new DOMParser();
    const doc = parser.parseFromString(bodyHtml, "text/html");
    const h2Elements = doc.querySelectorAll("h2");
    
    const items: TOCItem[] = Array.from(h2Elements).map((h2, index) => {
      const text = h2.textContent || "";
      // توليد ID فريد بناءً على رقم الترتيب
      const id = `section-${index}`;
      return { text, id };
    });

    setHeadings(items);

    // استخدام Intersection Observer لتحديد القسم النشط حالياً أثناء القراءة
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // نراقب العناصر في الصفحة الفعلية بعد عملية الرندرة
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [bodyHtml]);

  if (headings.length === 0) return null;

  return (
    <div className="rounded-lg border border-[var(--border-color)] bg-[var(--paper)] p-6 transition-colors duration-300">
      <span className="text-[13px] font-bold uppercase tracking-wider text-editorial-accent block mb-4 font-sans">
        محتويات المقال
      </span>
      <nav aria-label="جدول المحتويات" className="flex flex-col gap-3">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth"
                });
              }}
              className={`text-[14px] leading-relaxed transition-all pr-3 border-r ${
                isActive
                  ? "text-editorial-accent border-editorial-accent font-semibold"
                  : "text-editorial-muted border-transparent hover:text-[var(--foreground)] hover:border-[var(--border-color)]"
              }`}
            >
              {heading.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
