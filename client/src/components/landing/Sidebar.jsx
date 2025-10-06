import { useNavigate, useLocation, Link } from "react-router-dom";
import React from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard-admin",
      icon: (
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0H7v6h10v-6h-4z" />
        </svg>
      ),
    },
    {
      label: "Program",
      path: "/program-admin",
      icon: (
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M9 12h6m2 0a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v3a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Mitra",
      path: "/mitra-admin",
      icon: (
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M16 11a4 4 0 10-8 0 4 4 0 008 0z" />
        </svg>
      ),
    },
    {
      label: "Data Peserta",
      path: "/peserta-admin",
      icon: (
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.121 17.804A9 9 0 1118.88 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      label: "Data Testimoni",
      path: "/testimoni-admin",
      icon: (
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6M9 8h.01M4 6a2 2 0 012-2h12a2 2 0 012 2v14l-4-4H6a2 2 0 01-2-2V6z"
          />
        </svg>
      ),
    },
    {
      label: "Data FAQ",
      path: "/FAQ-admin",
      icon: (
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6M9 8h.01M4 6a2 2 0 012-2h12a2 2 0 012 2v14l-4-4H6a2 2 0 01-2-2V6z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-900 text-white flex flex-col shadow-xl z-50">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-center text-white">
          Admin <span className="text-blue-400">PSA</span>
        </h2>
      </div>

      <nav className="flex flex-col p-4 space-y-2 flex-grow">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-600 hover:text-white ${
              location.pathname === item.path
                ? "bg-blue-700 text-white"
                : "text-gray-300"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}

        <div className="mt-auto pt-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-5v-1m-4 4a9 9 0 108 0" />
            </svg>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
