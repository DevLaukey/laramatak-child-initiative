export default function MapSection() {
  return (
    <section className="px-6 pb-0" style={{ background: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#4BB3E6", fontFamily: "var(--font-open-sans)" }}
          >
            Find Us
          </span>
          <h2
            className="text-2xl md:text-3xl font-extrabold"
            style={{ color: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
          >
            Our Location
          </h2>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            boxShadow: "0 4px 32px rgba(31,122,76,0.12)",
            height: "420px",
          }}
        >
          <iframe
            title="Laramatak Child Initiative location – Baringo County, Kenya"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31913.84691078743!2d37.30347602419784!3d0.9832280364647857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178f550a30aac453%3A0x3cb1ed9e538e804c!2sWamba!5e0!3m2!1sen!2ske!4v1776116751155!5m2!1sen!2ske"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <p
          className="text-center text-gray-400 text-xs mt-3 pb-6"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Laramatak Village, Baringo County, Rift Valley — Kenya
        </p>
      </div>
    </section>
  );
}
