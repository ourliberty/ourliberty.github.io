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
      <header className="mb-8 border-b border-neutral-200 pb-8 dark:border-neutral-800">
        <div className="mb-3 flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
          <Link
            href={`/categories/${post.category}/`}
            className="rounded-full bg-neutral-100 px-3 py-0.5 font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            {CATEGORIES[post.category]}
          </Link>
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <h1 className="text-3xl font-bold leading-snug">{post.title}</h1>
        {post.keywords.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            {post.keywords.map((keyword) => (
              <span key={keyword}>#{keyword}</span>
            ))}
          </div>
        )}
      </header>
      <div
        className="prose prose-neutral max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <footer className="mt-12 border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          ← 목록으로 돌아가기
        </Link>
      </footer>
    </article>
  );
}
