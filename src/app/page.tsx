import Link from "next/link";
import PostCard from "@/components/PostCard";
import { CATEGORIES, getAllPosts } from "@/lib/posts";

export default function Home() {
  const [featured, ...rest] = getAllPosts();

  return (
    <>
      {/* 인트로 */}
      <section className="border-b border-line pb-14">
        <p className="mb-7 text-[0.7rem] tracking-[0.45em] text-accent">
          일기 · 감상 · 공부
        </p>
        <h1 className="font-serif text-4xl font-semibold leading-[1.25] tracking-tight sm:text-5xl sm:leading-[1.2]">
          보고, 읽고, 배운 것들의
          <br />
          사적인 아카이브
        </h1>
      </section>

      {/* 대표 글 (가장 최근 글) */}
      {featured && (
        <section className="border-b border-line py-14">
          <p className="mb-5 text-[0.7rem] tracking-[0.35em] text-soft">
            최신 글 — {CATEGORIES[featured.category]} · {featured.date}
          </p>
          <h2 className="font-serif text-3xl font-semibold leading-snug tracking-tight">
            <Link
              href={`/posts/${featured.slug}/`}
              className="transition-colors duration-200 hover:text-accent"
            >
              {featured.title}
            </Link>
          </h2>
          {featured.excerpt && (
            <p className="mt-4 max-w-xl leading-relaxed text-soft">
              {featured.excerpt}
            </p>
          )}
          <Link
            href={`/posts/${featured.slug}/`}
            className="mt-7 inline-block border-b border-accent pb-0.5 text-[0.75rem] tracking-[0.3em] text-accent transition-colors duration-200 hover:border-ink hover:text-ink"
          >
            읽기
          </Link>
        </section>
      )}

      {/* 나머지 글 목록 */}
      <section>
        {rest.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </>
  );
}
