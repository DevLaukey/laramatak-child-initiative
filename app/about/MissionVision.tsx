const items = [
  {
    label: "Our Mission",
    color: "#1F7A4C",
    bg: "#f0faf5",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    text:
      "Securing and transforming the future of the nomad communities through quality education.",
  },
  {
    label: "Our Vision",
    color: "#4BB3E6",
    bg: "#f0f8fe",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    text:
      "Education for the nomad children.",
  },
];

export default function MissionVision() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
          >
            Our Foundation
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            What Drives Us
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map(({ label, color, bg, icon, text }) => (
            <div
              key={label}
              className="rounded-2xl p-8 flex flex-col gap-5"
              style={{
                background: bg,
                borderTop: `4px solid ${color}`,
                boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="p-3 rounded-xl w-fit"
                style={{ background: color, color: "#fff" }}
              >
                {icon}
              </div>
              <h3
                className="text-xl font-extrabold"
                style={{ color, fontFamily: "var(--font-montserrat)" }}
              >
                {label}
              </h3>
              <p
                className="text-gray-600 leading-relaxed text-base"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
