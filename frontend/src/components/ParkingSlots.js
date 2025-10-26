import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Box,
    Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaymentQRCode from './PaymentQRCode';
import { parkingService } from '../services/parkingService';

const StyledCard = styled(Card)(({ theme, isOccupied }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
    background: isOccupied ? 
        'linear-gradient(45deg, #ffebee 30%, #ffcdd2 90%)' : 
        'linear-gradient(45deg, #e8f5e9 30%, #c8e6c9 90%)',
}));

const StatsCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    background: 'linear-gradient(45deg, #e3f2fd 30%, #bbdefb 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
}));

const ParkingSlots = () => {
    const [slots, setSlots] = useState([]);
    const [stats, setStats] = useState({ total: 0, occupied: 0, available: 0 });
    const [openDialog, setOpenDialog] = useState(false);
    const [reservationData, setReservationData] = useState({
        userName: '',
        vehicleNumber: '',
        slot: null
    });
    const [formErrors, setFormErrors] = useState({
        userName: '',
        vehicleNumber: ''
    });
    const [showPayment, setShowPayment] = useState(false);
    const [currentReservation, setCurrentReservation] = useState(null);

    const fetchSlots = async () => {
        try {
            const response = await parkingService.getAllSlots();
            setSlots(response.data);
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await parkingService.getStats();
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        fetchSlots();
        fetchStats();
    }, []);

    const handleReserve = (slot) => {
        setReservationData({ ...reservationData, slot });
        setOpenDialog(true);
    };

    const validateVehicleNumber = (number) => {
        // Regex for Indian vehicle number format (e.g., TN01AB1234, KA02CD5678)
        const vehicleNumberRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
        return vehicleNumberRegex.test(number);
    };

    const handleReservationSubmit = async () => {
        // Reset errors
        setFormErrors({
            userName: '',
            vehicleNumber: ''
        });

        // Validate inputs
        let hasErrors = false;
        const newErrors = {
            userName: '',
            vehicleNumber: ''
        };

        if (!reservationData.userName.trim()) {
            newErrors.userName = 'Name is required';
            hasErrors = true;
        }

        if (!reservationData.vehicleNumber) {
            newErrors.vehicleNumber = 'Vehicle number is required';
            hasErrors = true;
        } else if (!validateVehicleNumber(reservationData.vehicleNumber)) {
            newErrors.vehicleNumber = 'Invalid format. Use format: TN01AB1234';
            hasErrors = true;
        }

        if (hasErrors) {
            setFormErrors(newErrors);
            return;
        }

        try {
            const response = await parkingService.createReservation(reservationData);
            setOpenDialog(false);
            setCurrentReservation(response.data);
            setShowPayment(true);
            setReservationData({ userName: '', vehicleNumber: '', slot: null });
            setFormErrors({ userName: '', vehicleNumber: '' });
            fetchSlots();
            fetchStats();
        } catch (error) {
            console.error('Error creating reservation:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
                Parking Slots
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={4}>
                    <StatsCard>
                        <LocalParkingIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
                        <Typography variant="h6" gutterBottom>Total Slots</Typography>
                        <Typography variant="h4" color="primary">{stats.total}</Typography>
                    </StatsCard>
                </Grid>
                <Grid item xs={4}>
                    <StatsCard>
                        <DirectionsCarIcon sx={{ fontSize: 40, color: '#d32f2f', mb: 1 }} />
                        <Typography variant="h6" gutterBottom>Occupied</Typography>
                        <Typography variant="h4" color="error">{stats.occupied}</Typography>
                    </StatsCard>
                </Grid>
                <Grid item xs={4}>
                    <StatsCard>
                        <EventAvailableIcon sx={{ fontSize: 40, color: '#388e3c', mb: 1 }} />
                        <Typography variant="h6" gutterBottom>Available</Typography>
                        <Typography variant="h4" color="success">{stats.available}</Typography>
                    </StatsCard>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {slots.map((slot) => (
                    <Grid item xs={12} sm={6} md={3} key={slot.id}>
                        <StyledCard isOccupied={slot.occupied}>
                            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    Slot {slot.slotNumber}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                    {slot.occupied ? (
                                        <DirectionsCarIcon sx={{ fontSize: 40, color: '#d32f2f' }} />
                                    ) : (
                                        <LocalParkingIcon sx={{ fontSize: 40, color: '#388e3c' }} />
                                    )}
                                </Box>
                                <Typography 
                                    variant="h6" 
                                    color={slot.occupied ? 'error' : 'success'}
                                    sx={{ mb: 2 }}
                                >
                                    {slot.occupied ? 'Occupied' : 'Available'}
                                </Typography>
                                {!slot.occupied && (
                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                        onClick={() => handleReserve(slot)}
                                        fullWidth
                                        sx={{ 
                                            mt: 'auto',
                                            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                            boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                                            }
                                        }}
                                    >
                                        Reserve
                                    </Button>
                                )}
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>

            <Dialog 
                open={openDialog} 
                onClose={() => setOpenDialog(false)}
                PaperProps={{
                    sx: {
                        background: 'linear-gradient(45deg, #fafafa 30%, #f5f5f5 90%)',
                        borderRadius: 2,
                    }
                }}
            >
                <DialogTitle sx={{ 
                    textAlign: 'center',
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    color: 'white',
                    mb: 2
                }}>
                    Reserve Parking Slot {reservationData.slot?.slotNumber}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <DirectionsCarIcon sx={{ fontSize: 48, color: '#1976d2' }} />
                    </Box>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Your Name"
                        fullWidth
                        value={reservationData.userName}
                        onChange={(e) => setReservationData({
                            ...reservationData,
                            userName: e.target.value
                        })}
                        error={!!formErrors.userName}
                        helperText={formErrors.userName}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Vehicle Number"
                        fullWidth
                        value={reservationData.vehicleNumber}
                        onChange={(e) => setReservationData({
                            ...reservationData,
                            vehicleNumber: e.target.value.toUpperCase()
                        })}
                        error={!!formErrors.vehicleNumber}
                        helperText={formErrors.vehicleNumber || "Format: TN01AB1234"}
                        placeholder="TN01AB1234"
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button 
                        onClick={() => setOpenDialog(false)}
                        sx={{ 
                            color: '#9e9e9e',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleReservationSubmit} 
                        variant="contained"
                        sx={{ 
                            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                            boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                            }
                        }}
                    >
                        Reserve Now
                    </Button>
                </DialogActions>
            </Dialog>

            <PaymentQRCode
                open={showPayment}
                onClose={() => setShowPayment(false)}
                reservation={currentReservation}
            />
        </Container>
    );
};

export default ParkingSlots;