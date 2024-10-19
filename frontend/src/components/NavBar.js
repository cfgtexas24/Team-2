import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGraduationCap, faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <footer className="fixed bottom-0 w-full bg-primary py-4">
      <nav className="flex justify-center space-x-10">
        <a href="#" className="text-white hover:text-gray-300 transform hover:scale-110 transition-transform duration-200">
          <FontAwesomeIcon icon={faEnvelope} size="2x" />
        </a>
        <a href="#" className="text-white hover:text-gray-300 transform hover:scale-110 transition-transform duration-200">
          <FontAwesomeIcon icon={faGraduationCap} size="2x" />
        </a>
        <a href="#" className="text-white hover:text-gray-300 transform hover:scale-110 transition-transform duration-200">
          <FontAwesomeIcon icon={faUser} size="2x" />
        </a>
      </nav>
    </footer>
  );
}

export default Navbar;
