import React from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ formData }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/editProfilePage');
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 pb-20">
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
          <p className="text-gray-500">{formData.email || 'youremail@domain.com'} | {formData.phone || '+01 234 567 89'}</p>

          <div className="mt-6 w-full">
            <button
              className="w-full p-3 text-left bg-gray-50 rounded-lg mb-4 flex justify-between items-center"
              onClick={handleEditClick} 
            >
              <span>Edit profile information</span>
              <FaUserEdit className="text-gray-500" />
            </button>
            <div className="mt-4">
              <p><strong>Race:</strong> {formData.race}</p>
              <p><strong>Ethnicity:</strong> {formData.ethnicity}</p>
              <p><strong>Gender:</strong> {formData.gender}</p>
              <p><strong>Age:</strong> {formData.age}</p>
              <p><strong>Language:</strong> {formData.language}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
