import ScholarsHero from "./ScholarsHero";
import ScholarsGrid from "./ScholarsGrid";
import Footer from "../components/Footer";

export const metadata = {
  title: "Scholars | Laramatak Child Initiative",
  description:
    "Meet the bright children of LCI. Choose a scholar to sponsor directly and follow their journey to a better future.",
};

export default function ScholarsPage() {
  return (
    <main className="flex flex-col flex-1">
      <ScholarsHero />
      <ScholarsGrid />
      <Footer />
    </main>
  );
}
