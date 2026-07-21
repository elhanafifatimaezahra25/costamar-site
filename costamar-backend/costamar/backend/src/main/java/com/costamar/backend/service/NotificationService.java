package com.costamar.backend.service;

import com.costamar.backend.entity.Booking;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

/**
 * Envoi d'emails best-effort : une erreur d'envoi ne doit jamais faire
 * échouer la création d'une réservation.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from:contact@costamar-hammam.com}")
    private String fromAddress;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy 'à' HH:mm");

    public void sendBookingConfirmationEmail(Booking booking) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromAddress);
            message.setTo(booking.getClientEmail());
            message.setSubject("Costamar Hammam & Spa — Demande de réservation reçue");
            message.setText("""
                    Bonjour %s,

                    Nous avons bien reçu votre demande de réservation pour :

                    Soin : %s
                    Date : %s

                    Notre équipe va confirmer votre créneau très prochainement.

                    À très vite,
                    L'équipe Costamar Hammam & Spa
                    """.formatted(
                    booking.getClientName(),
                    booking.getService().getName(),
                    booking.getStartTime().format(FORMATTER)
            ));
            mailSender.send(message);
        } catch (Exception ex) {
            log.warn("Échec de l'envoi de l'email de confirmation pour la réservation {} : {}",
                    booking.getId(), ex.getMessage());
        }
    }

    public void sendBookingStatusUpdateEmail(Booking booking) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromAddress);
            message.setTo(booking.getClientEmail());
            message.setSubject("Costamar Hammam & Spa — Réservation confirmée");
            message.setText("""
                    Bonjour %s,

                    Votre réservation est confirmée :

                    Soin : %s
                    Date : %s

                    Nous avons hâte de vous accueillir.

                    L'équipe Costamar Hammam & Spa
                    """.formatted(
                    booking.getClientName(),
                    booking.getService().getName(),
                    booking.getStartTime().format(FORMATTER)
            ));
            mailSender.send(message);
        } catch (Exception ex) {
            log.warn("Échec de l'envoi de l'email de statut pour la réservation {} : {}",
                    booking.getId(), ex.getMessage());
        }
    }
}
