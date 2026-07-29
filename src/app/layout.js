import { Readex_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const readexPro = Readex_Pro({
  variable: "--font-readex-pro",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "أحمد فوزي | كاتب وباحث فكري ومجتمعي",
  description: "موقع شخصي ومدونة للكاتب أحمد فوزي، ينشر مقالات دورية وممنهجة تتناول القضايا الاجتماعية والفلسفية والتحولات الثقافية المعاصرة.",
  keywords: ["أحمد فوزي", "مقالات فكرية", "قضايا مجتمعية", "علم الاجتماع", "تحليل ثقافي", "فلسفة معاصرة"],
  authors: [{ name: "أحمد فوزي" }],
  openGraph: {
    title: "أحمد فوزي | كاتب وباحث فكري ومجتمعي",
    description: "موقع شخصي ومدونة للكاتب أحمد فوزي، ينشر مقالات دورية وممنهجة تتناول القضايا الاجتماعية والفلسفية والتحولات الثقافية المعاصرة.",
    type: "website",
    locale: "ar_AR",
  },
};

// Script to initialize theme immediately and prevent flashing (FOUC)
const setInitialTheme = `
  (function() {
    function getTheme() {
      const savedTheme = window.localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) return 'dark';
      return 'light';
    }
    const theme = getTheme();
    document.documentElement.setAttribute('data-theme', theme);
  })()
`;

export default function RootLayout({ children }) {
  return (
    <html lang="ar" className={readexPro.variable} suppressHydrationWarning>
      <body style={{ fontFamily: "var(--font-readex-pro), sans-serif" }}>
        <Script
          id="initial-theme"
          strategy="beforeInteractive"
        >
          {setInitialTheme}
        </Script>

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
