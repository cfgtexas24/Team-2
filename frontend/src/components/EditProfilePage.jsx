import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = ({ formData, setFormData }) => {
  const [localFormData, setLocalFormData] = useState(formData);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(localFormData); // Update the main form data
    navigate('/profile'); // Redirect back to profile page after submission
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 pb-20">
      <div className="w-full max-w-md p-6 bg-white rounded-lg mt-6">
        <h2 className="text-xl font-semibold mb-4">Edit Profile Information</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(localFormData).map((field) => (
            <div className="mb-4" key={field}>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={field}
              >
                {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </label>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
