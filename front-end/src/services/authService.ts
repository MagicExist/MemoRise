import api from "../api/axios";
import type { UserRegistration,UserLogin } from "../types/user";

export const registerUser = async (userData: UserRegistration) => {
  const response = await api.post("/users/", userData);
  return response.data;
};

export const loginUser = async (credentials: UserLogin) => {
  const response = await api.post("/token/", credentials);
  return response.data;
};