"use client";

import { useState, useEffect, useCallback } from "react";

interface Photo {
  src: string;
  thumb: string;
  caption: string;
}

const BASE = "https://laramatakchildinitiative.org/wp-content/uploads";

const KIPSING = "/images/kipsing";

/* ── Kipsing school, Isiolo County (2026) ───────────────────── */
const kipsingPhotos: Photo[] = [
  ["33-open-air-classroom", "Before the new school, lessons in Mlima Tatu, Kipsing were taught under the shade of an acacia tree."],
  ["32-teacher-and-class", "A teacher leads an open-air class with a makeshift blackboard propped against a branch."],
  ["29-makeshift-blackboard", "A worn sheet of iron served as the only blackboard for the children of Kipsing."],
  ["14-pupils-on-log-bench", "Young pupils sit on a fallen log, the only bench they had, eager to learn."],
  ["12-pupils-listening", "Pupils listen closely during a lesson under the trees in Oldonyiro Ward."],
  ["15-young-learners", "Some of Kipsing's youngest learners, who had waited too long for a classroom."],
  ["16-hands-raised", "Hands up for education. Kipsing's children welcome their new school."],
  ["17-eager-pupils", "Boys and girls from nomadic families gather to celebrate a new beginning."],
  ["24-raised-hands", "Every raised hand is a child ready to learn, dream and shape their future."],
  ["20-whole-school", "The children of Mlima Tatu, Kipsing, the first generation with a school of their own."],
  ["21-cheering-pupils", "Cheers from the pupils of Kipsing as their community begins a new chapter."],
  ["19-pupils-gathered", "Pupils gather in the shade, the old classroom they are leaving behind."],
  ["23-pupils-under-acacia", "Where a child is born should never decide whether they receive an education."],
  ["26-smiling-pupils", "Smiles from Kipsing. Education is no longer a distant dream."],
  ["13-lesson-in-progress", "A lesson in progress in the open air, Oldonyiro Ward, Isiolo County."],
  ["11-class-under-tree", "Learning under the acacia: the classroom before LCI's new school."],
  ["10-community-at-site", "Community members gather at the building site of the new Kipsing school."],
  ["05-setting-out-the-site", "Setting out the site for the new school on the open plains of Kipsing."],
  ["04-foundation-outline", "The outline of the classrooms is marked out, ready for the foundation."],
  ["06-foundation-trenches", "Foundation trenches dug for the new Kipsing school."],
  ["01-building-materials", "Building stones delivered to Mlima Tatu, Kipsing, for the new classrooms."],
  ["02-timber-and-steel", "Timber and steel brought to the site for the school's structure and roof."],
  ["03-ballast-and-water-tank", "Ballast and a water tank on site as construction gets underway."],
  ["08-ballast-delivered", "Ballast for the concrete foundation, delivered to this remote corner of Isiolo County."],
  ["07-water-tank", "A water tank for the school, bringing clean water closer to the children."],
].map(([file, caption]) => ({
  src: `${KIPSING}/${file}.jpeg`,
  thumb: `${KIPSING}/${file}.jpeg`,
  caption,
}));

