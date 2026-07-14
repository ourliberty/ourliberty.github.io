import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { SITE_DESCRIPTION } from "@/lib/site";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <p className="mb-6 text-neutral-600 dark:text-neutral-400">
        {SITE_DESCRIPTION}
      </p>
      <div>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
