package com.example.parking.controller;

import com.example.parking.model.ParkingSlot;
import com.example.parking.model.Reservation;
import com.example.parking.repository.ParkingSlotRepository;
import com.example.parking.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;
    
    @Autowired
    private ParkingSlotRepository slotRepository;

    @GetMapping("/active")
    public List<Reservation> getActiveReservations() {
        return reservationRepository.findByEndTimeIsNullOrEndTimeAfter(LocalDateTime.now());
    }

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody Reservation reservation) {
        ParkingSlot slot = slotRepository.findById(reservation.getSlot().getId())
            .orElseThrow(() -> new RuntimeException("Slot not found"));
            
        if (slot.isOccupied()) {
            return ResponseEntity.badRequest().body("Slot is already occupied");
        }
        
        slot.setOccupied(true);
        slotRepository.save(slot);
        
        reservation.setStartTime(LocalDateTime.now());
        reservation.setEndTime(null);  // Explicitly set endTime to null for new reservations
        reservation.setAmount(50.0);  // Setting a fixed amount of Rs. 50 for parking
        reservation.setPaymentCompleted(false);
        return ResponseEntity.ok(reservationRepository.save(reservation));
    }

    @PutMapping("/{id}/end")
    public ResponseEntity<?> endReservation(@PathVariable Long id) {
        Reservation reservation = reservationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Reservation not found"));
            
        reservation.setEndTime(LocalDateTime.now());
        
        ParkingSlot slot = reservation.getSlot();
        slot.setOccupied(false);
        slotRepository.save(slot);
        
        return ResponseEntity.ok(reservationRepository.save(reservation));
    }
}