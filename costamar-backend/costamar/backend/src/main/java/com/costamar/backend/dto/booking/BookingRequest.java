package com.costamar.backend.dto.booking;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookingRequest {

    @NotNull(message = "Le service est requis")
    private Long serviceId;

    @NotNull(message = "La date et l'heure sont requises")
    @Future(message = "La date doit être dans le futur")
    private LocalDateTime startTime;

    @NotBlank(message = "Le nom est requis")
    private String clientName;

    @NotBlank(message = "L'email est requis")
    @Email(message = "Format d'email invalide")
    private String clientEmail;

    private String clientPhone;

    private String notes;
}
