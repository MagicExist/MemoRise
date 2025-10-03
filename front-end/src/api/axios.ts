import axios from "axios";
import { tokenStorage } from "../services/tokenStorage";
import { refreshToken, logoutUser } from "../services/authService";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// ✅ Request interceptor -> always add access token
api.interceptors.request.use(
  (config) => {
    const access = tokenStorage.getAccess();
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor -> handle expired access
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const data = await refreshToken(); // pide nuevo access con el refresh
        const newAccess = data.access;

        // 🔥 guarda el nuevo access en el storage
        tokenStorage.setAccess(newAccess);

        // Reintenta la request original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        // ❌ si falla el refresh -> logout
        logoutUser();
        window.location.href = "/"; // redirige al login
      }
    }

    return Promise.reject(error);
  }
);

export default api;
