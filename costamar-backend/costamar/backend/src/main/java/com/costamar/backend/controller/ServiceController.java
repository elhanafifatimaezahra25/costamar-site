package com.costamar.backend.controller;

import com.costamar.backend.entity.ServiceCategory;
import com.costamar.backend.entity.SpaService;
import com.costamar.backend.service.SpaServiceManager;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {

    private final SpaServiceManager spaServiceManager;

    @GetMapping
    public ResponseEntity<List<SpaService>> listActive(
            @RequestParam(required = false) ServiceCategory category) {
        if (category != null) {
            return ResponseEntity.ok(spaServiceManager.listByCategory(category));
        }
        return ResponseEntity.ok(spaServiceManager.listActive());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpaService> getById(@PathVariable Long id) {
        return ResponseEntity.ok(spaServiceManager.getById(id));
    }
}
