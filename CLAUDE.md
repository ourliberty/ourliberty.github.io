# my-blog

개인 블로그. Next.js 16 (App Router) + SSG(`output: "export"`) + 마크다운 데이터.
블로그 주인은 개발 비전공 초보자 — 설명은 한국어로, 전문용어는 풀어서.

- Next.js 16은 breaking change가 많음. 코드 작성 전 `node_modules/next/dist/docs/` 참고
  (예: `params`는 Promise라 `await` 필요, 타입은 `PageProps<'/route'>` 헬퍼 사용)
- 글 데이터: `src/data/posts/*.md` (frontmatter: title/excerpt/date/category/keywords,
  category는 diary/review/study만 허용 — `src/lib/posts.ts` 참고)
- 정적 배포 전제: 서버 기능(Server Actions, API route 등) 추가 금지
- 사이트 설정은 `src/lib/site.ts`에 모아둠
