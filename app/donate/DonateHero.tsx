export default function DonateHero() {
  return (
    <section
      className="relative w-full flex items-center justify-center py-28 px-6"
      style={{
        background: "linear-gradient(135deg, #0e4a2e 0%, #1F7A4C 60%, #166a40 100%)",
        minHeight: "38vh",
      }}
    >
      {/* Red accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "#E63946" }}
      />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Urgency badge */}
        <span
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest"
          style={{
            background: "#E63946",
            fontFamily: "var(--font-montserrat)",
          }}
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Children Need Your Help Today
        </span>

        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Give Today.{" "}
          <span style={{ color: "#4BB3E6" }}>Change a Life.</span>
        </h1>
        <p
          className="text-white/80 text-lg leading-relaxed"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Your generosity provides education, nutrition, and hope for vulnerable
          children in rural Kenya.
        </p>

        {/* Trust row */}
        <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
          {[
            "90% to programs",
            "SSL Secured",
            "Registered Nonprofit",
          ].map((t) => (
            <span
              key={t}
              className="flex items-center gap-1.5 text-white/65 text-xs"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="#4BB3E6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
