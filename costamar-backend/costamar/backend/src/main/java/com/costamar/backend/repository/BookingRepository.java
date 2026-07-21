package com.costamar.backend.repository;

import com.costamar.backend.entity.Booking;
import com.costamar.backend.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByClientEmailOrderByStartTimeDesc(String email);

    List<Booking> findByStartTimeBetweenOrderByStartTimeAsc(LocalDateTime from, LocalDateTime to);

    @Query("""
            SELECT b FROM Booking b
            WHERE b.service.id = :serviceId
              AND b.status <> com.costamar.backend.entity.BookingStatus.CANCELLED
              AND b.startTime < :end
              AND b.endTime > :start
            """)
    List<Booking> findOverlapping(@Param("serviceId") Long serviceId,
                                   @Param("start") LocalDateTime start,
                                   @Param("end") LocalDateTime end);

    @Query("""
            SELECT b FROM Booking b
            WHERE b.status <> com.costamar.backend.entity.BookingStatus.CANCELLED
              AND b.startTime < :end
              AND b.endTime > :start
            """)
    List<Booking> findAllOverlappingAnyService(@Param("start") LocalDateTime start,
                                                @Param("end") LocalDateTime end);

    List<Booking> findByStatus(BookingStatus status);
}
