import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedProfessional from "../components/RelatedProfessional";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const navigate = useNavigate();
  const { spId } = useParams();
  const { professionals, currencySymbol, token, backendUrl, getProfessionalsData } = useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [profInfo, setProfInfo] = useState(null);
  const [profSlots, setProfSlots] = useState([]);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const fetchProfInfo = () => {
      const professional = professionals.find((doc) => doc._id === spId);
      setProfInfo(professional);
    };
    fetchProfInfo();
  }, [professionals, spId]);

  useEffect(() => {
    const getAvailableSlots = () => {
      if (!profInfo) return;
      const today = new Date();
      const slots = Array.from({ length: 7 }, (_, i) => {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        const endTime = new Date(currentDate);
        endTime.setHours(21, 0, 0, 0);

        currentDate.setHours(i === 0 && today.getHours() >= 10 ? today.getHours() + 1 : 10, today.getMinutes() > 30 ? 30 : 0);

        const daySlots = [];
        while (currentDate < endTime) {
          const formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
          const isSlotAvailable = !profInfo.slots_booked?.[slotDate]?.includes(formattedTime);

          if (isSlotAvailable) {
            daySlots.push({ datetime: new Date(currentDate), time: formattedTime });
          }
          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }
        return daySlots;
      });
      setProfSlots(slots);
    };
    getAvailableSlots();
  }, [profInfo]);

  const handleSlotSelect = (index) => {
    setSelectedSlotIndex(index);
    setSelectedTime("");
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to Book Appointment");
      return navigate("/login");
    }

    try {
      const date = profSlots[selectedSlotIndex][0].datetime;
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { spId, slotDate, slotTime: selectedTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getProfessionalsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error details:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-6 bg-white rounded-lg shadow-md p-6">
        <div className="w-full sm:w-1/3">
          <img className="bg-primary w-full rounded-lg" src={profInfo?.image} alt={profInfo?.name} />
        </div>
        <div className="flex-1 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <p className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
            {profInfo?.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>{`${profInfo?.degree} - ${profInfo?.speciality}`}</p>
            <span className="py-0.5 px-2 bg-primary text-white text-xs rounded-full">{profInfo?.experience}</span>
          </div>
          <div className="mt-4">
            <p className="flex items-center gap-1 text-lg font-medium text-gray-900">
              About <img src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-gray-500">{profInfo?.about}</p>
          </div>
          <p className="text-gray-600 font-medium mt-4">
            Booking Fee: <span className="text-gray-800 font-semibold">{currencySymbol}{profInfo?.fees}</span>
          </p>
        </div>
      </div>

      <div className="mt-6 font-medium text-gray-700">
        <p className="text-lg">Available Slots</p>
        <div className="flex gap-4 overflow-x-auto mt-4 pb-2">
          {profSlots.map((daySlots, index) => (
            <div
              key={index}
              onClick={() => handleSlotSelect(index)}
              className={`text-center py-3 px-4 min-w-20 rounded-lg cursor-pointer transition duration-200 ${
                selectedSlotIndex === index ? "bg-primary text-white shadow-md" : "bg-gray-100 text-gray-600"
              } hover:bg-primary hover:text-white`}
            >
              <p>{daySlots[0] && daysOfWeek[daySlots[0].datetime.getDay()]}</p>
              <p>{daySlots[0] && daySlots[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>
        
        <div className="flex gap-3 overflow-x-auto mt-4 pb-2">
          {profSlots[selectedSlotIndex]?.map((slot, index) => (
            <p
              key={index}
              onClick={() => handleTimeSelect(slot.time)}
              className={`text-sm font-medium px-4 py-2 rounded-full cursor-pointer transition duration-200 ${
                selectedTime === slot.time ? "bg-primary text-white shadow-md" : "text-gray-600 bg-gray-100"
              } hover:bg-primary hover:text-white`}
            >
              {slot.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className="mt-6 bg-primary text-white text-sm font-medium px-14 py-3 rounded-full hover:bg-primary-dark transition duration-300 w-full sm:w-auto"
        >
          Book A Visit
        </button>
      </div>

      <RelatedProfessional spId={spId} speciality={profInfo?.speciality} />
    </div>
  );
};

export default Appointment;
