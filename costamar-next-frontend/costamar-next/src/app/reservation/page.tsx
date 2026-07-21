import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingFlow from "@/components/booking/BookingFlow";
import { getServicesSafe } from "@/lib/getServices";

export const metadata = {
  title: "Réserver — Costamar Hammam & Spa",
};

export default async function ReservationPage() {
  const { services } = await getServicesSafe();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--color-bg)] pt-32 pb-24">
        <div className="container-lux">
          <p className="eyebrow mb-4 text-center">Réservation</p>
          <h1 className="font-display mb-16 text-center text-4xl text-[var(--color-fg)] md:text-5xl">
            Choisissez votre moment
          </h1>
          <Suspense fallback={null}>
            <BookingFlow services={services} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
