import Image from "next/image";
import { Author } from "../../sanity/sanity.types";

interface AuthorBoxProps {
  author: Author;
}

/**
 * صندوق الكاتب (AuthorBox)
 * يظهر في نهاية صفحة المقال لتعريف القارئ بكاتب المقال وأبحاثه الفكرية.
 */
export default function AuthorBox({ author }: AuthorBoxProps) {
  const { name, avatar, bio, facebook, twitter, instagram } = author;

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-8 rounded-xl border border-[var(--border-color)] bg-[var(--paper)] transition-colors duration-300">
      
      {/* الصورة الشخصية */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full bg-editorial-gray-light dark:bg-editorial-gray-dark flex-shrink-0 self-center sm:self-start">
        <Image
          src={avatar}
          alt={name}
          fill
          sizes="(max-width: 768px) 96px, 80px"
          className="object-cover"
        />
      </div>

      {/* تفاصيل الكاتب */}
      <div className="flex flex-col gap-3 text-center sm:text-right">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="font-serif text-xl font-bold text-[var(--foreground)]">
            {name}
          </span>
          
          {/* حسابات الكاتب الاجتماعية */}
          <div className="flex justify-center sm:justify-start gap-4 text-[13px]">
            {twitter && (
              <a 
                href={twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-editorial-accent hover:underline"
              >
                تويتر
              </a>
            )}
            {facebook && (
              <a 
                href={facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-editorial-accent hover:underline"
              >
                فيسبوك
              </a>
            )}
            {instagram && (
              <a 
                href={instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-editorial-accent hover:underline"
              >
                إنستغرام
              </a>
            )}
          </div>
        </div>

        {/* سيرة الكاتب الذاتية */}
        <p className="text-[14px] leading-relaxed text-editorial-muted">
          {bio}
        </p>
      </div>

    </div>
  );
}
