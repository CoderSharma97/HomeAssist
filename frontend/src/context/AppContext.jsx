import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [professionals, setProfessionals] = useState([]);
  const [loadingProfessionals, setLoadingProfessionals] = useState(true); // Loading state for doctors
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [userData, setUserData] = useState(false);
  const [loadingUserProfile, setLoadingUserProfile] = useState(true); // Loading state for user profile

  const getProfessionalsData = async () => {
    setLoadingProfessionals(true); // Start loading
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/professional/list`
      );
      if (data.success) {
        setProfessionals(data.serviceProviders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoadingProfessionals(false); // End loading
    }
  };

  const loadUserProfileData = async () => {
    if (!token) return; // Early exit if no token
    setLoadingUserProfile(true); // Start loading
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoadingUserProfile(false); // End loading
    }
  };

  useEffect(() => {
    getProfessionalsData();
  }, []);

  useEffect(() => {
    loadUserProfileData();
  }, [token]);

  const value = {
    professionals,
    loadingProfessionals, // Add loading state for doctors
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    loadingUserProfile, // Add loading state for user profile
    setUserData,
    getProfessionalsData,
    loadUserProfileData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
