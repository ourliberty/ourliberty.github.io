import type { MetadataRoute } from "next";
import {
  CATEGORIES,
  STUDY_SUBCATEGORIES,
  getAllPosts,
  type CategorySlug,
  type StudySubcategory,
} from "@/lib/posts";
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

  const subcategories = (
    Object.keys(STUDY_SUBCATEGORIES) as StudySubcategory[]
  ).map((sub) => ({ url: `${SITE_URL}/categories/study/${sub}/` }));

  return [{ url: `${SITE_URL}/` }, ...categories, ...subcategories, ...posts];
}
