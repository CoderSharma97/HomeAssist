import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import {
  FaUserCircle,
  FaUserAlt,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
const adminUrl = import.meta.env.VITE_ADMIN_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const menuRef = useRef(null);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/login"); // Navigate to login on logout
  };

  // Handle click outside to close the dropdown menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between w-full py-4 mb-5 border-b border-gray-300 bg-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 w-full">
        <div className="flex items-center">
          <img
            onClick={() => navigate("/")}
            className="w-36 cursor-pointer transition-transform duration-300 hover:scale-105"
            src={assets.logo}
            alt="Logo"
          />
          <a
            href={adminUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-800 font-medium border border-gray-500 rounded-full py-2 px-4 ml-3 hover:bg-gray-100 transition"
          >
            Admin
          </a>
        </div>

        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          {["/", "/services", "/about", "/contact"].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                `nav-item ${
                  isActive ? "text-[#3282B8] font-bold" : "text-gray-700"
                } hover:text-primary`
              }
            >
              {path === "/" ? "HOME" : path.substring(1).toUpperCase()}
            </NavLink>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {token && userData ? (
            <div
              className="relative"
              ref={menuRef}
              onClick={() => setIsMenuVisible(!isMenuVisible)} // Toggle visibility on click
            >
              <FaUserCircle className="text-4xl text-gray-600 cursor-pointer" />

              {isMenuVisible && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-10 bg-white shadow-md rounded-lg flex flex-col p-3 w-56 transition-all duration-300 opacity-100">
                  <button
                    onClick={() => navigate("/my-profile")}
                    className="flex items-center gap-2 text-gray-800 hover:text-blue-600 text-left py-2 px-3 rounded-md transition duration-200"
                  >
                    <FaUserAlt className="text-gray-600" />
                    My Profile
                  </button>
                  <button
                    onClick={() => navigate("/my-appointments")}
                    className="flex items-center gap-2 text-gray-800 hover:text-blue-600 text-left py-2 px-3 rounded-md transition duration-200"
                  >
                    <FaClipboardList className="text-gray-600" />
                    My Appointments
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 text-gray-800 hover:text-red-600 text-left py-2 px-3 rounded-md transition duration-200"
                  >
                    <FaSignOutAlt className="text-gray-600" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-white px-4 py-2 rounded-full font-light hidden md:block transition hover:bg-blue-600"
            >
              Create Account
            </button>
          )}
          <img
            onClick={() => setShowMenu(!showMenu)}
            className="w-6 md:hidden cursor-pointer transition-transform duration-300 hover:scale-110"
            src={assets.menu_icon}
            alt="Menu"
          />

          {/* Mobile Menu */}
          <div
            className={`fixed inset-0 z-20 transition-transform transform ${
              showMenu ? "translate-x-0" : "translate-x-full"
            } bg-white shadow-lg md:hidden`}
          >
            <div className="flex items-center justify-between p-5">
              <img className="w-32" src={assets.logo} alt="Logo" />
              <img
                className="w-7 cursor-pointer"
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                alt="Close Menu"
              />
            </div>
            <ul className="flex flex-col items-center gap-4 mt-5 text-lg font-medium">
              {["/", "/services", "/about", "/contact"].map((path, index) => (
                <NavLink
                  key={index}
                  onClick={() => setShowMenu(false)}
                  to={path}
                  className={({ isActive }) =>
                    `mobile-nav-item ${
                      isActive ? "text-blue-600 font-bold" : "text-gray-700"
                    } hover:text-blue-600`
                  }
                >
                  {path === "/" ? "HOME" : path.substring(1).toUpperCase()}
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
