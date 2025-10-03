import api from "../api/axios";
import type { UserRegistration, UserLogin } from "../types/user";
import { tokenStorage } from "./tokenStorage";

// Register new user
export const registerUser = async (userData: UserRegistration) => {
  const response = await api.post("/users/", userData);
  return response.data;
};

// Login user -> returns and saves tokens
export const loginUser = async (credentials: UserLogin) => {
  const response = await api.post("/token/", credentials);

  const { access, refresh } = response.data;

  // ✅ Save tokens
  tokenStorage.setAccess(access);
  tokenStorage.setRefresh(refresh);

  return response.data;
};

// Refresh access token using refresh token
export const refreshToken = async () => {
  const refresh = tokenStorage.getRefresh();
  if (!refresh) throw new Error("No refresh token available");

  const response = await api.post("/token/refresh/", { refresh });

  // ✅ Update access (and refresh if rotation enabled)
  tokenStorage.setAccess(response.data.access);
  if (response.data.refresh) {
    tokenStorage.setRefresh(response.data.refresh);
  }

  return response.data;
};

// Logout -> clear tokens
export const logoutUser = () => {
  tokenStorage.clear();
};
