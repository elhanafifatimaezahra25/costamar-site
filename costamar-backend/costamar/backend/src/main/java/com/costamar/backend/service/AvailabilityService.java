package com.costamar.backend.service;

import com.costamar.backend.entity.BusinessHours;
import com.costamar.backend.entity.SpaService;
import com.costamar.backend.repository.BlockedDateRepository;
import com.costamar.backend.repository.BookingRepository;
import com.costamar.backend.repository.BusinessHoursRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AvailabilityService {

    /** Intervalle entre deux créneaux proposés (en minutes) */
    private static final int SLOT_STEP_MINUTES = 30;

    private final BusinessHoursRepository businessHoursRepository;
    private final BlockedDateRepository blockedDateRepository;
    private final BookingRepository bookingRepository;
    private final SpaServiceManager spaServiceManager;

    /**
     * Calcule les créneaux disponibles pour un service donné, à une date donnée,
     * en tenant compte des horaires d'ouverture, des jours bloqués et des
     * réservations déjà existantes.
     */
    public List<LocalTime> getAvailableSlots(Long serviceId, LocalDate date) {
        SpaService service = spaServiceManager.getById(serviceId);

        if (blockedDateRepository.existsByDate(date)) {
            return List.of();
        }

        BusinessHours hours = businessHoursRepository.findByDayOfWeek(date.getDayOfWeek())
                .orElse(null);

        if (hours == null || !hours.isOpen() || hours.getOpenTime() == null || hours.getCloseTime() == null) {
            return List.of();
        }

        int duration = service.getDurationMinutes();
        List<LocalTime> slots = new ArrayList<>();

        LocalTime cursor = hours.getOpenTime();

        while (!cursor.plusMinutes(duration).isAfter(hours.getCloseTime())) {
            LocalDateTime candidateStart = LocalDateTime.of(date, cursor);
            LocalDateTime candidateEnd = candidateStart.plusMinutes(duration);

            boolean inThePast = candidateStart.isBefore(LocalDateTime.now());
            boolean hasOverlap = !bookingRepository
                    .findOverlapping(serviceId, candidateStart, candidateEnd)
                    .isEmpty();

            if (!inThePast && !hasOverlap) {
                slots.add(cursor);
            }

            cursor = cursor.plusMinutes(SLOT_STEP_MINUTES);
        }

        return slots;
    }
}
