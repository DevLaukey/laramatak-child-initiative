const stats = [
  {
    number: "1,200+",
    label: "Children Supported",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 11-8 0 4 4 0 018 0zM3 7a4 4 0 118 0A4 4 0 013 7zm14 0a4 4 0 118 0 4 4 0 01-8 0z" />
      </svg>
    ),
  },
  {
    number: "15",
    label: "Schools Reached",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
      </svg>
    ),
  },
  {
    number: "450+",
    label: "Girls Empowered",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.98 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

export default function ImpactSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <span
          className="text-sm font-semibold uppercase tracking-widest mb-3 block"
          style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
        >
          Our Impact
        </span>
        <h2
          className="text-3xl md:text-4xl font-extrabold mb-14"
          style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
        >
          Numbers That Tell a Story
        </h2>

        <div className="grid sm:grid-cols-3 gap-10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-3">
              <div
                className="p-4 rounded-full"
                style={{ background: "#f0faf5", color: "#1F7A4C" }}
              >
                {stat.icon}
              </div>
              <span
                className="text-5xl font-extrabold"
                style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
              >
                {stat.number}
              </span>
              <span
                className="text-gray-600 text-base font-medium"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
