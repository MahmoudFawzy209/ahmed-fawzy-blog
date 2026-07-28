import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../sections/Hero";
import FeaturedArticles from "../sections/FeaturedArticles";
import LatestArticles from "../sections/LatestArticles";
import CategoriesList from "../sections/CategoriesList";
import QuoteSection from "../sections/QuoteSection";
import AboutSection from "../sections/AboutSection";
import Newsletter from "../components/blog/Newsletter";

/**
 * الصفحة الرئيسية للموقع (Homepage)
 * تجمع الأقسام المختلفة المعززة بالـ Server Components لتحقيق أداء LCP و INP مثالي.
 */
export default function Home() {
  return (
    <>
      <Header />
      
      <main className="flex-grow">
        {/* البانر الترحيبي العريض */}
        <Hero />

        {/* المقال القيادي المميز */}
        <FeaturedArticles />

        {/* أحدث المقالات والشبكة الجانبية */}
        <LatestArticles />

        {/* مقطع الاقتباس الفكري المتأرجح */}
        <QuoteSection />

        {/* الأقسام ومحاور البحث */}
        <CategoriesList />

        {/* نبذة عن الكاتب */}
        <AboutSection />

        {/* النشرة البريدية */}
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
