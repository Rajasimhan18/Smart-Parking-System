# Smart Parking System

A modern web application for managing parking slots and reservations efficiently. The system allows users to view available parking slots, make reservations, and administrators to manage the parking system.

## Features

- **Real-time Parking Slot Management**
  - View total, occupied, and available parking slots
  - Visual representation of parking slot status
  - Real-time updates of slot availability

- **Reservation System**
  - Easy slot reservation process
  - Vehicle number validation (Indian format)
  - QR code generation for payments
  - Active reservations tracking

- **Admin Panel**
  - Secure admin authentication
  - Manage parking slots
  - Monitor reservations
  - System statistics

## Technology Stack

### Backend
- Java Spring Boot
- Spring Security with JWT Authentication
- Spring Data JPA
- MySQL Database
- Maven

### Frontend
- React.js
- Material-UI (MUI)
- React Router
- Axios for API calls

## Prerequisites

- Node.js (v14 or higher)
- Java JDK 11 or higher
- Maven
- MySQL Server

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure MySQL database in `src/main/resources/application.properties`

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   The backend server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- POST `/api/auth/login` - Admin login
- POST `/api/auth/register` - Admin registration (protected)

### Parking Slots
- GET `/api/slots` - Get all parking slots
- GET `/api/slots/stats` - Get parking statistics
- POST `/api/slots` - Add new parking slot (Admin only)
- PUT `/api/slots/{id}` - Update slot status (Admin only)

### Reservations
- POST `/api/reservations` - Create new reservation
- GET `/api/reservations` - Get all reservations
- GET `/api/reservations/active` - Get active reservations
- PUT `/api/reservations/{id}` - Update reservation status

## Security

- JWT-based authentication
- Password encryption using BCrypt
- Role-based access control
- Protected admin endpoints

## Screenshots

[You can add screenshots of your application here]

## Future Enhancements

- Payment gateway integration
- Mobile application
- Multiple parking locations support
- Advanced analytics and reporting
- Automated number plate recognition

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.