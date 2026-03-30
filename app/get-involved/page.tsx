import GetInvolvedHero from "./GetInvolvedHero";
import WaysToGive from "./WaysToGive";
import VolunteerSection from "./VolunteerSection";
import PartnerSection from "./PartnerSection";
import FundraiseSection from "./FundraiseSection";
import Footer from "../components/Footer";

export const metadata = {
  title: "Get Involved | Laramatak Child Initiative",
  description:
    "Donate, volunteer, partner, or fundraise for LCI. Every action — big or small — transforms the lives of vulnerable children in rural Kenya.",
};

export default function GetInvolvedPage() {
  return (
    <main className="flex flex-col flex-1">
      <GetInvolvedHero />
      <WaysToGive />
      <VolunteerSection />
      <PartnerSection />
      <FundraiseSection />
      <Footer />
    </main>
  );
}
