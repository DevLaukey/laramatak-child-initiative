const team = [
  {
    name: "Felix Lemantile",
    role: "The Director",
    bio: "Born into a pastoral family in northern Kenya, Felix's life was transformed by education. Having completed his studies up to master's level, he founded LCI to give pastoralist children in Samburu the same opportunity he received.",
    photo: "/images/felix.jpg",
  },
  {
    name: "Mathew Laigwanani",
    role: "Assistant Director & Community Liaison",
    bio: "Mathew bridges LCI and the Samburu community, working closely with local families, elders, and the county government to ensure the initiative's programmes are grounded in community needs.",
    photo: "/images/mathew-team.jpg",
  },
  {
    name: "Ulf Spendrup",
    role: "Founding Partner",
    bio: "Since 2014, Ulf has served as Felix's guardian and champion. Driven by a deep commitment to education, he embraced Felix's vision for LCI and pledged his support to bring quality schooling to pastoralist children in remote Samburu.",
    photo: "/images/ulf-team.jpg",
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
            LCI is led by people who believe deeply in education as the most
            powerful tool for transforming nomadic communities in Samburu.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
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
                  className="w-full h-96 object-cover object-top"
                />
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3
                  className="text-base font-bold leading-snug"
                  style={{
                    color: "#1F7A4C",
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  {member.name}
                </h3>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{
                    color: "#4BB3E6",
                    fontFamily: "var(--font-open-sans)",
                  }}
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
