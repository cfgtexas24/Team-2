import React, { useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';  // Import Link and useNavigate for navigation

const AdminProfile = () => {
  const navigate = useNavigate();  // Hook to programmatically navigate

  // State to store the displayed user profile data
  const [profileData, setProfileData] = useState({
    email: 'youremail@domain.com',
    phone: '+1 234 567 8910',
    address: '35 Liberty Street, Plano, Tx 75074',
  });

  // State to manage the form inputs
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
  });

  // State to control visibility of the form
  const [isEditing, setIsEditing] = useState(false);

  // Handler function to update the form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler to toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handler to submit the form and update the profile data
  const handleSubmit = (e) => {
    e.preventDefault();
    setProfileData((prevData) => ({
      email: formData.email || prevData.email,
      phone: formData.phone || prevData.phone,
      address: formData.address || prevData.address,
    }));
    setFormData({ email: '', phone: '', address: '' }); // Clear form after submission
    setIsEditing(false);  // Hide the form after submission
  };

  // Handler for logout (same as current Dashboard button behavior)
  const handleLogout = () => {
    navigate('/');  // Navigate to the home page
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#2d2d2d', color: '#ffffff', padding: '30px' }}>
        <h2 className="text-2xl mb-6">Options</h2>
        <ul>
          {/* Dashboard Button now routes to /adminHome */}
          <li className="py-2">
            <Link to="/adminHome" style={{ color: 'inherit', textDecoration: 'none' }}>
              Dashboard
            </Link>
          </li>
          {/* Settings Button - Highlighted */}
          <li className="py-2" style={{ backgroundColor: '#555', padding: '10px', borderRadius: '5px' }}>
            Settings
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1, padding: '20px', backgroundColor: '#f8f8f8' }}>
        {/* Logout Button aligned at the top-right, just under the top bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button
            onClick={handleLogout}
            className="text-white py-2 px-4 rounded-lg"
            style={{ backgroundColor: '#A26B61' }}  // Custom color for the button
          >
            Logout
          </button>
        </div>

        {/* Profile Pane */}
        <div className="flex justify-center">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg" style={{ marginBottom: '20px', transition: 'height 0.3s ease' }}>
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

              <h2 className="mt-4 text-xl font-semibold">Jane Doe</h2>
              <p className="text-gray-500">{profileData.email} | {profileData.phone}</p>
              <p className="text-gray-500">{profileData.address}</p>

              <div className="mt-6 w-full">
                <button
                  onClick={handleEditClick}
                  className="w-full p-3 text-left bg-gray-50 rounded-lg mb-4 flex justify-between items-center"
                >
                  <span>{isEditing ? 'Close profile information' : 'Update profile information'}</span>
                  <FaUserEdit className="text-gray-500" />
                </button>

                {/* Form shows dynamically when "Update profile information" is clicked */}
                {isEditing && (
                  <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="phone"
                        >
                          Phone Number
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="address"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>

                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
