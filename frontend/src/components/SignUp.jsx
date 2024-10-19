import React from "react";
import signupPageImg from "../assets/signupPageImg.png";

function SignUp() {
  return (
    <div className="flex min-h-screen">
      <div
        className="w-1/2 bg-white flex items-center justify-center"
        style={{
          backgroundImage: `url(${signupPageImg})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
      </div>

      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="max-w-md w-full p-10">
          <h2 className="text-3xl mb-6 text-gray-700">Sign up</h2>
          <p className="mb-6 text-gray-600">
            Sign up for free to access any of our products
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
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700"
            >
              Sign up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-500">
            Already have an account?{" "}
            <a href="#" className="text-purple-600 underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
