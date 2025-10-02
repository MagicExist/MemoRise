import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import backgroundImage from "/src/assets/background.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { loginUser } from "../../services/authService";
import type { UserLogin } from "../../types/user";


const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors: { email?: string; password?: string } = {};

    // Validación de email
    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El formato de correo no es válido";
      valid = false;
    } else if (formData.email.length > 76) {
      newErrors.email = "El correo no puede superar los 76 caracteres";
      valid = false;
    }

    // Validación de contraseña
    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      valid = false;
    } else if (formData.password.length > 25) {
      newErrors.password = "La contraseña no puede superar los 25 caracteres";
      valid = false;
    } else if (/\s/.test(formData.password)) {
      newErrors.password = "La contraseña no puede contener espacios";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // limpiar error al escribir
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const payload: UserLogin = {
        email: formData.email,
        password: formData.password,
      };

      const response = await loginUser(payload);

      // Example: store JWT token if backend returns it
      if (response.access) {
        localStorage.setItem("token", response.access);
        console.log("✅ Login successful, token saved!");
        navigate("/mainpanel");
      }

    } catch (error: any) {
      console.error("❌ Error en login:", error);
      if (error.response?.data) {
        console.error("Detalles del error:", error.response.data);
      }
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
        <div className="mb-8 mt-6">
          <h1 className="text-5xl font-bold text-white mb-1">MemoRise</h1>
          <h2 className="text-sm font-bold text-zinc-200">
            Por favor, ingrese sus datos.
          </h2>
        </div>

        {/* Correo electrónico */}
        <div className="mb-3">
          <label className="block text-sm font-bold text-zinc-200">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Tu correo electrónico"
            className="w-full mt-1 px-3 py-2 border border-zinc-700 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Contraseña */}
        <div className="mt-0">
          <label className="block text-sm font-bold text-zinc-200">
            Contraseña
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

        {/* Olvidaste tu contraseña */}
        <div className="mt-0 text-end mb-10">
          <a href="#" className="text-sm text-violet-400 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition"
        >
          Iniciar sesión
        </button>

        {/* Enlace para ir al registro */}
        <div className="mt-6 flex justify-between items-center text-zinc-200">
          <span className="text-lg font-medium">¿Aún no tienes una cuenta?</span>
          <Link
            to="/register"
            className="text-xl font-bold text-violet-500 hover:underline"
          >
            Regístrate
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
