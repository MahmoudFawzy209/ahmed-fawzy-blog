"use client";

import { useEffect, useState } from "react";

/**
 * هوك مخصص لحساب نسبة تقدم القراءة أثناء التمرير في صفحة المقال.
 */
export function useReadingProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(
          Number((window.scrollY / scrollHeight).toFixed(2)) * 100
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return completion;
}
