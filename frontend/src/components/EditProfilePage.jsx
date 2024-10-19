import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// The EditProfilePage component receives formData and setFormData as props for handling form data state.
const EditProfilePage = ({ formData, setFormData }) => {
  // Local state to manage form data locally before submitting.
  const [localFormData, setLocalFormData] = useState(formData);
  // useNavigate hook from react-router-dom to programmatically navigate to another route.
  const navigate = useNavigate();

  // handleInputChange updates the localFormData state when any input field changes.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // handleSubmit prevents the default form submission behavior, updates the global formData via setFormData, and navigates to the profile page.
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(localFormData); 
    navigate('/profile'); 
  };

  // Render a form interface for editing profile information.
  return (
    <div className="min-h-screen flex flex-col items-center pt-16 pb-20">
      <div className="w-full max-w-md p-6 bg-white rounded-lg mt-6">
        <h2 className="text-xl font-semibold mb-4">Edit Profile Information</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(localFormData).map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={localFormData[field]}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full p-3 text-center bg-blue-500 text-white rounded-lg mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
