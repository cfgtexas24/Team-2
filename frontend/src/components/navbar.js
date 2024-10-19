import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEnvelope, faGraduationCap, faUser, faFileAlt } from '@fortawesome/free-solid-svg-icons'; // Updated import
import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <div className="Nav">
        <header className="flex justify-between items-center px-8 py-4 fixed w-full top-0 z-10 bg-black bg-opacity-50">
          <div className="text-white text-xl font-bold">Client</div>
        </header>
        <footer className="fixed bottom-0 w-full bg-primary py-4">
          <nav className="flex justify-center space-x-10">
            <Link to="/calendar" className="text-white hover:text-gray-300 transform hover:scale-110 transition-transform duration-200">
              <FontAwesomeIcon icon={faCalendar} size="2x" />
            </Link>
            <Link to="/contact" className="text-white hover:text-gray-300 transform hover:scale-110 transition-transform duration-200">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </Link>
            <Link to="/education" className="text-white hover:text-gray-300 transform hover:scale-110 transition-transform duration-200">
              <FontAwesomeIcon icon={faGraduationCap} size="2x" />
            </Link>
            <Link to="/profile" className="text-white hover:text-gray-300 transform hover:scale-110 transition-transform duration-200">
              <FontAwesomeIcon icon={faUser} size="2x" />
            </Link>
            <Link to="/form" className="text-white hover:text-gray-300 transform hover:scale-110 transition-transform duration-200"> {/* New Link for the form */}
              <FontAwesomeIcon icon={faFileAlt} size="2x" />
            </Link>
          </nav>
        </footer>
      </div>
    );
}

export default Navbar;
