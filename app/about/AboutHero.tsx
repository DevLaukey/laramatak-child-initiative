export default function AboutHero() {
  return (
    <section
      className="relative w-full flex items-center justify-center"
      style={{
        minHeight: "52vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.52)" }} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(31,122,76,0.35) 0%, rgba(75,179,230,0.18) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-24 pb-16">
        <span
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/30 text-white/75 text-xs font-medium tracking-widest uppercase"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Who We Are
        </span>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          About Laramatak
          <br />
          <span style={{ color: "#4BB3E6" }}>Child Initiative</span>
        </h1>
        <p
          className="text-lg text-white/80 leading-relaxed"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Rooted in rural Kenya. Driven by community.
        </p>
      </div>
    </section>
  );
}
