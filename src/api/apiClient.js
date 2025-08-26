// src/api/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  // baseURL: `http://localhost:5000/api`,
  baseURL: `https://api.rprb2b.com/api`,
  withCredentials: true,
});

export default apiClient;
