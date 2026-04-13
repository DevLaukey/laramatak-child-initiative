import AboutHero from "./AboutHero";
import MissionVision from "./MissionVision";
import OurStory from "./OurStory";
import TeamSection from "./TeamSection";
import TransparencySection from "./TransparencySection";
import Footer from "../components/Footer";

export const metadata = {
  title: "About Us | Laramatak Child Initiative",
  description:
    "Learn about the mission, story, team, and values behind Laramatak Child Initiative — a grassroots nonprofit empowering children in rural Kenya.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col flex-1">
      <AboutHero />
      <MissionVision />
      <OurStory />
      <TeamSection />
      <TransparencySection />
      <Footer />
    </main>
  );
}
