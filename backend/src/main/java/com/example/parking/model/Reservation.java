package com.example.parking.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String userName;
    private String vehicleNumber;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Double amount;
    private Boolean paymentCompleted = false;
    
    @ManyToOne
    @JoinColumn(name = "slot_id")
    private ParkingSlot slot;
}