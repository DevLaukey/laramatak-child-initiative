export default function ScholarsHero() {
  return (
    <section
      className="relative flex items-center justify-center text-center px-6 pt-40 pb-24"
      style={{
        background: "linear-gradient(135deg, #1F7A4C 0%, #155c38 60%, #0f3d25 100%)",
      }}
    >
      {/* decorative circle */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
        style={{ background: "#4BB3E6", transform: "translate(40%, -40%)" }}
      />

      <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-6">
        <span
          className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
          style={{
            background: "rgba(75,179,230,0.18)",
            color: "#7dd3fc",
            fontFamily: "var(--font-montserrat)",
            border: "1px solid rgba(75,179,230,0.35)",
          }}
        >
          Meet Our Scholars
        </span>

        <h1
          className="text-4xl md:text-5xl font-extrabold text-white leading-tight"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Every Child Has a Story.
          <br />
          <span style={{ color: "#4BB3E6" }}>You Can Be Part of It.</span>
        </h1>

        <p
          className="text-white/75 text-base md:text-lg leading-relaxed max-w-xl"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Our scholars are bright, resilient children from rural Kenya who deserve
          a chance at education and a better future. Choose a child to sponsor
          and follow their journey directly.
        </p>

        <a
          href="#scholars"
          className="mt-2 px-8 py-3.5 rounded-full text-white text-sm font-bold transition-all duration-200"
          style={{
            background: "#E63946",
            fontFamily: "var(--font-montserrat)",
            boxShadow: "0 6px 24px rgba(230,57,70,0.35)",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#4BB3E6")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#E63946")
          }
        >
          Browse Scholars
        </a>
      </div>
    </section>
  );
}
