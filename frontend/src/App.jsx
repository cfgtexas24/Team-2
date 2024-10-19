// Import the CSS file for styling the main index page
import './index.css';

// Import necessary components for the app
import ProfilePage from './components/ProfilePage';
import React from 'react'; // Import React for JSX support
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router components for handling routing
import './App.css'; // Import another CSS file specific for the App component

// Importing additional components used in the app
import SignupForm from './components/SignupForm';
import Calendar from './components/Calendar';
import Navbar from './components/NavBar'; // Navbar component to display a navigation bar
import SignUp from './components/SignUp'; // SignUp component for user registration
import Education from './components/EducationPage'; // Education page component
import Contact from './components/Messaging'; // Contact/Messaging page component
import SignIn from './components/SignIn'; // SignIn component for user login
import AdminHome from './components/AdminHome'; // Admin home component for admin-specific features

// Main App component that manages the routing and layout of the application
function App() {
  return (
    // The Router component wraps around the app to enable routing functionality
    <Router>
      <div className="App">
        {/* Main application header that holds the navigation bar */}
        <header className="App-header">
          <Navbar /> {/* Render the Navbar component for navigation across pages */}

          {/* Define the Routes within the Router to navigate between different components */}
          <Routes>
            {/* Default route that renders the SignUp component */}
            <Route path="/" element={<SignUp />} /> 

            {/* Route for the SignIn component */}
            <Route path="/signin" element={<SignIn />} />

            {/* Route for the Calendar component */}
            <Route path="/calendar" element={<Calendar />} /> 

            {/* Route for the EducationPage component */}
            <Route path="/education" element={<Education />} /> 

            {/* Route for the ProfilePage component */}
            <Route path="/profile" element={<ProfilePage />} /> 

            {/* Route for the SignupForm component */}
            <Route path="/form" element={<SignupForm />} /> 

            {/* Route for the Contact/Messaging component */}
            <Route path="/contact" element={<Contact />} /> 

            {/* Route for the AdminHome component */}
            <Route path="adminhome" element={<AdminHome />} /> 
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App; // Export the App component as default for use in other parts of the project
