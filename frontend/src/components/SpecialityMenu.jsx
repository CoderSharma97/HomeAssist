import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800" id="speciality">
      <h1 className="text-4xl font-semibold text-blue-800">Explore Our Services</h1>
      <p className="sm:w-1/3 text-center text-m text-gray-600">
        Browse our comprehensive list of services to find trusted professionals and schedule your appointments with ease.
      </p>
      <div className="flex flex-wrap justify-center gap-4 pt-5 w-full overflow-hidden mt-8">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 hover:bg-blue-100 rounded-lg p-4 shadow-lg w-32"
            key={index}
            to={`/services/${item.speciality}`}
          >
            <p className="text-blue-600 text-3xl mb-2">{item.icon}</p> {/* Increased icon size */}
            <p className="font-medium text-gray-800 text-center">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
