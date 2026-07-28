"use client";

import { useReadingProgress } from "../../hooks/useReadingProgress";

/**
 * شريط تقدم القراءة (ReadingProgressBar)
 * يظهر في الجزء العلوي من شاشة المقال عند التمرير بشكل أنيق غير مشتت.
 */
export default function ReadingProgressBar() {
  const completion = useReadingProgress();

  return (
    <div 
      className="fixed top-20 left-0 right-0 h-1 bg-editorial-gray-light dark:bg-editorial-gray-dark z-40"
      role="progressbar"
      aria-valuenow={completion}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="نسبة تقدم القراءة"
    >
      <div
        className="h-full bg-editorial-accent transition-all duration-100 ease-out"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}
