package com.example.parking.repository;

import com.example.parking.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByEndTimeAfter(LocalDateTime time);
    List<Reservation> findByEndTimeIsNullOrEndTimeAfter(LocalDateTime time);
}