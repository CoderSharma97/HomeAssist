import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import LoadingSpinner from "./LoadingSpinner"; // Make sure to import the LoadingSpinner component

const TopProfessionals = () => {
  const navigate = useNavigate();
  const { professionals, loadingProfessionals } = useContext(AppContext);

  // Show loading spinner if loadingDoctors is true

  return loadingProfessionals ? (
    <LoadingSpinner />
  ) : (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-800 md:mx-10">
      <h1 className="text-4xl font-semibold text-blue-800">
        Top Service Professionals
      </h1>
      <p className="sm:w-1/3 text-center text-m text-gray-600">
        Discover our top-rated service professionals for a seamless experience.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {professionals &&
          professionals.slice(0, 10).map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-5px] transition-all duration-300 shadow-lg hover:bg-blue-50"
              key={index}
            >
              <img
                className="bg-blue-50 h-32 w-full object-cover"
                src={item.image}
                alt={`${item.name} - ${item.speciality}`}
              />
              <div className="p-4">
                {item.available ? (
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available for Service</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-center text-red-500">
                    <p className="w-2 h-2 bg-red-500 rounded-full"></p>
                    <p>Currently Unavailable</p>
                  </div>
                )}
                <p className="text-gray-900 text-lg font-semibold">
                  {item.name}
                </p>
                <p className="text-gray-600 font-medium">{item.speciality}</p>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={() => {
          navigate("/services");
          scrollTo(0, 0);
        }}
        className="bg-primary text-white px-12 py-3 rounded-full mt-10 transition-colors duration-300 hover:bg-blue-600"
      >
        View More Professionals
      </button>
    </div>
  );
};

export default TopProfessionals;
