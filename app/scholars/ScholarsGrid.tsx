"use client";

import Link from "next/link";
import { useState } from "react";

/* ── Scholar data ────────────────────────────────────────────── */
export type Scholar = {
  id: string;
  name: string;
  age: number;
  grade: string;
  location: string;
  story: string;
  goal: string;
  sponsored: boolean;
  avatarColor: string;
  initials: string;
  joinedYear: number;
};

const scholars: Scholar[] = [
  {
    id: "amina-wanjiku",
    name: "Amina Wanjiku",
    age: 10,
    grade: "Grade 4",
    location: "Samburu County",
    story:
      "Amina walks 6 km to school every day, never missing a class. She dreams of becoming a doctor to serve her community.",
    goal: "Secondary school fees",
    sponsored: false,
    avatarColor: "#1F7A4C",
    initials: "AW",
    joinedYear: 2023,
  },
  {
    id: "brian-otieno",
    name: "Brian Otieno",
    age: 13,
    grade: "Grade 7",
    location: "Kisumu County",
    story:
      "Brian is a gifted mathematician who tutors younger children after school. He wants to study engineering at university.",
    goal: "Books & school supplies",
    sponsored: true,
    avatarColor: "#4BB3E6",
    initials: "BO",
    joinedYear: 2022,
  },
  {
    id: "faith-chebet",
    name: "Faith Chebet",
    age: 8,
    grade: "Grade 2",
    location: "Uasin Gishu County",
    story:
      "Faith is the youngest of five siblings. Despite hardship at home, she arrives at school every morning with a bright smile.",
    goal: "Uniform & school fees",
    sponsored: false,
    avatarColor: "#E63946",
    initials: "FC",
    joinedYear: 2024,
  },
  {
    id: "john-kimani",
    name: "John Kimani",
    age: 15,
    grade: "Form 2",
    location: "Murang'a County",
    story:
      "John lost both parents at 12 but kept his grades at the top of his class. He aspires to be a software engineer.",
    goal: "High school tuition",
    sponsored: false,
    avatarColor: "#f59e0b",
    initials: "JK",
    joinedYear: 2022,
  },
  {
    id: "grace-achieng",
    name: "Grace Achieng",
    age: 11,
    grade: "Grade 5",
    location: "Homa Bay County",
    story:
      "Grace loves writing poetry and reading. Her teacher says she has a rare gift for language and storytelling.",
    goal: "Books & reading materials",
    sponsored: true,
    avatarColor: "#8b5cf6",
    initials: "GA",
    joinedYear: 2023,
  },
  {
    id: "peter-mutua",
    name: "Peter Mutua",
    age: 9,
    grade: "Grade 3",
    location: "Machakos County",
    story:
      "Peter helps his grandmother farm every evening yet still completes all his homework. He wants to be a teacher one day.",
    goal: "School meals & supplies",
    sponsored: false,
    avatarColor: "#06b6d4",
    initials: "PM",
    joinedYear: 2024,
  },
  {
    id: "stella-njeri",
    name: "Stella Njeri",
    age: 14,
    grade: "Form 1",
    location: "Nyeri County",
    story:
      "Stella scored in the top 2% of her primary school national exam but nearly missed high school due to lack of fees.",
    goal: "Full secondary sponsorship",
    sponsored: false,
    avatarColor: "#ec4899",
    initials: "SN",
    joinedYear: 2023,
  },
  {
    id: "daniel-omondi",
    name: "Daniel Omondi",
    age: 12,
    grade: "Grade 6",
    location: "Siaya County",
    story:
      "Daniel is passionate about science and has won two regional science fairs. His family cannot afford secondary school.",
    goal: "Science kits & tuition",
    sponsored: true,
    avatarColor: "#10b981",
    initials: "DO",
    joinedYear: 2022,
  },
];

/* ── Filter options ──────────────────────────────────────────── */
type FilterType = "all" | "needs-sponsor" | "sponsored";

