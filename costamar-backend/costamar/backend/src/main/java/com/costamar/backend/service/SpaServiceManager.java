package com.costamar.backend.service;

import com.costamar.backend.dto.service.ServiceDto;
import com.costamar.backend.entity.ServiceCategory;
import com.costamar.backend.entity.SpaService;
import com.costamar.backend.exception.ResourceNotFoundException;
import com.costamar.backend.repository.SpaServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.List;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class SpaServiceManager {

    private final SpaServiceRepository serviceRepository;

    public List<SpaService> listActive() {
        return serviceRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }

    public List<SpaService> listByCategory(ServiceCategory category) {
        return serviceRepository.findByCategoryAndActiveTrueOrderByDisplayOrderAsc(category);
    }

    public List<SpaService> listAll() {
        return serviceRepository.findAll();
    }

    public SpaService getById(Long id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service introuvable : " + id));
    }

    public SpaService create(ServiceDto dto) {
        SpaService entity = SpaService.builder()
                .name(dto.getName())
                .slug(generateUniqueSlug(dto.getName()))
                .description(dto.getDescription())
                .category(dto.getCategory())
                .durationMinutes(dto.getDurationMinutes())
                .price(dto.getPrice())
                .imageUrl(dto.getImageUrl())
                .active(dto.isActive())
                .displayOrder(dto.getDisplayOrder())
                .build();
        return serviceRepository.save(entity);
    }

    public SpaService update(Long id, ServiceDto dto) {
        SpaService entity = getById(id);
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setCategory(dto.getCategory());
        entity.setDurationMinutes(dto.getDurationMinutes());
        entity.setPrice(dto.getPrice());
        entity.setImageUrl(dto.getImageUrl());
        entity.setActive(dto.isActive());
        entity.setDisplayOrder(dto.getDisplayOrder());
        return serviceRepository.save(entity);
    }

    public void delete(Long id) {
        SpaService entity = getById(id);
        serviceRepository.delete(entity);
    }

    private String generateUniqueSlug(String name) {
        String base = slugify(name);
        String slug = base;
        int counter = 1;
        while (serviceRepository.existsBySlug(slug)) {
            slug = base + "-" + counter++;
        }
        return slug;
    }

    private String slugify(String input) {
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        String stripped = Pattern.compile("\\p{InCombiningDiacriticalMarks}+").matcher(normalized).replaceAll("");
        return stripped.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .trim()
                .replaceAll("\\s+", "-");
    }
}
