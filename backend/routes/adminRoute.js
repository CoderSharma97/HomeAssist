import express from "express";
import adminController from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";
import serviceProviderController from "../controllers/serviceProviderController.js";

const {
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
  addserviceProvider,
  allServiceProviders,
} = adminController;
const { changeAvailablity } = serviceProviderController;

const adminRouter = express.Router();

adminRouter.post(
  "/add-professional",
  authAdmin,
  upload.single("image"),
  addserviceProvider
);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-professionals", authAdmin, allServiceProviders);
adminRouter.post("/change-availability", authAdmin, changeAvailablity);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.get("/dashboard", authAdmin, adminDashboard);
export default adminRouter;
