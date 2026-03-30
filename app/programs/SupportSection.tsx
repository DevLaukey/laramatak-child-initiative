"use client";

const options = [
  {
    label: "Sponsor a Child's Education",
    amount: "$25",
    period: "/month",
    description:
      "Covers school fees, uniform, books, and supplies for one child for a full month.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6-3.5l6 3.5 6-3.5" />
      </svg>
    ),
    highlight: true,
  },
  {
    label: "Feed a Child for a Month",
    amount: "$15",
    period: "/month",
    description:
      "Provides a nutritious daily school meal for one child throughout the month.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8L17 13M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    ),
    highlight: false,
  },
  {
    label: "Empower a Girl",
    amount: "$20",
    period: "/month",
    description:
      "Funds mentorship, sanitary supplies, and life-skills training for one girl.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 2a5 5 0 100 10A5 5 0 0012 2zm0 12c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17 9l2-2m0 0l2-2m-2 2l2 2m-2-2l-2-2" />
      </svg>
    ),
    highlight: false,
  },
];

export default function SupportSection() {
  return (
    <section className="py-20 px-6" style={{ background: "#4BB3E6" }}>
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <span
            className="inline-block mb-3 px-4 py-1.5 rounded-full border border-white/30 text-white/80 text-xs font-medium tracking-widest uppercase"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Make a Difference Today
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Choose How You Want to Give
          </h2>
          <p
            className="text-white/80 mt-4 text-base max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Every contribution — no matter the size — directly reaches a child
            in rural Kenya. Pick a giving option below or make a custom donation.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {options.map((opt) => (
            <div
              key={opt.label}
              className="rounded-2xl p-7 flex flex-col gap-4"
              style={{
                background: opt.highlight ? "#1F7A4C" : "#fff",
                boxShadow: opt.highlight
                  ? "0 8px 32px rgba(31,122,76,0.35)"
                  : "0 2px 16px rgba(0,0,0,0.08)",
                position: "relative",
              }}
            >
              {opt.highlight && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-xs font-bold uppercase tracking-widest"
                  style={{
                    background: "#E63946",
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  Most Impactful
                </span>
              )}

              <div
                className="p-3 rounded-xl w-fit"
                style={{
                  background: opt.highlight ? "rgba(255,255,255,0.15)" : "#f0faf5",
                  color: opt.highlight ? "#fff" : "#1F7A4C",
                }}
              >
                {opt.icon}
              </div>

              <div>
                <p
                  className="text-2xl font-extrabold leading-none"
                  style={{
                    color: opt.highlight ? "#fff" : "#1F7A4C",
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  {opt.amount}
                  <span
                    className="text-sm font-medium ml-0.5"
                    style={{
                      color: opt.highlight ? "rgba(255,255,255,0.7)" : "#6b7280",
                    }}
                  >
                    {opt.period}
                  </span>
                </p>
                <p
                  className="font-bold text-base mt-1"
                  style={{
                    color: opt.highlight ? "#fff" : "#1F7A4C",
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  {opt.label}
                </p>
              </div>

              <p
                className="text-sm leading-relaxed flex-1"
                style={{
                  color: opt.highlight ? "rgba(255,255,255,0.8)" : "#6b7280",
                  fontFamily: "var(--font-open-sans)",
                }}
              >
                {opt.description}
              </p>

              <a
                href="/donate"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 mt-auto"
                style={{
                  background: opt.highlight ? "#4BB3E6" : "#1F7A4C",
                  color: "#fff",
                  fontFamily: "var(--font-montserrat)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#E63946";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = opt.highlight
                    ? "#4BB3E6"
                    : "#1F7A4C";
                }}
              >
                Donate Now
              </a>
            </div>
          ))}
        </div>

        {/* Custom amount */}
        <div className="text-center">
          <p
            className="text-white/80 text-sm mb-4"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Want to give a different amount or make a one-time gift?
          </p>
          <a
            href="/donate"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm border-2 border-white text-white transition-all duration-200"
            style={{ fontFamily: "var(--font-montserrat)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#fff";
              (e.currentTarget as HTMLElement).style.color = "#1F7A4C";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
          >
            Custom Donation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
