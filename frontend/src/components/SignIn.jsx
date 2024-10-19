import React from "react";
import signupPageImg from "../assets/signupPageImg.png";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-white flex items-center justify-center">
        <img
          src={signupPageImg}
          alt="Sign In"
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="max-w-md w-full p-10">
          <h2 className="text-3xl mb-6 text-gray-700">Sign In</h2>
          <p className="mb-6 text-gray-600">
            Sign In for free to access any of our products
          </p>
          <form>
            <div className="mb-6">
              <label className="block text-gray-600 mb-2">
                Email address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Email address"
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
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#A26B61] text-white rounded-lg font-bold hover:bg-[#F4E8E7]"
            >
              Sign In
            </button>

          </form>
          <p className="mt-4 text-center text-gray-500">
            Don't have an account?{" "}
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
