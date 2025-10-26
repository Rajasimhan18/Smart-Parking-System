import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    TextField,
    Grid,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { parkingService } from '../services/parkingService';

const AdminPanel = () => {
    const [slots, setSlots] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newSlotNumber, setNewSlotNumber] = useState('');

    const fetchSlots = async () => {
        try {
            const response = await parkingService.getAllSlots();
            setSlots(response.data);
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };

    useEffect(() => {
        fetchSlots();
    }, []);

    const handleCreateSlot = async () => {
        try {
            await parkingService.createSlot({
                slotNumber: parseInt(newSlotNumber),
                occupied: false
            });
            setOpenDialog(false);
            setNewSlotNumber('');
            fetchSlots();
        } catch (error) {
            console.error('Error creating slot:', error);
        }
    };

    const [confirmDialog, setConfirmDialog] = useState({ open: false, slotId: null });

    const handleDeleteClick = (slot) => {
        if (slot.occupied) {
            setConfirmDialog({ open: true, slotId: slot.id });
        } else {
            handleDeleteSlot(slot.id);
        }
    };

    const handleDeleteSlot = async (id) => {
        try {
            await parkingService.deleteSlot(id);
            fetchSlots();
            setConfirmDialog({ open: false, slotId: null });
        } catch (error) {
            console.error('Error deleting slot:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
                Admin Panel
            </Typography>

            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setOpenDialog(true)}
                sx={{ mb: 4 }}
            >
                Add New Parking Slot
            </Button>

            <Grid container spacing={2}>
                {slots.map((slot) => (
                    <Grid item xs={3} key={slot.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    Slot {slot.slotNumber}
                                </Typography>
                                <Typography color={slot.occupied ? 'error' : 'success'}>
                                    {slot.occupied ? 'Occupied' : 'Available'}
                                </Typography>
                                <IconButton 
                                    color="error" 
                                    onClick={() => handleDeleteClick(slot)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Parking Slot</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Slot Number"
                        type="number"
                        fullWidth
                        value={newSlotNumber}
                        onChange={(e) => setNewSlotNumber(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleCreateSlot} variant="contained" color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation Dialog for deleting occupied slots */}
            <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, slotId: null })}>
                <DialogTitle>Delete Occupied Slot</DialogTitle>
                <DialogContent>
                    <Typography>
                        This slot is currently occupied. Are you sure you want to delete it? 
                        This will also remove any active reservations for this slot.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialog({ open: false, slotId: null })}>Cancel</Button>
                    <Button 
                        onClick={() => handleDeleteSlot(confirmDialog.slotId)} 
                        variant="contained" 
                        color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AdminPanel;