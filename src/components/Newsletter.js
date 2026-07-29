"use client";

import { useState } from "react";
import styles from "@/styles/components.module.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API registration call (Sanity or external Newsletter like Substack / Buttondown)
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <section className={`${styles.newsletter} fade-in`}>
      <h3 className={styles.newsletterTitle}>ساهم في اقتراح حلول عملية لقضايا المجتمع</h3>
      <p className={styles.newsletterDesc}>
        يمكنك استلام كافة الأفكار والمقترحات حول قضايا المجتمع والأسرة أول بأول عبر بريدك الإلكتروني إذا لم يكن لديك الوقت الكافي لمتابعة آخر تحديثات المقالات داخل الموقع.
      </p>

      {status === "success" ? (
        <div className={styles.successMsg}>
          ✓ تم اشتراكك بنجاح! يسعدنا جداً انضمامك لعالمنا الفكري الهادئ.
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
          <input
            type="email"
            placeholder="بريدك الإلكتروني الأكثر استخداماً..."
            value={email}
            onChange={(e) => setEmail(e.value || e.target.value)}
            className={styles.newsletterInput}
            required
            disabled={status === "loading"}
            aria-label="البريد الإلكتروني للاشتراك بالنشرة"
          />
          <button
            type="submit"
            className={styles.newsletterBtn}
            disabled={status === "loading"}
          >
            {status === "loading" ? "جاري الاشتراك..." : "اشترك الآن"}
          </button>
        </form>
      )}
    </section>
  );
}
