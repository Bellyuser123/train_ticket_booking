import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const checkHealth = () => axios.get("http://localhost:5000/");
export const registerUser = (payload) => api.post("/users/register", payload);
export const loginUser = (payload) => api.post("/users/login", payload);
export const fetchTrains = () => api.get("/trains");
export const bookTicket = (payload) => api.post("/tickets/book", payload);
export const markNotBoarded = (payload) => api.post("/tickets/not-boarded", payload);
export const openSeat = (payload) => api.post("/tickets/open-seat", payload);
export const confirmSeat = (payload) => api.post("/tickets/confirm-seat", payload);
export const fetchSeats = (trainId) => api.get(`/tte/seats/${trainId}`);
export const addTrain = (payload) => api.post("/trains/add", payload);
export const addPreBookedSeat = (payload) => api.post("/admin/add-seat", payload);
export const updateTrainLocation = (id, payload) => api.put(`/trains/${id}/location`, payload);
export const tteLogin = (payload) => api.post("/tte/login", payload);
export const updateSeatStatus = (id, payload) => api.put(`/tte/seat/${id}`, payload);
