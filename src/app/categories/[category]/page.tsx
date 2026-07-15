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
      <header className="mb-6 text-center">
        <h1 className="font-serif text-2xl font-medium tracking-tight">
          {CATEGORIES[slug]}
        </h1>
        <p className="mt-3 text-[0.68rem] tracking-[0.3em] text-soft">
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
