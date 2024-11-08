import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";

import { ProfessionalContext } from "./context/ProfessionalContext";

import ProfessionalDashboard from "./pages/Professional/ProfessionalDashboard";
import ProfessionalsAppointments from "./pages/Professional/ProfessionalsAppointments";
import ProfessionalProfile from "./pages/Professional/ProfessionalProfile";
import AddProfessional from "./pages/Admin/AddProfessional";
import ProfessionalsList from "./pages/Admin/ProfessionalsList";

function App() {
  const { aToken } = useContext(AdminContext);
  const { pToken } = useContext(ProfessionalContext);
  return aToken || pToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/*Admin route */}
          <Route path="/" element={<></>}></Route>
          <Route path="/admin-dashboard" element={<Dashboard />}></Route>
          <Route path="/all-appointments" element={<AllAppointments />}></Route>
          <Route path="/add-professional" element={<AddProfessional />}></Route>
          <Route
            path="/professional-list"
            element={<ProfessionalsList />}
          ></Route>

          {/* Professional route */}
          <Route
            path="/professional-dashboard"
            element={<ProfessionalDashboard />}
          ></Route>
          <Route
            path="/professional-bookings"
            element={<ProfessionalsAppointments />}
          ></Route>
          <Route
            path="/professional-profile"
            element={<ProfessionalProfile />}
          ></Route>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App;
