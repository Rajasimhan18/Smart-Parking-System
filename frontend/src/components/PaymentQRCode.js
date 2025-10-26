import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';

const PaymentQRCode = ({ open, onClose, reservation }) => {
    // UPI payment URL format
    const generateUPIUrl = (amount, orderId, name) => {
        const upiId = "your.upi@ybl"; // Replace with your actual UPI ID
        const merchantName = "Smart Parking System";
        
        return `upi://pay?pa=${upiId}&pn=${merchantName}&tn=Parking Slot ${reservation?.slot?.slotNumber}&am=${amount}&cu=INR&tr=${orderId}`;
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Payment QR Code</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" alignItems="center" p={2}>
                    <Typography variant="h6" gutterBottom>
                        Amount to Pay: ₹{reservation?.amount}
                    </Typography>
                    <Typography variant="body2" gutterBottom color="textSecondary">
                        Slot Number: {reservation?.slot?.slotNumber}
                    </Typography>
                    <Box my={2}>
                        <QRCodeSVG
                            value={generateUPIUrl(
                                reservation?.amount,
                                reservation?.id,
                                `Slot${reservation?.slot?.slotNumber}`
                            )}
                            size={256}
                            level="H"
                            includeMargin={true}
                        />
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                        Scan with any UPI app to pay
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PaymentQRCode;