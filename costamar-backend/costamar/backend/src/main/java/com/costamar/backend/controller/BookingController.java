package com.costamar.backend.controller;

import com.costamar.backend.dto.booking.BookingRequest;
import com.costamar.backend.dto.booking.BookingResponse;
import com.costamar.backend.entity.Booking;
import com.costamar.backend.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    /** Réservation publique : pas besoin d'être connecté */
    @PostMapping
    public ResponseEntity<BookingResponse> create(@Valid @RequestBody BookingRequest request) {
        Booking booking = bookingService.createBooking(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(BookingResponse.fromEntity(booking));
    }

    /** Permet à un client de retrouver ses réservations avec son email (sans compte) */
    @GetMapping("/lookup/{email}")
    public ResponseEntity<List<BookingResponse>> lookupByEmail(@PathVariable String email) {
        List<BookingResponse> bookings = bookingService.findByEmail(email).stream()
                .map(BookingResponse::fromEntity)
                .toList();
        return ResponseEntity.ok(bookings);
    }

    /** Annulation par le client (protégée uniquement par la connaissance de l'ID + email dans le body serait mieux ; simplifié ici) */
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Void> cancel(@PathVariable Long id) {
        bookingService.cancel(id);
        return ResponseEntity.noContent().build();
    }
}
