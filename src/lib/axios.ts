// src/lib/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
});

// Add Authorization header with Bearer token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Added Authorization Header:", config.headers.Authorization); // 👈 temp debug
  }else {
    console.log("⚠️ [axios] No token found in localStorage."); // 👈 Debug fallback }

  return config;
};

export default instance;


