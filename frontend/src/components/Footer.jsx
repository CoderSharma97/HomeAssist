import { assets } from "../assets/assets";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="px-4 md:mx-10 mt-40">
      <div className="flex flex-col sm:grid grid-flow-col gap-14 my-10 text-sm">
        {/* Logo and Description Section */}
        <div className="flex flex-col items-start">
          <img className="mb-5 w-32 md:w-40" src={assets.logo} alt="HomeAssist Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            HomeAssist connects you with trusted professionals for home and lifestyle services, making it easy to book quality help for everything from cleaning and repairs to wellness services. Count on us for a seamless experience, backed by reliability and convenience.
          </p>
          <div className="flex gap-4 mt-4 text-gray-500">
            <FaFacebookF className="hover:text-primary cursor-pointer" />
            <FaTwitter className="hover:text-primary cursor-pointer" />
            <FaInstagram className="hover:text-primary cursor-pointer" />
            <FaLinkedin className="hover:text-primary cursor-pointer" />
          </div>
        </div>

        {/* Company Links Section */}
        <div>
          <p className="text-xl font-medium mb-5 text-gray-700">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-primary cursor-pointer">Home</li>
            <li className="hover:text-primary cursor-pointer">About Us</li>
            <li className="hover:text-primary cursor-pointer">Contact</li>
            <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Get In Touch Section */}
        <div>
          <p className="text-xl font-medium mb-5 text-gray-700">GET IN TOUCH</p>
          <ul className="flex flex-col gap-3 text-gray-600">
            <li className="flex items-center gap-2">
              <FiPhone className="text-primary" /> +1-212-345-6782
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="text-primary" /> support@homeassist.com
            </li>
            <li className="flex items-center gap-2">
              <FiMapPin className="text-primary" /> San Francisco, CA, USA
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t mt-10 pt-5 text-center">
        <p className="text-sm text-gray-500">
          &copy; 2024 <span className="text-primary font-semibold">HomeAssist</span> - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
