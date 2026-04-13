const photos = [
  {
    src: "/images/gallery1.jpg",
    caption:
      "The School Development Programme provides quality education, resources, and support to children from nomadic communities, fostering their academic growth and long-term development.",
  },
  {
    src: "/images/gallery4.jpg",
    caption:
      "The school supports learning by providing a daily nutritious lunch, helping students stay focused and reducing the impact of hunger on their education.",
  },
  {
    src: "/images/gallery2.jpg",
    caption:
      "Laramatak Child Initiative promotes education for pastoralist children to overcome barriers to schooling, empower communities, and address social and environmental challenges through awareness and learning.",
  },
  {
    src: "/images/gallery3.jpg",
    caption:
      "The initiative aims to support pastoralist children’s education by addressing barriers like distance, low motivation, and limited awareness of its importance.",
  },
];

export default function GallerySection() {
  return (
    <section className="py-20 px-6" style={{ background: "#f9f9f9" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
          >
            Stories & Moments
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            Life in Our Communities
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden flex flex-col group"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}
            >
              <div className="overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div
                className="p-4 bg-white flex-1"
                style={{ borderBottom: "3px solid #1F7A4C" }}
              >
                <p
                  className="text-gray-600 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
