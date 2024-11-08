import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-row flex-wrap bg-gradient-to-r from-[#0F4C75] to-[#3282B8] rounded-lg p-8 lg:p-16 shadow-xl">
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 m-auto text-center md:text-left">
        <p className="text-3xl md:text-5xl font-bold leading-snug text-[#FFFFFF]">
          Connect with Trusted <br /> Service Experts Near You
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 text-[#BBE1FA] text-sm font-light mt-4">
          <img className="w-24" src={assets.group_profiles} alt="Trusted Experts" />
          <p className="max-w-sm">
            Explore our extensive list of verified professionals and book top-quality services with ease.
          </p>
        </div>
        <a
          href="#speciality"
          className="mt-6 bg-[#FFB400] px-6 py-3 rounded-full text-gray-900 font-semibold text-sm hover:bg-[#FF8800] transition-transform duration-300 ease-in-out transform hover:scale-105"
        >
          Book Now
          <img className="inline-block w-4 ml-2" src={assets.arrow_icon} alt="Arrow Icon" />
        </a>
      </div>

      <div className="w-full md:w-1/2 relative mt-10 md:mt-0 flex justify-center">
        <img
          className="w-full max-w-lg h-auto object-cover rounded-lg shadow-lg"
          src={assets.header_img}
          alt="Service Header"
        />
      </div>
    </div>
  );
};

export default Header;
