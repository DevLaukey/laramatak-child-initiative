"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

/* ── Impact sidebar data ─────────────────────────────────────── */
const impacts = [
  {
    amount: 25,
    label: "$25",
    icon: "📚",
    desc: "Provides school supplies for one child for a full term",
  },
  {
    amount: 50,
    label: "$50",
    icon: "🍽️",
    desc: "Feeds a family with nutritious food parcels for a month",
  },
  {
    amount: 100,
    label: "$100",
    icon: "🎓",
    desc: "Sponsors a child's education — fees, uniform & books — for a term",
  },
  {
    amount: 250,
    label: "$250",
    icon: "🏫",
    desc: "Equips an entire classroom with learning materials for a year",
  },
];

const suggestedAmounts = [25, 50, 100, 250];

const designations = [
  "General Fund (Greatest Need)",
  "Education Support",
  "Nutrition & Feeding",
  "Child Protection",
  "Girls Empowerment",
  "Sponsor a Child",
];

const monthlyBenefits = [
  "Sustained, predictable impact year-round",
  "Monthly update on how your gift is used",
  "Exclusive donor impact newsletter",
  "Easy to pause or cancel anytime",
];

/* ── Payment method tab icons ───────────────────────────────── */
function CardIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}
function PayPalIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function MpesaIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

type PayMethod = "card" | "paypal" | "mpesa";

