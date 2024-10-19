import React, { useState } from "react";
import signupPageImg from "../assets/signupPageImg.png";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SignUp() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          // Send the POST request to the Flask backend
          const response = await axios.post('http://127.0.0.1:5000/signup', {
            email: email,
            password: password
          });
    
          // Check if the response contains valid data
          if (response.status != 201) {
            alert('Invalid sign up'); // Display an alert for invalid login
          } else {
              navigate('/form');  // Replace with your actual user route
          }
    
        } catch (error) {
          console.error('Error during sign-in:', error);
          alert('An error occurred while trying to sign in.');
        }
    };


  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-white flex items-center justify-center">
        <img 
          src={signupPageImg} // Use the imported image on the left side of the screen
          alt="Sign Up" // Provide an alt text for the image
          className="max-w-full max-h-full object-contain" // Add classes to style the image and ensure it fits the container
        />
      </div>

      {/* Copy of SignIn logic, just changed to fit SignOut purposes: Logic remains the same */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="max-w-md w-full p-10">
          <h2 className="text-3xl mb-6 text-gray-700">Sign up</h2>
          <p className="mb-6 text-gray-600">
            Sign up for free to access any of our products
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-600 mb-2">
                Email address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Email address"
                value={email} // Bind the input to email state
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Password"
                value={password} // Bind the input to password state
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#A26B61] text-white rounded-lg font-bold hover:bg-[#F4E8E7]"
            >
              Sign up
            </button>

          </form>
          <p className="mt-4 text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/signin" className="[#A26B61]-underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
