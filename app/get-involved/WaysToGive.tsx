"use client";

const cards = [
  {
    title: "One-Time Donation",
    description:
      "Give what you can, when you can. Every amount — large or small — directly funds meals, books, and safe spaces for children in rural Kenya.",
    highlight: false,
    badge: null,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    amounts: ["$10", "$25", "$50", "$100"],
  },
  {
    title: "Monthly Giving",
    description:
      "Sustained, predictable support lets us plan ahead and reach more children. Monthly donors are the backbone of everything we do.",
    highlight: true,
    badge: "Most Impactful",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    amounts: ["$15", "$25", "$50", "$100"],
  },
  {
    title: "Sponsor a Child",
    description:
      "Form a personal connection with a child's journey. You'll receive progress updates and know exactly whose life your generosity is shaping.",
    highlight: false,
    badge: null,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    amounts: ["$25/mo", "$50/mo"],
  },
];

export default function WaysToGive() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
          >
            Give Today
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            Ways to Give
          </h2>
          <p
            className="text-gray-500 mt-4 max-w-lg mx-auto text-base leading-relaxed"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Choose the giving style that works for you. 90% of every donation
            goes directly to our programs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {cards.map((card) => (
            <div
              key={card.title}
              className="relative rounded-2xl p-7 flex flex-col gap-5"
              style={{
                background: card.highlight ? "#1F7A4C" : "#fff",
                border: card.highlight ? "none" : "1px solid #e8f5ef",
                boxShadow: card.highlight
                  ? "0 8px 40px rgba(31,122,76,0.28)"
                  : "0 2px 20px rgba(0,0,0,0.06)",
              }}
            >
              {card.badge && (
                <span
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap"
                  style={{
                    background: "#E63946",
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  {card.badge}
                </span>
              )}

              {/* Icon */}
              <div
                className="p-3 rounded-xl w-fit"
                style={{
                  background: card.highlight ? "rgba(255,255,255,0.15)" : "#f0faf5",
                  color: card.highlight ? "#fff" : "#1F7A4C",
                }}
              >
                {card.icon}
              </div>

              <div className="flex flex-col gap-2">
                <h3
                  className="text-xl font-extrabold"
                  style={{
                    color: card.highlight ? "#fff" : "#1F7A4C",
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: card.highlight ? "rgba(255,255,255,0.78)" : "#6b7280",
                    fontFamily: "var(--font-open-sans)",
                  }}
                >
                  {card.description}
                </p>
              </div>

              {/* Amount pills */}
              <div className="flex flex-wrap gap-2">
                {card.amounts.map((amt) => (
                  <span
                    key={amt}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: card.highlight ? "rgba(255,255,255,0.15)" : "#f0faf5",
                      color: card.highlight ? "#fff" : "#1F7A4C",
                      fontFamily: "var(--font-montserrat)",
                    }}
                  >
                    {amt}
                  </span>
                ))}
              </div>

              <a
                href="/donate"
                className="mt-auto inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200"
                style={{
                  background: card.highlight ? "#4BB3E6" : "#1F7A4C",
                  color: "#fff",
                  fontFamily: "var(--font-montserrat)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#E63946";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = card.highlight
                    ? "#4BB3E6"
                    : "#1F7A4C";
                }}
              >
                Donate Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
