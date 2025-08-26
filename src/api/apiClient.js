// src/api/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  // baseURL: `http://localhost:5000/api`,
  baseURL: `http://69.62.75.39:5000/api`,
  withCredentials: true,
});

export default apiClient;
