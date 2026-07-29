"use client";

import styles from "@/styles/post.module.css";

export default function SharePanel() {
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ رابط المقال بنجاح لنشره ومشاركته!");
    }
  };

  return (
    <div className={styles.sharePanel}>
      <span className={styles.shareTitle}>شارك هذا التحليل الفكري:</span>
      <div className={styles.shareLinks}>
        {/* Twitter/X */}
        <button 
          className={styles.shareBtn} 
          aria-label="أنشر على X"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.open(`https://twitter.com/share?url=${encodeURIComponent(window.location.href)}`, "_blank");
            }
          }}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
        {/* Facebook */}
        <button 
          className={styles.shareBtn} 
          aria-label="أنشر على فيسبوك"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank");
            }
          }}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>
        {/* Copy Link */}
        <button
          className={styles.shareBtn}
          aria-label="نسخ الرابط"
          onClick={handleCopyLink}
        >
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a1 1 0 00-1.414 0l-1.5 1.5a4 4 0 005.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3a2 2 0 012.828 0 1 1 0 001.414-1.414 4 4 0 00-5.656 0l-3 3z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
