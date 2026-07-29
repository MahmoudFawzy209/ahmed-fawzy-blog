import Link from "next/link";
import styles from "@/styles/post.module.css";
import PostCard from "@/components/PostCard";
import ReadingProgress from "@/components/ReadingProgress";
import SharePanel from "@/components/SharePanel";
import { client } from "@/lib/sanity";
import { postsData } from "@/data/postsData";

// Helper function to fetch a single post by slug
async function getPostBySlug(slug) {
  try {
    const isProjectIdConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your_project_id_here";
    if (!isProjectIdConfigured) {
      return postsData.find((p) => p.slug === slug);
    }

    const query = `*[_type == "post" && slug.current == $slug][0] {
      "id": _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      category,
      readingTime,
      content,
      mainImage
    }`;

    const post = await client.fetch(query, { slug });
    return post || postsData.find((p) => p.slug === slug);
  } catch (error) {
    console.error("Failed to fetch post from Sanity, using local:", error);
    return postsData.find((p) => p.slug === slug);
  }
}

// Helper function to fetch related posts
async function getRelatedPosts(category, currentId) {
  try {
    const isProjectIdConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your_project_id_here";
    if (!isProjectIdConfigured) {
      return postsData.filter((p) => p.category === category && p.id !== currentId).slice(0, 2);
    }

    const query = `*[_type == "post" && category == $category && _id != $currentId][0..1] {
      "id": _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      category,
      readingTime,
      mainImage
    }`;

    const posts = await client.fetch(query, { category, currentId });
    
    // Fallback if no related posts found
    if (posts && posts.length > 0) {
      return posts;
    }
    return postsData.filter((p) => p.id !== currentId).slice(0, 2);
  } catch (error) {
    console.error("Failed to fetch related posts from Sanity, using local:", error);
    return postsData.filter((p) => p.id !== currentId).slice(0, 2);
  }
}

// Generate Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "المقال غير موجود | أحمد فوزي",
      description: "المقال الذي تبحث عنه غير موجود أو تم نقله.",
    };
  }

  return {
    title: `${post.title} | أحمد فوزي`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["أحمد فوزي"],
    },
  };
}

// Generate Static Params for static exporting (SSG compatibility)
export async function generateStaticParams() {
  try {
    const isProjectIdConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your_project_id_here";
    if (!isProjectIdConfigured) {
      return postsData.map((post) => ({
        slug: post.slug,
      }));
    }

    const slugsQuery = `*[_type == "post"] { "slug": slug.current }`;
    const posts = await client.fetch(slugsQuery);
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static params from Sanity, using local:", error);
    return postsData.map((post) => ({
      slug: post.slug,
    }));
  }
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "6rem 2rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>المقال غير موجود</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
          عذراً، المقال الذي تحاول الوصول إليه غير موجود أو تم نقله.
        </p>
        <Link href="/" className={styles.btnPrimary} style={{ display: "inline-block" }}>
          العودة للصفحة الرئيسية
        </Link>
      </div>
    );
  }

  // Format Date
  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString("ar-EG", options);
  };

  const displayRelated = await getRelatedPosts(post.category, post.id);

  // Fallback abstract premium design gradient
  const getGradientStyle = (slug) => {
    const charSum = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue1 = charSum % 360;
    const hue2 = (hue1 + 50) % 360;
    return {
      background: `linear-gradient(135deg, hsl(${hue1}, 45%, 45%) 0%, hsl(${hue2}, 50%, 25%) 100%)`,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "rgba(255,255,255,0.9)",
      padding: "2rem",
      textAlign: "center"
    };
  };

  return (
    <>
      {/* Interactive reading progress indicator */}
      <ReadingProgress />

      <article className="container">
        {/* Article Header */}
        <header className={styles.articleHeader}>
          <div className={styles.articleMeta}>
            <span className={styles.categoryBadge}>{post.category}</span>
            <div className={styles.articleMetaItem}>
              {/* Calendar Icon */}
              <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className={styles.articleMetaItem}>
              {/* Clock Icon */}
              <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>وقت القراءة: {post.readingTime}</span>
            </div>
          </div>

          <h1 className={styles.articleTitle}>{post.title}</h1>
          <p className={styles.articleExcerpt}>{post.excerpt}</p>
        </header>

        {/* Dynamic Stylized Header Banner */}
        <div className={styles.imageWrapper}>
          <div style={getGradientStyle(post.slug)}>
            <span style={{ fontSize: "6rem", display: "block", marginBottom: "1rem", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>📚</span>
            <h3 style={{ fontSize: "1.75rem", fontWeight: "700", fontFamily: "var(--font-readex-pro)" }}>{post.category}</h3>
          </div>
        </div>

        {/* Distraction-Free Article Content */}
        <div className={styles.readingContainer}>
          {post.content && post.content.map((block, index) => {
            if (block.type === "paragraph") {
              return <p key={index}>{block.text}</p>;
            } else if (block.type === "subheading") {
              return <h2 key={index}>{block.text}</h2>;
            }
            return null;
          })}

          {/* Social Sharing Panel */}
          <SharePanel />
        </div>

        {/* Related Articles Section */}
        <section className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>قراءات وتحليلات ذات صلة</h2>
          <div className={styles.relatedGrid}>
            {displayRelated.map((relatedPost) => (
              <PostCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
