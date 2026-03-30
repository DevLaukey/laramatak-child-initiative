import ContactHero from "./ContactHero";
import ContactSection from "./ContactSection";
import MapSection from "./MapSection";
import FAQSection from "./FAQSection";
import Footer from "../components/Footer";

export const metadata = {
  title: "Contact Us | Laramatak Child Initiative",
  description:
    "Get in touch with the Laramatak Child Initiative team. We'd love to hear from donors, volunteers, partners, and community members.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-col flex-1">
      <ContactHero />
      <ContactSection />
      <MapSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
