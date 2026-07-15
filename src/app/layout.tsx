import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import { CATEGORIES, SUBCATEGORIES, type CategorySlug } from "@/lib/posts";
import { SITE_NAME, SITE_DESCRIPTION, AUTHOR, SITE_URL } from "@/lib/site";
import "highlight.js/styles/github.css";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: AUTHOR }],
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${notoSerifKr.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        {/* 상단: 블로그 제목 없이, 카테고리만 중앙 정렬 */}
        <header>
          <nav className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 pb-6 pt-12 text-[0.85rem] uppercase tracking-[0.3em] text-soft">
            {(Object.keys(CATEGORIES) as CategorySlug[]).map((slug) => (
              // 기호에 마우스를 올리면 하위 분류가 펼쳐짐
              <span key={slug} className="group relative">
                <Link
                  href={`/categories/${slug}/`}
                  title={slug}
                  className="transition-colors duration-300 hover:text-ink"
                >
                  {CATEGORIES[slug]}
                </Link>
                <span className="invisible absolute left-1/2 top-full z-10 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <span className="flex flex-col gap-2.5 whitespace-nowrap bg-paper px-7 py-5 text-center text-[0.65rem] tracking-[0.25em] shadow-[0_10px_35px_rgba(0,0,0,0.09)]">
                    {Object.entries(SUBCATEGORIES[slug]).map(([sub, name]) => (
                      <Link
                        key={sub}
                        href={`/categories/${slug}/${sub}/`}
                        className="transition-colors duration-300 hover:text-ink"
                      >
                        {name}
                      </Link>
                    ))}
                  </span>
                </span>
              </span>
            ))}
            <Link
              href="/"
              title="about"
              className="transition-colors duration-300 hover:text-ink"
            >
              ∃
            </Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-2xl flex-1 px-6 pb-28 pt-16">
          {children}
        </main>
        <footer className="pb-16 pt-10 text-center">
          <p className="text-[0.62rem] tracking-[0.4em] text-soft">
            © {new Date().getFullYear()} {AUTHOR}
          </p>
        </footer>
      </body>
    </html>
  );
}
