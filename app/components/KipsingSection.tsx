const IMG = "/images/kipsing";

const mosaic = [
  {
    src: `${IMG}/33-open-air-classroom.jpeg`,
    caption: "Until now, lessons in Kipsing were held under an acacia tree.",
  },
  {
    src: `${IMG}/06-foundation-trenches.jpeg`,
    caption: "Foundations laid for the new classrooms",
  },
  {
    src: `${IMG}/21-cheering-pupils.jpeg`,
    caption: "The children who waited so long for a school",
  },
];

const journey = [
  {
    step: "Where it began",
    src: `${IMG}/29-makeshift-blackboard.jpeg`,
    caption:
      "A worn sheet of iron for a blackboard and a fallen log for a bench. This was school in Mlima Tatu.",
  },
  {
    step: "Breaking ground",
    src: `${IMG}/01-building-materials.jpeg`,
    caption:
      "Stone, timber, steel and a water tank were brought across the plains to this remote corner of Isiolo County.",
  },
  {
    step: "A new chapter",
    src: `${IMG}/16-hands-raised.jpeg`,
    caption:
      "Boys and girls of Kipsing ready for a proper roof over their heads and a place to learn and dream.",
  },
];

export default function KipsingSection() {
  return (
    <section className="py-20 px-6" style={{ background: "#f0faf5" }}>
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
          >
            Our Third School
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            A New School, A New Future for Kipsing
          </h2>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold"
            style={{
              background: "#ffffff",
              color: "#1F7A4C",
              fontFamily: "var(--font-open-sans)",
              boxShadow: "0 2px 10px rgba(31,122,76,0.10)",
            }}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Mlima Tatu, Kipsing · Oldonyiro Ward, Isiolo County
          </span>
        </div>

        {/* Story + mosaic */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div
            className="space-y-4 text-gray-600 text-base leading-relaxed"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            <p>
              For generations, children in{" "}
              <strong className="text-gray-800">
                Mlima Tatu, Kipsing, in Oldonyiro Ward, Isiolo County
              </strong>
              , grew up without a school in their community. In this remote and
              underserved part of Kenya, many children were left without the
              opportunity to experience education.
            </p>
            <p
              className="text-xl font-bold"
              style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
            >
              Today, that story is changing.
            </p>
            <p>
              Through the support of{" "}
              <strong className="text-gray-800">Ulf Spendrup</strong>, Laramatak
              Child Initiative (LCI) has built a new school in Kipsing, bringing
              a safe and dignified learning environment closer to children who
              have waited for education for far too long.
            </p>
            <p>
              What was once an empty space is now a place where boys and girls
              can sit under a proper roof, open a book, learn, dream and begin
              shaping their own future.
            </p>
            <p>
              This school is more than a building.{" "}
              <strong className="text-gray-800">
                It is a doorway to opportunity and a foundation for generations
                to come.
              </strong>
            </p>
            <p>
              For the children of Kipsing, education is no longer a distant
              dream. It is now within reach. And for the community, a new
              chapter has begun.
            </p>
            <p>
              At LCI, we believe that where a child is born should never
              determine whether they receive an education.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {mosaic.map((photo, i) => (
              <figure
                key={photo.src}
                className={`relative rounded-2xl overflow-hidden group ${
                  i === 0 ? "col-span-2" : ""
                }`}
                style={{ boxShadow: "0 8px 30px rgba(31,122,76,0.15)" }}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    i === 0 ? "h-72 sm:h-80" : "h-40 sm:h-48"
                  }`}
                  loading="lazy"
                />
                <figcaption
                  className="absolute inset-x-0 bottom-0 p-3 text-white text-xs leading-snug"
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    background:
                      "linear-gradient(to top, rgba(15,55,35,0.88) 0%, transparent 100%)",
                  }}
                >
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Journey */}
        <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {journey.map((item, i) => (
            <div
              key={item.step}
              className="rounded-2xl overflow-hidden bg-white flex flex-col group"
              style={{
                boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                borderBottom: "3px solid #1F7A4C",
              }}
            >
              <div className="overflow-hidden">
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex-1">
                <span
                  className="text-xs font-bold uppercase tracking-widest block mb-2"
                  style={{ color: "#4BB3E6", fontFamily: "var(--font-montserrat)" }}
                >
                  {String(i + 1).padStart(2, "0")} · {item.step}
                </span>
                <p
                  className="text-gray-600 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <div
          className="rounded-2xl px-6 py-10 text-center"
          style={{ background: "#1F7A4C" }}
        >
          <p
            className="text-white text-xl md:text-2xl font-extrabold mb-3"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            One school. Hundreds of possibilities. Generations of hope.
          </p>
          <p
            className="text-white/80 text-sm md:text-base mb-6"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            This is education for the nomad kids. This is the future of Kipsing.
          </p>
          <a
            href="/gallery#kipsing"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm transition-colors duration-200 bg-white hover:bg-gray-100"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            See all Kipsing photos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
