"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import DarkModeToggle from "./DarkModeToggle";

/**
 * الهيدر الرئيسي للموقع (Header)
 * تصميم Editorial راقي، هادئ ومتجاوب بالكامل.
 */
export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // إغلاق القائمة المتنقلة عند تغيير المسار
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // التحكم في منع التمرير للخلفية عند فتح القائمة المتنقلة
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "التصنيفات", path: "/categories" },
    { name: "عن الكاتب", path: "/about" },
    { name: "تواصل مع الكاتب", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--background)]/90 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* الشعار الفني (Logo) */}
          <Link 
            href="/" 
            className="group flex flex-col items-start focus:outline-none"
            aria-label="الذهاب للصفحة الرئيسية"
          >
            <span className="font-serif text-2xl font-bold tracking-tight text-[var(--foreground)] group-hover:text-editorial-accent transition-colors duration-300">
              د. يوسف عبدالرحمن
            </span>
            <span className="font-sans text-[10px] uppercase tracking-widest text-editorial-muted">
              تحليلات ثقافية وسياسية وفكرية
            </span>
          </Link>

          {/* روابط التنقل لسطح المكتب (Desktop Navigation) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="رئيسي">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-[14px] font-medium tracking-wide transition-colors duration-300 focus:outline-none ${
                    isActive
                      ? "text-editorial-accent font-semibold"
                      : "text-editorial-muted hover:text-[var(--foreground)]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* الأدوات الإضافية (البحث، الوضع الليلي، القائمة) */}
          <div className="flex items-center gap-3">
            {/* أيقونة البحث الذكية */}
            <Link
              href="/search"
              className="p-2 rounded-full text-editorial-muted hover:text-editorial-accent hover:bg-editorial-gray-light dark:hover:bg-editorial-gray-dark transition-all duration-300 focus:outline-none"
              aria-label="صفحة البحث"
              title="البحث في المقالات"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5.5 h-5.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.608 10.608Z"
                />
              </svg>
            </Link>

            {/* زر الوضع الليلي */}
            <DarkModeToggle />

            {/* زر القائمة للهواتف (Mobile Menu Toggle) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 md:hidden rounded-full text-editorial-muted hover:text-editorial-accent focus:outline-none"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* شاشة القائمة الجانبية للموبايل (Mobile Navigation Overlay Drawer) */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 top-20 z-30 w-full bg-[var(--background)] transition-all duration-300 md:hidden ${
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full px-8 py-10 gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-2xl font-serif font-bold transition-all ${
                  isActive ? "text-editorial-accent pr-2 border-r-2 border-editorial-accent" : "text-editorial-muted"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="mt-8 border-t border-[var(--border-color)] pt-8 flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-editorial-muted font-sans">تواصل اجتماعي</span>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-editorial-muted hover:text-editorial-accent">تويتر</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-editorial-muted hover:text-editorial-accent">فيسبوك</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-editorial-muted hover:text-editorial-accent">إنستغرام</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
