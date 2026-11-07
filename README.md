
Next.js + SSG, 글은 마크다운 파일로 관리

## 폴더 구조 

| 위치 | 역할 |
|---|---|
| `src/data/posts/` | **글이 들어가는 곳.** 파일 하나 = 글 하나 |
| `src/app/page.tsx` | 첫 화면(소개글) |
| `src/lib/site.ts` | 블로그 이름, 소개 문구, 주소 설정 |
| `public/images/` | 글에 넣을 사진 보관 |

## 글 쓰는 법 (3단계)

1. `src/data/posts` 폴더에 새 파일  `parasite-review.md`
   (파일 이름이 곧 글 주소가 됩니다 → `/posts/parasite-review/`)
2. 파일 맨 위에 아래 머리말(frontmatter)을 붙이기:

   ```markdown
   ---
   title: '글 제목'
   excerpt: '목록에 보여질 한 줄 요약'
   date: '2026-07-15'
   category: diary        # diary(일기·∂) / review(감상·∴) / study(공부·Σ) 중 하나
   subcategory: "2026"    # 하위 분류 (생략 가능)
   #  diary:  2026 / 2027   ← 연도는 따옴표로 감싸기
   #  review: texts(글) / films(영상) / exhibitions(전시) / performances(공연)
   #  study:  philosophy / mathematics / economics / computer-science / finance
   keywords: ['영화', '태그2']
   ---
   ```

3. 그 아래에 마크다운으로 본문

## 내 컴퓨터에서 미리보기

터미널

```bash
cd ~/my-blog
npm run dev
```

브라우저에서 http://localhost:3000 접속. 끝낼 때는 터미널에서 Ctrl+C.

## 발행

글을 쓰거나 고친 뒤, 터미널에서

```bash
cd ~/my-blog
git add .
git commit -m "새 글 작성"
git push
```

GitHub이 자동으로 빌드해서 1~2분 뒤 블로그에 반영
`.github/workflows/deploy.yml`이 자동 배포

## 처음 배포할 때

1. GitHub에서 `내아이디.github.io` 이름으로 저장소(repository) 만들기
2. `src/lib/site.ts`의 `SITE_URL`을 `https://내아이디.github.io`로 수정
3. 저장소의 Settings → Pages → Source를 **GitHub Actions**로 설정
4. `git push`

## 숲 속의 우체통 (`/forest/`)

둘만 쓰는 비밀 우체통. 블로그 어디에도 링크되지 않고, 검색에도 안 잡혀요(`noindex`).
주소: `https://ourliberty.github.io/forest/`

- 우체통을 누르고 **둘만 아는 말**을 적으면 열려요. 같은 말을 적은 사람끼리 같은 우체통을 써요.
- 쪽지는 그 말로 **잠겨서(암호화)** 저장돼요. 말을 모르면 저장소 주인도 읽을 수 없어요.
  - 그 말을 잊어버리면 쪽지를 되살릴 방법이 없어요.
  - 다른 말을 적으면 오류 없이 빈 우체통이 열려요. 쪽지가 안 보이면 말을 다시 확인하세요.
- "이 기기에서 기억"을 켜 두면 다음부터 바로 열리고, 안 읽은 쪽지가 있으면 우체통 입구에 종이가 꽂혀 보여요.
- 숲의 빛깔은 들어간 시각(새벽·낮·저녁·밤)에 따라 바뀌어요.

파일: `public/forest/index.html`(화면), `public/forest/config.js`(설정)

### 둘이 함께 쓰려면: Firebase 연결 (무료, 한 번만)

`config.js`가 비어 있으면 쪽지가 **지금 쓰는 기기에만** 저장돼요. 서로의 폰에서 보려면:

1. https://console.firebase.google.com 에서 **프로젝트 만들기** (애널리틱스는 꺼도 됨)
2. 왼쪽 메뉴 **Build → Firestore Database → 데이터베이스 만들기** → 위치 `asia-northeast3 (Seoul)` → **프로덕션 모드**
3. Firestore의 **규칙(Rules)** 탭에 아래를 붙여넣고 **게시**:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /boxes/{box}/letters/{letter} {
         allow read: if true;
         allow create: if request.resource.data.keys().hasOnly(['iv', 'ct', 'at'])
                       && request.resource.data.iv is string
                       && request.resource.data.ct is string
                       && request.resource.data.ct.size() < 40000
                       && request.resource.data.at is int;
       }
     }
   }
   ```
   (쪽지는 넣을 수만 있고, 고치거나 지울 수 없어요. 지우고 싶으면 Firebase 콘솔에서 직접.)
4. 프로젝트 설정(⚙) → **일반** → 아래 "내 앱"에서 **웹 앱(</>) 추가** → 나오는 값 중
   `apiKey`, `projectId` 두 개를 `public/forest/config.js`에 붙여넣기
5. push → 1~2분 뒤 반영
