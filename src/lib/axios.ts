// src/lib/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000",
});

// Add Authorization header with Bearer token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("✅ [axios] Added Authorization Header:", config.headers.Authorization);
  } else {
    console.log("⚠️ [axios] No token found in localStorage.");
  }

  return config;
});

export default instance;
