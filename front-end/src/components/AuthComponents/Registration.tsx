import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import backgroundImage from "/src/assets/background.png";

import { registerUser } from "../../services/authService";
import type { UserRegistration } from "../../types/user";

const Registration: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    username: "",
    emailDomain: "@gmail.com", // fixed domain suffix
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Form validation
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Username: 4–25 characters, letters, numbers, ".", "_" or "-"
    const usernameRegex = /^[a-zA-Z0-9._-]{4,25}$/;
    if (!usernameRegex.test(formData.username)) {
      newErrors.username =
        "Username must be 4–25 characters and can include letters, numbers, '.', '_' or '-'.";
      valid = false;
    }

    // Email username part
    const emailUserRegex = /^[a-z0-9]+(?:\.[a-z0-9]+)*$/;
    if (
      !emailUserRegex.test(formData.email) ||
      formData.email.length < 4 ||
      formData.email.length > 76
    ) {
      newErrors.email = "Invalid email username.";
      valid = false;
    }

    // Full email validation
    const fullEmail = `${formData.email}${formData.emailDomain}`;
    const fullEmailRegex = /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z]+\.[a-z]{2,}$/;
    if (!fullEmailRegex.test(fullEmail)) {
      newErrors.email = "Invalid full email format.";
      valid = false;
    }

    // Password validation: 8+ chars, uppercase, lowercase, number, symbol
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must have at least 8 characters, including uppercase, lowercase, number, and symbol.";
      valid = false;
    } else if (formData.password.length > 25) {
      newErrors.password = "Password cannot exceed 25 characters.";
      valid = false;
    }

    // Confirm password
    if (formData.password !== formData.confirm_password) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    } else if (formData.confirm_password.length > 20) {
      newErrors.confirmPassword =
        "Confirm password cannot exceed 20 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Build payload
      const payload: UserRegistration = {
        username: formData.username,
        email: `${formData.email}${formData.emailDomain}`,
        password: formData.password,
        confirm_password: formData.confirm_password,
      };

      await registerUser(payload);

      // Reset form after successful registration
      setFormData({
        email: "",
        username: "",
        emailDomain: "@gmail.com",
        password: "",
        confirm_password: "",
      });

      // Redirect to login page
      navigate("/");
    } catch (error: any) {
      // Handle backend validation errors
      if (error.response?.data) {
        setErrors((prev) => ({
          ...prev,
          email: error.response.data.email || prev.email,
          username: error.response.data.username || prev.username,
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900 relative">
      {/* Background image */}
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="absolute bottom-0 left-0 w-2/3 h-4/5 bg-contain bg-left-bottom opacity-30 bg-no-repeat"
      />

      {/* Registration form */}
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 shadow-lg rounded-2xl p-8 w-full max-w-md border border-zinc-700 z-10"
      >
        {/* Title section */}
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-white mb-1">MemoRise</h1>
          <h2 className="text-sm font-bold text-zinc-200">
            Please fill in your details to create an account.
          </h2>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-zinc-200">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Your username"
            maxLength={25}
            className="w-full mt-1 px-3 py-2 border border-zinc-700 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-zinc-200">
            Email
          </label>
          <div className="flex mt-1 items-center">
            {/* Username part of email */}
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="username123"
              maxLength={76}
              className="flex-1 px-3 py-2 border border-zinc-700 rounded-l-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"
            />
            {/* Fixed domain */}
            <span className="px-3 py-2 border border-l-0 border-zinc-500 rounded-r-lg bg-gray-100 text-zinc-800">
              @gmail.com
            </span>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-zinc-200">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            maxLength={20}
            className="w-full mt-1 px-3 py-2 border border-zinc-700 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-10">
          <label className="block text-sm font-bold text-zinc-200">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="••••••••"
            maxLength={20}
            className="w-full mt-1 px-3 py-2 border border-zinc-700 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white py-2 rounded-lg transition ${
            isSubmitting
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-violet-600 hover:bg-violet-700"
          }`}
        >
          {isSubmitting ? "Registering..." : "Sign Up"}
        </button>

        {/* Link to login */}
        <div className="mt-6 text-center">
          <span className="text-sm text-zinc-200">
            Already have an account?{" "}
          </span>
          <Link
            to="/"
            className="text-sm font-bold text-violet-500 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
