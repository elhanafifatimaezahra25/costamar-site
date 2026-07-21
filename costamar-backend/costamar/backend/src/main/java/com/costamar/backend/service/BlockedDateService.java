package com.costamar.backend.service;

import com.costamar.backend.entity.BlockedDate;
import com.costamar.backend.exception.ResourceNotFoundException;
import com.costamar.backend.repository.BlockedDateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlockedDateService {

    private final BlockedDateRepository repository;

    public List<BlockedDate> getAll() {
        return repository.findAll();
    }

    public BlockedDate add(BlockedDate blockedDate) {
        return repository.save(blockedDate);
    }

    public void remove(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Date bloquée introuvable : " + id);
        }
        repository.deleteById(id);
    }
}
