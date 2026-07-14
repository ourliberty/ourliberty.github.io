import Link from "next/link";
import { CATEGORIES, type PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group border-b border-neutral-200 py-8 dark:border-neutral-800">
      <div className="mb-2 flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
        <Link
          href={`/categories/${post.category}/`}
          className="rounded-full bg-neutral-100 px-3 py-0.5 font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
        >
          {CATEGORIES[post.category]}
        </Link>
        <time dateTime={post.date}>{post.date}</time>
      </div>
      <h2 className="text-xl font-bold">
        <Link
          href={`/posts/${post.slug}/`}
          className="hover:text-blue-600 dark:hover:text-blue-400"
        >
          {post.title}
        </Link>
      </h2>
      {post.excerpt && (
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          {post.excerpt}
        </p>
      )}
    </article>
  );
}
