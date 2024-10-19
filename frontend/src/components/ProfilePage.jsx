import React from 'react';
import { FaBell, FaCog, FaUserEdit } from 'react-icons/fa';

const ProfilePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center ">
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
            <div className="flex justify-between items-center">
              <span>Notifications</span>
              <span className="text-blue-500">ON</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span>Language</span>
              <span className="text-gray-500">English</span>
            </div>
          </div>
        </div>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around p-4">
        <button>Trans.</button>
        <button>Feeds</button>
        <button>Home</button>
        <button>Wallet</button>
        <button className="text-blue-500">Profile</button>
      </nav>
    </div>
  );
};

export default ProfilePage;
