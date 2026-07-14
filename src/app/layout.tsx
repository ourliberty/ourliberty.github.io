import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans_KR } from "next/font/google";
import { CATEGORIES, type CategorySlug } from "@/lib/posts";
import { SITE_NAME, SITE_DESCRIPTION, AUTHOR, SITE_URL } from "@/lib/site";
import "highlight.js/styles/github-dark.css";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <header className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-y-2 px-5 py-5">
            <Link href="/" className="text-lg font-bold tracking-tight">
              {SITE_NAME}
            </Link>
            <nav className="flex gap-5 text-sm font-medium text-neutral-600 dark:text-neutral-300">
              {(Object.keys(CATEGORIES) as CategorySlug[]).map((slug) => (
                <Link
                  key={slug}
                  href={`/categories/${slug}/`}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {CATEGORIES[slug]}
                </Link>
              ))}
              <Link
                href="/about/"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                소개
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10">
          {children}
        </main>
        <footer className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          © {new Date().getFullYear()} {AUTHOR}. Built with Next.js.
        </footer>
      </body>
    </html>
  );
}
