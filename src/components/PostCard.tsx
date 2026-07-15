import Link from "next/link";
import { CATEGORIES, STUDY_SUBCATEGORIES, type PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="py-11 text-center">
      <p className="text-[0.68rem] tracking-[0.3em] text-soft">
        {CATEGORIES[post.category]}
        {post.subcategory && (
          <>
            <span className="mx-2.5">·</span>
            <span className="uppercase">
              {STUDY_SUBCATEGORIES[post.subcategory]}
            </span>
          </>
        )}
        <span className="mx-2.5">·</span>
        <time dateTime={post.date}>{post.date}</time>
      </p>
      <h2 className="mt-4 font-serif text-[1.55rem] font-medium leading-snug tracking-tight">
        <Link
          href={`/posts/${post.slug}/`}
          className="transition-colors duration-300 hover:text-soft"
        >
          {post.title}
        </Link>
      </h2>
      {post.excerpt && (
        <p className="mx-auto mt-3 max-w-md text-[0.92rem] leading-relaxed text-soft">
          {post.excerpt}
        </p>
      )}
    </article>
  );
}
