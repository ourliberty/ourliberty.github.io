import Link from "next/link";
import { CATEGORIES, type PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group grid gap-3 border-b border-line py-10 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <div className="text-[0.7rem] leading-relaxed tracking-[0.25em] text-soft">
        <Link
          href={`/categories/${post.category}/`}
          className="text-accent transition-colors hover:text-ink"
        >
          {CATEGORIES[post.category]}
        </Link>
        <time dateTime={post.date} className="mt-1 block">
          {post.date}
        </time>
      </div>
      <div>
        <h2 className="font-serif text-2xl font-semibold leading-snug tracking-tight">
          <Link
            href={`/posts/${post.slug}/`}
            className="transition-colors duration-200 group-hover:text-accent"
          >
            {post.title}
          </Link>
        </h2>
        {post.excerpt && (
          <p className="mt-3 leading-relaxed text-soft">{post.excerpt}</p>
        )}
      </div>
    </article>
  );
}
