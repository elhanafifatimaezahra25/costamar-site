package com.costamar.backend.config;

import com.costamar.backend.entity.*;
import com.costamar.backend.repository.BusinessHoursRepository;
import com.costamar.backend.repository.SpaServiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final SpaServiceRepository serviceRepository;
    private final BusinessHoursRepository businessHoursRepository;

    @Override
    public void run(String... args) {
        seedBusinessHours();
        seedServices();
    }

    private void seedBusinessHours() {
        if (businessHoursRepository.count() > 0) return;

        for (DayOfWeek day : DayOfWeek.values()) {
            boolean isSunday = day == DayOfWeek.SUNDAY;
            businessHoursRepository.save(BusinessHours.builder()
                    .dayOfWeek(day)
                    .open(!isSunday)
                    .openTime(isSunday ? null : LocalTime.of(9, 30))
                    .closeTime(isSunday ? null : LocalTime.of(19, 30))
                    .build());
        }
        log.info("Horaires d'ouverture initialisés (fermé le dimanche)");
    }

    private void seedServices() {
        if (serviceRepository.count() > 0) return;

        serviceRepository.save(SpaService.builder()
                .name("Rituel Impérial")
                .slug("rituel-imperial")
                .description("Protocole royal mêlant huiles précieuses et techniques ancestrales pour une peau veloutée et une relaxation absolue.")
                .category(ServiceCategory.HAMMAM_PRIVE)
                .durationMinutes(90)
                .price(new BigDecimal("450"))
                .displayOrder(1)
                .build());

        serviceRepository.save(SpaService.builder()
                .name("Éclat & Hydratation")
                .slug("eclat-hydratation")
                .description("Cure intensive redonnant à votre teint toute sa lumière naturelle et sa vitalité, pour un éclat de peau inoubliable.")
                .category(ServiceCategory.SOINS)
                .durationMinutes(60)
                .price(new BigDecimal("320"))
                .displayOrder(2)
                .build());

        serviceRepository.save(SpaService.builder()
                .name("Privatisation Signature")
                .slug("privatisation-signature")
                .description("Espace réservé exclusivement pour vous, orchestré selon vos envies et vos besoins dans une atmosphère de sérénité totale.")
                .category(ServiceCategory.HAMMAM_PRIVE)
                .durationMinutes(120)
                .price(new BigDecimal("650"))
                .displayOrder(3)
                .build());

        serviceRepository.save(SpaService.builder()
                .name("Gommage au Savon Noir")
                .slug("gommage-savon-noir")
                .description("Le rituel traditionnel du hammam marocain : vapeur, savon noir et gant kessa pour une peau neuve.")
                .category(ServiceCategory.HAMMAM_PRIVE)
                .durationMinutes(45)
                .price(new BigDecimal("220"))
                .displayOrder(4)
                .build());

        serviceRepository.save(SpaService.builder()
                .name("Massage Signature Costamar")
                .slug("massage-signature")
                .description("Un massage sur-mesure aux huiles chaudes, pensé pour dénouer les tensions et apaiser l'esprit.")
                .category(ServiceCategory.SPA_MASSAGE)
                .durationMinutes(60)
                .price(new BigDecimal("380"))
                .displayOrder(5)
                .build());

        serviceRepository.save(SpaService.builder()
                .name("Soin du Visage Sur-Mesure")
                .slug("soin-visage-sur-mesure")
                .description("Diagnostic de peau puis protocole personnalisé pour répondre précisément aux besoins de votre visage.")
                .category(ServiceCategory.BEAUTE)
                .durationMinutes(75)
                .price(new BigDecimal("400"))
                .displayOrder(6)
                .build());

        log.info("Services de démonstration créés");
    }
}
