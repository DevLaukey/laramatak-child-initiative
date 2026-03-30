const programs = [
  {
    id: "education",
    title: "Education Support",
    tagline: "Every child deserves a seat in the classroom.",
    description:
      "Education is the single most powerful tool we have for breaking the cycle of poverty. LCI's Education Support program ensures that financial barriers never stand between a child and a quality education. We work directly with families, schools, and local leaders to keep children enrolled, engaged, and thriving.",
    includes: [
      "Full or partial school fee sponsorship",
      "Uniforms, shoes, and backpacks",
      "Textbooks, exercise books, and stationery",
      "Remedial tutoring and academic mentorship",
      "Teacher capacity-building at partner schools",
    ],
    stat: "500+",
    statLabel: "children in school this year",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",
    imageAlt: "Children attentively studying in a rural Kenya classroom",
    accent: "#1F7A4C",
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6-3.5l6 3.5 6-3.5" />
      </svg>
    ),
  },
  {
    id: "nutrition",
    title: "Nutrition & Feeding",
    tagline: "A hungry child cannot learn. A fed child can change the world.",
    description:
      "Malnutrition remains one of the biggest barriers to education and development in rural Kenya. LCI's Nutrition & Feeding program delivers hot, nutritious meals to children at partner schools every school day. We also support food-insecure families with seasonal food packages to ensure children are nourished at home.",
    includes: [
      "Daily hot school meals for 1,200+ children",
      "Balanced menus designed with nutritional experts",
      "Seasonal food parcels for vulnerable families",
      "Kitchen infrastructure support at schools",
      "Community kitchen garden projects",
    ],
    stat: "15,000+",
    statLabel: "meals served every month",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80",
    imageAlt: "Children receiving nutritious meals at a school feeding program",
    accent: "#4BB3E6",
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8L17 13M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    ),
  },
  {
    id: "protection",
    title: "Child Protection",
    tagline: "Every child deserves to feel safe.",
    description:
      "Rural Kenya is not without its dangers — abuse, neglect, early marriage, and displacement affect thousands of children every year. LCI's Child Protection program operates with a trauma-informed, community-centred approach. We identify at-risk children, provide psychosocial support, and work with families and local authorities to create long-term safety.",
    includes: [
      "Safe spaces and temporary shelter for children in crisis",
      "One-on-one counselling and group therapy sessions",
      "Family tracing and reunification support",
      "Community awareness campaigns on child rights",
      "Collaboration with county child protection offices",
    ],
    stat: "200+",
    statLabel: "children in safe care",
    image:
      "https://images.unsplash.com/photo-1560785477-d43d2b3e5d4b?w=900&q=80",
    imageAlt: "A safe and nurturing environment for children at an LCI safe space",
    accent: "#1F7A4C",
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: "girls",
    title: "Girls Empowerment",
    tagline: "When you invest in a girl, you invest in a generation.",
    description:
      "Girls in rural Kenya face compounding disadvantages — from period poverty to cultural pressure to marry early. LCI's Girls Empowerment program creates a bold, safe, and inspiring space for young women to own their futures. Through mentorship circles, skills training, and advocacy, we are rewriting the story for hundreds of girls.",
    includes: [
      "Monthly menstrual health education and sanitary supplies",
      "Leadership and life-skills training workshops",
      "Mentorship pairings with professional Kenyan women",
      "Community advocacy to combat child marriage",
      "Scholarship pathways for secondary and vocational education",
    ],
    stat: "450+",
    statLabel: "girls empowered to stay in school",
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900&q=80",
    imageAlt: "Girls at an LCI empowerment workshop sharing stories and learning together",
    accent: "#4BB3E6",
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 2a5 5 0 100 10A5 5 0 0012 2zm0 12c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17 9l2-2m0 0l2-2m-2 2l2 2m-2-2l-2-2" />
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
                    style={{ color: prog.accent, fontFamily: "var(--font-montserrat)" }}
                  >
                    {prog.title}
                  </h2>
                </div>

                <p
                  className="text-base font-semibold mb-3 italic"
                  style={{ color: prog.accent, fontFamily: "var(--font-open-sans)" }}
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
                  style={{ background: prog.accent === "#1F7A4C" ? "#f0faf5" : "#f0f8fe" }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: prog.accent, fontFamily: "var(--font-montserrat)" }}
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
