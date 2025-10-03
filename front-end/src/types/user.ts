// Type for user registration payload
export type UserRegistration = {
  email: string;
  password: string;
  confirm_password: string;
  username: string;
};

// Type for user login payload
export type UserLogin = {
  email: string;
  password: string;
};
