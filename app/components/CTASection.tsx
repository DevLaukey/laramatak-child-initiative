"use client";

export default function CTASection() {
  return (
    <section
      className="py-24 px-6 text-center"
      style={{ background: "#4BB3E6" }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Are You Passionate About
          <br />
          Changing a Nomadic Child&rsquo;s Life?
        </h2>
        <p
          className="text-white/90 text-lg mb-10 leading-relaxed"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Partner with us today. Together we can secure and transform the future
          of nomad communities in Samburu through quality education.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center px-10 py-4 rounded-full font-bold text-lg transition-all duration-200"
          style={{
            background: "#ffffff",
            color: "#1F7A4C",
            fontFamily: "var(--font-montserrat)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#E63946";
            (e.currentTarget as HTMLElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#ffffff";
            (e.currentTarget as HTMLElement).style.color = "#1F7A4C";
          }}
        >
          Talk to Us
        </a>
      </div>
    </section>
  );
}
