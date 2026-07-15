import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import {
  STUDY_SUBCATEGORIES,
  getPostsBySubcategory,
  type StudySubcategory,
} from "@/lib/posts";

// 하위 카테고리는 study(Σ) 아래에만 존재
export function generateStaticParams() {
  return (Object.keys(STUDY_SUBCATEGORIES) as StudySubcategory[]).map(
    (sub) => ({ category: "study", sub }),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[category]/[sub]">): Promise<Metadata> {
  const { sub } = await params;
  const name = STUDY_SUBCATEGORIES[sub as StudySubcategory];
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
  if (category !== "study" || !(sub in STUDY_SUBCATEGORIES)) notFound();
  const subSlug = sub as StudySubcategory;
  const posts = getPostsBySubcategory(subSlug);

  return (
    <>
      <header className="mb-6 text-center">
        <p className="text-[0.8rem] tracking-[0.3em] text-soft">
          <Link
            href="/categories/study/"
            className="transition-colors duration-300 hover:text-ink"
          >
            Σ
          </Link>
        </p>
        <h1 className="mt-4 font-serif text-2xl font-medium tracking-tight">
          {STUDY_SUBCATEGORIES[subSlug]}
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
