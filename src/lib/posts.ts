import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

// 카테고리 목록: 주소(slug) → 화면에 보이는 기호
// diary: ∂(하루의 조각·단상) / review: ∴(보고 읽은 뒤의 결론) / study: Σ(쌓여가는 배움)
export const CATEGORIES = {
  diary: "∂",
  review: "∴",
  study: "Σ",
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

// Σ(공부)의 하위 카테고리: slug → 화면에 보이는 이름
export const STUDY_SUBCATEGORIES = {
  philosophy: "Philosophy",
  mathematics: "Mathematics",
  economics: "Economics",
  "computer-science": "Computer Science",
  finance: "Finance",
} as const;

export type StudySubcategory = keyof typeof STUDY_SUBCATEGORIES;

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: CategorySlug;
  subcategory?: StudySubcategory; // category가 study일 때만 사용
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

  const category = (data.category ?? "diary") as CategorySlug;
  if (!(category in CATEGORIES)) {
    throw new Error(
      `"${fileName}"의 category는 diary / review / study 중 하나여야 합니다. (현재: ${data.category})`,
    );
  }

  const subcategory = data.subcategory as StudySubcategory | undefined;
  if (subcategory && !(subcategory in STUDY_SUBCATEGORIES)) {
    throw new Error(
      `"${fileName}"의 subcategory는 ${Object.keys(STUDY_SUBCATEGORIES).join(" / ")} 중 하나여야 합니다. (현재: ${data.subcategory})`,
    );
  }

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      excerpt: data.excerpt ?? "",
      date: String(data.date ?? ""),
      category,
      subcategory,
      keywords: data.keywords ?? [],
    },
    content,
  };
}

/** 모든 글의 메타데이터를 최신순으로 */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
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

/** 공부(Σ)의 특정 하위 카테고리 글만 */
export function getPostsBySubcategory(sub: StudySubcategory): PostMeta[] {
  return getAllPosts().filter(
    (post) => post.category === "study" && post.subcategory === sub,
  );
}

/** 해당 slug의 글 파일이 존재하는지 */
export function postExists(slug: string): boolean {
  return fs.existsSync(path.join(postsDirectory, `${slug}.md`));
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
