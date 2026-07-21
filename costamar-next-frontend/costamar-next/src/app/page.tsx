import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import FeaturedTreatments from "@/components/sections/FeaturedTreatments";
import SignatureExperience from "@/components/sections/SignatureExperience";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import KeyFigures from "@/components/sections/KeyFigures";
import Gallery from "@/components/sections/Gallery";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import BookingCta from "@/components/sections/BookingCta";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <FeaturedTreatments />
        <SignatureExperience />
        <WhyChooseUs />
        <KeyFigures />
        <Gallery />
        <Pricing />
        <Testimonials />
        <BookingCta />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
