import Image from "next/image";
import styles from "@/styles/page.module.css";
import { client, urlFor } from "@/lib/sanity";
import { authorData } from "@/data/authorData";

export const metadata = {
  title: "من هو أحمد فوزي؟ | السيرة الفكرية",
  description: "تعرف على الخلفية الأكاديمية والمسيرة البحثية للكاتب أحمد فوزي، وأبرز المبادئ والقيم الفكرية والمجتمعية التي ينطلق منها في أبحاثه ومقالاته.",
};

async function getAuthorData() {
  try {
    const isProjectIdConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your_project_id_here";
    
    if (!isProjectIdConfigured) {
      return authorData;
    }

    const authorQuery = `*[_type == "author"][0] {
      name,
      title,
      bio,
      avatar,
      values
    }`;

    const author = await client.fetch(authorQuery);
    return author || authorData;
  } catch (error) {
    console.error("Failed to fetch author for about page, falling back to local:", error);
    return authorData;
  }
}

export default async function About() {
  const author = await getAuthorData();

  return (
    <div className="container">
      {/* Header */}
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>السيرة الذاتية والفكرية</h1>
      </header>

      {/* Main Intro */}
      <section className={styles.aboutLayout}>
        <div className={styles.aboutBody}>
          <p>
            مرحباً بك في مساحتي الخاصة. أنا <strong>{author.name}</strong>، باحث وكاتب حر، مهتم بثقافة المجتمعات المعاصرة، وأثر التكنولوجيا والفساد الأخلاقي والاجتماعي على استقرار الفرد والأسرة والمجتمع.
          </p>
          <p>
            أركز قلمي وجهدي البحثي على اعتبار هموم الإنسان مقدمة لمحاولة فهم دوافعه وسلوكياته في ظل مستجدات عصر السرعة والاضطرابات النفسية. وأؤمن بأن دور الباحث الحقيقي لا يقتصر على التوصيف الأكاديمي الجاف، بل يجب أن يمتد لتقديم قراءات نقدية واعية تلامس مشكلات المجتمع وتدافع عن كرامة الإنسان كقيمة أولى وأساسية لنمائه واستقراره.
          </p>
          <p>
            أسعى من خلال هذه المساحة والمدونة الفكرية إلى تقديم قراءة نقدية واعية واقتراح حلول عملية لمشكلات وقضايا المجتمع. كما أهدف إلى تبسيط المفاهيم والمصطلحات العلمية لتناسب القارئ غير المتخصص، لتصبح واقعاً يمارس من الجميع ويسهم في حماية الأسرة واستقرارها.
          </p>
        </div>

        <div className={styles.heroImageContainer}>
          <div className={styles.heroImageWrapper}>
            <Image
              src={urlFor(author.avatar) || "/images/AhmedFawzy.jpeg"}
              alt={author.name}
              fill
              className={styles.heroImage}
              priority
            />
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className={styles.valuesSection}>
        <h2 className={styles.sectionTitle}>المنطلقات والمبادئ الفكرية</h2>
        <div className={styles.valuesGrid}>
          {author.values.map((val, idx) => (
            <div key={idx} className={styles.valueCard}>
              <h3 className={styles.valueTitle}>
                <span className={styles.valueIndicator}></span>
                {val.title}
              </h3>
              <p className={styles.valueDesc}>{val.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
