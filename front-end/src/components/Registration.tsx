import React, { useState } from "react";
import backgroundImage from "/src/assets/background.png";

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    emailUser: "",
    emailDomain: "@gmail.com",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fullEmail = `${formData.emailUser}${formData.emailDomain}`;

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden ❌");
      return;
    }

    console.log("Datos enviados:", {
      username: formData.username,
      email: fullEmail,
      password: formData.password,
    });
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
        <div className="mb-6">
          {/* Título principal: MemoRise */}
          <h1 className="text-5xl font-bold text-white mb-1">
            MemoRise
          </h1>
          {/* Subtítulo:  Por favor, ingrese sus datos. */}
          <h2 className="text-sm font-bold text-zinc-200">
            Por favor, ingrese sus datos.
          </h2>
        </div>

        {/* Usuario */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-zinc-200">
            Usuario
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Tu nombre de usuario"
            required
            className="w-full mt-1 px-3 py-2 border border-zinc-00 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"
          />
        </div>

        {/* Correo electrónico */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-zinc-200">
            Correo electrónico
          </label>
          <div className="flex mt-1">
            <input
              type="text"
              name="emailUser"
              value={formData.emailUser}
              onChange={handleChange}
              placeholder="Tu usuario"
              required
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
            required
            className="w-full mt-1 px-3 py-2 border border-zinc-700 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"
          />
        </div>

        {/* Confirmar contraseña */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-zinc-200">
            Confirmar contraseña
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full mt-1 px-3 py-2 border border-zinc-700 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring focus:ring-violet-500"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registration;