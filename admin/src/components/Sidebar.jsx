import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { ProfessionalContext } from "../context/ProfessionalContext";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCalendarCheck,
  FaUserPlus,
  FaUsers,
  FaUserCircle,
} from "react-icons/fa";

function Sidebar() {
  const { pToken } = useContext(ProfessionalContext);

  // Define menu items for both admin and professional roles
  const menuItems = !pToken
    ? [
        { to: "/admin-dashboard", icon: FaHome, label: "Dashboard" },
        { to: "/all-appointments", icon: FaCalendarCheck, label: "Bookings" },
        {
          to: "/add-professional",
          icon: FaUserPlus,
          label: "Add Professional",
        },
        {
          to: "/professional-list",
          icon: FaUsers,
          label: "Professionals List",
        },
      ]
    : [
        { to: "/professional-dashboard", icon: FaHome, label: "Dashboard" },
        {
          to: "/professional-bookings",
          icon: FaCalendarCheck,
          label: "Bookings",
        },
        { to: "/professional-profile", icon: FaUserCircle, label: "Profile" },
      ];

  return (
    <div className="min-h-screen bg-white border-r w-60 sm:w-64 md:w-72 lg:w-80">
      <div className="flex flex-col text-sm mt-5">
        <div className="flex items-center justify-center my-6">
          <FaUserCircle size={36} className="text-primary" />
          <p className="text-lg font-semibold text-primary ml-2 hidden md:block">
            {pToken ? (
              <div> Professional Dashboard</div>
            ) : (
              <div>Admin Dashboard</div>
            )}
          </p>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-3 md:px-9 transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#F2F3FF] border-r-4 border-primary text-primary"
                      : "text-[#515151]"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:block">{item.label}</span>
                <span className="md:hidden text-[#515151]">
                  {item.label.charAt(0)}
                </span>{" "}
                {/* Show first letter on mobile */}
              </NavLink>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
