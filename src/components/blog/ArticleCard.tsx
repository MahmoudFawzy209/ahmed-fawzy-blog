import Link from "next/link";
import Image from "next/image";
import { Post } from "../../sanity/sanity.types";
import { formatDate } from "../../utils";

interface ArticleCardProps {
  post: Post;
  priority?: boolean; // لتحسين LCP للمقالات الأولى في الصفحة
}

/**
 * كارت المقال (ArticleCard)
 * مصمم بطريقة عصرية، يعتمد على المساحات البيضاء وتأثيرات الهوم الأنيقة.
 */
export default function ArticleCard({ post, priority = false }: ArticleCardProps) {
  const { title, slug, mainImage, publishedAt, excerpt, readingTime, categories, author } = post;
  
  return (
    <article className="group flex flex-col gap-5 border-b border-[var(--border-color)] pb-10 last:border-0 transition-all duration-300">
      
      {/* الصورة الرئيسية للمقال */}
      <Link 
        href={`/posts/${slug}`} 
        className="relative aspect-video w-full overflow-hidden rounded-lg bg-editorial-gray-light dark:bg-editorial-gray-dark focus:outline-none"
        tabIndex={-1} // منع التركيز المزدوج مع عنوان المقال
      >
        <Image
          src={mainImage}
          alt={`الصورة التوضيحية لمقال: ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
        />
      </Link>

      <div className="flex flex-col gap-3">
        {/* التصنيفات والوقت */}
        <div className="flex flex-wrap items-center gap-2.5 text-[12px] font-medium tracking-wide">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="text-editorial-accent hover:underline focus:outline-none"
            >
              {cat.title}
            </Link>
          ))}
          <span className="text-editorial-muted" aria-hidden="true">•</span>
          <time dateTime={publishedAt} className="text-editorial-muted">
            {formatDate(publishedAt)}
          </time>
          <span className="text-editorial-muted" aria-hidden="true">•</span>
          <span className="text-editorial-muted" aria-label={`زمن القراءة: ${readingTime}`}>
            {readingTime}
          </span>
        </div>

        {/* عنوان المقال */}
        <h3 className="font-serif text-xl md:text-2xl font-bold leading-snug text-[var(--foreground)] group-hover:text-editorial-accent transition-colors duration-300">
          <Link href={`/posts/${slug}`} className="focus:outline-none">
            {title}
          </Link>
        </h3>

        {/* المقتطف (Excerpt) */}
        <p className="text-[14px] leading-relaxed text-editorial-muted line-clamp-3">
          {excerpt}
        </p>

        {/* الكاتب الصغير (Author Box) */}
        <div className="flex items-center gap-3 mt-2">
          <div className="relative h-7 w-7 overflow-hidden rounded-full bg-editorial-gray-light dark:bg-editorial-gray-dark">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>
          <span className="text-[13px] font-medium text-[var(--foreground)]">
            {author.name}
          </span>
        </div>

      </div>

    </article>
  );
}
