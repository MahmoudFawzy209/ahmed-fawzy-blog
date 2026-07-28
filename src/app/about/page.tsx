import Image from "next/image";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { getAuthor } from "../../data";

export const metadata = {
  title: "عن الكاتب وفلسفة الكتابة النقدية",
  description: "تعرف على د. يوسف عبدالرحمن وسيرته الأكاديمية ورؤيته البحثية في تفكيك الظواهر الاجتماعية والفكرية المعاصرة.",
};

/**
 * صفحة "عن الكاتب" بالتفصيل (About the Author Page)
 */
export default async function AboutPage() {
  const author = await getAuthor();

  return (
    <>
      <Header />
      
      <main className="flex-grow py-12 md:py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          
          {/* ترويسة الصفحة الشخصية */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mb-16">
            <div className="md:col-span-8 flex flex-col gap-4">
              <span className="text-[12px] font-sans text-editorial-accent font-semibold uppercase tracking-wider">
                أكاديمي وكاتب ومحلل ثقافي
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-black text-[var(--foreground)]">
                {author.name}
              </h1>
              <p className="font-serif text-lg leading-relaxed text-editorial-muted">
                نسعى من خلال الكلمة والأطروحة الفكرية لبناء وعي نقدي يواجه موجات التسطيح المعرفي والاستلاب التكنولوجي.
              </p>
            </div>
            
            <div className="md:col-span-4 relative aspect-square w-full max-w-[240px] mx-auto md:max-w-none overflow-hidden rounded-full bg-editorial-gray-light dark:bg-editorial-gray-dark shadow-sm">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover animate-fade-in"
              />
            </div>
          </div>

          {/* النص السيرذاتي والأهداف الفكرية */}
          <div className="prose-editorial text-justify border-t border-[var(--border-color)] pt-12">
            <h2>السيرة الأكاديمية والاهتمامات البحثية</h2>
            <p>
              حصلت على درجة الدكتوراه في علم الاجتماع الثقافي من جامعة كامبريدج، مع التركيز على دراسة تحولات المجتمعات التقليدية في ظل الحداثة المعولمة. أعمل حالياً أستاذاً جامعياً ومحاضراً زائراً في عدد من الجامعات العربية والغربية.
            </p>
            <p>
              تنصب جهودي البحثية في الوقت الراهن حول موضوعين رئيسيين: <strong>الأول</strong> هو تفكيك سوسيولوجيا التكنولوجيا الرقمية وخوارزمياتها، ومحاولة فهم كيف يعيد الفضاء السيبراني تشكيل العلاقات الإنسانية والأخلاقيات والسيادة الفردية. 
              و<strong>الثاني</strong> هو دراسة تاريخ المفاهيم السياسية والاجتماعية في الفكر العربي المعاصر، ومراجعة أطروحات النهضة والتحديث من منظور نقدي متوازن.
            </p>

            <blockquote>
              "الكتابة الفكرية ليست مجرد وظيفة أكاديمية معزولة داخل أسوار الجامعات، بل هي موقف وجودي وأمانة أخلاقية تسعى لمشاركة المعرفة مع المجتمع بكل وضوح وعمق."
            </blockquote>

            <h2>لماذا هذا الموقع؟ وفلسفة النشر المتأني</h2>
            <p>
              يأتي هذا الموقع استجابةً لحالة القلق التي تنتابنا جميعاً من تسارع وتيرة استهلاك المعلومات. لقد تحولت شبكة الإنترنت من مستودع للمعرفة إلى مصيدة للانتباه البشري؛ حيث تسود المقالات القصيرة المبتذلة، والتغريدات المشحونة بالاستقطاب، والعناوين الموجهة لزيادة النقر (Clickbait).
            </p>
            <p>
              في مقابل هذا 'الضجيج'، نطرح هنا ما نسميه بـ <strong>'الكتابة المتأنية'</strong> (Slow Writing). مقالاتنا تُكتب على مدار أيام وأسابيع من البحث الهادئ والمراجعة الدقيقة. لا نسعى لمجاراة الأخبار اليومية العاجلة، بل يهمنا تفكيك الجذور التاريخية والأيديولوجية الكامنة خلف الأحداث.
            </p>
            
            <h2>الكتب والإصدارات البارزة</h2>
            <p>
              صدر لي عدة دراسات وكتب فكرية باللغتين العربية والإنجليزية، منها:
              <ul>
                <li><strong>اقتصاد الانتباه المستلب (2023)</strong>: دراسة في آليات السيطرة السلوكية لمنصات التواصل الاجتماعي على الجيل العربي الصاعد.</li>
                <li><strong>تحولات الحداثة في الخليج العربي (2021)</strong>: مراجعة سوسيولوجية للتغير الهيكلي في الروابط الاجتماعية والهوية الثقافية.</li>
                <li><strong>نقد اللغة السياسية المعاصرة (2019)</strong>: تتبع نقدي لتشوهات المفاهيم المترجمة وأثرها على العقل السياسي العربي.</li>
              </ul>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
