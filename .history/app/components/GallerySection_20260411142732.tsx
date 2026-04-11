const photos = [
  {
    src: "/images/_MG_1344.jpg",
    caption:
      "Children engaged in a morning learning session at a partner school.",
  },
  {
    src: "/images/_MG_1281.jpg",
    caption:
      "A feeding program providing nutritious meals to over 200 students.",
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    caption:
      "Girls empowerment workshop — young women sharing stories of resilience.",
  },
  {
    src: "https://images.unsplash.com/photo-1560785477-d43d2b3e5d4b?w=800&q=80",
    caption:
      "Community outreach day bringing families and volunteers together.",
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
