import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getAllPosts, getPost, postExists } from "@/lib/posts";

// 빌드 시 어떤 글 페이지들을 만들지 알려줌 (SSG 핵심)
// 글이 하나도 없을 때는 자리표시용 경로 하나를 만들어 빌드 오류를 막음 (404로 처리됨)
export function generateStaticParams() {
  const posts = getAllPosts();
  if (posts.length === 0) return [{ slug: "placeholder" }];
  return posts.map((post) => ({ slug: post.slug }));
}

// 글마다 SEO 메타데이터 생성
export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!postExists(slug)) return {};
  const post = await getPost(slug);
  return {
    // 브라우저 탭 제목에서는 줄바꿈을 공백으로
    title: post.title.replace(/\s*\n\s*/g, " "),
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
  if (!postExists(slug)) notFound();
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
        <h1 className="mx-auto mt-6 max-w-xl whitespace-pre-line font-serif text-3xl font-medium leading-[1.4] tracking-tight">
          {post.title}
        </h1>
        {post.keywords.length > 0 && (
          <p className="mt-6 text-[0.68rem] tracking-[0.25em] text-soft">
            {post.keywords.join("  ·  ")}
          </p>
        )}
      </header>
      <div
        className={
          post.category === "diary"
            ? // 일기 본문: 더 작고 회색으로, 가운데 정렬
              "prose prose-neutral prose-sm prose-diary mx-auto max-w-[52ch] text-center"
            : "prose prose-neutral mx-auto max-w-[62ch]"
        }
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
