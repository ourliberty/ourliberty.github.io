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
      <header className="mb-16 text-center">
        <p className="text-[0.68rem] tracking-[0.3em] text-soft">
          <Link
            href={`/categories/${post.category}/`}
            className="transition-colors duration-300 hover:text-ink"
          >
            {CATEGORIES[post.category]}
          </Link>
          <span className="mx-2.5">·</span>
          <time dateTime={post.date}>{post.date}</time>
        </p>
        <h1 className="mx-auto mt-6 max-w-xl font-serif text-3xl font-medium leading-[1.4] tracking-tight">
          {post.title}
        </h1>
        {post.keywords.length > 0 && (
          <p className="mt-6 text-[0.68rem] tracking-[0.25em] text-soft">
            {post.keywords.join("  ·  ")}
          </p>
        )}
      </header>
      <div
        className="prose prose-neutral mx-auto max-w-[62ch]"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <footer className="mt-24 text-center">
        <Link
          href={`/categories/${post.category}/`}
          className="text-[0.72rem] uppercase tracking-[0.3em] text-soft transition-colors duration-300 hover:text-ink"
        >
          Back to {CATEGORIES[post.category]}
        </Link>
      </footer>
    </article>
  );
}