export default function DonationForm() {
  const searchParams = useSearchParams();
  const scholarName = searchParams.get("scholar");

  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [selected, setSelected] = useState<number | null>(25);
  const [custom, setCustom] = useState("");
  const [payMethod, setPayMethod] = useState<PayMethod>("card");
  const [designation, setDesignation] = useState(
    scholarName ? "Sponsor a Child" : designations[0]
  );
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [mpesa, setMpesa] = useState({ phone: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (scholarName) setDesignation("Sponsor a Child");
  }, [scholarName]);

  const displayAmount = custom ? `$${custom}` : selected ? `$${selected}` : "$–";

  const activeAmount = custom ? Number(custom) : selected;
  const activeImpact = impacts.find((i) => i.amount === activeAmount) ?? null;

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  /* ── Shared pill style helper ───────────────────────────── */
  function pillStyle(active: boolean): React.CSSProperties {
    return {
      background: active ? "#1F7A4C" : "#fff",
      color: active ? "#fff" : "#374151",
      border: `2px solid ${active ? "#1F7A4C" : "#d1d5db"}`,
      borderRadius: "0.625rem",
      padding: "0.6rem 0",
      fontFamily: "var(--font-montserrat)",
      fontSize: "0.9rem",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.15s",
      width: "100%",
    };
  }

  if (submitted) {
    return (
      <section className="py-20 px-6 bg-white">
        <div className="max-w-lg mx-auto text-center flex flex-col items-center gap-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "#f0faf5" }}
          >
            <svg className="w-10 h-10" fill="none" stroke="#1F7A4C" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2
            className="text-3xl font-extrabold"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            Thank You, {form.name || "Friend"}!
          </h2>
          <p
            className="text-gray-500 text-base leading-relaxed"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Your donation of{" "}
            <strong style={{ color: "#1F7A4C" }}>{displayAmount}</strong>{" "}
            {frequency === "monthly" ? "per month " : ""}
            {scholarName ? (
              <>
                will go directly to support{" "}
                <strong style={{ color: "#1F7A4C" }}>{scholarName}</strong>'s
                education.{" "}
              </>
            ) : (
              "is on its way to transforming a child's life in rural Kenya. "
            )}
            A receipt has been sent to{" "}
            <strong>{form.email || "your email"}</strong>.
          </p>
          <a
            href="/"
            className="px-8 py-3.5 rounded-full font-semibold text-sm text-white"
            style={{ background: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            Back to Home
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6" style={{ background: "#f9fafb" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10 items-start">

        {/* ════════════════════ FORM (2/3) ════════════════════ */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 rounded-2xl p-8 flex flex-col gap-8 bg-white"
          style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.07)" }}
        >

          {/* ── Scholar banner (shown when arriving from scholars page) ── */}
          {scholarName && (
            <div
              className="flex items-start gap-4 rounded-xl p-4"
              style={{ background: "#f0faf5", border: "1px solid #c8e8d8" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white text-sm font-extrabold"
                style={{ background: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
              >
                {scholarName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="flex flex-col gap-0.5">
                <p
                  className="text-sm font-extrabold"
                  style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
                >
                  You are sponsoring {scholarName}
                </p>
                <p
                  className="text-xs text-gray-500 leading-snug"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  Your donation will be directed to support {scholarName.split(" ")[0]}'s
                  education directly. Thank you for making a difference.
                </p>
              </div>
              <a
                href="/scholars"
                className="ml-auto text-xs font-semibold shrink-0"
                style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
              >
                Change
              </a>
            </div>
          )}

          {/* ── 1. Frequency ── */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
            >
              Giving Frequency
            </p>
            <div
              className="flex rounded-xl overflow-hidden"
              style={{ border: "2px solid #e5e7eb" }}
            >
              {(["once", "monthly"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  className="flex-1 py-3 text-sm font-bold transition-all duration-150"
                  style={{
                    background: frequency === f ? "#1F7A4C" : "#fff",
                    color: frequency === f ? "#fff" : "#6b7280",
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  {f === "once" ? "One-Time" : "Monthly"}
                  {f === "monthly" && (
                    <span
                      className="ml-2 px-1.5 py-0.5 rounded text-xs"
                      style={{
                        background: frequency === "monthly" ? "#4BB3E6" : "#e5e7eb",
                        color: frequency === "monthly" ? "#fff" : "#6b7280",
                        fontFamily: "var(--font-open-sans)",
                      }}
                    >
                      Most Impact
                    </span>
                  )}
                </button>
              ))}
            </div>

            {frequency === "monthly" && (
              <div
                className="mt-4 rounded-xl p-4 flex flex-col gap-2"
                style={{ background: "#f0faf5", border: "1px solid #c8e8d8" }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
                >
                  Monthly Donor Benefits
                </p>
                {monthlyBenefits.map((b) => (
                  <div key={b} className="flex items-start gap-2">
                    <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" stroke="#1F7A4C" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span
                      className="text-xs text-gray-600"
                      style={{ fontFamily: "var(--font-open-sans)" }}
                    >
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── 2. Amount ── */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
            >
              Select Amount
            </p>
            <div className="grid grid-cols-4 gap-3 mb-3">
              {suggestedAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => { setSelected(amt); setCustom(""); }}
                  style={pillStyle(selected === amt && !custom)}
                >
                  ${amt}
                </button>
              ))}
            </div>
            <div className="relative">
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                $
              </span>
              <input
                type="number"
                min="1"
                placeholder="Custom amount"
                value={custom}
                onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
                style={{ ...inputBase, paddingLeft: "2rem" }}
                onFocus={(e) => (e.target.style.borderColor = "#1F7A4C")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
              />
            </div>
          </div>

          {/* ── 3. Designation ── */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
            >
              Donation Designation
              <span
                className="ml-2 normal-case font-normal text-gray-400"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                (optional)
              </span>
            </p>
            <select
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              style={{ ...inputBase, appearance: "none" as const }}
              onFocus={(e) => (e.target.style.borderColor = "#1F7A4C")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            >
              {designations.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* ── 4. Donor information ── */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
            >
              Your Information
            </p>
            <div className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500" style={{ fontFamily: "var(--font-open-sans)" }}>
                    Full Name *
                  </label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="Jane Doe"
                    style={inputBase}
                    onFocus={(e) => (e.target.style.borderColor = "#1F7A4C")}
                    onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500" style={{ fontFamily: "var(--font-open-sans)" }}>
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleFormChange}
                    placeholder="you@example.com"
                    style={inputBase}
                    onFocus={(e) => (e.target.style.borderColor = "#1F7A4C")}
                    onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500" style={{ fontFamily: "var(--font-open-sans)" }}>
                  Address (for receipt)
                </label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleFormChange}
                  placeholder="Street, City, Country"
                  style={inputBase}
                  onFocus={(e) => (e.target.style.borderColor = "#1F7A4C")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>
            </div>
          </div>

          {/* ── 5. Payment method ── */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
            >
              Payment Method
            </p>

            {/* Tabs */}
            <div className="flex gap-3 mb-5">
              {(
                [
                  { id: "card", label: "Credit Card", Icon: CardIcon },
                  { id: "paypal", label: "PayPal", Icon: PayPalIcon },
                  { id: "mpesa", label: "M-Pesa", Icon: MpesaIcon },
                ] as { id: PayMethod; label: string; Icon: () => JSX.Element }[]
              ).map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPayMethod(id)}
                  className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl text-xs font-semibold transition-all duration-150"
                  style={{
                    background: payMethod === id ? "#1F7A4C" : "#fff",
                    color: payMethod === id ? "#fff" : "#6b7280",
                    border: `2px solid ${payMethod === id ? "#1F7A4C" : "#e5e7eb"}`,
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  <Icon />
                  {label}
                </button>
              ))}
            </div>

            {/* Card fields */}
            {payMethod === "card" && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500" style={{ fontFamily: "var(--font-open-sans)" }}>
                    Card Number
                  </label>
                  <input
                    value={card.number}
                    onChange={(e) => setCard((p) => ({ ...p, number: e.target.value }))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    style={inputBase}
                    onFocus={(e) => (e.target.style.borderColor = "#1F7A4C")}
                    onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500" style={{ fontFamily: "var(--font-open-sans)" }}>
                      Expiry (MM/YY)
                    </label>
                    <input
                      value={card.expiry}
                      onChange={(e) => setCard((p) => ({ ...p, expiry: e.target.value }))}
                      placeholder="MM/YY"
                      maxLength={5}
                      style={inputBase}
                      onFocus={(e) => (e.target.style.borderColor = "#1F7A4C")}
                      onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500" style={{ fontFamily: "var(--font-open-sans)" }}>
                      CVV
                    </label>
                    <input
                      value={card.cvv}
                      onChange={(e) => setCard((p) => ({ ...p, cvv: e.target.value }))}
                      placeholder="•••"
                      maxLength={4}
                      type="password"
                      style={inputBase}
                      onFocus={(e) => (e.target.style.borderColor = "#1F7A4C")}
                      onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                    />
                  </div>
                </div>
              </div>
            )}

            {payMethod === "paypal" && (
              <div
                className="rounded-xl p-6 text-center flex flex-col items-center gap-3"
                style={{ background: "#f0f8fe", border: "1px solid #bde0f5" }}
              >
                <svg className="w-10 h-10" fill="none" stroke="#4BB3E6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p
                  className="text-sm text-gray-600"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  You will be redirected to PayPal to complete your donation
                  securely after clicking the button below.
                </p>
              </div>
            )}

            {payMethod === "mpesa" && (
              <div className="flex flex-col gap-4">
                <div
                  className="rounded-xl p-4 flex items-start gap-3"
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
                    Enter your Safaricom M-Pesa number below. You will receive a
                    push notification to confirm your payment.
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500" style={{ fontFamily: "var(--font-open-sans)" }}>
                    M-Pesa Phone Number *
                  </label>
                  <input
                    value={mpesa.phone}
                    onChange={(e) => setMpesa({ phone: e.target.value })}
                    placeholder="+254 7XX XXX XXX"
                    style={inputBase}
                    onFocus={(e) => (e.target.style.borderColor = "#1F7A4C")}
                    onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── Security note ── */}
          <div
            className="flex items-center gap-3 rounded-xl px-5 py-4"
            style={{ background: "#f0faf5", border: "1px solid #c8e8d8" }}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="#1F7A4C" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p
              className="text-xs text-gray-600 leading-snug"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              Your payment is protected by{" "}
              <strong className="text-gray-700">256-bit SSL encryption</strong>.
              We never store your card details. Transactions are processed
              securely via Stripe / PayPal / Safaricom.
            </p>
          </div>

          {/* ── Submit ── */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 py-4 rounded-full font-extrabold text-base text-white transition-all duration-200"
            style={{
              background: "#1F7A4C",
              fontFamily: "var(--font-montserrat)",
              boxShadow: "0 6px 24px rgba(31,122,76,0.35)",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#E63946")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#1F7A4C")
            }
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Complete Donation — {displayAmount}
            {frequency === "monthly" ? "/mo" : ""}
          </button>
        </form>

        {/* ════════════════════ SIDEBAR (1/3) ════════════════════ */}
        <div className="flex flex-col gap-5">
          {/* Impact preview */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 4px 24px rgba(31,122,76,0.1)" }}
          >
            <div
              className="px-6 py-5"
              style={{ background: "#1F7A4C" }}
            >
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
                See what your gift makes possible
              </p>
            </div>

            <div className="bg-white flex flex-col divide-y divide-gray-100">
              {impacts.map((item) => {
                const isActive = activeAmount === item.amount;
                return (
                  <div
                    key={item.amount}
                    className="px-5 py-4 flex items-start gap-4 transition-colors duration-150"
                    style={{ background: isActive ? "#f0faf5" : "#fff" }}
                  >
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <p
                        className="font-extrabold text-sm"
                        style={{
                          color: isActive ? "#1F7A4C" : "#374151",
                          fontFamily: "var(--font-montserrat)",
                        }}
                      >
                        {item.label}
                        {isActive && (
                          <span
                            className="ml-2 px-2 py-0.5 rounded text-xs font-bold"
                            style={{ background: "#1F7A4C", color: "#fff" }}
                          >
                            Selected
                          </span>
                        )}
                      </p>
                      <p
                        className="text-xs text-gray-500 mt-0.5 leading-relaxed"
                        style={{ fontFamily: "var(--font-open-sans)" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active impact callout */}
          {activeImpact && (
            <div
              className="rounded-2xl p-5 flex flex-col gap-2"
              style={{ background: "#E63946", boxShadow: "0 4px 20px rgba(230,57,70,0.25)" }}
            >
              <p
                className="text-white text-2xl font-extrabold"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {activeImpact.label} {activeImpact.icon}
              </p>
              <p
                className="text-white/85 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                {activeImpact.desc}
              </p>
            </div>
          )}

          {/* Trust badges */}
          <div
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{ background: "#fff", border: "1px solid #e8f5ef", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest text-gray-400"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Why Donors Trust LCI
            </p>
            {[
              "90% of funds go directly to programs",
              "Annual independent financial audit",
              "Registered nonprofit — Kenya",
              "256-bit SSL secure checkout",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2.5">
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="#1F7A4C" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span
                  className="text-xs text-gray-600 leading-snug"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  {t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
