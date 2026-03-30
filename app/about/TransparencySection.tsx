const pillars = [
  {
    label: "Programs",
    pct: 90,
    color: "#1F7A4C",
  },
  {
    label: "Admin",
    pct: 6,
    color: "#4BB3E6",
  },
  {
    label: "Fundraising",
    pct: 4,
    color: "#a0c4b0",
  },
];

export default function TransparencySection() {
  return (
    <section className="py-20 px-6" style={{ background: "#f0faf5" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
          >
            Financial Stewardship
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            Your Trust, Our Responsibility
          </h2>
        </div>

        <div
          className="rounded-2xl overflow-hidden grid md:grid-cols-2 gap-0"
          style={{ boxShadow: "0 4px 32px rgba(31,122,76,0.12)" }}
        >
          {/* Left — stat + bars */}
          <div className="bg-white p-10 flex flex-col justify-center gap-8">
            {/* Big stat */}
            <div className="flex items-center gap-5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "#f0faf5" }}
              >
                <svg className="w-8 h-8" fill="none" stroke="#1F7A4C" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p
                  className="text-5xl font-extrabold leading-none"
                  style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
                >
                  90%
                </p>
                <p
                  className="text-gray-500 text-sm mt-1"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  of every donation goes directly to programs
                </p>
              </div>
            </div>

            {/* Bar breakdown */}
            <div className="flex flex-col gap-4">
              {pillars.map(({ label, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1.5">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "#374151", fontFamily: "var(--font-open-sans)" }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color, fontFamily: "var(--font-montserrat)" }}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full" style={{ background: "#e5f0ea" }}>
                    <div
                      className="h-2.5 rounded-full"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — callout */}
          <div
            className="p-10 flex flex-col justify-between gap-8"
            style={{ background: "#1F7A4C" }}
          >
            <div className="flex flex-col gap-4">
              <h3
                className="text-white text-xl font-extrabold leading-snug"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Built on Accountability
              </h3>
              <p
                className="text-white/80 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                LCI maintains rigorous financial records audited annually by
                an independent firm. We publish full annual reports so donors,
                partners, and the community can see exactly how funds are used.
              </p>
              <ul className="flex flex-col gap-3 mt-2">
                {[
                  "Annual independent audit",
                  "Quarterly program impact reports",
                  "Community feedback mechanisms",
                  "Open board governance",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="#4BB3E6" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span
                      className="text-white/85 text-sm"
                      style={{ fontFamily: "var(--font-open-sans)" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="/reports"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-colors duration-150 w-fit"
              style={{
                background: "#4BB3E6",
                color: "#fff",
                fontFamily: "var(--font-montserrat)",
              }}
            >
              View Annual Reports
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
