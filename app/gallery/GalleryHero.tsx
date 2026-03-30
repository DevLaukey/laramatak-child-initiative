export default function GalleryHero() {
  return (
    <section
      className="relative w-full flex items-center justify-center"
      style={{
        minHeight: "52vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.54)" }} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(31,122,76,0.38) 0%, rgba(75,179,230,0.2) 100%)",
        }}
      />
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-24 pb-16">
        <span
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/30 text-white/75 text-xs font-medium tracking-widest uppercase"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Stories & Moments
        </span>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Our <span style={{ color: "#4BB3E6" }}>Gallery</span>
        </h1>
        <p
          className="text-lg text-white/80 leading-relaxed"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Real moments. Real children. Real change happening in rural Kenya.
        </p>
      </div>
    </section>
  );
}