export default function ScholarsGrid() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered =
    filter === "all"
      ? scholars
      : filter === "needs-sponsor"
      ? scholars.filter((s) => !s.sponsored)
      : scholars.filter((s) => s.sponsored);

  return (
    <section id="scholars" className="py-16 px-6" style={{ background: "#f9fafb" }}>
      <div className="max-w-7xl mx-auto">

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
            >
              Our Scholars
            </h2>
            <p
              className="text-gray-500 text-sm mt-1"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              {filtered.length} scholar{filtered.length !== 1 ? "s" : ""} shown
            </p>
          </div>

          <div
            className="flex rounded-xl overflow-hidden"
            style={{ border: "2px solid #e5e7eb" }}
          >
            {(
              [
                { key: "all", label: "All" },
                { key: "needs-sponsor", label: "Needs Sponsor" },
                { key: "sponsored", label: "Sponsored" },
              ] as { key: FilterType; label: string }[]
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="px-5 py-2.5 text-xs font-bold transition-all duration-150"
                style={{
                  background: filter === key ? "#1F7A4C" : "#fff",
                  color: filter === key ? "#fff" : "#6b7280",
                  fontFamily: "var(--font-montserrat)",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((scholar) => (
            <ScholarCard key={scholar.id} scholar={scholar} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p
            className="text-gray-500 text-sm mb-4"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Want to make a general donation instead?
          </p>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white text-sm font-bold transition-all duration-200"
            style={{
              background: "#4BB3E6",
              fontFamily: "var(--font-montserrat)",
              boxShadow: "0 6px 24px rgba(75,179,230,0.3)",
            }}
          >
            Donate to the General Fund
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Individual card ─────────────────────────────────────────── */
function ScholarCard({ scholar }: { scholar: Scholar }) {
  const donateUrl = `/donate?scholar=${encodeURIComponent(scholar.name)}&id=${scholar.id}`;

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col bg-white"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
    >
      {/* Avatar banner */}
      <div
        className="relative flex items-center justify-center"
        style={{ background: scholar.avatarColor, height: "140px" }}
      >
        {/* Initials avatar */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-extrabold border-4 border-white/30"
          style={{
            background: "rgba(255,255,255,0.2)",
            fontFamily: "var(--font-montserrat)",
          }}
        >
          {scholar.initials}
        </div>

        {/* Sponsored badge */}
        {scholar.sponsored && (
          <span
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{
              background: "rgba(255,255,255,0.95)",
              color: "#1F7A4C",
              fontFamily: "var(--font-montserrat)",
            }}
          >
            Sponsored
          </span>
        )}

        {/* Year badge */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{
            background: "rgba(0,0,0,0.25)",
            color: "#fff",
            fontFamily: "var(--font-open-sans)",
          }}
        >
          Since {scholar.joinedYear}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3
            className="text-base font-extrabold text-gray-900"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {scholar.name}
          </h3>
          <div
            className="flex items-center gap-2 mt-1 text-xs text-gray-500"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            <span>{scholar.age} yrs</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{scholar.grade}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{scholar.location}</span>
          </div>
        </div>

        <p
          className="text-sm text-gray-600 leading-relaxed flex-1"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          {scholar.story}
        </p>

        {/* Goal chip */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: "#f0faf5" }}
        >
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="#1F7A4C" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span
            className="text-xs text-gray-600"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            <strong className="text-gray-800">Needs:</strong> {scholar.goal}
          </span>
        </div>

        {/* CTA */}
        {scholar.sponsored ? (
          <div
            className="w-full py-3 rounded-xl text-center text-xs font-semibold"
            style={{
              background: "#f3f4f6",
              color: "#9ca3af",
              fontFamily: "var(--font-montserrat)",
            }}
          >
            Currently Sponsored
          </div>
        ) : (
          <Link
            href={donateUrl}
            className="scholar-support-btn w-full py-3 rounded-xl text-center text-sm font-bold text-white transition-all duration-200 block"
            style={{
              fontFamily: "var(--font-montserrat)",
            }}
          >
            Support {scholar.name.split(" ")[0]}
          </Link>
        )}
      </div>
    </div>
  );
}
