package com.example.parking.config;

import com.example.parking.model.User;
import com.example.parking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) {
        try {
            // Create default admin user if it doesn't exist
            userService.loadUserByUsername("admin");
        } catch (UsernameNotFoundException e) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword("Rajasimhan18");
            adminUser.setRole("ADMIN");
            userService.createUser(adminUser);
        }
    }
}