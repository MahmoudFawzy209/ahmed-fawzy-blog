import Link from "next/link";
import styles from "@/styles/footer.module.css";
import { client } from "@/lib/sanity";
import { authorData } from "@/data/authorData";

async function getAuthorData() {
  try {
    const isProjectIdConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your_project_id_here";
    
    if (!isProjectIdConfigured) {
      return authorData;
    }

    const authorQuery = `*[_type == "author"][0] {
      bio,
      socials
    }`;

    const author = await client.fetch(authorQuery);
    return author || authorData;
  } catch (error) {
    console.error("Failed to fetch author for Footer, falling back to local:", error);
    return authorData;
  }
}

export default async function Footer() {
  const author = await getAuthorData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        {/* Brand Column */}
        <div className={styles.brandColumn}>
          <div className={styles.brandName}>
            أحمد فوزي
            <span className={styles.brandDot}></span>
          </div>
          <p className={styles.brandBio}>{author.bio}</p>
        </div>

        {/* Navigation Links Column */}
        <div className={styles.linksColumn}>
          <h4 className={styles.columnTitle}>تصفّح</h4>
          <ul className={styles.linksList}>
            <li className={styles.linkItem}>
              <Link href="/">الرئيسية</Link>
            </li>
            <li className={styles.linkItem}>
              <Link href="/about">عن الكاتب</Link>
            </li>
            <li className={styles.linkItem}>
              <Link href="/contact">تواصل معي</Link>
            </li>
          </ul>
        </div>

        {/* Socials Column */}
        <div className={styles.linksColumn}>
          <h4 className={styles.columnTitle}>متابعة وقراءة</h4>
          <ul className={styles.linksList}>
            {author.socials?.twitter && (
              <li className={styles.linkItem}>
                <a href={author.socials.twitter} target="_blank" rel="noopener noreferrer">منصة X (تويتر)</a>
              </li>
            )}
            {author.socials?.facebook && (
              <li className={styles.linkItem}>
                <a href={author.socials.facebook} target="_blank" rel="noopener noreferrer">صفحة Facebook</a>
              </li>
            )}
            {author.socials?.linkedin && (
              <li className={styles.linkItem}>
                <a href={author.socials.linkedin} target="_blank" rel="noopener noreferrer">شبكة LinkedIn</a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottomBar}`}>
        <p>© {currentYear} أحمد فوزي. جميع الحقوق محفوظة.</p>
        <p>صُمّم بكل حب لخدمة الفكر والوعي المجتمعي.</p>
      </div>
    </footer>
  );
}
