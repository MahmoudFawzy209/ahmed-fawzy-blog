"use client";

import { useEffect, useState } from "react";

/**
 * زر تبديل الوضع الليلي (Dark Mode Toggle)
 * يدعم إمكانية الوصول بالكامل (Accessibility) ويمنع وميض الصفحة.
 */
export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  if (!mounted) {
    // الهيكل المبدئي (Skeleton) أثناء الـ Hydration لمنع التغير في الواجهة
    return (
      <div className="w-8 h-8 rounded-full bg-editorial-gray-light dark:bg-editorial-gray-dark animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 rounded-full text-editorial-muted hover:text-editorial-accent hover:bg-editorial-gray-light dark:hover:bg-editorial-gray-dark transition-all duration-300 focus:outline-none"
      aria-label={theme === "light" ? "تفعيل الوضع الليلي" : "تفعيل الوضع المضيء"}
      title={theme === "light" ? "تفعيل الوضع الليلي" : "تفعيل الوضع المضيء"}
    >
      {theme === "light" ? (
        // أيقونة القمر
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
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      ) : (
        // أيقونة الشمس
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
            d="M12 3v2.25m0 13.5V21M5.22 5.22l1.59 1.59m10.38 10.38l1.59 1.59M12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5ZM3 12h2.25m13.5 0H21M5.22 18.78l1.59-1.59m10.38-10.38l1.59-1.59"
          />
        </svg>
      )}
    </button>
  );
}
