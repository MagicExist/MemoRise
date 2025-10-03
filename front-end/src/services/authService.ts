import api from "../api/axios";
import type { UserRegistration, UserLogin } from "../types/user";
import { tokenStorage } from "./tokenStorage";

/**
 * Register a new user
 * @param userData - Registration payload (username, email, password, confirm_password)
 * @returns User data from backend response
 */
export const registerUser = async (userData: UserRegistration) => {
  const response = await api.post("/users/", userData);
  return response.data;
};

/**
 * Login a user and store JWT tokens
 * @param credentials - User login credentials (email, password)
 * @returns Object containing access and refresh tokens
 */
export const loginUser = async (credentials: UserLogin) => {
  const response = await api.post("/token/", credentials);

  const { access, refresh } = response.data;

  // Store tokens in localStorage
  tokenStorage.setAccess(access);
  tokenStorage.setRefresh(refresh);

  return response.data;
};

/**
 * Refresh the access token using a valid refresh token
 * If rotation is enabled, it may also return a new refresh token
 * @returns Object containing a new access token (and possibly refresh token)
 */
export const refreshToken = async () => {
  const refresh = tokenStorage.getRefresh();
  if (!refresh) throw new Error("No refresh token available");

  const response = await api.post("/token/refresh/", { refresh });

  // Update stored tokens
  tokenStorage.setAccess(response.data.access);
  if (response.data.refresh) {
    tokenStorage.setRefresh(response.data.refresh);
  }

  return response.data;
};

/**
 * Logout the user by clearing all stored tokens
 */
export const logoutUser = () => {
  tokenStorage.clear();
};
