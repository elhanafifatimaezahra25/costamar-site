"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { addDays, format, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import type { SpaService } from "@/lib/api";
import { createBooking, extractErrorMessage, getAvailability } from "@/lib/api";
import { Button } from "@/components/ui/Button";

const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DAYS_AHEAD = 21;

type Step = "service" | "date" | "info" | "success";

export default function BookingFlow({ services }: { services: SpaService[] }) {
  const searchParams = useSearchParams();
  const preselectedId = searchParams.get("service");

  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<SpaService | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [slots, setSlots] = useState<string[] | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [form, setForm] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    serviceName: string;
    date: string;
    time: string;
  } | null>(null);

  useEffect(() => {
    if (preselectedId) {
      const s = services.find((s) => String(s.id) === preselectedId);
      if (s) setSelectedService(s);
    }
  }, [preselectedId, services]);

  const days = useMemo(
    () => Array.from({ length: DAYS_AHEAD }, (_, i) => addDays(new Date(), i)),
    []
  );

  useEffect(() => {
    if (!selectedService) return;
    setSelectedTime(null);
    setSlots(null);
    setLoadingSlots(true);

    const dateStr = format(selectedDate, "yyyy-MM-dd");
    getAvailability(selectedService.id, dateStr)
      .then(setSlots)
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [selectedService, selectedDate]);

  function goToDateStep(service: SpaService) {
    setSelectedService(service);
    setStep("date");
  }

  function goToInfoStep() {
    if (!selectedTime) return;
    setStep("info");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedService || !selectedTime) return;
    setSubmitting(true);
    setError(null);

    const startTime = `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`;

    try {
      await createBooking({
        serviceId: selectedService.id,
        clientName: form.clientName,
        clientPhone: form.clientPhone,
        clientEmail: form.clientEmail || `client+${Date.now()}@costamar-hammam.com`,
        startTime,
        notes: form.notes || undefined,
      });

      setConfirmedBooking({
        serviceName: selectedService.name,
        date: format(selectedDate, "EEEE d MMMM yyyy", { locale: fr }),
        time: selectedTime.slice(0, 5),
      });
      setStep("success");
    } catch (err) {
      setError(
        extractErrorMessage(
          err,
          "Ce créneau vient d'être réservé par un autre client. Veuillez sélectionner un autre horaire."
        )
      );
      // Refresh slots so the now-taken slot disappears immediately.
      if (selectedService) {
        getAvailability(selectedService.id, format(selectedDate, "yyyy-MM-dd")).then(setSlots);
      }
      setSelectedTime(null);
      setStep("date");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <StepIndicator step={step} />

      <AnimatePresence mode="wait">
        {step === "service" && (
          <motion.div
            key="service"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
            className="mt-12 grid gap-4 md:grid-cols-2"
          >
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => goToDateStep(s)}
                className="flex items-center justify-between rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6 text-left transition-colors hover:border-[var(--color-gold)]"
              >
                <div>
                  <p className="font-display text-xl text-[var(--color-fg)]">{s.name}</p>
                  <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                    {s.durationMinutes} min · {s.price} MAD
                  </p>
                </div>
                <ChevronRight className="text-[var(--color-gold)]" size={20} />
              </button>
            ))}
          </motion.div>
        )}

        {step === "date" && selectedService && (
          <motion.div
            key="date"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
            className="mt-12"
          >
            <div className="mb-8 flex items-center justify-between rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4">
              <div>
                <p className="text-sm text-[var(--color-fg-muted)]">Soin sélectionné</p>
                <p className="font-display text-xl text-[var(--color-fg)]">{selectedService.name}</p>
              </div>
              <button
                onClick={() => setStep("service")}
                className="text-sm text-[var(--color-gold)] hover:opacity-70"
              >
                Changer
              </button>
            </div>

            <p className="eyebrow mb-4">Choisissez une date</p>
            <div className="flex gap-3 overflow-x-auto pb-4">
              {days.map((d) => {
                const active = isSameDay(d, selectedDate);
                return (
                  <button
                    key={d.toISOString()}
                    onClick={() => setSelectedDate(d)}
                    className={`flex w-16 shrink-0 flex-col items-center rounded-sm border py-3 transition-colors ${
                      active
                        ? "border-[var(--color-gold)] bg-[var(--color-gold-soft)] text-[var(--color-gold)]"
                        : "border-[var(--color-border)] text-[var(--color-fg-muted)] hover:border-[var(--color-gold)]/50"
                    }`}
                  >
                    <span className="text-xs uppercase">{format(d, "EEE", { locale: fr })}</span>
                    <span className="mt-1 font-display text-2xl">{format(d, "d")}</span>
                  </button>
                );
              })}
            </div>

            <p className="eyebrow mb-4 mt-10">Créneaux disponibles</p>
            {error && (
              <p className="mb-4 rounded-sm border border-red-900/40 bg-red-950/30 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            {loadingSlots ? (
              <div className="flex items-center gap-2 text-[var(--color-fg-muted)]">
                <Loader2 className="animate-spin" size={18} />
                Chargement des disponibilités…
              </div>
            ) : slots && slots.length > 0 ? (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {slots.map((t) => {
                  const active = selectedTime === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`rounded-sm border py-3 text-sm transition-colors ${
                        active
                          ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-bg-inset)]"
                          : "border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-gold)]"
                      }`}
                    >
                      {t.slice(0, 5)} ✅
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-[var(--color-fg-muted)]">
                Aucun créneau disponible à cette date. Merci d&apos;essayer un autre jour.
              </p>
            )}

            <div className="mt-10 flex justify-end">
              <Button onClick={goToInfoStep} disabled={!selectedTime}>
                Continuer
              </Button>
            </div>
          </motion.div>
        )}

        {step === "info" && selectedService && (
          <motion.form
            key="info"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
            className="mt-12 grid gap-8 md:grid-cols-[1fr_320px]"
          >
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-[var(--color-fg-muted)]">
                  Nom complet *
                </label>
                <input
                  required
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  className="w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-4 py-3 text-[var(--color-fg)] outline-none focus:border-[var(--color-gold)]"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[var(--color-fg-muted)]">
                  Téléphone *
                </label>
                <input
                  required
                  value={form.clientPhone}
                  onChange={(e) => setForm({ ...form, clientPhone: e.target.value })}
                  className="w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-4 py-3 text-[var(--color-fg)] outline-none focus:border-[var(--color-gold)]"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[var(--color-fg-muted)]">
                  Email (optionnel)
                </label>
                <input
                  type="email"
                  value={form.clientEmail}
                  onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                  className="w-full rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-4 py-3 text-[var(--color-fg)] outline-none focus:border-[var(--color-gold)]"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-[var(--color-fg-muted)]">
                  Commentaire (optionnel)
                </label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full resize-none rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-4 py-3 text-[var(--color-fg)] outline-none focus:border-[var(--color-gold)]"
                />
              </div>

              {error && (
                <p className="rounded-sm border border-red-900/40 bg-red-950/30 px-4 py-3 text-sm text-red-300">
                  {error}
                </p>
              )}

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep("date")}
                  className="text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-gold)]"
                >
                  Retour
                </button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Confirmation…" : "Confirmer la réservation"}
                </Button>
              </div>
            </div>

            <div className="h-fit rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6">
              <p className="eyebrow mb-4">Récapitulatif</p>
              <p className="font-display text-xl text-[var(--color-fg)]">{selectedService.name}</p>
              <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
                {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
              </p>
              <p className="text-sm text-[var(--color-fg-muted)]">{selectedTime?.slice(0, 5)}</p>
              <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                <p className="text-sm text-[var(--color-fg-muted)]">
                  Durée : {selectedService.durationMinutes} min
                </p>
                <p className="mt-1 font-display text-2xl text-[var(--color-gold)]">
                  {selectedService.price} MAD
                </p>
              </div>
            </div>
          </motion.form>
        )}

        {step === "success" && confirmedBooking && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="mx-auto mt-16 max-w-md rounded-sm border border-[var(--color-gold)]/40 bg-[var(--color-bg-raised)] p-12 text-center"
          >
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-gold-soft)]">
              <Check className="text-[var(--color-gold)]" size={26} />
            </div>
            <h2 className="font-display text-3xl text-[var(--color-fg)]">
              Réservation confirmée
            </h2>
            <p className="mt-4 text-[var(--color-fg-muted)]">
              {confirmedBooking.serviceName} — {confirmedBooking.date} à {confirmedBooking.time}
            </p>
            <p className="mt-4 text-sm text-[var(--color-fg-faint)]">
              Un email de confirmation vous a été envoyé si vous avez renseigné votre adresse.
            </p>
            <Button href="/" className="mt-8">
              Retour à l&apos;accueil
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "service", label: "Soin" },
    { key: "date", label: "Date & heure" },
    { key: "info", label: "Vos informations" },
    { key: "success", label: "Confirmation" },
  ];
  const activeIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="flex items-center justify-center gap-3">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs ${
              i <= activeIndex
                ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-bg-inset)]"
                : "border-[var(--color-border)] text-[var(--color-fg-muted)]"
            }`}
          >
            {i + 1}
          </div>
          <span
            className={`hidden text-sm sm:inline ${
              i <= activeIndex ? "text-[var(--color-fg)]" : "text-[var(--color-fg-faint)]"
            }`}
          >
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <div className="h-px w-8 bg-[var(--color-border)] sm:w-12" />
          )}
        </div>
      ))}
    </div>
  );
}
