import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import {
  CATEGORIES,
  SUBCATEGORIES,
  getPostsBySubcategory,
  type CategorySlug,
} from "@/lib/posts";

// 모든 카테고리의 하위 분류 페이지를 빌드 시 생성
export function generateStaticParams() {
  return (Object.keys(SUBCATEGORIES) as CategorySlug[]).flatMap((category) =>
    Object.keys(SUBCATEGORIES[category]).map((sub) => ({ category, sub })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[category]/[sub]">): Promise<Metadata> {
  const { category, sub } = await params;
  const name = SUBCATEGORIES[category as CategorySlug]?.[sub];
  if (!name) return {};
  return {
    title: name,
    description: `Posts in ${name}`,
  };
}

export default async function SubcategoryPage({
  params,
}: PageProps<"/categories/[category]/[sub]">) {
  const { category, sub } = await params;
  const categorySlug = category as CategorySlug;
  if (!(categorySlug in CATEGORIES) || !(sub in SUBCATEGORIES[categorySlug]))
    notFound();
  const posts = getPostsBySubcategory(categorySlug, sub);

  return (
    <>
      <header className="mb-6 text-center">
        <p className="text-[0.8rem] tracking-[0.3em] text-soft">
          <Link
            href={`/categories/${categorySlug}/`}
            className="transition-colors duration-300 hover:text-ink"
          >
            {CATEGORIES[categorySlug]}
          </Link>
        </p>
        <h1 className="mt-4 font-serif text-2xl font-medium tracking-tight">
          {SUBCATEGORIES[categorySlug][sub]}
        </h1>
        <p className="mt-3 text-[0.68rem] uppercase tracking-[0.3em] text-soft">
          {posts.length} {posts.length === 1 ? "entry" : "entries"}
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
