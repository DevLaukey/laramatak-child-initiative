import DonateHero from "./DonateHero";
import DonationForm from "./DonationForm";
import DonateFooter from "./DonateFooter";

export const metadata = {
  title: "Donate | Laramatak Child Initiative",
  description:
    "Give today and change a child's life. Your donation funds education, nutrition, and protection for vulnerable children in rural Kenya.",
};

export default function DonatePage() {
  return (
    <main className="flex flex-col flex-1">
      <DonateHero />
      <DonationForm />
      <DonateFooter />
    </main>
  );
}
