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
      <h1 className="mb-2 text-2xl font-bold">{CATEGORIES[slug]}</h1>
      <p className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
        {posts.length}개의 글
      </p>
      <div>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
