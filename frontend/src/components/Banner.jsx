import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-[#0F4C75] to-[#3282B8] rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 shadow-xl overflow-hidden">
      <div className="flex-1 py-8 sm:py-16 lg:py-24 md:py-16 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
          <p>Book Your Appointment</p>
          <p className="mt-4">With 100+ Trusted Professionals</p>
        </div>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="bg-[#FFB400] text-gray-900 text-sm sm:text-base px-8 py-3 rounded-full mt-6 hover:bg-[#FF8800] transition-all duration-300"
        >
          Create Account
        </button>
      </div>
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative overflow-hidden">
        <img
          className="w-full h-auto object-cover max-w-full"
          src={assets.appointment_img}
          alt="Appointment Illustration"
        />
      </div>
    </div>
  );
};

export default Banner;
