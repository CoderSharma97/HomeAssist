import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import {
  FaBriefcase, // Professional icon
  FaCalendarAlt, // Appointments icon
  FaUserFriends, // Customers icon
  FaListUl, // List icon
  FaTrashAlt, // Cancel icon
  FaCheckCircle // Completed icon
} from "react-icons/fa";
import { FaUserTie } from "react-icons/fa"; // Professional icon


const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 bg-white p-4 rounded border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
            <FaUserTie className="w-14 h-14 text-primary" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.serviceProviders}
              </p>
              <p className="text-gray-400">Professionals</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 rounded border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
            <FaCalendarAlt className="w-14 h-14 text-primary" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Bookings</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 rounded border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
            <FaUserFriends className="w-14 h-14 text-primary" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.customers}
              </p>
              <p className="text-gray-400">Customers</p>
            </div>
          </div>
        </div>

        <div className="bg-white mt-6 rounded-lg shadow">
          <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border-b border-gray-200 bg-gray-50">
            <FaListUl className="text-primary" />
            <p className="font-semibold text-lg">Latest Bookings</p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-4 gap-3 hover:bg-gray-100 transition-colors"
                key={index}
              >
                <img
                  className="rounded-full w-12 h-12"
                  src={item.spData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-semibold text-base">
                    {item.spData.name}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <FaCheckCircle className="text-green-500 text-xs font-medium" />
                ) : (
                  <FaTrashAlt
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer text-red-400 hover:text-red-600 transition-colors"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
