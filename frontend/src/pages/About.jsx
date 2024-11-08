import { FiUsers } from "react-icons/fi";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12 items-center">
        <FiUsers className="text-primary text-9xl" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to HomeAssist, your reliable platform for connecting with skilled professionals for all your home and personal service needs. At HomeAssist, we understand the importance of finding trustworthy providers who deliver quality service at your convenience.
          </p>
          <p>
            Our platform is designed to simplify the process of scheduling a range of services, from home cleaning and appliance repair to pest control and salon services. HomeAssist is committed to ensuring that you have access to experienced and certified professionals who prioritize your satisfaction and comfort.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at HomeAssist is to bring you dependable, top-quality services right to your doorstep. We strive to empower you with the resources you need to keep your home and lifestyle in the best shape possible, without the hassle.
          </p>
        </div>
      </div>
      
      <div className="text-xl my-4 text-center">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20 gap-6">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>QUALITY ASSURANCE:</b>
          <p>
            We only work with vetted and skilled professionals to ensure you receive the highest quality of service.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CONVENIENCE:</b>
          <p>
            Easily schedule appointments with trusted providers at a time that suits you best, all through our platform.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>CUSTOMIZED SERVICES:</b>
          <p>
            Get personalized service recommendations tailored to your preferences and requirements for every job.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
