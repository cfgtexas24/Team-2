import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGraduationCap, faUser, faCalendar, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Get window height and mouse's Y position
      const windowHeight = window.innerHeight;
      const mouseY = event.clientY;

      // If the mouse is within 100px of the bottom of the screen, show the navbar
      if (windowHeight - mouseY < 100) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="Nav">
      {}
      <header className="flex justify-between items-center px-8 py-4 fixed w-full top-0 z-10 bg-#6C5846 bg-opacity-50">
        <div className="text-white text-xl font-bold">Client</div>
      </header>

      {}
      <footer
        className={`fixed bottom-0 w-full bg-primary py-4 transition-transform duration-300 ${
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
    </div>
  );
}

export default Navbar;
