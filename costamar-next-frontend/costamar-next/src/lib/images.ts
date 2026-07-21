/**
 * Real Costamar photography, color-graded and cropped per destination via
 * scripts/process-photos.mjs. Source: on-site phone photography supplied by
 * the client (see that script for the raw-file → crop mapping).
 */

export const IMG = {
  heroBg: "/images/hero.jpg",
  heroCtaBookend: "/images/hero-cta-bookend.jpg",

  introWelcome: "/images/intro-welcome.jpg",

  signature: {
    accueil: "/images/signature-accueil.jpg",
    vapeur: "/images/signature-vapeur.jpg",
    gommage: "/images/signature-gommage.jpg",
    massage: "/images/signature-massage.jpg",
  },

  treatmentCards: [
    "/images/treatment-visage.jpg",
    "/images/treatment-pedicure.jpg",
    "/images/treatment-manucure.jpg",
    "/images/treatment-coiffure-1.jpg",
    "/images/treatment-lavage.jpg",
    "/images/treatment-coiffure-2.jpg",
  ],

  gallery: [
    "/images/gallery-salon-wide.jpg",
    "/images/gallery-corridor-chairs.jpg",
    "/images/gallery-tea-set.jpg",
    "/images/gallery-hammam-benches.jpg",
    "/images/gallery-pedicure-arches.jpg",
    "/images/gallery-salon-booths.jpg",
  ],
};

// Real photography grouped by service category so a card shows a plausible
// room for that treatment rather than an arbitrary index-cycled photo.
const CATEGORY_IMAGES: Record<string, string[]> = {
  HAMMAM_PRIVE: [IMG.signature.gommage, IMG.signature.massage, IMG.signature.vapeur],
  SOINS: [IMG.treatmentCards[0]],
  SPA_MASSAGE: [IMG.treatmentCards[0]],
  BEAUTE: [IMG.treatmentCards[2]],
};

/**
 * Picks an image for a service by category, cycling within that category's
 * pool and falling back to round-robin over the full card pool once a
 * category's dedicated images are exhausted (covers categories/counts the
 * live API may add beyond the seed data).
 */
export function pickServiceImage(
  service: { id: number; category?: string },
  categoryCounts: Record<string, number>
) {
  const pool = service.category ? CATEGORY_IMAGES[service.category] : undefined;
  const count = service.category ? (categoryCounts[service.category] ?? 0) : 0;
  if (service.category) categoryCounts[service.category] = count + 1;

  if (pool && count < pool.length) return pool[count];
  return IMG.treatmentCards[service.id % IMG.treatmentCards.length];
}
