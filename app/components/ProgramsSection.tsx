"use client";

const programs = [
  {
    title: "Education Support",
    description:
      "We provide school supplies, scholastic materials, and mentorship to keep children in school and thriving academically.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6-3.5l6 3.5 6-3.5" />
      </svg>
    ),
  },
  {
    title: "Nutrition & Feeding",
    description:
      "Our daily feeding programs ensure that no child learns on an empty stomach. Proper nutrition fuels growth and concentration.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8L17 13M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    ),
  },
  {
    title: "Child Protection",
    description:
      "We create safe spaces and provide psychosocial support to children who have experienced abuse, neglect, or displacement.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Girls Empowerment",
    description:
      "Through mentorship, leadership training, and sanitation support, we champion the rights and futures of young girls.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 2a5 5 0 100 10A5 5 0 0012 2zm0 12c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17 9l2-2m0 0l2-2m-2 2l2 2m-2-2l-2-2" />
      </svg>
    ),
  },
];

export default function ProgramsSection() {
  return (
    <section className="py-20 px-6" style={{ background: "#f0faf5" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
          >
            What We Do
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            Our Programs
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog) => (
            <div
              key={prog.title}
              className="bg-white rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 cursor-default group"
              style={{
                borderTop: "4px solid #1F7A4C",
                boxShadow: "0 2px 16px rgba(31,122,76,0.08)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 32px rgba(31,122,76,0.18)";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 16px rgba(31,122,76,0.08)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ color: "#1F7A4C" }}>{prog.icon}</div>
              <h3
                className="text-lg font-bold"
                style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
              >
                {prog.title}
              </h3>
              <p
                className="text-gray-600 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                {prog.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
