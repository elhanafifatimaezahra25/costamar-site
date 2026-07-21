package com.costamar.backend.dto.booking;

import com.costamar.backend.entity.Booking;
import com.costamar.backend.entity.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {
    private Long id;
    private Long serviceId;
    private String serviceName;
    private String clientName;
    private String clientEmail;
    private String clientPhone;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private BookingStatus status;
    private String notes;

    public static BookingResponse fromEntity(Booking b) {
        return BookingResponse.builder()
                .id(b.getId())
                .serviceId(b.getService().getId())
                .serviceName(b.getService().getName())
                .clientName(b.getClientName())
                .clientEmail(b.getClientEmail())
                .clientPhone(b.getClientPhone())
                .startTime(b.getStartTime())
                .endTime(b.getEndTime())
                .status(b.getStatus())
                .notes(b.getNotes())
                .build();
    }
}
