# 나의 블로그 운영 가이드

이 폴더가 내 블로그의 전부입니다. Next.js + SSG(정적 사이트 생성) 방식으로,
글은 마크다운 파일로 관리합니다.

## 폴더 구조 (중요한 것만)

| 위치 | 역할 |
|---|---|
| `src/data/posts/` | **글이 들어가는 곳.** 파일 하나 = 글 하나 |
| `src/app/page.tsx` | 첫 화면(소개글) |
| `src/lib/site.ts` | 블로그 이름, 소개 문구, 주소 설정 |
| `public/images/` | 글에 넣을 사진 보관 |

## 글 쓰는 법 (3단계)

1. `src/data/posts` 폴더에 새 파일 만들기. 이름은 영문으로: `parasite-review.md`
   (파일 이름이 곧 글 주소가 됩니다 → `/posts/parasite-review/`)
2. 파일 맨 위에 아래 머리말(frontmatter)을 붙이기:

   ```markdown
   ---
   title: '글 제목'
   excerpt: '목록에 보여질 한 줄 요약'
   date: '2026-07-15'
   category: journal      # journal(일기) / marginalia(감상) / etudes(공부) 중 하나
   keywords: ['영화', '태그2']
   ---
   ```

3. 그 아래에 마크다운으로 본문 쓰기. (문법은 블로그의 "[공부] 마크다운 문법 정리" 글 참고)

## 내 컴퓨터에서 미리보기

터미널을 열고:

```bash
cd ~/my-blog
npm run dev
```

브라우저에서 http://localhost:3000 접속. 끝낼 때는 터미널에서 Ctrl+C.

## 인터넷에 올리기 (발행)

글을 쓰거나 고친 뒤, 터미널에서:

```bash
cd ~/my-blog
git add .
git commit -m "새 글 작성"
git push
```

GitHub이 자동으로 빌드해서 1~2분 뒤 블로그에 반영됩니다.
(`.github/workflows/deploy.yml`이 자동 배포를 담당해요.)

## 처음 배포할 때 (한 번만)

1. GitHub에서 `내아이디.github.io` 이름으로 저장소(repository) 만들기
2. `src/lib/site.ts`의 `SITE_URL`을 `https://내아이디.github.io`로 수정
3. 저장소의 Settings → Pages → Source를 **GitHub Actions**로 설정
4. `git push`
