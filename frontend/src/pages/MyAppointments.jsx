import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaRegTrashAlt,
  FaCreditCard,
  FaMoneyBillWave,
} from "react-icons/fa";

const MyAppointments = () => {
  const { backendUrl, token, getProfessionalsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointment = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointment();
        getProfessionalsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );

          if (data.success) {
            getUserAppointment();
            navigate("/my-appointments");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointment();
    }
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Bookings
      </h2>
      <div className="space-y-4">
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white shadow-md rounded-lg p-4"
            key={index}
          >
            <div className="flex items-center justify-center md:justify-start">
              <img
                className="w-32 h-32 rounded-full object-cover"
                src={item?.spData?.image}
                alt={item?.spData?.name}
              />
            </div>
            <div className="flex flex-col justify-center text-center md:text-left">
              <p className="text-lg text-neutral-800 font-semibold">
                {item?.spData?.name}
              </p>
              <p className="text-sm text-zinc-700 font-medium mt-1">
                {item?.spData?.speciality}
              </p>
              <p className="text-xs mt-1">
                Address: {item?.spData?.address?.line1}{" "}
                {item?.spData?.address?.line2}
              </p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                {slotDateFormat(item?.slotDate)} | {item?.slotTime}
              </p>
            </div>
            <div className="flex flex-col justify-between mt-4 md:mt-0">
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className="flex items-center justify-center py-2 px-4 border rounded text-stone-500 bg-indigo-50">
                  <FaCheckCircle className="mr-2" />
                  Paid
                </button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="flex items-center justify-center text-sm text-stone-500 text-center py-2 border hover:bg-primary hover:text-white transition-all duration-500"
                >
                  <FaCreditCard className="mr-2" />
                  Pay Online
                </button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item?._id)}
                  className="flex items-center justify-center text-sm text-stone-500 text-center py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-500"
                >
                  <FaRegTrashAlt className="mr-2" />
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className="py-2 px-2 border border-red-500 rounded text-red-500">
                  Appointment Cancelled
                </button>
              )}
              {item.isCompleted && (
                <button className="py-2 px-2 border border-green-300 rounded text-green-500">
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
