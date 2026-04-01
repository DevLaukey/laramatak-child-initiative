"use client";

const impacts = [
  { icon: "📚", desc: "Provides school supplies for one child for a full term" },
  { icon: "🍽️", desc: "Feeds a child with a nutritious meal every school day" },
  { icon: "🎓", desc: "Sponsors a child's education — fees, uniform & books" },
  { icon: "🏫", desc: "Equips a classroom with learning materials for a year" },
];

const steps = [
  { n: "1", text: "Open M-Pesa on your phone and select Lipa Na M-PESA." },
  { n: "2", text: "Choose Pay Bill." },
  { n: "3", text: <span>Enter business number: <strong style={{ color: "#1F7A4C" }}>303030</strong></span> },
  { n: "4", text: <span>Enter account number: <strong style={{ color: "#1F7A4C" }}>2052212386</strong> (Absa Bank — Laramatak Child Initiative)</span> },
  { n: "5", text: "Input the amount you want to donate." },
  { n: "6", text: "Enter your M-Pesa PIN and confirm the transaction." },
  { n: "7", text: "You're done — thank you for your generosity!" },
];

const details = [
  { label: "Business No.", value: "303030" },
  { label: "Account No.", value: "2052212386" },
  { label: "Bank", value: "Absa Bank Kenya PLC" },
  { label: "Branch", value: "Isiolo" },
];

export default function DonationForm() {
  return (
    <section className="py-16 px-6" style={{ background: "#f9fafb" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10 items-start">

        {/* ── Main panel ── */}
        <div
          className="lg:col-span-2 rounded-2xl p-8 flex flex-col gap-8 bg-white"
          style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.07)" }}
        >

          {/* M-Pesa brand header */}
          <div
            className="rounded-xl px-6 py-5 flex items-center gap-5"
            style={{ background: "#e8f5e9", border: "2px solid #4CAF50" }}
          >
            {/* M-Pesa wordmark badge */}
            <div
              className="shrink-0 flex items-center justify-center rounded-xl px-4 py-2"
              style={{ background: "#4CAF50" }}
            >
              <span
                className="text-white font-extrabold text-lg tracking-tight"
                style={{ fontFamily: "var(--font-montserrat)", letterSpacing: "-0.02em" }}
              >
                M-PESA
              </span>
            </div>
            <div>
              <p
                className="font-extrabold text-base"
                style={{ color: "#1b5e20", fontFamily: "var(--font-montserrat)" }}
              >
                Pay via Safaricom M-Pesa
              </p>
              <p
                className="text-sm mt-0.5"
                style={{ color: "#2e7d32", fontFamily: "var(--font-open-sans)" }}
              >
                Fast, secure, and straight from your phone — no redirect needed.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
            >
              How to donate
            </p>
            <ol className="flex flex-col gap-4">
              {steps.map(({ n, text }) => (
                <li key={n} className="flex items-start gap-4">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-extrabold shrink-0"
                    style={{ background: "#4CAF50", fontFamily: "var(--font-montserrat)" }}
                  >
                    {n}
                  </span>
                  <p
                    className="text-sm text-gray-600 leading-snug pt-1.5"
                    style={{ fontFamily: "var(--font-open-sans)" }}
                  >
                    {text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Payment details card */}
          <div
            className="rounded-xl p-6 grid grid-cols-2 gap-5"
            style={{ background: "#fff", border: "2px solid #c8e8d8" }}
          >
            <div className="col-span-2">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
              >
                Payment Details
              </p>
            </div>
            {details.map(({ label, value }) => (
              <div key={label}>
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#4BB3E6", fontFamily: "var(--font-montserrat)" }}
                >
                  {label}
                </p>
                <p
                  className="text-base font-extrabold mt-0.5"
                  style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Confirmation note */}
          <div
            className="rounded-xl px-5 py-4 flex items-start gap-3"
            style={{ background: "#f0faf5", border: "1px solid #c8e8d8" }}
          >
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="#1F7A4C" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p
              className="text-xs text-gray-600 leading-relaxed"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              After sending, please email us at{" "}
              <a
                href="mailto:info@laramatakchildinitiative.org"
                style={{ color: "#1F7A4C", fontWeight: 600 }}
              >
                info@laramatakchildinitiative.org
              </a>{" "}
              with your name and M-Pesa transaction code so we can confirm and acknowledge your gift.
            </p>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="flex flex-col gap-5">

          {/* M-Pesa visual */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 4px 24px rgba(76,175,80,0.15)" }}
          >
            <div
              className="px-6 py-5 flex items-center gap-3"
              style={{ background: "#4CAF50" }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <div>
                <p
                  className="text-white font-extrabold text-base"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Safaricom M-Pesa
                </p>
                <p
                  className="text-white/75 text-xs mt-0.5"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Lipa Na M-PESA · Pay Bill
                </p>
              </div>
            </div>
            <div
              className="px-6 py-5 flex flex-col gap-3"
              style={{ background: "#fff", border: "1px solid #e8f5ef" }}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400" style={{ fontFamily: "var(--font-open-sans)" }}>Business No.</span>
                <span className="text-sm font-extrabold" style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}>303030</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400" style={{ fontFamily: "var(--font-open-sans)" }}>Account No.</span>
                <span className="text-sm font-extrabold" style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}>2052212386</span>
              </div>
              <div style={{ borderTop: "1px solid #e8f5ef", paddingTop: "0.75rem" }}>
                <span className="text-xs text-gray-400" style={{ fontFamily: "var(--font-open-sans)" }}>Account Name</span>
                <p className="text-sm font-semibold mt-0.5" style={{ color: "#374151", fontFamily: "var(--font-montserrat)" }}>
                  Laramatak Child Initiative
                </p>
              </div>
            </div>
          </div>

          {/* Your impact */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 4px 24px rgba(31,122,76,0.1)" }}
          >
            <div className="px-6 py-5" style={{ background: "#1F7A4C" }}>
              <p
                className="text-white font-extrabold text-base"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Your Impact
              </p>
              <p
                className="text-white/70 text-xs mt-0.5"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                Every contribution changes a life
              </p>
            </div>
            <div className="bg-white flex flex-col divide-y divide-gray-100">
              {impacts.map(({ icon, desc }) => (
                <div key={desc} className="px-5 py-4 flex items-start gap-3">
                  <span className="text-xl shrink-0">{icon}</span>
                  <p
                    className="text-xs text-gray-600 leading-relaxed"
                    style={{ fontFamily: "var(--font-open-sans)" }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Thanks note */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "#E63946", boxShadow: "0 4px 20px rgba(230,57,70,0.25)" }}
          >
            <p
              className="text-white font-extrabold text-base mb-1"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Thanks for being our hero.
            </p>
            <p
              className="text-white/85 text-xs leading-relaxed"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              Your generosity directly funds education, meals, and scholarships for pastoralist children in Samburu.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
