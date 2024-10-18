import React from "react";

function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 via-purple-300 to-orange-300">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Sign up</h2>
        <p className="mb-4">Sign up for free to access any of our products</p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Email address"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="#" className="text-purple-600 underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
