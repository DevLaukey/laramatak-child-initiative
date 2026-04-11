const milestones = [
  {
    year: "2014",
    title: "A Guardian Steps In",
    body: "Ulf Spendrup became Felix Lemantile's guardian, profoundly altering and enhancing Felix's life. Felix — a pastoral child from the northern regions of Kenya — received unwavering support from university to the master's level.",
  },
  {
    year: "2022",
    title: "A Compelling Idea",
    body: "Having completed his education with Ulf's support, Felix approached him with a plan: establish a school specifically for pastoralist children in the remote Samburu region of northern Kenya.",
  },
  {
    year: "2023",
    title: "A Founding Partner Commits",
    body: "Ulf, driven by a deep commitment to education, readily embraced the vision and pledged his support. The Laramatak Child Initiative was born with the goal of reaching isolated pastoral homesteads where long distances make schooling nearly impossible.",
  },
  {
    year: "2024",
    title: "School Opens in Wamba",
    body: "LCI established a school in Wamba, Samburu East. The school serves as a beacon of quality education for young girls and boys from nomadic backgrounds, with over 30 students enrolled since launch.",
  },
  {
    year: "Today",
    title: "Growing & Expanding",
    body: "LCI runs a School Development Programme, a Children Feeding Program, and a Scholarship Programme — collaborating with the county government of Samburu and other stakeholders to achieve SDG No. 4: Quality Education.",
  },
];

export default function OurStory() {
  return (
    <section className="py-20 px-6" style={{ background: "#f0faf5" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        {/* Image */}
        <div className="relative">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 8px 40px rgba(31,122,76,0.15)" }}
          >
            <Image
              src="/images/_MG_1344.jpg"
              alt="LCI founder with community members in rural Kenya"
              width={300}
              height={200}
              className="w-full h-[480px] object-cover object-center"
            />
          </div>
          {/* Accent blocks */}
          <div
            className="absolute -bottom-5 -right-5 w-28 h-28 rounded-2xl -z-10"
            style={{ background: "#4BB3E6", opacity: 0.2 }}
          />
          <div
            className="absolute -top-5 -left-5 w-20 h-20 rounded-xl -z-10"
            style={{ background: "#1F7A4C", opacity: 0.15 }}
          />
          {/* Caption card */}
          <div
            className="absolute bottom-6 left-6 right-6 rounded-xl px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              backdropFilter: "blur(6px)",
            }}
          >
            <p
              className="text-sm text-gray-700 leading-snug"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              &ldquo;Education is the most powerful weapon which you can use to
              change the world.&rdquo;
            </p>
            <p
              className="text-xs font-semibold mt-1"
              style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
            >
              — Nelson Mandela
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
          >
            Our Journey
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-10 leading-tight"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            The Story Behind LCI
          </h2>

          <ol className="relative flex flex-col gap-0">
            {milestones.map((m, i) => (
              <li key={m.year} className="flex gap-5">
                {/* Line + dot */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{
                      background:
                        i === milestones.length - 1 ? "#4BB3E6" : "#1F7A4C",
                      fontFamily: "var(--font-montserrat)",
                    }}
                  >
                    {i === milestones.length - 1 ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      m.year.slice(-2)
                    )}
                  </div>
                  {i < milestones.length - 1 && (
                    <div
                      className="w-px flex-1 my-1"
                      style={{ background: "#c8e8d8" }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pb-9">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{
                      color: "#4BB3E6",
                      fontFamily: "var(--font-open-sans)",
                    }}
                  >
                    {m.year}
                  </span>
                  <h3
                    className="text-base font-bold mt-0.5 mb-1.5"
                    style={{
                      color: "#1F7A4C",
                      fontFamily: "var(--font-montserrat)",
                    }}
                  >
                    {m.title}
                  </h3>
                  <p
                    className="text-gray-600 text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-open-sans)" }}
                  >
                    {m.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
