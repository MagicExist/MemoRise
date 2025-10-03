// src/components/Navbar/Navbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/"); // vuelve al login
  };

  return (
    <nav className="flex items-center justify-between bg-[#1E1E2F] px-6 py-4 shadow-md">
      {/* Left side (Logo or App name) */}
      <div className="text-2xl font-bold text-white">
        MemoRise
      </div>

      {/* Right side (Links + Logout) */}
      <div className="flex items-center gap-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition cursor-pointer"
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
