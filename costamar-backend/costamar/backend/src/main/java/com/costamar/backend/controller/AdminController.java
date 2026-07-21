package com.costamar.backend.controller;

import com.costamar.backend.dto.booking.BookingResponse;
import com.costamar.backend.dto.service.ServiceDto;
import com.costamar.backend.entity.BlockedDate;
import com.costamar.backend.entity.Booking;
import com.costamar.backend.entity.BookingStatus;
import com.costamar.backend.entity.BusinessHours;
import com.costamar.backend.entity.SpaService;
import com.costamar.backend.service.BlockedDateService;
import com.costamar.backend.service.BookingService;
import com.costamar.backend.service.BusinessHoursService;
import com.costamar.backend.service.SpaServiceManager;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Tableau de bord administrateur : pas d'authentification, accessible
 * directement (conformément au cahier des charges du site).
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final SpaServiceManager spaServiceManager;
    private final BookingService bookingService;
    private final BusinessHoursService businessHoursService;
    private final BlockedDateService blockedDateService;

    // ---------- Statistiques ----------

    @GetMapping("/stats")
    public ResponseEntity<java.util.Map<String, Object>> getStats() {
        return ResponseEntity.ok(bookingService.getStats());
    }

    // ---------- Services ----------

    @GetMapping("/services")
    public ResponseEntity<List<SpaService>> listAllServices() {
        return ResponseEntity.ok(spaServiceManager.listAll());
    }

    @PostMapping("/services")
    public ResponseEntity<SpaService> createService(@Valid @RequestBody ServiceDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(spaServiceManager.create(dto));
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<SpaService> updateService(@PathVariable Long id, @Valid @RequestBody ServiceDto dto) {
        return ResponseEntity.ok(spaServiceManager.update(id, dto));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        spaServiceManager.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ---------- Réservations ----------

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingResponse>> listBookings(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to) {

        List<Booking> bookings = (from != null && to != null)
                ? bookingService.findBetween(from, to)
                : bookingService.findAll();

        return ResponseEntity.ok(bookings.stream().map(BookingResponse::fromEntity).toList());
    }

    @PatchMapping("/bookings/{id}/status")
    public ResponseEntity<BookingResponse> updateBookingStatus(
            @PathVariable Long id, @RequestParam BookingStatus status) {
        Booking updated = bookingService.updateStatus(id, status);
        return ResponseEntity.ok(BookingResponse.fromEntity(updated));
    }

    // ---------- Horaires d'ouverture ----------

    @GetMapping("/business-hours")
    public ResponseEntity<List<BusinessHours>> getBusinessHours() {
        return ResponseEntity.ok(businessHoursService.getAll());
    }

    @PutMapping("/business-hours/{day}")
    public ResponseEntity<BusinessHours> updateBusinessHours(
            @PathVariable DayOfWeek day, @RequestBody BusinessHours hours) {
        return ResponseEntity.ok(businessHoursService.upsert(day, hours));
    }

    // ---------- Jours de fermeture exceptionnelle ----------

    @GetMapping("/blocked-dates")
    public ResponseEntity<List<BlockedDate>> getBlockedDates() {
        return ResponseEntity.ok(blockedDateService.getAll());
    }

    @PostMapping("/blocked-dates")
    public ResponseEntity<BlockedDate> addBlockedDate(@RequestBody BlockedDate blockedDate) {
        return ResponseEntity.status(HttpStatus.CREATED).body(blockedDateService.add(blockedDate));
    }

    @DeleteMapping("/blocked-dates/{id}")
    public ResponseEntity<Void> removeBlockedDate(@PathVariable Long id) {
        blockedDateService.remove(id);
        return ResponseEntity.noContent().build();
    }
}
