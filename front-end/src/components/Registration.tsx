import React, { useState } from "react";

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

    // Aquí irá la lógica para el backend
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-bl from-zinc-900 via-zinc-900 to-purple-950">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 shadow-lg rounded-2xl p-8 w-full max-w-md border border-zinc-700"
      >
        {/* Título */}
        <h1 className="text-3xl font-bold text-center text-violet-500 mb-6">
          MemoRise
        </h1>

        <h2 className="text-2xl font-bold mb-6 text-center text-zinc-200">
          Registro
        </h2>

        {/* Usuario */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-300">
            Usuario
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Tu nombre de usuario"
            required
            className="w-full mt-1 px-3 py-2 border border-zinc-700 rounded-lg bg-zinc-900 text-white focus:outline-none focus:ring focus:ring-violet-500"
          />
        </div>

        {/* Correo electrónico */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-300">
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
              className="flex-1 px-3 py-2 border border-zinc-700 rounded-l-lg bg-zinc-900 text-white focus:outline-none focus:ring focus:ring-violet-500"
            />
            <select
              name="emailDomain"
              value={formData.emailDomain}
              onChange={handleChange}
              className="px-2 py-2 border border-zinc-700 rounded-r-lg bg-zinc-900 text-white focus:outline-none focus:ring focus:ring-violet-500"
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
          <label className="block text-sm font-medium text-zinc-300">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full mt-1 px-3 py-2 border border-zinc-700 rounded-lg bg-zinc-900 text-white focus:outline-none focus:ring focus:ring-violet-500"
          />
        </div>

        {/* Confirmar contraseña */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-300">
            Confirmar contraseña
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full mt-1 px-3 py-2 border border-zinc-700 rounded-lg bg-zinc-900 text-white focus:outline-none focus:ring focus:ring-violet-500"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition"
        >
          Registrarse
        </button>

        {/* Olvidaste contraseña */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => alert("Redirigir a recuperar contraseña")}
            className="text-sm text-violet-400 hover:text-violet-300"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
