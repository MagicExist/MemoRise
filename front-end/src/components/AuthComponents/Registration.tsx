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
    emailDomain: "@gmail.com",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validaciones
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Usuario: 4–25 caracteres, letras, números, ".", "_" o "-"
    const usernameRegex = /^[a-zA-Z0-9._-]{4,25}$/;
    if (!usernameRegex.test(formData.username)) {
      newErrors.username =
        "Debe tener entre 4 y 25 caracteres. Solo se permiten letras, números, '.', '_' o '-'.";
      valid = false;
    }

    // Parte usuario del correo
    const emailUserRegex = /^[a-z0-9]+(?:\.[a-z0-9]+)*$/;
    if (
      !emailUserRegex.test(formData.email) ||
      formData.email.length < 4 ||
      formData.email.length > 76
    ) {
      newErrors.email = "Correo incorrecto.";
      valid = false;
    }

    // Correo completo
    const fullEmail = `${formData.email}${formData.emailDomain}`;
    const fullEmailRegex = /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z]+\.[a-z]{2,}$/;
    if (!fullEmailRegex.test(fullEmail)) {
      newErrors.email = "Correo completo inválido.";
      valid = false;
    }

    // Contraseña
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.";
      valid = false;
    } else if (formData.password.length > 25) {
      newErrors.password = "La contraseña no debe superar los 25 caracteres.";
      valid = false;
    }

    // Confirmar contraseña
    if (formData.password !== formData.confirm_password) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
      valid = false;
    } else if (formData.confirm_password.length > 20) {
      newErrors.confirmPassword =
        "La confirmación no debe superar los 20 caracteres.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Build payload with our type
      const payload: UserRegistration = {
        username: formData.username,
        email: `${formData.email}${formData.emailDomain}`, // join before sending
        password: formData.password,
        confirm_password: formData.confirm_password,
      };

      console.log("📤 Enviando datos:", payload);

      const response = await registerUser(payload);
      console.log("✅ Usuario registrado:", response);

      // Reset form
      setFormData({
        email: "",
        username: "",
        emailDomain: "@gmail.com",
        password: "",
        confirm_password: "",
      });

      navigate("/");

    } catch (error: any) {
      console.error("❌ Error en registro:", error);
      if (error.response?.data) {
        console.error("Detalles del error:", error.response.data);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900 relative">
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="absolute bottom-0 left-0 w-2/3 h-4/5 bg-contain bg-left-bottom opacity-30 bg-no-repeat"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 shadow-lg rounded-2xl p-8 w-full max-w-md border border-zinc-700 z-10"
      >
        {/* Títulos */}
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-white mb-1">MemoRise</h1>
          <h2 className="text-sm font-bold text-zinc-200">
            Por favor, ingrese sus datos.
          </h2>
        </div>

        {/* Usuario */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-zinc-200">Usuario</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Tu nombre de usuario"
            maxLength={25} // 👈 máximo de caracteres
            className="w-full mt-1 px-3 py-2 border border-zinc-700 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Correo */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-zinc-200">
            Correo electrónico
          </label>
          <div className="flex mt-1">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="usuario123"
              maxLength={76} // 👈 máximo para emailUser
              className="flex-1 px-3 py-2 border border-zinc-700 rounded-l-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"
            />
            <select
              name="emailDomain"
              value={formData.emailDomain}
              onChange={handleChange}
              className="px-2 py-2 border border-zinc-700 rounded-r-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"
            >
              <option value="@gmail.com">@gmail.com</option>
              <option value="@hotmail.com">@hotmail.com</option>
              <option value="@outlook.com">@outlook.com</option>
              <option value="@yahoo.com">@yahoo.com</option>
            </select>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Contraseña */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-zinc-200">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            maxLength={20} // 👈 máximo de 20 caracteres
            className="w-full mt-1 px-3 py-2 border border-zinc-700 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirmar contraseña */}
        <div className="mb-10">
          <label className="block text-sm font-bold text-zinc-200">
            Confirmar contraseña
          </label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="••••••••"
            maxLength={20} // 👈 máximo de 20 caracteres
            className="w-full mt-1 px-3 py-2 border border-zinc-700 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white py-2 rounded-lg transition ${
            isSubmitting
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-violet-600 hover:bg-violet-700"
          }`}
        >
          {isSubmitting ? "Registrando..." : "Registrarse"}
        </button>

        {/* Enlace para volver al login */}
        <div className="mt-6 text-center">
          <span className="text-sm text-zinc-200">¿Ya tienes una cuenta? </span>
          <Link
            to="/"
            className="text-sm font-bold text-violet-500 hover:underline"
          >
            Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Registration;
