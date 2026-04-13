const ideas = [
  {
    emoji: "🎂",
    title: "Birthday Fundraiser",
    desc: "Ask friends and family to donate to LCI instead of buying you a gift. A small ask that adds up to big impact.",
  },
  {
    emoji: "🏃",
    title: "Sponsored Run or Walk",
    desc: "Sign up for a local race or organise your own walk-a-thon. Get sponsored per kilometre and watch the donations roll in.",
  },
  {
    emoji: "🍽️",
    title: "Charity Dinner or Bake Sale",
    desc: "Host a community meal or bake sale with proceeds going directly to LCI programs.",
  },
  {
    emoji: "🎮",
    title: "Gaming or Streaming Marathon",
    desc: "Live-stream a gaming session, podcast, or creative marathon and collect donations from your audience.",
  },
  {
    emoji: "📚",
    title: "Book or Clothing Drive",
    desc: "Collect used books, uniforms, or clothing in your school or workplace and ship them to LCI partner schools.",
  },
  {
    emoji: "💼",
    title: "Workplace Giving Campaign",
    desc: "Champion LCI at your office — set up a payroll giving scheme or organise a workplace challenge.",
  },
];

export default function FundraiseSection() {
  return (
    <section className="py-20 px-6" style={{ background: "#f0faf5" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
          >
            Fundraise for LCI
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            Start Your Own
            <br />
            Fundraising Campaign
          </h2>
          <p
            className="text-gray-500 max-w-lg mx-auto text-base leading-relaxed"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            You don't need to be a professional fundraiser to make a difference.
            Some of our biggest donations have come from everyday people with
            a creative idea and a big heart.
          </p>
        </div>

        {/* Ideas grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {ideas.map((idea) => (
            <div
              key={idea.title}
              className="bg-white rounded-2xl p-6 flex flex-col gap-3"
              style={{
                boxShadow: "0 2px 16px rgba(31,122,76,0.07)",
                border: "1px solid #e0f0e8",
              }}
            >
              <span className="text-3xl">{idea.emoji}</span>
              <p
                className="font-bold text-base"
                style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
              >
                {idea.title}
              </p>
              <p
                className="text-gray-500 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                {idea.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div
          className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: "#1F7A4C",
            boxShadow: "0 8px 40px rgba(31,122,76,0.22)",
          }}
        >
          <div className="text-center md:text-left">
            <p
              className="text-white text-xl font-extrabold mb-1"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Ready to start fundraising?
            </p>
            <p
              className="text-white/75 text-sm"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              Create your personal page in minutes and share it with your network.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="/fundraise/create"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-200"
              style={{
                background: "#4BB3E6",
                fontFamily: "var(--font-montserrat)",
              }}
            >
              Create a Fundraising Page
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="mailto:info@laramatakchildinitiative.org"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-semibold text-sm border-2 border-white/50 text-white transition-all duration-200"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Contact Us First
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
