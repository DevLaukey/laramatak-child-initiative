"use client";

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(75,179,230,0.2) 0%, rgba(31,122,76,0.3) 100%)",
        }}
      />
      {/* Dark base for readability */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.48)" }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        <span
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/40 text-white/80 text-sm font-medium tracking-widest uppercase"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Laramatak Child Initiative
        </span>

        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Education for the
          <br />
          <span style={{ color: "#4BB3E6" }}>Nomad Child.</span>
        </h1>

        <p
          className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed mb-10"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Securing and transforming the future of nomad communities in Samburu,
          Kenya through quality education.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="/donate"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-white text-base font-semibold shadow-lg transition-all duration-200 min-w-[170px]"
            style={{
              background: "#1F7A4C",
              fontFamily: "var(--font-montserrat)",
              boxShadow: "0 4px 20px rgba(31,122,76,0.4)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#E63946")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#1F7A4C")
            }
          >
            Donate Now
          </a>
          <a
            href="/get-involved"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 text-base font-semibold transition-all duration-200 min-w-[170px]"
            style={{
              borderColor: "#1F7A4C",
              color: "#1F7A4C",
              background: "rgba(255,255,255,0.9)",
              fontFamily: "var(--font-montserrat)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#1F7A4C";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.9)";
              (e.currentTarget as HTMLElement).style.color = "#1F7A4C";
            }}
          >
            Get Involved
          </a>
        </div>

        <div className="mt-16 flex flex-col items-center gap-2 opacity-60">
          <span className="text-white text-xs tracking-widest uppercase">
            Scroll to learn more
          </span>
          <svg
            className="w-5 h-5 text-white animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
