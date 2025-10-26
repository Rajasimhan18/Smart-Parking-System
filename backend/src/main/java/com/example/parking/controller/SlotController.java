package com.example.parking.controller;

import com.example.parking.model.ParkingSlot;
import com.example.parking.repository.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin(origins = "http://localhost:3000")
public class SlotController {

    @Autowired
    private ParkingSlotRepository slotRepository;

    @GetMapping
    public List<ParkingSlot> getAllSlots() {
        return slotRepository.findAll();
    }

    @PostMapping
    public ParkingSlot createSlot(@RequestBody ParkingSlot slot) {
        return slotRepository.save(slot);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSlot(@PathVariable Long id) {
        slotRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        List<ParkingSlot> slots = slotRepository.findAll();
        long occupied = slots.stream().filter(ParkingSlot::isOccupied).count();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", slots.size());
        stats.put("occupied", occupied);
        stats.put("available", slots.size() - occupied);
        
        return stats;
    }
}