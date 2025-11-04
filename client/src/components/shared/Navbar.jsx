import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/images/img-logo-PSA.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Blog dropdown hover delay
  let blogTimeout;
  const handleBlogMouseEnter = () => {
    clearTimeout(blogTimeout);
    setIsBlogDropdownOpen(true);
  };
  const handleBlogMouseLeave = () => {
    blogTimeout = setTimeout(() => setIsBlogDropdownOpen(false), 200); // delay 200ms
  };

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
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 backdrop-blur-sm bg-white/95">
      <div className="w-full flex justify-between items-center px-6 py-2">
        {/* Logo */}
        <div className="max-w-[220px] max-h-[80px] flex items-center">
          <Link to={user ? "/dashboard-user" : "/"}>
            <img
              src={logo}
              alt="logo"
              className="w-full h-full object-contain"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 font-medium text-gray-700">
          <li>
            <Link
              to={user ? "/dashboard-user" : "/"}
              className="hover:text-blue-600 transition-colors duration-200 relative group"
            >
              Beranda
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/program"
              className="hover:text-blue-600 transition-colors duration-200 relative group"
            >
              Program
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/tentangkami"
              className="hover:text-blue-600 transition-colors duration-200 relative group"
            >
              Tentang Kami
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/mitra"
              className="hover:text-blue-600 transition-colors duration-200 relative group"
            >
              Mitra
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-blue-600 transition-colors duration-200 relative group"
            >
              Kontak
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/testimoni"
              className="hover:text-blue-600 transition-colors duration-200 relative group"
            >
              Testimoni
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>

          {/* Blog dropdown */}
          <li
            className="relative"
            onMouseEnter={handleBlogMouseEnter}
            onMouseLeave={handleBlogMouseLeave}
          >
            <Link
              to="/blog"
              className="hover:text-blue-600 transition-colors duration-200 relative"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {user && isBlogDropdownOpen && (
              <div className="absolute left-0 mt-2 bg-white shadow-md rounded-lg py-2 border border-gray-100 w-44">
                <Link
                  to="/blog/create"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Tambah
                </Link>
                <Link
                  to="/blog/my-posts"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Postinganku
                </Link>
                <Link
                  to="/blog/saved"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Disimpan
                </Link>
              </div>
            )}
          </li>
          <li>
            <Link
              to="/punya-skill-connect"
              className="hover:text-blue-600 transition-colors duration-200 relative group"
              target="_blank"
              rel="noopener noreferrer"
            >
              Punya Skill Connect
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>

        {/* CTA Buttons / Profile */}
        <div className="hidden lg:flex items-center space-x-4">
          {!user ? (
            <Link
              to="/login"
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-blue-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Daftar / Masuk
            </Link>
          ) : (
            <div className="relative profile-dropdown">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleProfileDropdown}
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold uppercase">
                  {user.name[0]}
                </div>
                <span className="text-gray-700 font-semibold">{user.name}</span>
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
          )}
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

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 transition-all duration-300 ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-4 space-y-4">
          <Link
            to={user ? "/dashboard-user" : "/"}
            className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Beranda
          </Link>
          <Link
            to="/program"
            className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Program
          </Link>
          <Link
            to="/tentangkami"
            className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Tentang Kami
          </Link>
          <Link
            to="/mitra"
            className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Mitra
          </Link>
          <Link
            to="/contact"
            className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Kontak
          </Link>
          <Link
            to="/testimoni"
            className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Testimoni
          </Link>
          <Link
            to="/blog"
            className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>

          {/* Blog submenu mobile */}
          {user && (
            <div className="pl-4">
              <Link
                to="/blog/create"
                className="block py-2 text-gray-600 hover:text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Tambah
              </Link>
              <Link
                to="/blog/my-posts"
                className="block py-2 text-gray-600 hover:text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Postinganku
              </Link>
              <Link
                  to="/blog/saved"
                  className="block py-2 text-gray-600 hover:text-blue-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Disimpan
                </Link>
            </div>
          )}

          {!user ? (
            <Link
              to="/login"
              className="block text-center bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-teal-600 transition-all duration-200 font-semibold mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Daftar / Masuk
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="block w-full text-center bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all duration-200 font-semibold mt-4"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}