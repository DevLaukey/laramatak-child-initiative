const team = [
  {
    name: "Amina Wanjiku",
    role: "Executive Director & Founder",
    bio: "Born and raised in Laramatak, Amina founded LCI after witnessing children drop out of school to survive. She holds a degree in Social Work from the University of Nairobi.",
    photo:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
  },
  {
    name: "Joseph Otieno",
    role: "Programs Coordinator",
    bio: "Joseph oversees all four core programs and manages partnerships with local schools and county government offices. He brings 10 years of community development experience.",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
  },
  {
    name: "Grace Chebet",
    role: "Girls Empowerment Lead",
    bio: "Grace is a survivor-turned-advocate who leads LCI's girls empowerment program. She has trained over 300 girls in leadership, hygiene, and self-advocacy.",
    photo:
      "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=400&q=80",
  },
  {
    name: "David Mwangi",
    role: "Finance & Operations",
    bio: "A certified public accountant, David ensures every shilling is accounted for. His commitment to transparency has helped LCI maintain donor trust since 2018.",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
];

export default function TeamSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
          >
            The People Behind the Work
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            Meet Our Team
          </h2>
          <p
            className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            LCI is led by Kenyans who grew up in these communities and understand
            their challenges from the inside out.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                boxShadow: "0 2px 20px rgba(31,122,76,0.09)",
                border: "1px solid #e8f5ef",
              }}
            >
              <div className="overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-56 object-cover object-top"
                />
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3
                  className="text-base font-bold leading-snug"
                  style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
                >
                  {member.name}
                </h3>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
                >
                  {member.role}
                </span>
                <p
                  className="text-gray-500 text-xs leading-relaxed mt-1"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
