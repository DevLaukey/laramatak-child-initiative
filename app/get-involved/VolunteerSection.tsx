const opportunities = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6-3.5l6 3.5 6-3.5" />
      </svg>
    ),
    title: "Teaching & Tutoring",
    desc: "Support classroom learning or run remedial sessions for children who need extra help.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: "Health & Nutrition",
    desc: "Help with feeding programs, health screenings, or community nutrition workshops.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Technology & Digital Skills",
    desc: "Teach basic computing, digital literacy, or help build LCI's digital presence.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Photography & Storytelling",
    desc: "Document our work and help share impactful stories that inspire more donors and supporters.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "Administration & Fundraising",
    desc: "Support grant writing, donor management, event planning, or operational coordination.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Girls Empowerment Mentoring",
    desc: "Professional women are invited to mentor teenage girls through our structured program.",
  },
];

export default function VolunteerSection() {
  return (
    <section className="py-20 px-6" style={{ background: "#f0faf5" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        {/* Text */}
        <div>
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
          >
            Volunteer With Us
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            Bring Your Skills.
            <br />
            Change a Life.
          </h2>
          <p
            className="text-gray-600 text-base leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Whether you are local to Kenya or joining us from abroad, there is a
            place for you at LCI. We welcome short-term placements, long-term
            commitments, and skills-based volunteering that plugs directly into
            our programs.
          </p>
          <p
            className="text-gray-600 text-base leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            International volunteers are placed with local community liaisons to
            ensure cultural sensitivity and maximum impact. All volunteers
            undergo a brief orientation and child-safeguarding training.
          </p>
          <a
            href="/volunteer-apply"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-200"
            style={{
              background: "#1F7A4C",
              fontFamily: "var(--font-montserrat)",
              boxShadow: "0 4px 20px rgba(31,122,76,0.3)",
            }}
          >
            Volunteer Application
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Opportunity grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {opportunities.map((opp) => (
            <div
              key={opp.title}
              className="bg-white rounded-xl p-5 flex gap-4"
              style={{
                boxShadow: "0 2px 16px rgba(31,122,76,0.08)",
                borderLeft: "3px solid #1F7A4C",
              }}
            >
              <div
                className="p-2 rounded-lg h-fit shrink-0"
                style={{ background: "#f0faf5", color: "#1F7A4C" }}
              >
                {opp.icon}
              </div>
              <div>
                <p
                  className="font-bold text-sm mb-1"
                  style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
                >
                  {opp.title}
                </p>
                <p
                  className="text-gray-500 text-xs leading-relaxed"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  {opp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
