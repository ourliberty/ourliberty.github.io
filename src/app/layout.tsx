import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import { CATEGORIES, type CategorySlug } from "@/lib/posts";
import { SITE_NAME, SITE_DESCRIPTION, AUTHOR, SITE_URL } from "@/lib/site";
import "highlight.js/styles/github-dark.css";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
        <header className="sticky top-0 z-10 border-b border-line bg-paper/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl flex-wrap items-baseline justify-between gap-y-2 px-6 py-5">
            <Link
              href="/"
              className="font-serif text-lg font-semibold tracking-tight"
            >
              {SITE_NAME}
            </Link>
            <nav className="flex gap-6 text-[0.8rem] tracking-[0.18em] text-soft">
              {(Object.keys(CATEGORIES) as CategorySlug[]).map((slug) => (
                <Link
                  key={slug}
                  href={`/categories/${slug}/`}
                  className="transition-colors duration-200 hover:text-accent"
                >
                  {CATEGORIES[slug]}
                </Link>
              ))}
              <Link
                href="/about/"
                className="transition-colors duration-200 hover:text-accent"
              >
                소개
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-24 pt-14">
          {children}
        </main>
        <footer className="border-t border-line py-10 text-center">
          <p className="text-[0.7rem] tracking-[0.35em] text-soft">
            {SITE_NAME} · © {new Date().getFullYear()} {AUTHOR}
          </p>
        </footer>
      </body>
    </html>
  );
}
