import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, getAllPosts, getPost } from "@/lib/posts";

// 빌드 시 어떤 글 페이지들을 만들지 알려줌 (SSG 핵심)
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// 글마다 SEO 메타데이터 생성
export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <article>
      <header className="mb-14 text-center">
        <p className="mb-7 text-[0.7rem] tracking-[0.4em] text-accent">
          <Link
            href={`/categories/${post.category}/`}
            className="transition-colors hover:text-ink"
          >
            {CATEGORIES[post.category]}
          </Link>
          <span className="mx-3 text-soft">·</span>
          <time dateTime={post.date} className="text-soft">
            {post.date}
          </time>
        </p>
        <h1 className="mx-auto max-w-2xl font-serif text-3xl font-semibold leading-[1.35] tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        {post.keywords.length > 0 && (
          <p className="mt-7 text-[0.72rem] tracking-[0.25em] text-soft">
            {post.keywords.join("   ·   ")}
          </p>
        )}
        <div
          aria-hidden
          className="mx-auto mt-12 h-px w-14 bg-accent"
        />
      </header>
      <div
        className="prose prose-neutral mx-auto max-w-[65ch]"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <footer className="mt-20 border-t border-line pt-8 text-center">
        <Link
          href="/"
          className="text-[0.75rem] tracking-[0.3em] text-soft transition-colors duration-200 hover:text-accent"
        >
          ← 목록으로
        </Link>
      </footer>
    </article>
  );
}
