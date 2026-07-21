package com.costamar.backend.repository;

import com.costamar.backend.entity.BlockedDate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface BlockedDateRepository extends JpaRepository<BlockedDate, Long> {
    Optional<BlockedDate> findByDate(LocalDate date);
    boolean existsByDate(LocalDate date);
}
