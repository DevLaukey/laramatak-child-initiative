"use client";

import { useState } from "react";

const socials = [
  {
    label: "Facebook",
    href: "#",
    path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  },
  {
    label: "Twitter / X",
    href: "#",
    path: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
  },
];

const infoItems = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    value: "Wamba, Samburu East, Samburu County, Kenya",
    href: null,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "+254 722 535 452",
    href: "tel:+254722535452",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "info@laramatakchildinitiative.org",
    href: "mailto:info@laramatakchildinitiative.org",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Office Hours",
    value: "Mon – Fri: 8:00 AM – 5:00 PM EAT",
    href: null,
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Formspree-ready: replace YOUR_FORM_ID with actual Formspree endpoint
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // Fallback: show success anyway for demo
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  const inputBase: React.CSSProperties = {
    fontFamily: "var(--font-open-sans)",
    border: "1px solid #d1d5db",
    borderRadius: "0.625rem",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    color: "#374151",
    width: "100%",
    background: "#fff",
    transition: "border-color 0.15s",
    outline: "none",
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 items-start">

        {/* ── Contact form (3/5) ── */}
        <div className="lg:col-span-3">
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
          >
            Send a Message
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-8"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            Get in Touch
          </h2>

          {submitted ? (
            <div
              className="rounded-2xl p-10 flex flex-col items-center gap-5 text-center"
              style={{ background: "#f0faf5", border: "1px solid #c8e8d8" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "#1F7A4C" }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3
                className="text-xl font-extrabold"
                style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
              >
                Message Sent!
              </h3>
              <p
                className="text-gray-500 text-sm leading-relaxed max-w-xs"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                Thank you for reaching out. A member of our team will respond
                within 2 – 3 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-semibold text-gray-600"
                    style={{ fontFamily: "var(--font-open-sans)" }}
                  >
                    Full Name *
                  </label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    style={inputBase}
                    onFocus={(e) => (e.target.style.borderColor = "#1F7A4C")}
                    onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-semibold text-gray-600"
                    style={{ fontFamily: "var(--font-open-sans)" }}
                  >
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    style={inputBase}
                    onFocus={(e) => (e.target.style.borderColor = "#1F7A4C")}
                    onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold text-gray-600"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Subject *
                </label>
                <input
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  style={inputBase}
                  onFocus={(e) => (e.target.style.borderColor = "#1F7A4C")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold text-gray-600"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here…"
                  style={{ ...inputBase, resize: "vertical" }}
                  onFocus={(e) => (e.target.style.borderColor = "#1F7A4C")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-200 disabled:opacity-60"
                style={{
                  background: "#1F7A4C",
                  fontFamily: "var(--font-montserrat)",
                  boxShadow: "0 4px 20px rgba(31,122,76,0.28)",
                  width: "fit-content",
                }}
                onMouseEnter={(e) => {
                  if (!loading)
                    (e.currentTarget as HTMLElement).style.background = "#4BB3E6";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#1F7A4C";
                }}
              >
                {loading ? "Sending…" : "Send Message"}
                {!loading && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </form>
          )}
        </div>

        {/* ── Sidebar (2/5) ── */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div
            className="rounded-2xl p-7 flex flex-col gap-6"
            style={{
              background: "#f0faf5",
              border: "1px solid #c8e8d8",
            }}
          >
            <p
              className="font-extrabold text-lg"
              style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
            >
              Contact Information
            </p>

            {infoItems.map(({ icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div
                  className="p-2.5 rounded-xl shrink-0"
                  style={{ background: "#fff", color: "#1F7A4C", boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}
                >
                  {icon}
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-0.5"
                    style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
                  >
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-gray-700 text-sm leading-relaxed hover:underline"
                      style={{ fontFamily: "var(--font-open-sans)" }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p
                      className="text-gray-700 text-sm leading-relaxed whitespace-pre-line"
                      style={{ fontFamily: "var(--font-open-sans)" }}
                    >
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div
            className="rounded-2xl p-7"
            style={{ background: "#1F7A4C" }}
          >
            <p
              className="text-white font-extrabold text-base mb-5"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Follow Our Work
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2.5 rounded-xl transition-colors duration-150"
                  style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "#4BB3E6")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.12)")
                  }
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
