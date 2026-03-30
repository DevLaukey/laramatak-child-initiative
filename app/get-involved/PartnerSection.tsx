"use client";

import { useState } from "react";

const partnerTypes = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    label: "Corporations",
    desc: "CSR partnerships, staff volunteering days, and cause marketing campaigns.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6-3.5l6 3.5 6-3.5" />
      </svg>
    ),
    label: "Schools & Universities",
    desc: "Student campaigns, exchange programs, and research partnerships.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    label: "Faith Communities",
    desc: "Churches, mosques, and faith groups driving community giving campaigns.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: "Foundations & NGOs",
    desc: "Grant partnerships, co-implementation, and capacity-sharing arrangements.",
  },
];

export default function PartnerSection() {
  const [form, setForm] = useState({
    name: "",
    org: "",
    email: "",
    type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputBase: React.CSSProperties = {
    fontFamily: "var(--font-open-sans)",
    border: "1px solid #d1d5db",
    borderRadius: "0.625rem",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    color: "#374151",
    width: "100%",
    outline: "none",
    background: "#fff",
    transition: "border-color 0.15s",
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
          >
            Institutional Partners
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            Partner With Us
          </h2>
          <p
            className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            We welcome organisations that share our commitment to child welfare.
            Together we can reach further, faster.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Partner types + benefits */}
          <div className="flex flex-col gap-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {partnerTypes.map(({ icon, label, desc }) => (
                <div
                  key={label}
                  className="rounded-xl p-5 flex flex-col gap-3"
                  style={{
                    background: "#f0faf5",
                    border: "1px solid #c8e8d8",
                  }}
                >
                  <div style={{ color: "#1F7A4C" }}>{icon}</div>
                  <p
                    className="font-bold text-sm"
                    style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-gray-500 text-xs leading-relaxed"
                    style={{ fontFamily: "var(--font-open-sans)" }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Benefits callout */}
            <div
              className="rounded-2xl p-7"
              style={{ background: "#1F7A4C" }}
            >
              <p
                className="text-white font-extrabold text-lg mb-4"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Partnership Benefits
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Co-branding and logo placement on LCI materials",
                  "Quarterly impact reports tailored to your contribution",
                  "Site visits to meet the children you support",
                  "Recognition in annual reports and social media",
                  "Staff volunteering opportunities in the field",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="#4BB3E6" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span
                      className="text-white/80 text-sm"
                      style={{ fontFamily: "var(--font-open-sans)" }}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact form */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "#fff",
              border: "1px solid #e8f5ef",
              boxShadow: "0 4px 32px rgba(31,122,76,0.09)",
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "#f0faf5" }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="#1F7A4C" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-extrabold"
                  style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
                >
                  Inquiry Received!
                </h3>
                <p
                  className="text-gray-500 text-sm leading-relaxed max-w-xs"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Thank you for your interest in partnering with LCI. Our team
                  will be in touch within 3 business days.
                </p>
              </div>
            ) : (
              <>
                <p
                  className="text-xl font-extrabold mb-6"
                  style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
                >
                  Partnership Inquiry
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="text-xs font-semibold text-gray-600"
                        style={{ fontFamily: "var(--font-open-sans)" }}
                      >
                        Your Name *
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
                        Organisation *
                      </label>
                      <input
                        name="org"
                        required
                        value={form.org}
                        onChange={handleChange}
                        placeholder="Organisation name"
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
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@organisation.org"
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
                      Partnership Type *
                    </label>
                    <select
                      name="type"
                      required
                      value={form.type}
                      onChange={handleChange}
                      style={{ ...inputBase, appearance: "none" as const }}
                      onFocus={(e) => (e.target.style.borderColor = "#1F7A4C")}
                      onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                    >
                      <option value="">Select a type…</option>
                      <option>Corporate Partner</option>
                      <option>School / University</option>
                      <option>Faith Community</option>
                      <option>Foundation / NGO</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-xs font-semibold text-gray-600"
                      style={{ fontFamily: "var(--font-open-sans)" }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how you'd like to partner with LCI…"
                      style={{ ...inputBase, resize: "vertical" }}
                      onFocus={(e) => (e.target.style.borderColor = "#1F7A4C")}
                      onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-200 mt-1"
                    style={{
                      background: "#1F7A4C",
                      fontFamily: "var(--font-montserrat)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "#4BB3E6")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "#1F7A4C")
                    }
                  >
                    Send Inquiry
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
