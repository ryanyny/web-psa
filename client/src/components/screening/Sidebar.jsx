import { useContext } from 'react';
import { useLocation, useNavigate, Link } from "react-router-dom";
import RecruiterAuthContext from '../../context/RecruiterAuthContext.jsx';
import logo from "../../assets/images/img-logo-PSA.png";
import React from "react";

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useContext(RecruiterAuthContext);
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Data Perusahaan",
      path: "/data-perusahaan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
    },
    {
      label: "Program Perusahaan",
      path: "/program-perusahaan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
        </svg>
      ),
    },
    {
      label: "Daftar Pelamar",
      path: "/punya-skill-connect/applicants",
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
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-50/80 flex flex-col shadow-xl z-50">
      <div className="p-1">
        {/* Logo */}
        <div className="max-w-[260px] max-h-[120px] -mt-6 flex items-center">
          <Link to="/punya-skill-connect/applicants">
            <img
              src={logo}
              alt="logo"
              className="w-full h-full object-contain"
            />
          </Link>
        </div>
      </div>

      <aside className="flex flex-col justify-between p-4 flex-grow">
        <div className="space-y-2">
        {menuItems.map((item) => (
            <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-600 hover:text-white ${
              location.pathname === item.path
              ? "bg-blue-700 text-white"
              : "text-black"
            }`}
          >
            {item.icon}
            <span className="font-medium ml-1">{item.label}</span>
          </Link>
        ))}
        </div>
          <button
            onClick={async () => {
              await logout();
              navigate('/punya-skill-connect/login');
            }}
            className="px-4 py-2 flex justify-center items-center text-red-600 rounded hover:bg-red-700 hover:text-white hover:text-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
            <span className="ml-1">Logout</span>
          </button>
      </aside>
    </div>
  );
}
