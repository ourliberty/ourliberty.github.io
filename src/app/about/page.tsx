import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
  description: "블로그 소개 페이지",
};

export default function AboutPage() {
  return (
    <>
      <header className="border-b border-line pb-12">
        <p className="mb-6 text-[0.7rem] tracking-[0.45em] text-accent">
          ABOUT
        </p>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">
          소개
        </h1>
      </header>
      <div className="prose prose-neutral mt-10 max-w-[65ch]">
        <p>
          안녕하세요! 이 블로그는 제가 보고, 읽고, 배운 것들을 기록하는
          곳입니다.
        </p>
        <ul>
          <li>
            <strong>일기</strong> — 그날그날의 생각과 하루의 기록
          </li>
          <li>
            <strong>감상</strong> — 영화 감상평과 독후감
          </li>
          <li>
            <strong>공부</strong> — 공부한 내용 정리
          </li>
        </ul>
        <p>
          이 문구는 <code>src/app/about/page.tsx</code> 파일을 열어서 자유롭게
          바꾸면 됩니다.
        </p>
      </div>
    </>
  );
}
