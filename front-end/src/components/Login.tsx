import React, { useState } from "react";
import backgroundImage from "/src/assets/background.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos de login:", formData);
    // Aquí irá la lógica para el backend
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
        {/* Contenedor para los títulos */}
        <div className="mb-8 mt-6">
         <h1 className="text-5xl font-bold text-white mb-1">
            MemoRise
          </h1>
          {/* Subtítulo:  Por favor, ingrese sus datos. */}
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
            required
            className="w-full mt-1 px-3 py-2 border border-zinc-00 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"          />
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
              required
            className="w-full mt-1 px-3 py-2 border border-zinc-00 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="h-full border-r border-zinc-700 mr-3"></div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm leading-5 text-zinc-400 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>

        {/* Enlace de 'Olvidaste tu contraseña' */}
        <div className="mt-0 text-end mb-10">
          <a href="#" className="text-sm text-violet-400 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Botón y enlaces */}
        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition"
        >
          Iniciar sesión
        </button>

        <div className="mt-18 flex justify-between items-center text-zinc-200">
  <span className="text-lg font-medium">
    ¿Aún no tienes una cuenta?
  </span>
  <a
    href="#"
    className="text-xl font-bold text-violet-500 hover:underline"
  >
    Regístrate
  </a>
</div>

      </form>
    </div>
  );
};

export default Login;