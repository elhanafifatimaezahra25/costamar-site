import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Echappee from "@/components/sections/Echappee";
import NosUniversDeSoins from "@/components/sections/NosUniversDeSoins";
import RituelsSignature from "@/components/sections/RituelsSignature";
import Sanctuaire from "@/components/sections/Sanctuaire";
import KeyFigures from "@/components/sections/KeyFigures";
import SignatureExperience from "@/components/sections/SignatureExperience";
import BookingCta from "@/components/sections/BookingCta";
import { ScrollProgressDots } from "@/components/ui/ScrollProgressDots";

const SECTION_IDS = [
  "hero",
  "echappee",
  "univers",
  "rituels",
  "experience",
];

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollProgressDots sectionIds={SECTION_IDS} />
      <main>
        <Hero />
        <Echappee />
        <NosUniversDeSoins />
        <RituelsSignature />
        <Sanctuaire />
        <KeyFigures />
        <SignatureExperience />
        <BookingCta />
      </main>
      <Footer />
    </>
  );
}
