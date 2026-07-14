import type { MetadataRoute } from "next";
import { CATEGORIES, getAllPosts, type CategorySlug } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// 검색엔진(구글 등)에게 사이트의 모든 페이지를 알려주는 sitemap.xml 생성
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}/`,
    lastModified: post.date,
  }));

  const categories = (Object.keys(CATEGORIES) as CategorySlug[]).map(
    (category) => ({ url: `${SITE_URL}/categories/${category}/` }),
  );

  return [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/about/` },
    ...categories,
    ...posts,
  ];
}
