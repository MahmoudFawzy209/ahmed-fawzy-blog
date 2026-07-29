import styles from "@/styles/page.module.css";
import ContactForm from "@/components/ContactForm";
import { client } from "@/lib/sanity";
import { authorData } from "@/data/authorData";

export const metadata = {
  title: "اتصل بالكاتب | تواصل فكري ونقاش",
  description: "ارسل تساؤلاتك ومقترحاتك للحوار الثقافي والمجتمعي للكاتب أحمد فوزي أو تعرف على منصات النشر ومواقع التواصل الخاصة به.",
};

async function getAuthorData() {
  try {
    const isProjectIdConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your_project_id_here";
    
    if (!isProjectIdConfigured) {
      return authorData;
    }

    const authorQuery = `*[_type == "author"][0] {
      email,
      socials
    }`;

    const author = await client.fetch(authorQuery);
    return author || authorData;
  } catch (error) {
    console.error("Failed to fetch author for contact page, falling back to local:", error);
    return authorData;
  }
}

export default async function Contact() {
  const author = await getAuthorData();

  return (
    <div className="container">
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>تواصل معي</h1>
        <p className={styles.pageSubtitle}>
          نرحب بتلقي مقترحات القراء الأكارم ومقترحاتكم حول قضايا المجتمع ومشكلاته
        </p>
      </header>

      {/* Main Content Layout */}
      <section className={styles.contactLayout}>
        {/* Left Column: Form */}
        <div>
          <h2 className={styles.contactTitle} style={{ marginBottom: "1.5rem" }}>أرسل رسالة هادئة</h2>
          <ContactForm />
        </div>

        {/* Right Column: Info & Details */}
        <div className={styles.contactInfo}>
          <div>
            <h2 className={styles.contactTitle}>قنوات التواصل والمنصات</h2>
            <p className={styles.contactDesc}>
              إذا كنت تفضل المراسلة المباشرة أو ترغب في متابعة ما أنشره دورياً عبر البريد الشخصي، يمكنك استخدام القنوات التالية:
            </p>
          </div>

          <div className={styles.contactDetails}>
            {/* Email Card */}
            <div className={styles.detailCard}>
              <div className={styles.detailIcon}>
                {/* Mail Envelope Icon */}
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0 0 16 4H4a2 2 0 0 0-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.118z" />
                </svg>
              </div>
              <div className={styles.detailContent}>
                <span className={styles.detailLabel}>البريد الإلكتروني المباشر</span>
                <a href={`mailto:${author.email}`} className={styles.detailVal}>
                  {author.email}
                </a>
              </div>
            </div>

            {/* Facebook Card */}
            {author.socials?.facebook && (
              <div className={styles.detailCard}>
                <div className={styles.detailIcon}>
                  {/* Facebook Icon */}
                  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M20 10a10 10 0 10-11.562 9.878v-6.987H5.898V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.878 20 15.357 20 10z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>الصفحة الشخصية على Facebook</span>
                  <a href={author.socials.facebook} target="_blank" rel="noopener noreferrer" className={styles.detailVal}>
                    {author.socials.facebook}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
