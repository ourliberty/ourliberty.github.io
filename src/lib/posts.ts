import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

// 카테고리 목록: 주소(slug) → 화면에 보이는 이름
// fragments: 일기(단상) / critique: 영화·책 감상 / lexicon: 공부(어휘집)
export const CATEGORIES = {
  fragments: "Fragments",
  critique: "Critique",
  lexicon: "Lexicon",
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: CategorySlug;
  keywords: string[];
}

export interface Post extends PostMeta {
  contentHtml: string;
}

const postsDirectory = path.join(process.cwd(), "src/data/posts");

function readPostFile(fileName: string): { meta: PostMeta; content: string } {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const category = (data.category ?? "fragments") as CategorySlug;
  if (!(category in CATEGORIES)) {
    throw new Error(
      `"${fileName}"의 category는 fragments / critique / lexicon 중 하나여야 합니다. (현재: ${data.category})`,
    );
  }

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      excerpt: data.excerpt ?? "",
      date: String(data.date ?? ""),
      category,
      keywords: data.keywords ?? [],
    },
    content,
  };
}

/** 모든 글의 메타데이터를 최신순으로 */
export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => readPostFile(fileName).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** 특정 카테고리의 글만 */
export function getPostsByCategory(category: CategorySlug): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

/** 글 한 편의 전체 내용 (마크다운 → HTML 변환 포함) */
export async function getPost(slug: string): Promise<Post> {
  const { meta, content } = readPostFile(`${slug}.md`);

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return { ...meta, contentHtml: processed.toString() };
}
