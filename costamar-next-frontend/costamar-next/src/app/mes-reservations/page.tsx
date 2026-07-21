import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MyBookingsLookup from "@/components/booking/MyBookingsLookup";

export const metadata = {
  title: "Mes réservations — Costamar Hammam & Spa",
};

export default function MyBookingsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--color-bg)] pt-32 pb-24">
        <div className="container-lux">
          <p className="eyebrow mb-4 text-center">Suivi</p>
          <h1 className="font-display mb-4 text-center text-4xl text-[var(--color-fg)] md:text-5xl">
            Mes réservations
          </h1>
          <p className="mx-auto mb-16 max-w-md text-center text-[var(--color-fg-muted)]">
            Retrouvez vos réservations à l&apos;aide de l&apos;adresse email
            utilisée lors de la prise de rendez-vous.
          </p>
          <MyBookingsLookup />
        </div>
      </main>
      <Footer />
    </>
  );
}
