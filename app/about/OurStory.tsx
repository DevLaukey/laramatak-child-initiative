const milestones = [
  {
    year: "2015",
    title: "A Community Cry",
    body:
      "Founders witnessed firsthand the crisis of school dropouts and child malnutrition in Laramatak, a remote village in rural Kenya. Neighbors gathered to ask: what can we do?",
  },
  {
    year: "2016",
    title: "First Steps",
    body:
      "With a small group of local volunteers and a borrowed classroom, LCI launched its first education support program serving 40 children. No external funding — just community determination.",
  },
  {
    year: "2018",
    title: "Growing Reach",
    body:
      "LCI formally registered as a nonprofit and expanded into nutrition feeding programs. Partnerships with 5 local schools brought 300+ children under the initiative's umbrella.",
  },
  {
    year: "2021",
    title: "Girls Empowerment Launch",
    body:
      "Responding to alarming dropout rates among girls, LCI launched a dedicated girls empowerment program covering menstrual health, mentorship, and leadership training.",
  },
  {
    year: "Today",
    title: "1,200+ Children & Counting",
    body:
      "LCI now operates across 15 schools, runs 4 core programs, and remains committed to locally-led, child-centered change in every community it serves.",
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
            <img
              src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=900&q=80"
              alt="LCI founder with community members in rural Kenya"
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
              &ldquo;We started with nothing but the conviction that every child
              deserves a chance.&rdquo;
            </p>
            <p
              className="text-xs font-semibold mt-1"
              style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
            >
              — LCI Founder
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
            How It All Began
          </h2>

          <ol className="relative flex flex-col gap-0">
            {milestones.map((m, i) => (
              <li key={m.year} className="flex gap-5">
                {/* Line + dot */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{
                      background: i === milestones.length - 1 ? "#4BB3E6" : "#1F7A4C",
                      fontFamily: "var(--font-montserrat)",
                    }}
                  >
                    {i === milestones.length - 1 ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      m.year.slice(-2)
                    )}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 my-1" style={{ background: "#c8e8d8" }} />
                  )}
                </div>

                {/* Content */}
                <div className="pb-9">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
                  >
                    {m.year}
                  </span>
                  <h3
                    className="text-base font-bold mt-0.5 mb-1.5"
                    style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
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
