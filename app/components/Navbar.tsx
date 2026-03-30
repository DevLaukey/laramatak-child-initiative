"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "#1F7A4C"
          : "linear-gradient(to bottom, rgba(0,0,0,0.45), transparent)",
        boxShadow: scrolled ? "0 2px 16px rgba(31,122,76,0.18)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight">
          <span
            className="text-white font-extrabold text-xl tracking-tight"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Laramatak
          </span>
          <span className="text-white/75 text-xs tracking-widest uppercase">
            Child Initiative
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {["Home", "About", "Programs", "Scholars", "Gallery", "Contact"].map((item) => (
            <li key={item}>
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-150"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Donate button */}
        <a
          href="/donate"
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-200"
          style={{ background: "#4BB3E6" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#E63946")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#4BB3E6")
          }
        >
          Donate Now
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4" style={{ background: "#1F7A4C" }}>
          <ul className="flex flex-col gap-4">
            {["Home", "About", "Programs", "Scholars", "Gallery", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-white/90 hover:text-white text-base font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/donate"
                className="inline-flex px-5 py-2.5 rounded-full text-white text-sm font-semibold"
                style={{ background: "#4BB3E6" }}
              >
                Donate Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
