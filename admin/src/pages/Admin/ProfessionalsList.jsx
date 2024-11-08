import { useContext, useEffect, memo } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FaUserTie } from "react-icons/fa";

const ProfessionalCard = memo(({ item, changeAvailability }) => (
  <div className="border border-indigo-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group">
    <img
      className="w-full h-40 object-cover rounded-t-lg bg-indigo-50 group-hover:bg-primary transition-colors duration-500"
      src={item.image}
      alt={item.name}
      loading="lazy" // Lazy loading image to reduce initial load
    />
    <div className="p-4 space-y-1">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <FaUserTie className="text-primary" />
        <p>{item.name}</p>
      </div>
      <p className="text-gray-600 text-sm">{item.speciality}</p>
      <div className="mt-2 flex items-center gap-2 text-sm">
        <input
          onChange={() => changeAvailability(item._id)}
          type="checkbox"
          checked={item.available}
          className="accent-primary"
        />
        <p className="text-gray-700">Available</p>
      </div>
    </div>
  </div>
));

function ProfessionalsList() {
  const { professionals, aToken, getAllProfessionals, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllProfessionals();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        All Professionals
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionals &&
          professionals.map((item, index) => (
            <ProfessionalCard
              key={index}
              item={item}
              changeAvailability={changeAvailability}
            />
          ))}
      </div>
    </div>
  );
}

export default ProfessionalsList;
