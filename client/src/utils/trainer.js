import axiosInstance from "./axios";

const apiUrl='http://localhost:5000/api';

const createTrainer= data => axiosInstance.post(`${apiUrl}/trainers`);


const trainerApi={createTrainer};

export default trainerApi
