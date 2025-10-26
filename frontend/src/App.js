import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ParkingSlots from './components/ParkingSlots';
import ActiveReservations from './components/ActiveReservations';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import CarLogo from './assets/CarLogo';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1a237e 30%, #283593 90%)',
  boxShadow: '0 3px 5px 2px rgba(26, 35, 126, .3)',
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const StyledButton = styled(Button)(({ theme }) => ({
  margin: '0 8px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const MainContent = styled(Box)({
  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("/parking-bg.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  paddingTop: '64px',
});

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <Router>
      <CssBaseline />
      <StyledAppBar position="fixed">
        <StyledToolbar>
          <Box display="flex" alignItems="center" gap={2}>
            <Box 
              sx={{
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                transform: 'scale(0.8)',  // Slightly reduce the size
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(0.9)'
                }
              }}
            >
              <CarLogo />
            </Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
              Smart Parking System
            </Typography>
          </Box>
          <Box>
            <StyledButton color="inherit" component={Link} to="/">
              Parking Slots
            </StyledButton>
            <StyledButton color="inherit" component={Link} to="/reservations">
              Active Reservations
            </StyledButton>
            {token ? (
              <>
                <StyledButton color="inherit" component={Link} to="/admin">
                  Admin Panel
                </StyledButton>
                <StyledButton color="inherit" onClick={handleLogout}>
                  Logout
                </StyledButton>
              </>
            ) : (
              <StyledButton color="inherit" component={Link} to="/login">
                Admin Login
              </StyledButton>
            )}
          </Box>
        </StyledToolbar>
      </StyledAppBar>

      <MainContent>
        <Container>
          <Routes>
            <Route path="/" element={<ParkingSlots />} />
            <Route path="/reservations" element={<ActiveReservations />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminPanel />
                </PrivateRoute>
              }
            />
          </Routes>
        </Container>
      </MainContent>
    </Router>
  );
}

export default App;
