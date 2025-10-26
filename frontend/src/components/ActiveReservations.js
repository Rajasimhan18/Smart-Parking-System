import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@mui/material';
import { parkingService } from '../services/parkingService';

const ActiveReservations = () => {
    const [reservations, setReservations] = useState([]);

    const fetchReservations = async () => {
        try {
            const response = await parkingService.getActiveReservations();
            setReservations(response.data || []);
        } catch (error) {
            console.error('Error fetching reservations:', error);
            setReservations([]);
        }
    };

    useEffect(() => {
        fetchReservations();
        const interval = setInterval(fetchReservations, 5000); // Refresh every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const handleEndReservation = async (id) => {
        try {
            await parkingService.endReservation(id);
            fetchReservations();
        } catch (error) {
            console.error('Error ending reservation:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
                Active Reservations
            </Typography>
            
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Slot Number</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Vehicle Number</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations.map((reservation) => (
                            <TableRow key={reservation.id}>
                                <TableCell>{reservation.slot.slotNumber}</TableCell>
                                <TableCell>{reservation.userName}</TableCell>
                                <TableCell>{reservation.vehicleNumber}</TableCell>
                                <TableCell>
                                    {new Date(reservation.startTime).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleEndReservation(reservation.id)}
                                    >
                                        End Reservation
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ActiveReservations;