import { useContext, useEffect, useState } from "react";
import { ProfessionalContext } from "../../context/ProfessionalContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const ProfessionalProfile = () => {
  const { backendUrl, pToken, profileData, setProfileData, getProfileData } =
    useContext(ProfessionalContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
        experience: profileData.experience,
        about: profileData.about,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/professional/update-profile`,
        updateData,
        { headers: { pToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (pToken) {
      getProfileData();
    }
  }, [pToken]);

  return (
    profileData && (
      <div className="flex flex-col items-center justify-center p-5">
        <div className="w-full max-w-lg">
          {/* Reduced the image size */}
          <img
            className="w-32 h-32 rounded-lg shadow-md mb-5 object-cover"
            src={profileData.image}
            alt={`${profileData.name}'s profile`}
          />
          <div className="border border-stone-100 rounded-lg p-6 bg-white shadow-md">
            {/* Doctor Info: Name, Degree, Experience */}
            <h1 className="text-2xl font-semibold text-gray-700 mb-2">
              {profileData.name}
            </h1>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <span>
                {profileData.degree} - {profileData.speciality}
              </span>
              <button className="py-1 px-2 border text-xs rounded-full">
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        experience: e.target.value,
                      }))
                    }
                    value={profileData.experience}
                    className="border-b-2 focus:outline-none focus:border-primary"
                  />
                ) : (
                  profileData.experience
                )}
              </button>
            </div>

            {/* Doctor About Section */}
            <div>
              <p className="font-medium text-sm text-neutral-800">About:</p>
              <p className="text-sm text-gray-600 mt-1">
                {isEdit ? (
                  <textarea
                    cols={30}
                    rows={3}
                    value={profileData.about}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        about: e.target.value,
                      }))
                    }
                    className="w-full border p-2 rounded-md focus:outline-none focus:border-primary"
                  ></textarea>
                ) : (
                  profileData.about
                )}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-gray-600 font-medium">
                Appointment Fee:{" "}
                <span className="text-gray-800">
                  {currency}{" "}
                  {isEdit ? (
                    <input
                      type="number"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                      value={profileData.fees}
                      className="border-b-2 focus:outline-none focus:border-primary"
                    />
                  ) : (
                    profileData.fees
                  )}
                </span>
              </p>
            </div>

            {/* Address Section */}
            <div className="mt-4">
              <p className="font-medium">Address:</p>
              <div className="text-sm">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      placeholder="Line 1"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      value={profileData.address.line1}
                      className="border-b-2 w-full focus:outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      placeholder="Line 2"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      value={profileData.address.line2}
                      className="border-b-2 w-full focus:outline-none focus:border-primary mt-1"
                    />
                  </>
                ) : (
                  <>
                    <p>{profileData.address.line1}</p>
                    <p>{profileData.address.line2}</p>
                  </>
                )}
              </div>
            </div>

            {/* Availability Checkbox */}
            <div className="flex items-center gap-2 mt-4">
              <input
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
                type="checkbox"
                id="available"
              />
              <label htmlFor="available" className="text-sm">
                Available
              </label>
            </div>

            {/* Buttons for Editing and Saving */}
            <div className="flex justify-between mt-5">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-4 py-2 bg-primary text-white rounded-full hover:bg-opacity-80 transition-all"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-4 py-2 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all"
                >
                  Edit
                </button>
              )}
              {isEdit && (
                <button
                  onClick={() => setIsEdit(false)}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfessionalProfile;
