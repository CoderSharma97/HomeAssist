import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-10 mb-28 text-sm px-4 md:px-20">
        {/* Icon Section with Background */}
        <div className="flex justify-center items-center w-full max-w-[360px] bg-gradient-to-br from-gray-200 to-gray-100 p-12 rounded-lg shadow-md mx-auto md:mx-0">
          <FiMapPin className="text-primary text-6xl md:text-8xl lg:text-9xl drop-shadow-md" />
        </div>

        {/* Contact Information Section */}
        <div className="flex flex-col justify-center items-start gap-8 text-gray-600 w-full md:w-2/3">
          <div>
            <p className="font-semibold text-lg text-gray-700">OUR OFFICE</p>
            <p>
              1234 HomeAssist Ave, Suite 101 <br />
              San Francisco, CA, USA
            </p>
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">CONTACT DETAILS</p>
            <p className="flex items-center gap-3 mt-2">
              <FiPhone className="text-primary text-xl" /> Tel: (123) 456-7890
            </p>
            <p className="flex items-center gap-3 mt-2">
              <FiMail className="text-primary text-xl" /> Email: support@homeassist.com
            </p>
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">JOIN OUR TEAM</p>
            <p className="mt-2">
              Discover exciting career opportunities and become part of a
              dedicated team committed to delivering exceptional service.
            </p>
            <button className="border border-gray-700 px-8 py-3 text-sm hover:bg-gray-700 hover:text-white transition-all duration-500 mt-3">
              Explore Careers
            </button>
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700">PARTNERSHIPS</p>
            <p className="mt-2">
              Interested in partnering with HomeAssist? We’d love to hear from
              you! Reach out to discuss collaboration opportunities.
            </p>
            <button className="border border-gray-700 px-8 py-3 text-sm hover:bg-gray-700 hover:text-white transition-all duration-500 mt-3">
              Partner with Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
