const programs = [
  {
    id: "education",
    title: "School Development Programme",
    tagline: "A beacon of quality education for nomadic children.",
    description:
      "LCI established a school in Wamba, Samburu East, serving boys and girls from nomadic backgrounds. The school provides a conducive learning environment and well-maintained facilities, staffed with highly qualified personnel dedicated to a super-fast and efficient learning experience. Students have access to the best books, enriching their learning and broadening their knowledge base.",
    includes: [
      "A fully equipped school in Wamba, Samburu East",
      "Highly qualified and dedicated teaching staff",
      "Top-tier textbooks and educational resources",
      "Smooth transition pathways to the next academic levels",
      "Collaboration with the county government of Samburu",
    ],
    stat: "120+",
    statLabel: "students enrolled since launch",
    image: "images/_MG_1638.jpg",
    imageAlt: "Children attentively studying in a rural Kenya classroom",
    accent: "#1F7A4C",
    icon: (
      <svg
        className="w-9 h-9"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6-3.5l6 3.5 6-3.5"
        />
      </svg>
    ),
  },
  {
    id: "nutrition",
    title: "Children Feeding Program",
    tagline: "A nourished child is a child who can learn.",
    description:
      "The school implements a crucial feeding program ensuring children have a nutritious meal during lunchtime. Recognising that effective learning is closely tied to well-nourished students, the provision of a daily meal addresses hunger and creates a conducive learning environment. This holistic approach underscores the understanding that education extends beyond the classroom.",
    includes: [
      "Nutritious lunch served every school day",
      "Supports students attending school from morning to evening",
      "Positive impact on children's overall health and well-being",
      "Improved ability to absorb and retain educational content",
      "Foundation for a healthier and more focused learning community",
    ],
    stat: "Daily",
    statLabel: "meals for every enrolled child",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80",
    imageAlt: "Children receiving nutritious meals at a school feeding program",
    accent: "#4BB3E6",
    icon: (
      <svg
        className="w-9 h-9"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8L17 13M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
        />
      </svg>
    ),
  },
  {
    id: "protection",
    title: "Scholarship Programme",
    tagline: "Unlocking the next chapter for the most deserving students.",
    description:
      "LCI's Scholarship Programme supports pastoralist children in accessing quality education beyond the primary level. By removing financial barriers, we ensure that the most promising young people from nomadic communities can continue their education and realise their full potential.",
    includes: [
      "Scholarship support for secondary and higher education",
      "Targeting children from nomadic and pastoral backgrounds",
      "Partnering with schools and stakeholders in Samburu County",
      "Empowering recipients to become community role models",
      "Contributing to SDG No. 4 — Quality Education",
    ],
    stat: "SDG 4",
    statLabel: "Quality Education — our guiding goal",
    image:
      "https://images.unsplash.com/photo-1560785477-d43d2b3e5d4b?w=900&q=80",
    imageAlt:
      "A safe and nurturing environment for children at an LCI safe space",
    accent: "#1F7A4C",
    icon: (
      <svg
        className="w-9 h-9"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        />
      </svg>
    ),
  },
  {
    id: "girls",
    title: "Girls Empowerment",
    tagline: "No girl should be left behind.",
    description:
      "LCI is committed to instilling in young girls a courageous and resilient mindset — that they are capable of achieving anything they set their minds to. We raise awareness within the community about early marriages, school dropout, menstrual shame, and the rights of women, working to ensure every girl has an equal chance at education and a better future.",
    includes: [
      "Awareness campaigns on the rights of girls and women",
      "Combating early marriage and school dropout",
      "Addressing menstrual shame and period poverty",
      "Empowering girls with confidence and resilience",
      "Building a community that values girls' education",
    ],
    stat: "Every",
    statLabel: "girl deserves a future",
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900&q=80",
    imageAlt:
      "Girls at an LCI empowerment workshop sharing stories and learning together",
    accent: "#4BB3E6",
    icon: (
      <svg
        className="w-9 h-9"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 2a5 5 0 100 10A5 5 0 0012 2zm0 12c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M17 9l2-2m0 0l2-2m-2 2l2 2m-2-2l-2-2"
        />
      </svg>
    ),
  },
];

export default function ProgramDetails() {
  return (
    <section className="py-4 bg-white">
      {programs.map((prog, i) => {
        const reversed = i % 2 !== 0;
        return (
          <div
            key={prog.id}
            id={prog.id}
            className="py-16 px-6"
            style={{ background: i % 2 === 0 ? "#fff" : "#f0faf5" }}
          >
            <div
              className={`max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center ${
                reversed ? "lg:[direction:rtl]" : ""
              }`}
            >
              {/* Image */}
              <div className={reversed ? "[direction:ltr]" : ""}>
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
                >
                  <img
                    src={prog.image}
                    alt={prog.imageAlt}
                    className="w-full h-80 lg:h-[420px] object-cover"
                  />
                  {/* Stat badge */}
                  <div
                    className="absolute bottom-5 left-5 rounded-xl px-5 py-3"
                    style={{
                      background: prog.accent,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                    }}
                  >
                    <p
                      className="text-white text-2xl font-extrabold leading-none"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {prog.stat}
                    </p>
                    <p
                      className="text-white/80 text-xs mt-0.5"
                      style={{ fontFamily: "var(--font-open-sans)" }}
                    >
                      {prog.statLabel}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={reversed ? "[direction:ltr]" : ""}>
                {/* Icon + title */}
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="p-3 rounded-xl shrink-0"
                    style={{ background: prog.accent, color: "#fff" }}
                  >
                    {prog.icon}
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-extrabold leading-tight"
                    style={{
                      color: prog.accent,
                      fontFamily: "var(--font-montserrat)",
                    }}
                  >
                    {prog.title}
                  </h2>
                </div>

                <p
                  className="text-base font-semibold mb-3 italic"
                  style={{
                    color: prog.accent,
                    fontFamily: "var(--font-open-sans)",
                  }}
                >
                  &ldquo;{prog.tagline}&rdquo;
                </p>

                <p
                  className="text-gray-600 text-base leading-relaxed mb-7"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  {prog.description}
                </p>

                {/* What it includes */}
                <div
                  className="rounded-xl p-5"
                  style={{
                    background:
                      prog.accent === "#1F7A4C" ? "#f0faf5" : "#f0f8fe",
                  }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{
                      color: prog.accent,
                      fontFamily: "var(--font-montserrat)",
                    }}
                  >
                    What It Includes
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {prog.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg
                          className="w-4 h-4 mt-0.5 shrink-0"
                          fill="none"
                          stroke={prog.accent}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span
                          className="text-gray-600 text-sm leading-snug"
                          style={{ fontFamily: "var(--font-open-sans)" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
