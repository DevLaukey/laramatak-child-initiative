import GalleryHero from "./GalleryHero";
import GalleryGrid from "./GalleryGrid";
import Footer from "../components/Footer";

export const metadata = {
  title: "Gallery | Laramatak Child Initiative",
  description:
    "Browse photos from LCI's programs — children in classrooms, feeding programs, girls empowerment workshops, and community events across rural Kenya.",
};

export default function GalleryPage() {
  return (
    <main className="flex flex-col flex-1">
      <GalleryHero />
      <GalleryGrid />
      <Footer />
    </main>
  );
}
