import axios from "axios";
import { getToken, clearToken } from "./auth";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearToken();
      if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

/** Extrait un message d'erreur lisible depuis une réponse d'API en erreur */
export function extractErrorMessage(
  error: unknown,
  fallback = "Une erreur est survenue, merci de réessayer."
): string {
  const err = error as { response?: { data?: { message?: string; errors?: Record<string, string> } } };
  const data = err?.response?.data;
  if (!data) return fallback;
  if (data.message) return data.message;
  if (data.errors) {
    const firstKey = Object.keys(data.errors)[0];
    return data.errors[firstKey] || fallback;
  }
  return fallback;
}

// ---- Types ----
export type ServiceCategory =
  | "HAMMAM_PRIVE"
  | "SOINS"
  | "SPA_MASSAGE"
  | "BEAUTE";

export type SpaService = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: ServiceCategory;
  durationMinutes: number;
  price: number;
  imageUrl?: string;
  active: boolean;
  displayOrder: number;
};

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

/** Correspond à BookingResponse côté backend (à plat, pas d'entité imbriquée). */
export type Booking = {
  id: number;
  serviceId: number;
  serviceName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  notes?: string;
};

export type BookingRequest = {
  serviceId: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  startTime: string;
  notes?: string;
};

export type DayOfWeekName =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type BusinessHours = {
  id?: number;
  dayOfWeek: DayOfWeekName;
  open: boolean;
  openTime?: string | null;
  closeTime?: string | null;
};

export type BlockedDate = {
  id: number;
  date: string;
  reason?: string;
};

export type AdminStats = {
  totalBookings: number;
  todayBookings: number;
  busiestSlot: string;
  topService: string;
};

// ---- Services (public) ----
export const listServices = (category?: string) =>
  api
    .get<SpaService[]>("/api/services", { params: category ? { category } : {} })
    .then((r) => r.data);

export const getService = (id: number) =>
  api.get<SpaService>(`/api/services/${id}`).then((r) => r.data);

// ---- Disponibilités ----
export const getAvailability = (serviceId: number, date: string) =>
  api
    .get<string[]>("/api/availability", { params: { serviceId, date } })
    .then((r) => r.data);

// ---- Réservations (public) ----
export const createBooking = (payload: BookingRequest) =>
  api.post<Booking>("/api/bookings", payload).then((r) => r.data);

export const lookupBookingsByEmail = (email: string) =>
  api
    .get<Booking[]>(`/api/bookings/lookup/${encodeURIComponent(email)}`)
    .then((r) => r.data);

export const cancelBooking = (id: number) => api.patch(`/api/bookings/${id}/cancel`);

// ---- Admin (nécessite un token JWT, cf. lib/auth.ts) ----
export const adminListServices = () =>
  api.get<SpaService[]>("/api/admin/services").then((r) => r.data);

export const adminCreateService = (payload: Partial<SpaService>) =>
  api.post<SpaService>("/api/admin/services", payload).then((r) => r.data);

export const adminUpdateService = (id: number, payload: Partial<SpaService>) =>
  api.put<SpaService>(`/api/admin/services/${id}`, payload).then((r) => r.data);

export const adminDeleteService = (id: number) => api.delete(`/api/admin/services/${id}`);

export const adminListBookings = (params?: { from?: string; to?: string }) =>
  api.get<Booking[]>("/api/admin/bookings", { params }).then((r) => r.data);

export const adminUpdateBookingStatus = (id: number, status: BookingStatus) =>
  api
    .patch<Booking>(`/api/admin/bookings/${id}/status`, null, { params: { status } })
    .then((r) => r.data);

export const adminGetStats = () =>
  api.get<AdminStats>("/api/admin/stats").then((r) => r.data);

export const adminGetBusinessHours = () =>
  api.get<BusinessHours[]>("/api/admin/business-hours").then((r) => r.data);

export const adminUpdateBusinessHours = (day: DayOfWeekName, payload: BusinessHours) =>
  api
    .put<BusinessHours>(`/api/admin/business-hours/${day}`, payload)
    .then((r) => r.data);

export const adminGetBlockedDates = () =>
  api.get<BlockedDate[]>("/api/admin/blocked-dates").then((r) => r.data);

export const adminAddBlockedDate = (payload: { date: string; reason?: string }) =>
  api.post<BlockedDate>("/api/admin/blocked-dates", payload).then((r) => r.data);

export const adminRemoveBlockedDate = (id: number) =>
  api.delete(`/api/admin/blocked-dates/${id}`);
