import logo from './logo.svg';
import './App.css';
import SignupForm from './components/signupForm.js'; // Make sure to use PascalCase for component names

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Use <SignupForm /> instead of <signup /> */}
        <SignupForm />
      </header>
    </div>
  );
}

export default App;
