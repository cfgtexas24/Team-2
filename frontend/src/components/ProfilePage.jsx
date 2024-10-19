import React, { useState } from 'react';
import { FaBell, FaCog, FaUserEdit } from 'react-icons/fa';   // Importing icons to be used in the profile page

const ProfilePage = () => {
  // State to storm the user profile data
  const [formData, setFormData] = useState({
    race: '',
    ethnicity: '',
    gender: '',
    age: '',
    language: '',
    disability: '',
    education_level: '',
    employment_status: '',
    housing_status: '',
  });

  // Handler function to update the form data
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Destructuring the name and value from the target object
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Updating the form data with the new value
    }));
  };

  /* This component displays a user profile page where users can view and edit their personal information.
   It utilizes React's useState hook to manage form data, allowing users to input details such as race, 
   ethnicity, gender, age, language, disability status, education level, employment status, and housing status */
   
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg mt-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-300"
            />
            <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1">
              <FaUserEdit />
            </button>
          </div>

          <h2 className="mt-4 text-xl font-semibold">Puerto Rico</h2>
          <p className="text-gray-500">youremail@domain.com | +01 234 567 89</p>

          <div className="mt-6 w-full">
            <button className="w-full p-3 text-left bg-gray-50 rounded-lg mb-4 flex justify-between items-center">
              <span>Edit profile information</span>
              <FaUserEdit className="text-gray-500" />
            </button>
            <div className="mt-4">
              <form>
                {Object.keys(formData).map((field) => (
                  <div className="mb-4" key={field}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                      {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </label>
                    <input
                      type="text"
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
