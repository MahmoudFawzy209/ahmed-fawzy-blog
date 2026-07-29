import Link from "next/link";
import styles from "@/styles/components.module.css";

export default function PostCard({ post }) {
  const { title, slug, excerpt, publishedAt, category, readingTime } = post;
  
  // Format Date to Arabic format
  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('ar-EG', options);
  };

  // Generate a beautiful unique abstract gradient matching the slug as a fallback
  const getGradientStyle = (slug) => {
    const charSum = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue1 = charSum % 360;
    const hue2 = (hue1 + 40) % 360;
    return {
      background: `linear-gradient(135deg, hsl(${hue1}, 45%, 45%) 0%, hsl(${hue2}, 50%, 25%) 100%)`,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "rgba(255,255,255,0.9)",
      fontSize: "2.5rem",
      fontWeight: "bold",
      fontFamily: "var(--font-readex-pro), sans-serif",
      userSelect: "none"
    };
  };

  return (
    <article className={`${styles.card} fade-in`}>
      <div className={styles.cardImageWrapper}>
        {/* Beautiful fallback gradient with stylized letters to feel extremely premium and artsy, like intellectual book covers */}
        <div style={getGradientStyle(slug)}>
          {category.charAt(0)}
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <span className={styles.cardCategory}>{category}</span>
          <span>{formatDate(publishedAt)}</span>
        </div>
        
        <Link href={`/posts/${slug}`}>
          <h3 className={styles.cardTitle}>{title}</h3>
        </Link>
        
        <p className={styles.cardExcerpt}>{excerpt}</p>
        
        <div className={styles.cardFooter}>
          <span>وقت القراءة: {readingTime}</span>
          <Link href={`/posts/${slug}`} className={styles.readMoreLink}>
            اقرأ المزيد 
            <span style={{ fontSize: "1rem", marginRight: "4px" }}>←</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
