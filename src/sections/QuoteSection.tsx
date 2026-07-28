import { getQuotes } from "../data";

/**
 * قسم الاقتباس الفكري المميز (Quote Section)
 * تصميم مجلات راقي، يعزل فكرة جوهرية لعرضها بخط أميري كبير ومريح.
 */
export default async function QuoteSection() {
  const quotes = await getQuotes();
  const quote = quotes[Math.floor(Math.random() * quotes.length)] || quotes[0];

  if (!quote) return null;

  return (
    <section className="py-20 border-y border-[var(--border-color)] bg-[var(--paper)] transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-6 md:px-8 text-center flex flex-col items-center gap-6">
        
        {/* أيقونة اقتباس خفيفة */}
        <span className="font-serif text-6xl text-editorial-accent/30 select-none leading-none" aria-hidden="true">
          «
        </span>

        {/* نص الاقتباس */}
        <p className="font-serif text-xl md:text-3xl font-bold leading-relaxed text-[var(--foreground)] max-w-3xl">
          {quote.text}
        </p>

        {/* الكاتب */}
        <span className="font-sans text-[12px] uppercase tracking-wider text-editorial-accent font-semibold">
          — {quote.author}
        </span>

        <span className="font-serif text-6xl text-editorial-accent/30 select-none leading-none" aria-hidden="true">
          »
        </span>

      </div>
    </section>
  );
}
