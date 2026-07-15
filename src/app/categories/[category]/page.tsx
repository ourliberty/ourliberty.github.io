import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import {
  CATEGORIES,
  getPostsByCategory,
  type CategorySlug,
} from "@/lib/posts";

export function generateStaticParams() {
  return (Object.keys(CATEGORIES) as CategorySlug[]).map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[category]">): Promise<Metadata> {
  const { category } = await params;
  const name = CATEGORIES[category as CategorySlug];
  return {
    title: name,
    description: `${name} 카테고리의 글 모음`,
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/categories/[category]">) {
  const { category } = await params;
  const slug = category as CategorySlug;
  const posts = getPostsByCategory(slug);

  return (
    <>
      <header className="border-b border-line pb-12">
        <p className="mb-6 text-[0.7rem] tracking-[0.45em] text-accent">
          카테고리
        </p>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">
          {CATEGORIES[slug]}
        </h1>
        <p className="mt-4 text-[0.75rem] tracking-[0.25em] text-soft">
          {posts.length}개의 글
        </p>
      </header>
      <section>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </>
  );
}
