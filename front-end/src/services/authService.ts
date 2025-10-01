import api from "../api/axios";
import type { UserRegistration } from "../types/user";

export const registerUser = async (userData: UserRegistration) => {
  const response = await api.post("/users/", userData);
  return response.data;
};