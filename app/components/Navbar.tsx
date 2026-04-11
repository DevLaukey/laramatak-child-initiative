"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Scholars", href: "/scholars" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "#1F7A4C"
          : "linear-gradient(to bottom, rgba(0,0,0,0.45), transparent)",
        boxShadow: scrolled ? "0 2px 16px rgba(31,122,76,0.18)" : "none",
      }}
      ref={menuRef}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0" onClick={() => setMenuOpen(false)}>
          <Image
            src="/lci-logo.jpeg"
            alt="Laramatak Child Initiative logo"
            width={40}
            height={40}
            className="rounded-full object-cover w-9 h-9 sm:w-12 sm:h-12"
          />
          <span className="flex flex-col leading-tight">
            <span
              className="text-white font-extrabold text-base sm:text-xl tracking-tight"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Laramatak
            </span>
            <span className="text-white/75 text-[10px] sm:text-xs tracking-widest uppercase">
              Child Initiative
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-150 whitespace-nowrap"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop donate button */}
        <a
          href="/donate"
          className="hidden md:inline-flex items-center px-4 lg:px-5 py-2 lg:py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-200 shrink-0"
          style={{ background: "#4BB3E6" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#E63946")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#4BB3E6")}
        >
          Donate Now
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-150"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg
            className="w-6 h-6 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu — animated slide down */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: menuOpen ? "400px" : "0px",
          opacity: menuOpen ? 1 : 0,
          background: "#1F7A4C",
        }}
      >
        <ul className="flex flex-col px-4 sm:px-6 pt-2 pb-6 gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="block py-2.5 px-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg text-base font-medium transition-colors duration-150"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="mt-3">
            <a
              href="/donate"
              className="inline-flex w-full justify-center px-5 py-3 rounded-full text-white text-sm font-semibold transition-colors duration-200"
              style={{ background: "#4BB3E6" }}
              onClick={() => setMenuOpen(false)}
            >
              Donate Now
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
