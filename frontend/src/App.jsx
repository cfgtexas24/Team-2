import './index.css';
import ProfilePage from './components/ProfilePage';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router components
import './App.css';
import SignupForm from './components/SignupForm';
import Calendar from './components/Calendar';
import Navbar from './components/NavBar';
import SignUp from './components/SignUp';
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar /> {/* Render the Navbar */}
          <Routes>
            <Route path="/" element={<SignUp />} /> {/* Default route */}
            <Route path="/calendar" element={<Calendar />} /> {/* Default route */}
            <Route path="/signup" element={<SignupForm />} /> {/* Signup page */}
            <Route path="/profile" element={<ProfilePage />} /> {/* Signup page */}
            <Route path="/form" element={<SignupForm />} /> {/* Signup page */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
