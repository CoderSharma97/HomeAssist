import { useContext, useEffect } from "react";
import { ProfessionalContext } from "../../context/ProfessionalContext";
import { AppContext } from "../../context/AppContext";
import {
  FaDollarSign,
  FaCalendarCheck,
  FaUserFriends,
  FaListUl,
  FaTimesCircle,
  FaCheckCircle,
  FaUserCircle,
} from "react-icons/fa";

const ProfessionalDashboard = () => {
  const {
    pToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment,
  } = useContext(ProfessionalContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (pToken) getDashData();
  }, [pToken]);

  if (!dashData) return null;

  const stats = [
    {
      icon: <FaDollarSign className="text-primary w-10 h-10" />,
      label: "Earnings",
      value: `${currency} ${dashData.earnings}`,
    },
    {
      icon: <FaCalendarCheck className="text-primary w-10 h-10" />,
      label: "Appointments",
      value: dashData.appointments,
    },
    {
      icon: <FaUserFriends className="text-primary w-10 h-10" />,
      label: "Patients",
      value: dashData.patients,
    },
  ];

  return (
    <div className="m-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            {stat.icon}
            <div>
              <p className="text-2xl font-semibold text-gray-700">
                {stat.value}
              </p>
              <p className="text-gray-500 text-lg">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white mt-10 shadow-lg rounded-lg">
        <div className="flex items-center gap-3 p-5 border-b">
          <FaListUl className="text-primary w-7 h-7" />
          <p className="font-semibold text-gray-700 text-lg">Latest Bookings</p>
        </div>

        <div className="divide-y">
          {dashData.latestAppointments.map((item, index) => {
            const firstLetter = item.userData.name.charAt(0).toUpperCase(); // Get the first letter of the user's name

            return (
              <div
                key={index}
                className="flex items-center p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-center bg-gray-200 rounded-full w-14 h-14">
                  {/* <FaUserCircle className="text-primary w-7 h-7" /> */}
                  <span className="absolute text-xl font-bold text-gray-700">
                    {firstLetter}
                  </span>
                </div>
                <div className="flex-1 ml-4">
                  <p className="text-gray-800 font-medium text-lg">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-500 font-semibold text-sm">
                    Cancelled
                  </p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 font-semibold text-sm">
                    Completed
                  </p>
                ) : (
                  <div className="flex items-center space-x-4">
                    <FaTimesCircle
                      className="text-red-400 w-7 h-7 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => cancelAppointment(item._id)}
                    />
                    <FaCheckCircle
                      className="text-green-500 w-7 h-7 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => completeAppointment(item._id)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
