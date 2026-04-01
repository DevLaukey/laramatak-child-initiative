export default function DonateFooter() {
  return (
    <footer style={{ background: "#0e4a2e" }}>
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start">
          <p
            className="text-white font-extrabold text-base tracking-tight"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Laramatak Child Initiative
          </p>
          <p className="text-white/50 text-xs mt-0.5" style={{ fontFamily: "var(--font-open-sans)" }}>
            Registered Nonprofit · Samburu County, Kenya
          </p>
        </div>

        <div className="flex items-center gap-6 flex-wrap justify-center">
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Programs", href: "/programs" },
            { label: "Contact", href: "/contact" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-white/55 hover:text-white text-xs transition-colors duration-150"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              {label}
            </a>
          ))}
        </div>

        <p
          className="text-white/35 text-xs text-center sm:text-right"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          &copy; {new Date().getFullYear()} Laramatak Child Initiative
        </p>
      </div>
    </footer>
  );
}
