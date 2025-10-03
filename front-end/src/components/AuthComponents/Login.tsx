import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import backgroundImage from "/src/assets/background.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { loginUser } from "../../services/authService";
import type { UserLogin } from "../../types/user";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    emailDomain: "@gmail.com", // fixed domain suffix
    password: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const [formError, setFormError] = useState<string>(""); // 👈 Global form error (e.g., invalid credentials)
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Validate login form before submission
  const validateForm = () => {
    let valid = true;
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email username is required";
      valid = false;
    } else if (formData.email.length > 76) {
      newErrors.email = "Email username cannot exceed 76 characters";
      valid = false;
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    } else if (formData.password.length > 25) {
      newErrors.password = "Password cannot exceed 25 characters";
      valid = false;
    } else if (/\s/.test(formData.password)) {
      newErrors.password = "Password cannot contain spaces";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ✅ Handle input changes (clear error when typing)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setFormError(""); // clear global error on typing
  };

  // ✅ Handle login submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const fullEmail = `${formData.email}${formData.emailDomain}`;
      const payload: UserLogin = {
        email: fullEmail,
        password: formData.password,
      };

      await loginUser(payload); // tokens are stored in tokenStorage
      navigate("/mainpanel"); // redirect to dashboard
    } catch {
      // 👇 Show user-friendly error message
      setFormError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900 relative">
      {/* Background image (bottom-left decorative) */}
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="absolute bottom-0 left-0 w-2/3 h-4/5 bg-contain bg-left-bottom opacity-30 bg-no-repeat"
      />

      {/* Login form */}
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 shadow-lg rounded-2xl p-8 w-full max-w-md border border-zinc-700 z-10"
      >
        {/* Title section */}
        <div className="mb-8 mt-6">
          <h1 className="text-5xl font-bold text-white mb-1">MemoRise</h1>
          <h2 className="text-sm font-bold text-zinc-200">
            Please enter your credentials.
          </h2>
        </div>

        {/* Email input */}
        <div className="mb-3">
          <label className="block text-sm font-bold text-zinc-200">
            Email
          </label>
          <div className="flex mt-1 items-center">
            {/* Email username part */}
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="username123"
              maxLength={76}
              className="flex-1 px-3 py-2 border border-zinc-700 rounded-l-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"
            />
            {/* Fixed domain part */}
            <span className="px-3 py-2 border border-l-0 border-zinc-700 rounded-r-lg bg-gray-100 text-zinc-700">
              @gmail.com
            </span>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password input */}
        <div className="mt-0">
          <label className="block text-sm font-bold text-zinc-200">
            Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="off"
              className="w-full mt-1 px-3 py-2 border border-zinc-700 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"
            />
            {/* Toggle show/hide password */}
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="h-full border-r border-zinc-700 mr-3"></div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm leading-5 text-zinc-400 focus:outline-none"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Global login error */}
        {formError && (
          <p className="text-red-500 text-center text-sm mt-4">{formError}</p>
        )}

        {/* Forgot password link */}
        <div className="mt-0 text-end mb-10">
          <a href="#" className="text-sm text-violet-400 hover:underline">
            Forgot your password?
          </a>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition"
        >
          Sign In
        </button>

        {/* Register link */}
        <div className="mt-6 flex justify-between items-center text-zinc-200">
          <span className="text-lg font-medium">Don't have an account?</span>
          <Link
            to="/register"
            className="text-xl font-bold text-violet-500 hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
