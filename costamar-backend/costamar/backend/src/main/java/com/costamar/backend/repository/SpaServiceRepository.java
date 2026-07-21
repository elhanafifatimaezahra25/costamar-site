package com.costamar.backend.repository;

import com.costamar.backend.entity.ServiceCategory;
import com.costamar.backend.entity.SpaService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SpaServiceRepository extends JpaRepository<SpaService, Long> {
    List<SpaService> findByActiveTrueOrderByDisplayOrderAsc();
    List<SpaService> findByCategoryAndActiveTrueOrderByDisplayOrderAsc(ServiceCategory category);
    Optional<SpaService> findBySlug(String slug);
    boolean existsBySlug(String slug);
}
