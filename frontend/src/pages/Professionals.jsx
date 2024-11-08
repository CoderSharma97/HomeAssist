import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaHome, FaTools, FaBug, FaLightbulb, FaWater } from "react-icons/fa"; // Importing the icons
import { FaScissors } from "react-icons/fa6";

export const specialityData = [
  {
    speciality: "Home Cleaning",
    icon: <FaHome />, // Home Cleaning icon
  },
  {
    speciality: "Salon Services",
    icon: <FaScissors />, // Salon Services icon
  },
  {
    speciality: "Appliance Repair",
    icon: <FaTools />, // Appliance Repair icon
  },
  {
    speciality: "Pest Control",
    icon: <FaBug />, // Pest Control icon
  },
  {
    speciality: "Electrical Services",
    icon: <FaLightbulb />, // Electrical Services icon
  },
  {
    speciality: "Plumbing Services",
    icon: <FaWater />, // Plumbing Services icon
  },
];

const Professionals = () => {
  const { speciality } = useParams();
  const { professionals } = useContext(AppContext);
  const [filterProf, setFilterProf] = useState([]);
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);

  const applyFilter = () => {
    if (speciality) {
      setFilterProf(professionals.filter((prof) => prof.speciality === speciality));
    } else {
      setFilterProf(professionals);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [professionals, speciality]);

  return (
    professionals && (
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mt-8">
          Browse through our Services
        </h2>
        <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
          <button
            className={`py-3 px-3 border rounded text-sm transition-all sm:hidden ${
              showFilter ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            Filters
          </button>
          <div
            className={`flex-col gap-4 text-sm text-gray-600 ${
              showFilter ? "flex" : "hidden sm:flex"
            }`}
          >
            {specialityData.map((item) => (
              <p
                key={item.speciality}
                onClick={() =>
                  speciality === item.speciality
                    ? navigate("/services")
                    : navigate(`/services/${item.speciality}`)
                }
                className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                  speciality === item.speciality
                    ? "bg-indigo-100 text-black"
                    : ""
                }`}
              >
                {item.icon} {item.speciality}
              </p>
            ))}
          </div>
          <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
            {filterProf.map((item, index) => (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                key={index}
              >
                <img className="bg-blue-50" src={item.image} alt={item.name} />
                <div className="p-4">
                  {item.available ? (
                    <div className="flex items-center gap-2 text-sm text-center text-green-500">
                      <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                      <p>Available</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-center text-red-500">
                      <p className="w-2 h-2 bg-red-500 rounded-full"></p>
                      <p>Not Available</p>
                    </div>
                  )}
                  <p className="text-gray-900 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 font-medium">{item.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Professionals;
