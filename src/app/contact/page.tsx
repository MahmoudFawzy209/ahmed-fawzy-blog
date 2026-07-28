"use client";

import { useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

/**
 * صفحة التواصل مع الكاتب (Contact Page)
 * تصميم هادئ واستمارة متوافقة بالكامل مع معايير إمكانية الوصول للجميع.
 */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "استفسار عام",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");

    try {
      // محاكاة إرسال الرسالة إلى API أو خادم خارجي
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setFormData({ name: "", email: "", subject: "استفسار عام", message: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      <Header />
      
      <main className="flex-grow py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          
          {/* ترويسة الصفحة */}
          <div className="text-center flex flex-col items-center gap-4 mb-12">
            <span className="font-sans text-[11px] uppercase tracking-widest text-editorial-accent font-semibold px-3 py-1 rounded-full border border-editorial-accent/20 bg-editorial-accent/5">
              مراسلة مباشرة
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-black text-[var(--foreground)]">
              تواصل مع الكاتب
            </h1>
            <p className="text-editorial-muted text-[14px] max-w-md leading-relaxed">
              إذا كنت تود الاستفسار عن الأطروحات الفكرية، أو التعاون الأكاديمي، أو إرسال مراجعات ومقترحات، يمكنك استخدام الاستمارة أدناه.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--paper)] p-8 md:p-10 shadow-sm transition-colors duration-300">
            {status === "success" ? (
              <div 
                className="p-6 rounded-lg bg-editorial-sage/10 border border-editorial-sage text-editorial-sage text-center"
                role="alert"
              >
                <h2 className="font-bold text-lg mb-2">تم إرسال رسالتك بنجاح!</h2>
                <p className="text-[13px]">شكرًا لمراسلتك د. يوسف. سيقوم بقراءة رسالتك والرد عليك في أقرب فرصة ممكنة.</p>
                <button
                  onClick={() => setStatus("idle")}
                  type="button"
                  className="mt-6 px-5 py-2 rounded-full text-xs font-semibold bg-editorial-sage text-white focus:outline-none"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6" aria-label="نموذج الاتصال">
                
                {/* الاسم */}
                <div>
                  <label htmlFor="contact-name" className="block text-[13px] font-semibold text-[var(--foreground)] mb-2">
                    الاسم الكامل <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={status === "loading"}
                    placeholder="اكتب اسمك هنا..."
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-editorial-muted text-[14px] focus:outline-none transition-colors"
                  />
                </div>

                {/* البريد الإلكتروني */}
                <div>
                  <label htmlFor="contact-email" className="block text-[13px] font-semibold text-[var(--foreground)] mb-2">
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={status === "loading"}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-editorial-muted text-[14px] focus:outline-none transition-colors"
                  />
                </div>

                {/* موضوع الرسالة */}
                <div>
                  <label htmlFor="contact-subject" className="block text-[13px] font-semibold text-[var(--foreground)] mb-2">
                    موضوع الرسالة
                  </label>
                  <select
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--background)] text-[var(--foreground)] text-[14px] focus:outline-none transition-colors"
                  >
                    <option value="استفسار عام">استفسار عام</option>
                    <option value="تعاون بحثي / أكاديمي">تعاون بحثي / أكاديمي</option>
                    <option value="مراجعة كتاب / أطروحة">مراجعة كتاب / أطروحة</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>

                {/* نص الرسالة */}
                <div>
                  <label htmlFor="contact-message" className="block text-[13px] font-semibold text-[var(--foreground)] mb-2">
                    نص الرسالة أو الاستفسار <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={status === "loading"}
                    placeholder="اكتب تفاصيل رسالتك هنا..."
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-editorial-muted text-[14px] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* زر الإرسال */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 rounded-lg text-[14px] font-semibold text-white bg-editorial-accent hover:bg-editorial-accent/90 disabled:opacity-50 transition-all duration-300 flex items-center justify-center focus:outline-none"
                >
                  {status === "loading" ? "جاري إرسال الرسالة..." : "إرسال الرسالة"}
                </button>

                {status === "error" && (
                  <p className="text-[13px] text-red-500 text-center mt-2" role="alert">
                    حدث خطأ ما أثناء إرسال الرسالة. يرجى التحقق من الاتصال وإعادة المحاولة.
                  </p>
                )}

              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
