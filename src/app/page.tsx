/*
 * 첫 화면 = 소개 페이지입니다.
 * 아래 문장들을 자유롭게 바꿔서 소개글을 쓰세요.
 */
export default function Home() {
  return (
    <section className="pt-16 text-center">
      <p className="font-serif text-xl leading-loose tracking-tight">
        보고, 읽고, 배운 것들을 기록합니다.
      </p>
      <p className="mx-auto mt-10 max-w-md text-[0.9rem] leading-loose text-soft">
        일기는 Journal에, 영화와 책의 감상은 Marginalia에, 공부한 것들은
        Études에 담아둡니다.
      </p>
    </section>
  );
}
