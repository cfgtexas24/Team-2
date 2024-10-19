import React from 'react';
import './App.css';
import SignupForm from './components/SignupForm.js'; // PascalCase for component names
import LandingPage from './components/LandingPage.js'; // PascalCase for component names
import NavBar from './components/NavBar.js'; // PascalCase for component names

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Render the LandingPage component */}
        <NavBar/>
        <LandingPage />
      </header>
    </div>
  );
}

export default App;
