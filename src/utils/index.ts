/**
 * دوال مساعدة خفيفة لتقليل حجم الـ JavaScript وحذف أي مكتبات غير ضرورية.
 */

// دمج الفئات (CSS Classes) ديناميكياً بطريقة بسيطة وخفيفة
export function cn(...classes: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  const result: string[] = [];
  
  for (const item of classes) {
    if (!item) continue;
    if (typeof item === "string") {
      result.push(item);
    } else if (typeof item === "object") {
      for (const [key, value] of Object.entries(item)) {
        if (value) result.push(key);
      }
    }
  }
  
  return result.join(" ");
}

// تنسيق التاريخ إلى اللغة العربية الفصحى الأنيقة (مثال: 15 مايو 2026)
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  } catch (error) {
    return dateString;
  }
}

// حساب زمن القراءة التقريبي للنصوص الديناميكية بالدقائق
export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200; // متوسط سرعة القراءة باللغة العربية
  const cleanText = text.replace(/<[^>]*>/g, ""); // تنظيف وسوم HTML
  const wordsCount = cleanText.trim().split(/\s+/).length;
  const time = Math.ceil(wordsCount / wordsPerMinute);
  
  if (time === 1) return "دقيقة واحدة";
  if (time === 2) return "دقيقتان";
  if (time >= 3 && time <= 10) return `${time} دقائق`;
  return `${time} دقيقة`;
}
