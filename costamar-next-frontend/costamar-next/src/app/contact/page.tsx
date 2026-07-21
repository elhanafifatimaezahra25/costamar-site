import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/sections/ContactSection";

export const metadata = {
  title: "Contact — Costamar Hammam & Spa",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--color-bg)] pt-24">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
