package com.costamar.backend.repository;

import com.costamar.backend.entity.BusinessHours;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.DayOfWeek;
import java.util.Optional;

public interface BusinessHoursRepository extends JpaRepository<BusinessHours, Long> {
    Optional<BusinessHours> findByDayOfWeek(DayOfWeek dayOfWeek);
}
