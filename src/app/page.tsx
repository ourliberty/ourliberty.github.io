/*
 * 첫 화면 = 소개(About) 페이지입니다.
 * 아래 문장과 연락처 링크를 자유롭게 바꾸세요.
 */

const CONTACTS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ourliberty_/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/juha-shin-84326a229/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:ourliberty@ewha.ac.kr",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <section className="mx-auto max-w-xl pt-8">
      <p className="text-center font-serif text-2xl tracking-tight">Hello,</p>
      <div className="mt-10 space-y-6 text-[0.92rem] leading-[1.95]">
        <p>
          I am an undergraduate at Ewha Womans University, studying philosophy,
          the social sciences, and computer science.
        </p>
        <p>
          My research ambition lies at the intersection of these disciplines:
          to map the future of finance with both empirical rigor and
          interpretive depth. I believe that data, the hardware of positivist
          inquiry, becomes truly meaningful only when integrated with the
          software of human psychology and context, as illuminated by
          hermeneutics and phenomenology. Through causal inference and
          empirical validation, I aim to build models of financial futures
          that are not merely statistically sound, but genuinely attuned to
          the human realities they describe.
        </p>
        <p>
          This blog serves as a record of my studies, reflections on works of
          art and literature, and occasional personal writings.
        </p>
        <p>You may reach me through the following channels:</p>
      </div>
      <div className="mt-9 flex justify-center gap-8">
        {CONTACTS.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={contact.label}
            title={contact.label}
            className="text-soft transition-colors duration-300 hover:text-ink"
          >
            {contact.icon}
          </a>
        ))}
      </div>
    </section>
  );
}
