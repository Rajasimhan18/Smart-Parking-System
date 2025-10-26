# Smart Parking System

A Spring Boot application for managing parking slots and reservations.

## Prerequisites

- Java 17
- MySQL 8.0
- Maven

## Database Setup

1. Install MySQL if not already installed
2. Create a database named 'parking_db' (will be created automatically by Spring Boot)
3. Update database credentials in `application.properties` if needed

## Running the Application

1. Clone the repository
2. Navigate to the project directory
3. Run the following command:
   ```bash
   mvn spring-boot:run
   ```

## API Endpoints

### Parking Slots
- GET `/api/slots` - Get all parking slots
- POST `/api/slots` - Create a new parking slot
- DELETE `/api/slots/{id}` - Delete a parking slot
- GET `/api/slots/stats` - Get parking statistics

### Reservations
- GET `/api/reservations/active` - Get all active reservations
- POST `/api/reservations` - Create a new reservation
- PUT `/api/reservations/{id}/end` - End a reservation

## Development

This project uses:
- Spring Boot 3.1.5
- Spring Data JPA
- MySQL
- Lombok
- Maven