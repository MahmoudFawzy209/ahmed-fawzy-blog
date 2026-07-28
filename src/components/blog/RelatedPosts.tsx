import Link from "next/link";
import Image from "next/image";
import { Post } from "../../sanity/sanity.types";
import { formatDate } from "../../utils";

interface RelatedPostsProps {
  posts: Post[];
}

/**
 * مقالات ذات صلة (RelatedPosts)
 * تظهر أسفل المقال لزيادة تفاعل القارئ وبقائه في الموقع.
 */
export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 mt-10">
      <span className="text-[13px] font-bold uppercase tracking-wider text-editorial-accent font-sans">
        قراءات مقترحة ذات صلة
      </span>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article 
            key={post.slug} 
            className="group flex flex-col gap-3 rounded-lg overflow-hidden border border-[var(--border-color)] bg-[var(--paper)] p-4 transition-all duration-300 hover:border-editorial-accent"
          >
            {/* صورة المقال المصغرة */}
            <Link 
              href={`/posts/${post.slug}`} 
              className="relative aspect-video w-full overflow-hidden rounded bg-editorial-gray-light dark:bg-editorial-gray-dark focus:outline-none"
              tabIndex={-1}
            >
              <Image
                src={post.mainImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover transition-transform duration-500 group-hover:scale-103"
              />
            </Link>

            {/* تفاصيل المقال */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[11px] text-editorial-muted">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              
              <h4 className="font-serif text-[15px] md:text-[16px] font-bold leading-snug text-[var(--foreground)] group-hover:text-editorial-accent transition-colors duration-300">
                <Link href={`/posts/${post.slug}`}>
                  {post.title}
                </Link>
              </h4>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
