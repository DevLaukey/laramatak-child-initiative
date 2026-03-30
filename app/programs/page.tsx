import ProgramsHero from "./ProgramsHero";
import ProgramDetails from "./ProgramDetails";
import SupportSection from "./SupportSection";
import Footer from "../components/Footer";

export const metadata = {
  title: "Our Programs | Laramatak Child Initiative",
  description:
    "Explore LCI's four core programs — Education Support, Nutrition & Feeding, Child Protection, and Girls Empowerment — serving vulnerable children in rural Kenya.",
};

export default function ProgramsPage() {
  return (
    <main className="flex flex-col flex-1">
      <ProgramsHero />
      <ProgramDetails />
      <SupportSection />
      <Footer />
    </main>
  );
}
