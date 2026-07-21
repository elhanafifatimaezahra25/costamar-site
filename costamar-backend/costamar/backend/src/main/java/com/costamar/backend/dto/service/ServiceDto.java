package com.costamar.backend.dto.service;

import com.costamar.backend.entity.ServiceCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ServiceDto {
    private Long id;

    @NotBlank(message = "Le nom du service est requis")
    private String name;

    private String slug;

    private String description;

    @NotNull(message = "La catégorie est requise")
    private ServiceCategory category;

    @NotNull(message = "La durée est requise")
    @Positive(message = "La durée doit être positive")
    private Integer durationMinutes;

    @NotNull(message = "Le prix est requis")
    @Positive(message = "Le prix doit être positif")
    private BigDecimal price;

    private String imageUrl;

    private boolean active = true;

    private Integer displayOrder = 0;
}
