"use client";

import { useState } from "react";
import styles from "@/styles/components.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle, loading, success

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "الرجاء إدخال الاسم الكريم.";
    if (!formData.email.trim()) {
      tempErrors.email = "الرجاء إدخال البريد الإلكتروني.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "البريد الإلكتروني المدخل غير صالح.";
    }
    if (!formData.subject.trim()) tempErrors.subject = "الرجاء تحديد موضوع الرسالة.";
    if (!formData.message.trim()) tempErrors.message = "الرجاء كتابة نص الرسالة.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    // Simulate sending message to backend / CMS
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className={styles.contactForm}>
      {status === "success" && (
        <div className={styles.successAlert}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          تم إرسال رسالتك الفكرية بنجاح! سيتواصل معك باسل الشريف في أقرب وقت.
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>الاسم الكريم</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="مثال: د. أحمد خالد"
            className={styles.input}
            disabled={status === "loading"}
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>البريد الإلكتروني</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@domain.com"
            className={styles.input}
            disabled={status === "loading"}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subject" className={styles.label}>موضوع الحوار</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="مثال: مناقشة فكرة مقال 'العزلة الرقمية'"
            className={styles.input}
            disabled={status === "loading"}
          />
          {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>رسالتك أو تساؤلك الفكري</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="اكتب هنا تساؤلاتك، أفكارك، أو مقترحاتك للتعاون الفكري المتبادل..."
            className={styles.textarea}
            disabled={status === "loading"}
          />
          {errors.message && <span className={styles.errorText}>{errors.message}</span>}
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={status === "loading"}
        >
          {status === "loading" ? "جاري الإرسال الهادئ..." : "إرسال الرسالة"}
        </button>
      </form>
    </div>
  );
}
