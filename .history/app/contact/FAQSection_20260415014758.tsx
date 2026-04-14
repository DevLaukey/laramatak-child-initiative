"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How can I donate to Laramatak Child Initiative?",
    a: "You can donate online through our secure donation page — one-time or monthly. We accept card payments, mobile money (M-Pesa), and bank transfers. Visit our Donate page or click any 'Donate Now' button across the site.",
  },
  {
    q: "Is my donation tax-deductible?",
    a: "LCI is a registered nonprofit in Kenya. Donors based in Kenya may be eligible for tax relief under the Income Tax Act. International donors should check with their local tax authority regarding deductibility for foreign charitable giving. We provide donation receipts for all contributions.",
  },
  {
    q: "Can I visit the LCI projects in Kenya?",
    a: "Yes! We welcome donor visits, volunteer trips, and partner site visits. All visits are scheduled in advance and include a community orientation, child-safeguarding briefing, and guided tour of our programs. Contact us at info@laramatakchildinitiative.org to start planning your visit.",
  },
  {
    q: "How is my money used?",
    a: "90% of every donation goes directly to programs — education support, nutrition, child protection, and girls empowerment. Only 10% covers administrative and fundraising costs. We publish annual audited accounts on our Transparency page.",
  },
  {
    q: "Can I volunteer remotely?",
    a: "Absolutely. We have a range of remote volunteering roles including grant writing, social media, graphic design, curriculum development, and data analysis. Fill out our Volunteer Application form and indicate your preference for remote work.",
  },
  {
    q: "How do I get a donation receipt?",
    a: "A receipt is automatically emailed to you after every online donation. For bank transfers or M-Pesa payments, email info@laramatakchildinitiative.org with your payment confirmation and we'll issue a receipt within 48 hours.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 px-6" style={{ background: "#f0faf5" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
          >
            FAQ
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="rounded-xl overflow-hidden"
                style={{
                  background: "#fff",
                  border: isOpen ? "1px solid #1F7A4C" : "1px solid #e0f0e8",
                  boxShadow: isOpen
                    ? "0 4px 20px rgba(31,122,76,0.1)"
                    : "0 1px 6px rgba(0,0,0,0.04)",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-semibold text-sm md:text-base leading-snug"
                    style={{
                      color: isOpen ? "#1F7A4C" : "#374151",
                      fontFamily: "var(--font-montserrat)",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
                    style={{
                      background: isOpen ? "#1F7A4C" : "#f0faf5",
                      color: isOpen ? "#fff" : "#1F7A4C",
                    }}
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-300"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? "400px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.35s ease",
                  }}
                >
                  <p
                    className="px-6 pb-5 text-sm leading-relaxed text-gray-600"
                    style={{ fontFamily: "var(--font-open-sans)" }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p
          className="text-center text-gray-400 text-sm mt-10"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Still have questions?{" "}
          <a
            href="mailto:info@laramatakchildinitiative.org"
            className="font-semibold hover:underline"
            style={{ color: "#1F7A4C" }}
          >
            Email us directly
          </a>
          .
        </p>
      </div>
    </section>
  );
}
