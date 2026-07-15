import type { Metadata } from "next";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import {
  CATEGORIES,
  SUBCATEGORIES,
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
    description: `Posts in ${name}`,
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
        <h1 className="font-serif text-4xl font-medium tracking-tight">
          {CATEGORIES[slug]}
        </h1>
        <p className="mt-3 text-[0.68rem] uppercase tracking-[0.3em] text-soft">
          {posts.length} {posts.length === 1 ? "entry" : "entries"}
        </p>
        <nav className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.65rem] uppercase tracking-[0.25em] text-soft">
          {Object.entries(SUBCATEGORIES[slug]).map(([sub, name]) => (
            <Link
              key={sub}
              href={`/categories/${slug}/${sub}/`}
              className="transition-colors duration-300 hover:text-ink"
            >
              {name}
            </Link>
          ))}
        </nav>
      </header>
      <section>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </>
  );
}
