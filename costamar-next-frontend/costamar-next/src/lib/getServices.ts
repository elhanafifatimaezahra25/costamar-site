import { listServices, type SpaService } from "./api";

/**
 * Demo fallback used only if the Spring Boot API is unreachable (e.g. during
 * local frontend-only development). Mirrors the backend's DataSeeder so the
 * site never looks broken.
 */
const FALLBACK_SERVICES: SpaService[] = [
  {
    id: 1,
    name: "Rituel Impérial",
    slug: "rituel-imperial",
    description:
      "Protocole royal mêlant huiles précieuses et techniques ancestrales pour une peau veloutée et une relaxation absolue.",
    category: "HAMMAM_PRIVE",
    durationMinutes: 90,
    price: 450,
    displayOrder: 1,
    active: true,
  },
  {
    id: 2,
    name: "Éclat & Hydratation",
    slug: "eclat-hydratation",
    description:
      "Cure intensive redonnant à votre teint toute sa lumière naturelle et sa vitalité.",
    category: "SOINS",
    durationMinutes: 60,
    price: 320,
    displayOrder: 2,
    active: true,
  },
  {
    id: 3,
    name: "Privatisation Signature",
    slug: "privatisation-signature",
    description:
      "Espace réservé exclusivement pour vous, orchestré selon vos envies dans une atmosphère de sérénité totale.",
    category: "HAMMAM_PRIVE",
    durationMinutes: 120,
    price: 650,
    displayOrder: 3,
    active: true,
  },
  {
    id: 4,
    name: "Gommage au Savon Noir",
    slug: "gommage-savon-noir",
    description:
      "Le rituel traditionnel du hammam marocain : vapeur, savon noir et gant kessa pour une peau neuve.",
    category: "HAMMAM_PRIVE",
    durationMinutes: 45,
    price: 220,
    displayOrder: 4,
    active: true,
  },
  {
    id: 5,
    name: "Massage Signature Costamar",
    slug: "massage-signature",
    description:
      "Un massage sur-mesure aux huiles chaudes, pensé pour dénouer les tensions et apaiser l'esprit.",
    category: "SPA_MASSAGE",
    durationMinutes: 60,
    price: 380,
    displayOrder: 5,
    active: true,
  },
  {
    id: 6,
    name: "Soin du Visage Sur-Mesure",
    slug: "soin-visage-sur-mesure",
    description:
      "Diagnostic de peau puis protocole personnalisé pour répondre précisément aux besoins de votre visage.",
    category: "BEAUTE",
    durationMinutes: 75,
    price: 400,
    displayOrder: 6,
    active: true,
  },
];

export async function getServicesSafe(): Promise<{
  services: SpaService[];
  usedFallback: boolean;
}> {
  try {
    const services = await listServices();
    if (!services || services.length === 0) {
      return { services: FALLBACK_SERVICES, usedFallback: true };
    }
    return { services, usedFallback: false };
  } catch {
    return { services: FALLBACK_SERVICES, usedFallback: true };
  }
}
