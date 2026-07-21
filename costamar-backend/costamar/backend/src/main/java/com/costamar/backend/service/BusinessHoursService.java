package com.costamar.backend.service;

import com.costamar.backend.entity.BusinessHours;
import com.costamar.backend.repository.BusinessHoursRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BusinessHoursService {

    private final BusinessHoursRepository repository;

    public List<BusinessHours> getAll() {
        return repository.findAll();
    }

    public BusinessHours upsert(DayOfWeek day, BusinessHours updated) {
        BusinessHours existing = repository.findByDayOfWeek(day).orElseGet(() -> {
            BusinessHours bh = new BusinessHours();
            bh.setDayOfWeek(day);
            return bh;
        });
        existing.setOpen(updated.isOpen());
        existing.setOpenTime(updated.getOpenTime());
        existing.setCloseTime(updated.getCloseTime());
        return repository.save(existing);
    }
}
