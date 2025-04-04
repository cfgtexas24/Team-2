// Import the CSS file for styling the main index page
import './index.css';

// Import necessary components for the app
import ProfilePage from './components/ProfilePage';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router components
import './App.css';
import SignupForm from './components/SignupForm';
import Calendar from './components/Calendar';
import Navbar from './components/NavBar';
import SignUp from './components/SignUp';
import Education from './components/EducationPage';
import Contact from './components/Messaging';
import SignIn from './components/SignIn';
import AdminHome from './components/AdminHome';
import EditProfilePage from './components/EditProfilePage';
import AdminProfile from './components/AdminProfile';

// Main App component that manages the routing and layout of the application
function App() {

  const [formData, setFormData] = useState({
    race: 'Hispanic or Latino',
    ethnicity: 'Puerto Rican',
    gender: 'Female',
    age: '30',
    language: 'Spanish, English',
    disability: 'None',
    education_level: "Bachelor's Degree",
    employment_status: 'Employed full-time',
    housing_status: 'Own Home'
  });


  return (
    // The Router component wraps around the app to enable routing functionality
    <Router>
      <div className="App">
        {/* Main application header that holds the navigation bar */}
        <header className="App-header">
          <Navbar /> 
          <Routes>
            <Route path="/" element={<SignUp />} /> 
            <Route path="/signin" element={<SignIn />} />
            <Route path="/calendar" element={<Calendar />} /> 
            <Route path="/education" element={<Education />} /> 
            <Route path="/profile" element={<ProfilePage formData={formData} />} />
            <Route path="/form" element={<SignupForm />} />
            <Route path="/contact" element={<Contact />} /> 
            <Route path="/adminprofile" element={<AdminProfile />}/>
            <Route path="adminhome" element={<AdminHome/>}/>
            <Route path="/editProfilePage" element={<EditProfilePage formData={formData} setFormData={setFormData}/>}/>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App; // Export the App component as default for use in other parts of the project
