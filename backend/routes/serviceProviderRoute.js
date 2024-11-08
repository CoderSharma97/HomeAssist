import express from "express";
import authServiceProvider from "../middleware/authServiceProvider.js";
import serviceProviderController, {
  appointmentServiceProvider,
  loginServiceProvider,
  serviceProviderDashboard,
  serviceProviderList,
  serviceProviderProfile,
  updateServiceProviderprofile,
} from "../controllers/serviceProviderController.js";

const { appointmentComplete, appointmentCancel } = serviceProviderController;
const serviceProviderRouter = express.Router();

serviceProviderRouter.get("/list", serviceProviderList);
serviceProviderRouter.post("/login", loginServiceProvider);
serviceProviderRouter.get(
  "/appointments",
  authServiceProvider,
  appointmentServiceProvider
);

serviceProviderRouter.post(
  "/complete-appointment",
  authServiceProvider,
  appointmentComplete
);
serviceProviderRouter.post(
  "/cancel-appointment",
  authServiceProvider,
  appointmentCancel
);
serviceProviderRouter.get(
  "/dashboard",
  authServiceProvider,
  serviceProviderDashboard
);
serviceProviderRouter.get(
  "/profile",
  authServiceProvider,
  serviceProviderProfile
);
serviceProviderRouter.post(
  "/update-profile",
  authServiceProvider,
  updateServiceProviderprofile
);
export default serviceProviderRouter;
