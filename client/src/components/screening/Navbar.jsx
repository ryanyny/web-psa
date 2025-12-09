import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import RecruiterAuthContext from "../../context/RecruiterAuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout } = useContext(RecruiterAuthContext);
  const navigate = useNavigate();

  const toggleProfileDropdown = () =>
    setIsProfileDropdownOpen(!isProfileDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

 const handleLogout = async () => {
    await logout();
    navigate("/punya-skill-connect/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-20 shadow-lg bg-gray-50">
      <div className="w-full flex justify-end items-center px-6 py-5">
        {/* CTA Buttons / Profile */}
        <div className="hidden lg:flex items-center">
            <div className="relative profile-dropdown">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleProfileDropdown} 
              >
                {user ? (
                  <>
                    <span className="text-gray-700 font-semibold text-xl">{user.name ?? "User"}</span>
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold uppercase">
                      {user.name?.[0] ?? "U"}
                    </div>
                  </>
                ) : (
                  <Link to="/punya-skill-connect/login" className="text-blue-600 font-semibold">Masuk</Link>
                )}
              </div>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  <Link
                    to="/dashboard-user"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-b-xl"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex flex-col space-y-1.5 focus:outline-none p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span
            className={`w-6 h-0.5 bg-gray-600 transform transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-gray-600 transform transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>
    </nav>
  );
}