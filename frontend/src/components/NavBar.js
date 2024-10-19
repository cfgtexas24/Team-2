import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGraduationCap, faUser, faCalendar, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import image from '../assets/image.png'; // Make sure to include the file extension
import { useLocation } from 'react-router-dom';


function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();

  

  useEffect(() => {
    
    const handleMouseMove = (event) => {
      const windowHeight = window.innerHeight;
      const mouseY = event.clientY;

      // Show the navbar if the mouse is within 100px of the bottom of the screen
      setShowNavbar(windowHeight - mouseY < 100);
    };

    // Add mousemove event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (location.pathname === '/adminhome') {
    return null;  // Return nothing, which effectively hides the Navbar
  }

  return (
    <div className="Nav">
      {/* Fixed Header */}
      <header className="flex justify-between items-center px-8 py-4 fixed w-full top-0 z-10 bg-[#A26B61]"> {/* Correct background color syntax */}
        <img src={image} alt="Logo" className="h-8" /> {/* Added alt text for accessibility and defined height */}
      </header>

      {/* Fixed Footer */}
      <footer
        className={`fixed bottom-0 w-full bg-[#A26B61] py-4 transition-transform duration-300 ${
          showNavbar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <nav className="flex justify-center space-x-10">
          <Link
            to="/calendar"
            className="text-white hover:text-gray-300 transform hover:scale-110 transition-transform duration-200"
          >
            <FontAwesomeIcon icon={faCalendar} size="2x" />
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-gray-300 transform hover:scale-110 transition-transform duration-200"
          >
            <FontAwesomeIcon icon={faEnvelope} size="2x" />
          </Link>
          <Link
            to="/education"
            className="text-white hover:text-gray-300 transform hover:scale-110 transition-transform duration-200"
          >
            <FontAwesomeIcon icon={faGraduationCap} size="2x" />
          </Link>
          <Link
            to="/profile"
            className="text-white hover:text-gray-300 transform hover:scale-110 transition-transform duration-200"
          >
            <FontAwesomeIcon icon={faUser} size="2x" />
          </Link>
          <Link
            to="/form"
            className="text-white hover:text-gray-300 transform hover:scale-110 transition-transform duration-200"
          >
            <FontAwesomeIcon icon={faNewspaper} size="2x" />
          </Link>
        </nav>
      </footer>
      
      {/* Optional: Spacer to push content below the fixed header */}
      <div className="pt-16"></div> {/* Adjust padding as needed */}
    </div>
  );
}

export default Navbar;
