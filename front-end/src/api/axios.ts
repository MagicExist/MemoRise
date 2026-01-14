import axios from "axios";
import { tokenStorage } from "../services/tokenStorage";
import { refreshToken, logoutUser } from "../services/authService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

    // 🚫 If we are on login page, don't trigger logout on 401
    if (window.location.pathname === "/") {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const data = await refreshToken(); // ask new access using refresh
        const newAccess = data.access;

        // 🔥 Save new access token
        tokenStorage.setAccess(newAccess);

        // Retry original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        // ❌ If refresh fails -> logout and redirect
        logoutUser();
        window.location.href = "/login"; // redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default api;
