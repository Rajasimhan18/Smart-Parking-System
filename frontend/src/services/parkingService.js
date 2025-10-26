import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const authHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const parkingService = {
    getAllSlots: () => axios.get(`${API_URL}/slots`),
    createSlot: (slot) => axios.post(`${API_URL}/slots`, slot, { headers: authHeader() }),
    deleteSlot: (id) => axios.delete(`${API_URL}/slots/${id}`, { headers: authHeader() }),
    getStats: () => axios.get(`${API_URL}/slots/stats`),
    getActiveReservations: () => axios.get(`${API_URL}/reservations/active`),
    createReservation: (reservation) => axios.post(`${API_URL}/reservations`, reservation),
    endReservation: (id) => axios.put(`${API_URL}/reservations/${id}/end`)
};