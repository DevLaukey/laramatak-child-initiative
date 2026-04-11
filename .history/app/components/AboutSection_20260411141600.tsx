"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
          >
            Who We Are
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            Education Is the Only
            <br />
            Tool That Can Free a Nation
          </h2>
          <p
            className="text-gray-600 text-base leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Laramatak Child Initiative seeks to promote the education of
            pastoralist children, who often find it challenging to attend school
            due to the long distances to learning centres, lack of motivation,
            and lack of awareness of the importance of education. We collaborate
            with the local county government of Samburu and other stakeholders
            to contribute to SDG No. 4 — Quality Education.
          </p>
          <p
            className="text-gray-600 text-base leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Due to the effects of climate change, pastoralism has become an
            unsustainable form of livelihood. LCI believes that education is the
            only way to ensure the safety and security of these communities and
            to combat early marriage, school dropout, menstrual shame, and the
            marginalisation of women.
          </p>
          <a
            href="/about"
            className="inline-flex items-center gap-2 font-semibold text-base transition-colors duration-150"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#4BB3E6")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#1F7A4C")
            }
          >
            Learn More
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        {/* Image */}
        <div className="relative">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 8px 40px rgba(31,122,76,0.15)" }}
          >
            <Image
              src="/teacher-children.jpg"
              alt="Teacher with children in a rural Kenya classroom"
              width={300}
              height={200}
              className="w-full h-80 object-cover"
            />
          </div>
          {/* Decorative accent */}
          <div
            className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl -z-10"
            style={{ background: "#4BB3E6", opacity: 0.25 }}
          />
          <div
            className="absolute -top-4 -right-4 w-16 h-16 rounded-xl -z-10"
            style={{ background: "#1F7A4C", opacity: 0.2 }}
          />
        </div>
      </div>
    </section>
  );
}
