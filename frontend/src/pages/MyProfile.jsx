import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaCloudUploadAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaCalendarAlt,
  FaUserCircle,
} from "react-icons/fa"; // Import icons

const MyProfile = () => {
  const { userData, setuserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-lg mx-auto p-4 flex flex-col gap-4 text-sm">
        {/* Profile Picture */}
        <div className="flex flex-col items-center relative">
          <label htmlFor="image" className="cursor-pointer">
            {image || userData.image ? (
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
            ) : (
              <FaUserCircle className="w-36 h-36 text-gray-500" />
            )}
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />

            {/* Show the cloud icon and "Edit image" text only when in edit mode */}
            {isEdit && (
              <div className="flex flex-col items-center mt-2">
                <FaCloudUploadAlt className="w-6 h-6 text-gray-500" />
                <p className="text-xs text-gray-500">Edit image</p>
              </div>
            )}
          </label>
        </div>

        {/* User Information */}
        <div className="text-center">
          {isEdit ? (
            <input
              className="bg-gray-50 text-3xl font-medium mt-4 p-2 border border-gray-300 rounded"
              type="text"
              onChange={(e) =>
                setuserData((prev) => ({ ...prev, name: e.target.value }))
              } // Update name
              value={userData.name}
            />
          ) : (
            <p className="font-medium text-3xl text-neutral-800 mt-4">
              {userData.name}
            </p>
          )}
        </div>

        <hr className="bg-zinc-400 h-[1px] border-none" />

        {/* Contact Information */}
        <div>
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 mt-3 text-neutral-700">
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <p className="font-medium">Email:</p>
            </div>
            {isEdit ? (
              <input
                className="bg-gray-100 max-w-xs p-1 rounded"
                type="email"
                onChange={(e) =>
                  setuserData((prev) => ({ ...prev, email: e.target.value }))
                } // Update email
                value={userData.email}
              />
            ) : (
              <p className="text-blue-500">{userData.email}</p>
            )}

            <div className="flex items-center">
              <FaPhone className="mr-2" />
              <p className="font-medium">Phone:</p>
            </div>
            {isEdit ? (
              <input
                className="bg-gray-100 max-w-xs p-1 rounded"
                type="tel"
                onChange={(e) =>
                  setuserData((prev) => ({ ...prev, phone: e.target.value }))
                } // Update phone
                value={userData.phone}
                minLength={10}
                maxLength={10}
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}

            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <p className="font-medium">Address:</p>
            </div>
            {isEdit ? (
              <>
                <input
                  className="bg-gray-50 p-1 rounded mb-1"
                  type="text"
                  onChange={(e) =>
                    setuserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value }, // Update address line 1
                    }))
                  }
                  value={userData.address.line1}
                />
                <input
                  className="bg-gray-50 p-1 rounded"
                  type="text"
                  onChange={(e) =>
                    setuserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value }, // Update address line 2
                    }))
                  }
                  value={userData.address.line2}
                />
              </>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 mt-3 text-neutral-700">
            <div className="flex items-center">
              <FaUser className="mr-2" />
              <p className="font-medium">Gender:</p>
            </div>
            {isEdit ? (
              <select
                className="max-w-xs bg-gray-100 p-1 rounded"
                onChange={(e) =>
                  setuserData((prev) => ({ ...prev, gender: e.target.value }))
                } // Update gender
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}

            <div className="flex items-center">
              <FaCalendarAlt className="mr-2" />
              <p className="font-medium">Birthday:</p>
            </div>
            {isEdit ? (
              <input
                className="max-w-xs bg-gray-100 p-1 rounded"
                type="date"
                onChange={(e) =>
                  setuserData((prev) => ({ ...prev, dob: e.target.value }))
                } // Update date of birth
                value={userData.dob}
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>

          {/* Save/Cancel Buttons */}
          <div className="mt-10">
            {isEdit ? (
              <button
                className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
                onClick={updateUserProfileData} // Save information
              >
                Save Information
              </button>
            ) : (
              <button
                className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
                onClick={() => setIsEdit(true)} // Edit mode
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
