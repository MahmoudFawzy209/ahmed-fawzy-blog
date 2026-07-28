import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import ReadingProgressBar from "../../../components/blog/ReadingProgressBar";
import TableOfContents from "../../../components/blog/TableOfContents";
import ShareButtons from "../../../components/blog/ShareButtons";
import AuthorBox from "../../../components/blog/AuthorBox";
import RelatedPosts from "../../../components/blog/RelatedPosts";
import { getPostBySlug, getRelatedPosts } from "../../../data";
import { formatDate } from "../../../utils";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// توليد الميتا داتا الديناميكية لتحقيق أرشفة SEO مثالية
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "المقال غير موجود",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/posts/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.mainImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.mainImage],
    },
  };
}

/**
 * صفحة تفاصيل المقال (Article Detail Page)
 * هيكلية HTML5 سيمانتك مع تحسينات التباين وسرعة الاستجابة ومحركات البحث.
 */
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug, 3);

  // إعداد بيانات الـ Structured Data (JSON-LD) للأرشفة
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [post.mainImage],
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": [
      {
        "@type": "Person",
        "name": post.author.name,
        "url": `https://youssef-abdelrahman.com/about`
      }
    ],
    "publisher": {
      "@type": "Organization",
      "name": "مدونة د. يوسف عبدالرحمن",
      "logo": {
        "@type": "ImageObject",
        "url": post.author.avatar
      }
    },
    "description": post.excerpt
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "الرئيسية",
        "item": "https://youssef-abdelrahman.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": post.categories[0]?.title || "تصنيفات",
        "item": `https://youssef-abdelrahman.com/categories/${post.categories[0]?.slug || ""}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://youssef-abdelrahman.com/posts/${slug}`
      }
    ]
  };

  // معالجة نصوص الـ HTML لإضافة الـ IDs الفردية للعناوين لربطها بـ Table of Contents
  // نقوم باستبدال كل <h2> بـ <h2> يحمل id مميز
  let headingIndex = 0;
  const processedBody = post.body.replace(/<h2>/g, () => {
    const id = `section-${headingIndex++}`;
    return `<h2 id="${id}">`;
  });

  return (
    <>
      {/* سكربت الأرشفة (Schema JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* هيدر وشريط تقدم القراءة في الأعلى */}
      <Header />
      <ReadingProgressBar />

      <main className="flex-grow py-10 md:py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          
          {/* مسار التنقل الصغير (Breadcrumb Navigation) */}
          <nav aria-label="مسار التنقل" className="mb-6 text-[12px] font-medium text-editorial-muted">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-editorial-accent">الرئيسية</Link>
              </li>
              <span aria-hidden="true">/</span>
              {post.categories[0] && (
                <>
                  <li>
                    <Link href={`/categories/${post.categories[0].slug}`} className="hover:text-editorial-accent">
                      {post.categories[0].title}
                    </Link>
                  </li>
                  <span aria-hidden="true">/</span>
                </>
              )}
              <li className="text-[var(--foreground)] truncate max-w-[200px] md:max-w-none" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          <article className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* العمود الأوسط: محتوى المقال وتفاصيله (Middle Content) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* ترويسة المقال */}
              <div className="flex flex-col gap-4">
                {/* الأقسام المنتمية لها */}
                <div className="flex flex-wrap gap-2 text-[12px] font-bold">
                  {post.categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categories/${cat.slug}`}
                      className="px-2.5 py-1 rounded bg-editorial-accent/10 text-editorial-accent"
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>

                <h1 className="font-serif text-3xl md:text-4.5xl font-black leading-tight text-[var(--foreground)]">
                  {post.title}
                </h1>

                <p className="text-lg text-editorial-muted leading-relaxed font-serif">
                  {post.excerpt}
                </p>

                {/* الكاتب والتاريخ والوقت */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[var(--border-color)] text-[13px] text-editorial-muted">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full bg-editorial-gray-light dark:bg-editorial-gray-dark">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <span className="font-bold text-[var(--foreground)]">{post.author.name}</span>
                  </div>

                  <div className="flex gap-3">
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    <span>•</span>
                    <span>زمن القراءة: {post.readingTime}</span>
                  </div>
                </div>
              </div>

              {/* الصورة الرئيسية الكبيرة للمقال */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-editorial-gray-light dark:bg-editorial-gray-dark shadow-sm">
                <Image
                  src={post.mainImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                  className="object-cover"
                />
              </div>

              {/* المحتوى المقالي الفعلي (Readability Optimized) */}
              <div 
                className="prose-editorial text-justify dark:text-gray-100 transition-colors selection:bg-editorial-accent/30"
                dangerouslySetInnerHTML={{ __html: processedBody }}
              />

              {/* أزرار المشاركة المخصصة */}
              <ShareButtons title={post.title} slug={post.slug} />

              {/* صندوق التعريف بالكاتب في النهاية */}
              <AuthorBox author={post.author} />

              {/* المقالات المقترحة ذات الصلة */}
              <RelatedPosts posts={relatedPosts} />

            </div>

            {/* العمود الجانبي: جدول المحتويات والملحقات (Right Column Sidebar) */}
            <aside className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start hidden lg:block">
              {/* جدول محتويات المقال التفاعلي */}
              <TableOfContents bodyHtml={post.body} />
              
              {/* ويدجت دعائي أو تنويهي هادئ */}
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--paper)] p-6 text-[13px] text-editorial-muted leading-relaxed">
                <p>
                  هذه المنصة قائمة بالكامل على الجهد الذاتي للأبحاث الفكرية. إذا كنت تود دعم التحليل الثقافي المستقل، يمكنك الاشتراك بنشرتنا الدورية لمواكبة الإصدارات القادمة.
                </p>
              </div>
            </aside>

          </article>

        </div>
      </main>

      <Footer />
    </>
  );
}
