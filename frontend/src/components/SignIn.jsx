import React from "react";
import signupPageImg from "../assets/signupPageImg.png";
import { Link } from "react-router-dom"; // Import the Link component from React Router

function SignIn() {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-white flex items-center justify-center">
        <img
          src={signupPageImg} // Use the imported image on the left side of the screen
          alt="Sign In" // Provide an appropriate alt text for the image
          className="max-w-full max-h-full object-contain" // Add classes to style the image and to ensure it fits the container
        />
      </div>

      <div className="w-1/2 bg-white flex items-center justify-center"> {/* Corrected the width value */}
        <div className="max-w-md w-full p-10"> {/* Corrected the padding value */}
          <h2 className="text-3xl mb-6 text-gray-700">Sign In</h2> {/* Corrected the text size and color */}
          <p className="mb-6 text-gray-600"> {/* Corrected the text color */}
            Sign In for free access to our products 
          </p>
          <form>
            <div className="mb-6">
              <label className="block text-gray-600 mb-2">
                Email address
              </label>
              <input
                type="email" // Set the input type to "email" for email validation
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Email address"
                required  // Add the "required" attribute for form validation
              />
            </div>
            <div className="mb-6"> {/* Added margin bottom for spacing */}
              <label className="block text-gray-600 mb-2"> 
                Password
              </label>
              <input
                type="password" // Set the input type to "password" for secure input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Password"
                required // Add the "required" attribute for form validation
              />
            </div>
            <button
              type="submit" // Set the button type to "submit" to turn in the form
              className="w-full py-3 bg-[#A26B61] text-white rounded-lg font-bold hover:bg-[#F4E8E7]"
            >
              Sign In
            </button>

          </form>
          <p className="mt-4 text-center text-gray-500">
            Would you like to create an account?{" "}   {/* Ask users who do not have an account if they would like one */}
            <Link to="/" className="[#A26B61]-underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
