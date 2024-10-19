import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './output.css'; // Ensure the path is correct after compilation
import AdminDashboard from './adminDashboard/page'; // Adjust the path as necessary

// The App component
function App() {
  return (
    <Router>
      <Routes>
        {/* Define a route for the home page (or you can remove if not needed) */}
        <Route path="/" element={<Home />} />
        {/* Define the route for the Admin Dashboard */}
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

// Simple Home component (You can remove this or modify as needed)
function Home() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center">Home Page</h1>
    </div>
  );
}

export default App;
