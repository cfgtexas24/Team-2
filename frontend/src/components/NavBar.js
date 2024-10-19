import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGraduationCap, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link for navigation

function Navbar() {
  return (
    <footer className="fixed bottom-0 w-full bg-primary py-4">
      <nav className="flex justify-center space-x-10">
        <Link to="/contact" className="text-white hover:text-gray-300 transform hover:scale-110 transition-transform duration-200">
          <FontAwesomeIcon icon={faEnvelope} size="2x" />
        </Link>
        <Link to="/profile" className="text-white hover:text-gray-300 transform hover:scale-110 transition-transform duration-200">
          <FontAwesomeIcon icon={faGraduationCap} size="2x" />
        </Link>
        <Link to="/signup" className="text-white hover:text-gray-300 transform hover:scale-110 transition-transform duration-200">
          <FontAwesomeIcon icon={faUser} size="2x" />
        </Link>
      </nav>
    </footer>
  );
}

export default Navbar;
