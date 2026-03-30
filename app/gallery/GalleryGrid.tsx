"use client";

import { useState, useEffect, useCallback } from "react";

/* ── Photo data ─────────────────────────────────────────────── */
type Category = "All" | "Education" | "Nutrition" | "Girls Empowerment" | "Child Protection" | "Community";

interface Photo {
  src: string;
  thumb: string;
  caption: string;
  category: Exclude<Category, "All">;
  span?: "wide" | "tall" | "normal";
}

const photos: Photo[] = [
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    caption: "Children engaged in a morning learning session at Laramatak Primary School.",
    category: "Education",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
    caption: "A teacher works one-on-one with a student during remedial classes.",
    category: "Education",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    caption: "Over 200 children receive hot, nutritious meals every school day.",
    category: "Nutrition",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80",
    caption: "Girls empowerment workshop — young women sharing stories of resilience and hope.",
    category: "Girls Empowerment",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80",
    caption: "Community outreach day — families and LCI volunteers come together.",
    category: "Community",
  },
  {
    src: "https://images.unsplash.com/photo-1560785477-d43d2b3e5d4b?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1560785477-d43d2b3e5d4b?w=600&q=80",
    caption: "Children at a safe space run by LCI — a place to heal and grow.",
    category: "Child Protection",
  },
  {
    src: "https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?w=600&q=80",
    caption: "An LCI volunteer reads with children during an after-school club session.",
    category: "Education",
  },
  {
    src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&q=80",
    caption: "A school feeding program provides nourishment to hundreds of pupils each morning.",
    category: "Nutrition",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=600&q=80",
    caption: "Grace leads a mentorship circle for teenage girls in Laramatak village.",
    category: "Girls Empowerment",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80",
    caption: "LCI founder Amina Wanjiku meets with community elders to discuss child welfare.",
    category: "Community",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    caption: "Joseph Otieno coordinates distribution of scholastic materials before term begins.",
    category: "Education",
  },
  {
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80",
    caption: "Volunteers join hands with local families during a community cleanup drive.",
    category: "Community",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&q=80",
    caption: "A child protection awareness session reaches parents across three villages.",
    category: "Child Protection",
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
    caption: "A sponsored child proudly holds his new school uniform on the first day of term.",
    category: "Education",
  },
  {
    src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600&q=80",
    caption: "Life skills training session empowers girls with knowledge and confidence.",
    category: "Girls Empowerment",
  },
  {
    src: "https://images.unsplash.com/photo-1560785496-3c9d27877182?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1560785496-3c9d27877182?w=600&q=80",
    caption: "Families receive monthly food parcels as part of LCI's nutrition programme.",
    category: "Nutrition",
  },
];

const categories: Category[] = [
  "All",
  "Education",
  "Nutrition",
  "Girls Empowerment",
  "Child Protection",
  "Community",
];

/* ── Lightbox ───────────────────────────────────────────────── */
function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const photo = photos[index];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors duration-150"
        style={{ background: "rgba(255,255,255,0.12)" }}
        onClick={onClose}
        aria-label="Close"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 md:left-8 w-11 h-11 rounded-full flex items-center justify-center text-white transition-colors duration-150 z-10"
        style={{ background: "rgba(255,255,255,0.12)" }}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative max-w-4xl w-full mx-16 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.caption}
          className="rounded-xl w-full max-h-[75vh] object-contain"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}
        />
        <div className="text-center">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2"
            style={{ background: "#1F7A4C", color: "#fff", fontFamily: "var(--font-montserrat)" }}
          >
            {photo.category}
          </span>
          <p
            className="text-white/80 text-sm leading-relaxed max-w-lg"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            {photo.caption}
          </p>
          <p
            className="text-white/35 text-xs mt-2"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            {index + 1} / {photos.length}
          </p>
        </div>
      </div>

      {/* Next */}
      <button
        className="absolute right-4 md:right-8 w-11 h-11 rounded-full flex items-center justify-center text-white transition-colors duration-150 z-10"
        style={{ background: "rgba(255,255,255,0.12)" }}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

/* ── Main grid ──────────────────────────────────────────────── */
export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );
  const nextPhoto = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length]
  );

  return (
    <section className="py-16 px-6" style={{ background: "#f9fafb" }}>
      <div className="max-w-7xl mx-auto">

        {/* ── Filter tabs ── */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: active ? "#1F7A4C" : "#fff",
                  color: active ? "#fff" : "#6b7280",
                  border: `2px solid ${active ? "#1F7A4C" : "#e5e7eb"}`,
                  fontFamily: "var(--font-montserrat)",
                  boxShadow: active ? "0 4px 16px rgba(31,122,76,0.25)" : "none",
                }}
              >
                {cat}
                <span
                  className="ml-2 px-1.5 py-0.5 rounded text-xs"
                  style={{
                    background: active ? "rgba(255,255,255,0.2)" : "#f3f4f6",
                    color: active ? "#fff" : "#9ca3af",
                    fontFamily: "var(--font-open-sans)",
                  }}
                >
                  {cat === "All"
                    ? photos.length
                    : photos.filter((p) => p.category === cat).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Masonry-style grid ── */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filtered.map((photo, i) => (
            <div
              key={`${photo.src}-${i}`}
              className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}
              onClick={() => openLightbox(i)}
            >
              <div className="overflow-hidden">
                <img
                  src={photo.thumb}
                  alt={photo.caption}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{
                    aspectRatio: photo.span === "wide" ? "16/9" : photo.span === "tall" ? "3/4" : "4/3",
                  }}
                  loading="lazy"
                />
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to top, rgba(15,55,35,0.88) 0%, transparent 55%)",
                }}
              >
                <span
                  className="inline-block self-start px-2.5 py-1 rounded-full text-white text-xs font-semibold mb-2"
                  style={{ background: "#1F7A4C", fontFamily: "var(--font-montserrat)" }}
                >
                  {photo.category}
                </span>
                <p
                  className="text-white text-xs leading-snug"
                  style={{ fontFamily: "var(--font-open-sans)" }}
                >
                  {photo.caption}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-white/70 text-xs">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  Click to expand
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p style={{ fontFamily: "var(--font-open-sans)" }}>No photos in this category yet.</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-14">
          <p
            className="text-gray-500 text-sm mb-5"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Moved by what you see? Help us create more moments like these.
          </p>
          <a
            href="/donate"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white transition-all duration-200"
            style={{
              background: "#1F7A4C",
              fontFamily: "var(--font-montserrat)",
              boxShadow: "0 4px 20px rgba(31,122,76,0.28)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#E63946")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#1F7A4C")
            }
          >
            Donate Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </section>
  );
}
