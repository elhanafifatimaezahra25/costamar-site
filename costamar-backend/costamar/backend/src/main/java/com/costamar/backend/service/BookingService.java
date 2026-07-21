package com.costamar.backend.service;

import com.costamar.backend.dto.booking.BookingRequest;
import com.costamar.backend.entity.Booking;
import com.costamar.backend.entity.BookingStatus;
import com.costamar.backend.entity.SpaService;
import com.costamar.backend.exception.BookingConflictException;
import com.costamar.backend.exception.ResourceNotFoundException;
import com.costamar.backend.repository.BlockedDateRepository;
import com.costamar.backend.repository.BookingRepository;
import com.costamar.backend.repository.BusinessHoursRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SpaServiceManager spaServiceManager;
    private final BusinessHoursRepository businessHoursRepository;
    private final BlockedDateRepository blockedDateRepository;
    private final NotificationService notificationService;

    @Transactional
    public Booking createBooking(BookingRequest request) {
        SpaService service = spaServiceManager.getById(request.getServiceId());

        LocalDateTime start = request.getStartTime();
        LocalDateTime end = start.plusMinutes(service.getDurationMinutes());

        if (blockedDateRepository.existsByDate(start.toLocalDate())) {
            throw new BookingConflictException("Le salon est fermé à cette date");
        }

        businessHoursRepository.findByDayOfWeek(start.getDayOfWeek())
                .filter(h -> h.isOpen() && h.getOpenTime() != null && h.getCloseTime() != null)
                .filter(h -> !start.toLocalTime().isBefore(h.getOpenTime()) && !end.toLocalTime().isAfter(h.getCloseTime()))
                .orElseThrow(() -> new BookingConflictException("Ce créneau est en dehors des horaires d'ouverture"));

        List<Booking> overlapping = bookingRepository.findOverlapping(service.getId(), start, end);
        if (!overlapping.isEmpty()) {
            throw new BookingConflictException(
                    "Ce créneau vient d'être réservé par un autre client. Veuillez sélectionner un autre horaire.");
        }

        Booking booking = Booking.builder()
                .service(service)
                .clientName(request.getClientName())
                .clientEmail(request.getClientEmail().toLowerCase())
                .clientPhone(request.getClientPhone())
                .startTime(start)
                .endTime(end)
                .status(BookingStatus.PENDING)
                .notes(request.getNotes())
                .build();

        Booking saved;
        try {
            // flush() force l'écriture SQL immédiate : si deux requêtes concurrentes
            // passent le contrôle de chevauchement en même temps, la contrainte
            // unique (service_id, start_time) en base fait échouer la seconde.
            saved = bookingRepository.saveAndFlush(booking);
        } catch (DataIntegrityViolationException ex) {
            throw new BookingConflictException(
                    "Ce créneau vient d'être réservé par un autre client. Veuillez sélectionner un autre horaire.");
        }

        notificationService.sendBookingConfirmationEmail(saved);
        return saved;
    }

    public List<Booking> findByEmail(String email) {
        return bookingRepository.findByClientEmailOrderByStartTimeDesc(email.toLowerCase());
    }

    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    public List<Booking> findBetween(LocalDateTime from, LocalDateTime to) {
        return bookingRepository.findByStartTimeBetweenOrderByStartTimeAsc(from, to);
    }

    @Transactional
    public Booking updateStatus(Long bookingId, BookingStatus status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Réservation introuvable : " + bookingId));
        booking.setStatus(status);
        Booking saved = bookingRepository.save(booking);

        if (status == BookingStatus.CONFIRMED) {
            notificationService.sendBookingStatusUpdateEmail(saved);
        }
        return saved;
    }

    @Transactional
    public void cancel(Long bookingId) {
        updateStatus(bookingId, BookingStatus.CANCELLED);
    }

    /** Statistiques utilisées par le tableau de bord administrateur. */
    public Map<String, Object> getStats() {
        List<Booking> all = bookingRepository.findAll();
        LocalDate today = LocalDate.now();

        long total = all.size();
        long todayCount = all.stream()
                .filter(b -> b.getStartTime().toLocalDate().isEqual(today))
                .count();

        String busiestSlot = all.stream()
                .collect(Collectors.groupingBy(b -> b.getStartTime().toLocalTime(), Collectors.counting()))
                .entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(e -> e.getKey().toString())
                .orElse(null);

        String topService = all.stream()
                .collect(Collectors.groupingBy(b -> b.getService().getName(), Collectors.counting()))
                .entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);

        return Map.of(
                "totalBookings", total,
                "todayBookings", todayCount,
                "busiestSlot", busiestSlot == null ? "—" : busiestSlot,
                "topService", topService == null ? "—" : topService
        );
    }
}
