// 🔑 Keys used in localStorage
const ACCESS_KEY = "access_token";   // key for JWT access token
const REFRESH_KEY = "refresh_token"; // key for JWT refresh token

// ✅ Utility to manage JWT tokens in localStorage
export const tokenStorage = {
  // Get the current access token (used for API requests)
  getAccess: () => localStorage.getItem(ACCESS_KEY),

  // Save a new access token (e.g., after login or refresh)
  setAccess: (t: string) => localStorage.setItem(ACCESS_KEY, t),

  // Get the current refresh token (used to get a new access token)
  getRefresh: () => localStorage.getItem(REFRESH_KEY),

  // Save a new refresh token (e.g., after login or rotation)
  setRefresh: (t: string) => localStorage.setItem(REFRESH_KEY, t),

  // Completely remove both tokens (used during logout)
  clear: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};
