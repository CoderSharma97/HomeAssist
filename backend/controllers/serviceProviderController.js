import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import serviceProviderModel from "../models/serviceProviderModel.js";

export const changeAvailablity = async (req, res) => {
  try {
    const { spId } = req.body;
    const spData = await serviceProviderModel.findById(spId);
    await serviceProviderModel.findByIdAndUpdate(spId, {
      available: !spData.available,
    });
    res.json({ success: true, message: "Availablity changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const serviceProviderList = async (req, res) => {
  try {
    const serviceProviders = await serviceProviderModel
      .find({})
      .select(["-password,-email"]);
    res.json({ success: true, serviceProviders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for doctor Login

export const loginServiceProvider = async (req, res) => {
  try {
    const { email, password } = req.body;
    const serviceProvider = await serviceProviderModel.findOne({ email });
    console.log(serviceProvider);

    if (!serviceProvider) {
      return res.json({ success: false, message: "Invalid Credentials " });
    }

    const isMatch = await bcrypt.compare(password, serviceProvider.password);

    if (isMatch) {
      const token = jwt.sign(
        { id: serviceProvider._id },
        process.env.JWT_SECRET
      );
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get doctor appointments for doctor panel

export const appointmentServiceProvider = async (req, res) => {
  try {
    const { spId } = req.body;
    const appointments = await appointmentModel.find({ spId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to mark appointment completed for doctorpanel

const appointmentComplete = async (req, res) => {
  try {
    const { spId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.spId === spId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to cancel appointment  for doctorpanel

const appointmentCancel = async (req, res) => {
  try {
    const { spId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.spId === spId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get dahsboard data for doctor panel
export const serviceProviderDashboard = async (req, res) => {
  try {
    const { spId } = req.body;

    const appointments = await appointmentModel.find({ spId });
    let earnings = 0;
    appointments.map((item, index) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let customers = [];

    appointments.map((item) => {
      if (!customers.includes(item.userId)) {
        customers.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      customers: customers.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//API to get doctor profile for doctorpanel

export const serviceProviderProfile = async (req, res) => {
  try {
    const { spId } = req.body;
    const profileData = await serviceProviderModel
      .findById(spId)
      .select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//API to update doctor profile data from doctorpanel

export const updateServiceProviderprofile = async (req, res) => {
  try {
    const { spId, fees, address, available, experience, about } = req.body;

    await serviceProviderModel.findByIdAndUpdate(spId, {
      fees,
      address,
      available,
      experience,
      about,
    });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default {
  changeAvailablity,

  appointmentCancel,
  appointmentComplete,
};
