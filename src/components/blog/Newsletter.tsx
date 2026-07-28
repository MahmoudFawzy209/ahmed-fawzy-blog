"use client";

import { useState } from "react";

/**
 * قسم النشرة البريدية (Newsletter Section)
 * تصميم هادئ، يعرض واجهة مستخدم نظيفة لتسجيل القراء المهتمين بالمتابعة الفكرية.
 */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // محاكاة الاتصال بخدمة بريدية خارجية (مثل Mailchimp أو ConvertKit أو Sanity API)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage("حدث خطأ أثناء الاشتراك. يرجى المحاولة لاحقاً.");
    }
  };

  return (
    <section className="py-16 bg-[var(--paper)] transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-6 md:px-8 text-center flex flex-col items-center gap-6">
        
        {/* الأيقونة الفنية المصغرة */}
        <span className="font-sans text-[11px] uppercase tracking-widest text-editorial-accent font-semibold px-3 py-1 rounded-full border border-editorial-accent/20 bg-editorial-accent/5">
          الاشتراك في الرسائل البريدية
        </span>

        {/* النصوص التوجيهية */}
        <h2 className="font-serif text-2xl md:text-3.5xl font-bold leading-tight text-[var(--foreground)]">
          انضم لنشرتنا البريدية الهادئة
        </h2>
        
        <p className="text-[14px] leading-relaxed text-editorial-muted max-w-xl">
          نرسل خلاصة القراءات والتحليلات الفكرية والاجتماعية مرة كل شهر. خالية من الإعلانات تماماً ولا نشارك بياناتك مطلقاً.
        </p>

        {/* نموذج الاشتراك الفعلي */}
        {status === "success" ? (
          <div 
            className="w-full max-w-md p-4 rounded-lg bg-editorial-sage/10 border border-editorial-sage text-editorial-sage text-[14px]"
            role="alert"
          >
            شكرًا لاهتمامك واشتراكك. تم تفعيل اشتراكك بنجاح!
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col sm:flex-row gap-3 mt-2"
            aria-label="تسجيل الاشتراك في النشرة البريدية"
          >
            <div className="flex-grow">
              <label htmlFor="newsletter-email" className="sr-only">
                عنوان بريدك الإلكتروني
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                placeholder="بريدك الإلكتروني المفضل..."
                className="w-full px-5 py-3 rounded-full text-[14px] border border-[var(--border-color)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-editorial-muted focus:outline-none transition-colors"
              />
            </div>
            
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 rounded-full text-[14px] font-semibold text-white bg-editorial-accent hover:bg-editorial-accent/90 disabled:opacity-50 transition-all duration-300 flex-shrink-0 flex items-center justify-center min-w-[120px]"
            >
              {status === "loading" ? "جاري الاشتراك..." : "اشترك الآن"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-[13px] text-red-500 mt-1" role="alert">
            {errorMessage}
          </p>
        )}

      </div>
    </section>
  );
}