const photos: Photo[] = [
  /* ── LCI Samuburu series (2024) ─────────────────────────────── */
  { src: `${BASE}/2024/05/LCI-Samuburu-17-scaled.jpg`, thumb: `${BASE}/2024/05/LCI-Samuburu-17-400x284.jpg`, caption: "LCI Samuburu (17)" },
  { src: `${BASE}/2024/05/LCI-Samuburu-10-scaled.jpg`, thumb: `${BASE}/2024/05/LCI-Samuburu-10-400x284.jpg`, caption: "LCI Samuburu (10)" },
  { src: `${BASE}/2024/05/LCI-Samuburu-23-scaled.jpg`, thumb: `${BASE}/2024/05/LCI-Samuburu-23-400x284.jpg`, caption: "LCI Samuburu (23)" },
  { src: `${BASE}/2024/05/LCI-Samuburu-9-scaled.jpg`,  thumb: `${BASE}/2024/05/LCI-Samuburu-9-400x284.jpg`,  caption: "LCI Samuburu (9)"  },
  { src: `${BASE}/2024/05/LCI-Samuburu-21-scaled.jpg`, thumb: `${BASE}/2024/05/LCI-Samuburu-21-400x284.jpg`, caption: "LCI Samuburu (21)" },
  { src: `${BASE}/2024/05/LCI-Samuburu-7-scaled.jpg`,  thumb: `${BASE}/2024/05/LCI-Samuburu-7-400x284.jpg`,  caption: "LCI Samuburu (7)"  },
  { src: `${BASE}/2024/05/LCI-Samuburu-4-scaled.jpg`,  thumb: `${BASE}/2024/05/LCI-Samuburu-4-400x284.jpg`,  caption: "LCI Samuburu (4)"  },
  { src: `${BASE}/2024/05/LCI-Samuburu-12-scaled.jpg`, thumb: `${BASE}/2024/05/LCI-Samuburu-12-400x284.jpg`, caption: "LCI Samuburu (12)" },
  { src: `${BASE}/2024/05/LCI-Samuburu-20-scaled.jpg`, thumb: `${BASE}/2024/05/LCI-Samuburu-20-400x284.jpg`, caption: "LCI Samuburu (20)" },
  { src: `${BASE}/2024/05/LCI-Samuburu-18-scaled.jpg`, thumb: `${BASE}/2024/05/LCI-Samuburu-18-400x284.jpg`, caption: "LCI Samuburu (18)" },
  { src: `${BASE}/2024/05/LCI-Samuburu-5-scaled.jpg`,  thumb: `${BASE}/2024/05/LCI-Samuburu-5-400x284.jpg`,  caption: "LCI Samuburu (5)"  },
  { src: `${BASE}/2024/05/LCI-Samuburu-24-scaled.jpg`, thumb: `${BASE}/2024/05/LCI-Samuburu-24-400x284.jpg`, caption: "LCI Samuburu (24)" },
  { src: `${BASE}/2024/05/LCI-Samuburu-6-scaled.jpg`,  thumb: `${BASE}/2024/05/LCI-Samuburu-6-400x284.jpg`,  caption: "LCI Samuburu (6)"  },
  { src: `${BASE}/2024/05/LCI-Samuburu-3-scaled.jpg`,  thumb: `${BASE}/2024/05/LCI-Samuburu-3-400x284.jpg`,  caption: "LCI Samuburu (3)"  },
  { src: `${BASE}/2024/05/LCI-Samuburu-16-scaled.jpg`, thumb: `${BASE}/2024/05/LCI-Samuburu-16-400x284.jpg`, caption: "LCI Samuburu (16)" },
  { src: `${BASE}/2024/05/LCI-Samuburu-22-scaled.jpg`, thumb: `${BASE}/2024/05/LCI-Samuburu-22-400x284.jpg`, caption: "LCI Samuburu (22)" },
  { src: `${BASE}/2024/05/LCI-Samuburu-13-scaled.jpg`, thumb: `${BASE}/2024/05/LCI-Samuburu-13-400x284.jpg`, caption: "LCI Samuburu (13)" },
  { src: `${BASE}/2024/05/LCI-Samuburu-2-scaled.jpg`,  thumb: `${BASE}/2024/05/LCI-Samuburu-2-400x284.jpg`,  caption: "LCI Samuburu (2)"  },
  { src: `${BASE}/2024/05/LCI-Samuburu-25-scaled.jpg`, thumb: `${BASE}/2024/05/LCI-Samuburu-25-400x284.jpg`, caption: "LCI Samuburu (25)" },
  { src: `${BASE}/2024/05/LCI-Samuburu-1-scaled.jpg`,  thumb: `${BASE}/2024/05/LCI-Samuburu-1-400x284.jpg`,  caption: "LCI Samuburu (1)"  },
  { src: `${BASE}/2024/05/LCI-Samuburu-11-scaled.jpg`, thumb: `${BASE}/2024/05/LCI-Samuburu-11-400x284.jpg`, caption: "LCI Samuburu (11)" },
  { src: `${BASE}/2024/05/LCI-Samuburu-19-scaled.jpg`, thumb: `${BASE}/2024/05/LCI-Samuburu-19-400x284.jpg`, caption: "LCI Samuburu (19)" },
  { src: `${BASE}/2024/05/LCI-Samuburu-15-scaled.jpg`, thumb: `${BASE}/2024/05/LCI-Samuburu-15-400x284.jpg`, caption: "LCI Samuburu (15)" },

  /* ── TMJ community series (2023) ────────────────────────────── */
  { src: `${BASE}/2023/11/tmj_11.jpg`,       thumb: `${BASE}/2023/11/tmj_11-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_12.jpg`,       thumb: `${BASE}/2023/11/tmj_12-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_10.jpg`,       thumb: `${BASE}/2023/11/tmj_10-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_9.jpg`,        thumb: `${BASE}/2023/11/tmj_9-400x284.jpg`,        caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_8.jpg`,        thumb: `${BASE}/2023/11/tmj_8-400x284.jpg`,        caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_3.jpg`,        thumb: `${BASE}/2023/11/tmj_3-400x284.jpg`,        caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj.jpg`,          thumb: `${BASE}/2023/11/tmj-400x284.jpg`,          caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_36.jpg`,       thumb: `${BASE}/2023/11/tmj_36-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_40.jpg`,       thumb: `${BASE}/2023/11/tmj_40-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_45.jpg`,       thumb: `${BASE}/2023/11/tmj_45-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_44.jpg`,       thumb: `${BASE}/2023/11/tmj_44-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_43.jpg`,       thumb: `${BASE}/2023/11/tmj_43-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_42-scaled.jpg`,thumb: `${BASE}/2023/11/tmj_42-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_48.jpg`,       thumb: `${BASE}/2023/11/tmj_48-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_47.jpg`,       thumb: `${BASE}/2023/11/tmj_47-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_34.jpg`,       thumb: `${BASE}/2023/11/tmj_34-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_31.jpg`,       thumb: `${BASE}/2023/11/tmj_31-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_23.jpg`,       thumb: `${BASE}/2023/11/tmj_23-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_22.jpg`,       thumb: `${BASE}/2023/11/tmj_22-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_21.jpg`,       thumb: `${BASE}/2023/11/tmj_21-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_30.jpg`,       thumb: `${BASE}/2023/11/tmj_30-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_28.jpg`,       thumb: `${BASE}/2023/11/tmj_28-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_19.jpg`,       thumb: `${BASE}/2023/11/tmj_19-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_29.jpg`,       thumb: `${BASE}/2023/11/tmj_29-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_20.jpg`,       thumb: `${BASE}/2023/11/tmj_20-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_25.jpg`,       thumb: `${BASE}/2023/11/tmj_25-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_26.jpg`,       thumb: `${BASE}/2023/11/tmj_26-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_18.jpg`,       thumb: `${BASE}/2023/11/tmj_18-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_17.jpg`,       thumb: `${BASE}/2023/11/tmj_17-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_16.jpg`,       thumb: `${BASE}/2023/11/tmj_16-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_24.jpg`,       thumb: `${BASE}/2023/11/tmj_24-400x284.jpg`,       caption: "Community Programme" },
  { src: `${BASE}/2023/11/tmj_14.jpg`,       thumb: `${BASE}/2023/11/tmj_14-400x284.jpg`,       caption: "Community Programme" },

  /* ── Kids in schools series (2023) ─────────────────────────── */
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-27.jpg`, thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-27-400x284.jpg`, caption: "Kids in Schools" },
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-26.jpg`, thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-26-400x284.jpg`, caption: "Kids in Schools" },
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-25.jpg`, thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-25-400x284.jpg`, caption: "Kids in Schools" },
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-24.jpg`, thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-24-400x284.jpg`, caption: "Kids in Schools" },
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-23.jpg`, thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-23-400x284.jpg`, caption: "Kids in Schools" },
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-22.jpg`, thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-22-400x284.jpg`, caption: "Kids in Schools" },
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-21.jpg`, thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-21-400x284.jpg`, caption: "Kids in Schools" },
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-13.jpg`, thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-13-400x284.jpg`, caption: "Kids in Schools" },
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-2.jpg`,  thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-2-400x284.jpg`,  caption: "Kids in Schools" },
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-3.jpg`,  thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-3-400x284.jpg`,  caption: "Kids in Schools" },
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-4.jpg`,  thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-4-400x284.jpg`,  caption: "Kids in Schools" },
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-12.jpg`, thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-12-400x284.jpg`, caption: "Kids in Schools" },
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-10.jpg`, thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-10-400x284.jpg`, caption: "Kids in Schools" },
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-9.jpg`,  thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-9-400x284.jpg`,  caption: "Kids in Schools" },
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-16.jpg`, thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-16-400x284.jpg`, caption: "Kids in Schools" },
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-17.jpg`, thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-17-400x284.jpg`, caption: "Kids in Schools" },
  { src: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-14.jpg`, thumb: `${BASE}/2023/10/Laramatak-Child-Initiative-Kids-in-schools-14-400x284.jpg`, caption: "Kids in Schools" },

  /* ── Field visit series (June 2023) ────────────────────────── */
  { src: `${BASE}/2023/06/IMG-20230623-WA0014.jpg`, thumb: `${BASE}/2023/06/IMG-20230623-WA0014-400x284.jpg`, caption: "Field Visit — June 2023" },
  { src: `${BASE}/2023/06/IMG-20230623-WA0065.jpg`, thumb: `${BASE}/2023/06/IMG-20230623-WA0065-400x284.jpg`, caption: "Field Visit — June 2023" },
  { src: `${BASE}/2023/06/IMG-20230623-WA0067.jpg`, thumb: `${BASE}/2023/06/IMG-20230623-WA0067-400x284.jpg`, caption: "Field Visit — June 2023" },
  { src: `${BASE}/2023/06/IMG-20230623-WA0069.jpg`, thumb: `${BASE}/2023/06/IMG-20230623-WA0069-400x284.jpg`, caption: "Field Visit — June 2023" },
  { src: `${BASE}/2023/06/IMG-20230623-WA0064.jpg`, thumb: `${BASE}/2023/06/IMG-20230623-WA0064-400x284.jpg`, caption: "Field Visit — June 2023" },
  { src: `${BASE}/2023/06/IMG-20230623-WA0054.jpg`, thumb: `${BASE}/2023/06/IMG-20230623-WA0054-400x284.jpg`, caption: "Field Visit — June 2023" },
  { src: `${BASE}/2023/06/IMG-20230623-WA0063.jpg`, thumb: `${BASE}/2023/06/IMG-20230623-WA0063-400x284.jpg`, caption: "Field Visit — June 2023" },
];

const albums = [
  {
    id: "kipsing",
    title: "Kipsing School, Isiolo County",
    subtitle:
      "Our third school. From lessons under an acacia tree to new classrooms in Mlima Tatu, Kipsing, built with the support of Ulf Spendrup.",
    photos: kipsingPhotos,
    offset: 0,
  },
  {
    id: "moments",
    title: "Moments from Our Programmes",
    subtitle: "Classrooms, community gatherings and field visits from across Samburu.",
    photos,
    offset: kipsingPhotos.length,
  },
];

const allPhotos: Photo[] = albums.flatMap((album) => album.photos);

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + allPhotos.length) % allPhotos.length)),
    []
  );
  const nextPhoto = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % allPhotos.length)),
    []
  );

  return (
    <section className="py-16 px-6" style={{ background: "#f9fafb" }}>
      <div className="max-w-7xl mx-auto">

        {/* ── Featured Video ── */}
        <div className="mb-14">
          <h2
            className="text-2xl font-bold text-center mb-6"
            style={{ fontFamily: "var(--font-montserrat)", color: "#1F7A4C" }}
          >
            Our Story in Motion
          </h2>
          <div
            className="relative w-full rounded-2xl overflow-hidden mx-auto"
            style={{
              maxWidth: "860px",
              aspectRatio: "16/9",
              boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
            }}
          >
            <iframe
              src="https://drive.google.com/file/d/1XCzqYPkjvx9PaR984fj8tJCoXPP8Vd5y/preview"
              className="absolute inset-0 w-full h-full"
              allow="autoplay"
              allowFullScreen
              title="LCI Featured Video"
            />
          </div>
        </div>

        {/* ── Albums ── */}
        {albums.map((album) => (
          <div key={album.id} id={album.id} className="mb-14 last:mb-0 scroll-mt-24">
            <div className="text-center mb-8">
              <h2
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "var(--font-montserrat)", color: "#1F7A4C" }}
              >
                {album.title}
              </h2>
              <p
                className="text-gray-500 text-sm max-w-2xl mx-auto"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                {album.subtitle}
              </p>
            </div>

            {/* Masonry-style grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {album.photos.map((photo, i) => (
                <div
                  key={`${photo.src}-${i}`}
                  className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative"
                  style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}
                  onClick={() => openLightbox(album.offset + i)}
                >
                  <div className="overflow-hidden">
                    <img
                      src={photo.thumb}
                      alt={photo.caption}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ aspectRatio: "4/3" }}
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
          </div>
        ))}

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
          photos={allPhotos}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </section>
  );
}
