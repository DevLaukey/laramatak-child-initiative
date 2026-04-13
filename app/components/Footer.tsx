export default function Footer() {
  return (
    <footer style={{ background: "#0e4a2e" }}>
      <div className="max-w-6xl mx-auto px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div>
            <p
              className="text-white font-extrabold text-xl tracking-tight"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Laramatak
            </p>
            <p className="text-white/60 text-xs tracking-widest uppercase">
              Child Initiative
            </p>
          </div>
          <p
            className="text-white/65 text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Promoting the education of pastoralist children in Samburu, Kenya.
            Securing and transforming the future of nomadic communities through
            quality education.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-4 mt-1">
            {[
              {
                label: "Facebook",
                path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
              },
              {
                label: "Twitter / X",
                path: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
              },
              {
                label: "Instagram",
                path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z",
              },
            ].map(({ label, path }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-white/50 hover:text-white transition-colors duration-150"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p
            className="text-white font-semibold text-sm uppercase tracking-widest mb-5"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Quick Links
          </p>
          <ul className="flex flex-col gap-3">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Programs", href: "/programs" },
              { label: "Scholars", href: "/scholars" },
              { label: "Gallery", href: "/gallery" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-white/60 hover:text-white text-sm transition-colors duration-150"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Programs */}
        <div>
          <p
            className="text-white font-semibold text-sm uppercase tracking-widest mb-5"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Our Programs
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "School Development Programme",
              "Children Feeding Program",
              "Scholarship Programme",
              "Girls Empowerment",
            ].map((item) => (
              <li key={item}>
                <a
                  href="/programs"
                  className="text-white/60 hover:text-white text-sm transition-colors duration-150"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p
            className="text-white font-semibold text-sm uppercase tracking-widest mb-5"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Contact Us
          </p>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 text-white/50 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a
                href="mailto:info@laramatakchildinitiative.org"
                className="text-white/60 hover:text-white text-sm transition-colors duration-150"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                info@laramatakchildinitiative.org
              </a>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 text-white/50 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a
                href="tel:+254722535452"
                className="text-white/60 hover:text-white text-sm transition-colors duration-150"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                +254 722 535 452
              </a>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 text-white/50 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span
                className="text-white/60 text-sm"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                Wamba, Samburu East, Samburu County, Kenya
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-white/40 text-xs"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            &copy; {new Date().getFullYear()} Laramatak Child Initiative. All rights reserved.
          </p>
          <p
            className="text-white/40 text-xs"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Registered Nonprofit &middot; Samburu County, Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}
