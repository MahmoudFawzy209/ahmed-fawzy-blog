"use client";

import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

/**
 * أزرار مشاركة المقال (ShareButtons)
 * تدعم فيسبوك، إكس (تويتر سابقاً)، ونسخ الرابط مع رسالة تأكيد للمستخدم.
 */
export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/posts/${slug}` : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 py-6 border-y border-[var(--border-color)]">
      <span className="text-[13px] font-bold text-editorial-muted font-sans uppercase tracking-wider">
        شارِك هذا المقال:
      </span>
      
      <div className="flex gap-2">
        {/* مشاركة على X / Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-full bg-editorial-gray-light dark:bg-editorial-gray-dark text-[var(--foreground)] hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all"
          aria-label="مشاركة عبر إكس"
        >
          <span>تويتر</span>
        </a>

        {/* مشاركة على Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-full bg-editorial-gray-light dark:bg-editorial-gray-dark text-[var(--foreground)] hover:text-white hover:bg-[#1877F2] transition-all"
          aria-label="مشاركة عبر فيسبوك"
        >
          <span>فيسبوك</span>
        </a>

        {/* نسخ الرابط المباشر */}
        <button
          onClick={copyToClipboard}
          type="button"
          className={`flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-full transition-all focus:outline-none ${
            copied
              ? "bg-editorial-sage text-white"
              : "bg-editorial-gray-light dark:bg-editorial-gray-dark text-[var(--foreground)] hover:bg-editorial-accent hover:text-white"
          }`}
          aria-label="نسخ رابط المقال"
        >
          {copied ? <span>تم النسخ!</span> : <span>نسخ الرابط</span>}
        </button>
      </div>
    </div>
  );
}
