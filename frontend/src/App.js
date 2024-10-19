import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router components
import './App.css';
import SignupForm from './components/SignupForm';
import LandingPage from './components/Calendar';
import Navbar from './components/NavBar';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar /> {/* Render the Navbar */}
          <Routes>
            <Route path="/" element={<LandingPage />} /> {/* Default route */}
            <Route path="/signup" element={<SignupForm />} /> {/* Signup page */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
