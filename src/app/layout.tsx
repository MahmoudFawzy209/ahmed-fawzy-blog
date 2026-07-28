import type { Metadata } from "next";
import { Amiri, Cairo } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
});

const cairo = Cairo({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "د. يوسف عبدالرحمن | تحليلات فكرية وثقافية معاصرة",
    template: "%s | د. يوسف عبدالرحمن"
  },
  description: "منصة فكرية تناقش القضايا المجتمعية، التحليل الثقافي، والسياسي، والفلسفي بطريقة هادئة وعصرية.",
  metadataBase: new URL("https://youssef-abdelrahman.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "د. يوسف عبدالرحمن | تحليلات فكرية وثقافية معاصرة",
    description: "منصة فكرية تناقش القضايا المجتمعية، التحليل الثقافي، والسياسي، والفلسفي بطريقة هادئة وعصرية.",
    url: "https://youssef-abdelrahman.com",
    siteName: "مدونة د. يوسف عبدالرحمن",
    locale: "ar-EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "د. يوسف عبدالرحمن | تحليلات فكرية وثقافية معاصرة",
    description: "منصة فكرية تناقش القضايا المجتمعية، التحليل الثقافي، والسياسي، والفلسفي بطريقة هادئة وعصرية.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${amiri.variable} ${cairo.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* سكربت حظر وميض الهيدريشن للوضع الليلي (Prevent Theme Flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased selection:bg-[var(--color-editorial-accent)] selection:text-white bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
