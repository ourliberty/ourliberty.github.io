/*
 * 첫 화면 = 소개 페이지입니다.
 * 아래 문장들을 자유롭게 바꿔서 소개글을 쓰세요.
 */
export default function Home() {
  return (
    <section className="pt-16 text-center">
      <p className="font-serif text-xl leading-loose tracking-tight">
        An archive of things seen, read, and learned.
      </p>
      <p className="mx-auto mt-10 max-w-md text-[0.9rem] leading-loose text-soft">
        Days are kept under ∂, films and books under ∴, and studies under Σ.
      </p>
    </section>
  );
}
