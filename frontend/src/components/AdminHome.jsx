import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

// Sample data for the charts
const data = [
  { race: 'Black', count: 80 },
  { race: 'Hispanic', count: 50 },
  { race: 'White', count: 30 },
  { race: 'Asian', count: 25 },
  { race: 'Native', count: 10 },
  { race: 'Other', count: 5 },
];

const donutData = [
  { name: 'High Income', value: 11 },
  { name: 'Middle Income', value: 31 },
  { name: 'Low Income', value: 58 },
];

const ethnicityData = [
  { name: 'Not Hispanic/Latino', value: 62 },
  { name: 'Hispanic/Latino', value: 36 },
  { name: 'Unreported', value: 2 },
];

const unemploymentData = [
  { name: 'Employed', value: 47 },
  { name: 'Unemployed', value: 53 },
];

const COLORS = ['#6C5846', '#a06c5f', '#e6d2c2'];
const ETHNICITY_COLORS = ['#a06c5f', '#8b857c', '#5d4d49'];
const UNEMPLOYMENT_COLORS = ['#8b857c', '#a06c5f'];

const AdminHome = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedSection, setHighlightedSection] = useState('');
  const raceRef = useRef(null);
  const incomeRef = useRef(null);
  const ethnicityRef = useRef(null);
  const unemploymentRef = useRef(null);

  useEffect(() => {
    const removeBorderAndClearSearch = () => {
      setHighlightedSection('');
      setSearchTerm('');
    };

    window.addEventListener('click', removeBorderAndClearSearch);

    return () => {
      window.removeEventListener('click', removeBorderAndClearSearch);
    };
  }, []);

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    if (term === 'race distribution') {
      raceRef.current.scrollIntoView({ behavior: 'smooth' });
      setHighlightedSection('race');
    } else if (term === 'income distribution') {
      incomeRef.current.scrollIntoView({ behavior: 'smooth' });
      setHighlightedSection('income');
    } else if (term === 'ethnicity distribution') {
      ethnicityRef.current.scrollIntoView({ behavior: 'smooth' });
      setHighlightedSection('ethnicity');
    } else if (term === 'unemployment rate') {
      unemploymentRef.current.scrollIntoView({ behavior: 'smooth' });
      setHighlightedSection('unemployment');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ display: 'flex', height: '120vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#2d2d2d', color: '#ffffff', padding: '30px' }}>
        <h2 className="text-2xl mb-6">Options</h2>
        <ul>
          {/* Highlighted Dashboard Button */}
          <li className="py-2" style={{ backgroundColor: '#555', padding: '10px', borderRadius: '5px' }}>
            Dashboard
          </li>
          {/* Link to AdminProfile */}
          <li className="py-2">
            <Link to="/adminprofile" style={{ color: 'inherit', textDecoration: 'none' }}>
              Settings
            </Link>
          </li>
          <li className="py-2">User Data</li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1, backgroundColor: '#f8f8f8' }}>
        {/* Top Bar for the Admin Dashboard */}
        <div style={{ height: '70px', backgroundColor: '#ffffff', boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <h2 className="text-xl">Admin Dashboard</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="text" 
              className="border p-2 mr-4" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {/* Link for Profile button routing to AdminProfile */}
            <Link to="/adminprofile">
              <div style={{ backgroundColor: '#cccccc', padding: '10px', borderRadius: '50%' }}>
                Profile
              </div>
            </Link>
          </div>
        </div>

        {/* Dashboard Content */}
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div ref={raceRef} style={{ width: '48%', backgroundColor: '#ffffff', boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)', padding: '20px', border: highlightedSection === 'race' ? '2px solid #313131' : 'none' }}>
              <h3 className="text-lg mb-4">Race Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="race" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8f766e" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div ref={incomeRef} style={{ width: '48%', backgroundColor: '#ffffff', boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)', padding: '20px', border: highlightedSection === 'income' ? '2px solid #313131' : 'none' }}>
              <h3 className="text-lg mb-4">Income Distribution</h3>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={donutData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} dataKey="value">
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <div ref={ethnicityRef} style={{ width: '48%', backgroundColor: '#ffffff', boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)', padding: '20px', border: highlightedSection === 'ethnicity' ? '2px solid #313131' : 'none' }}>
              <h3 className="text-lg mb-4">Ethnicity Distribution</h3>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={ethnicityData} cx="50%" cy="50%" outerRadius={120} dataKey="value">
                    {ethnicityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={ETHNICITY_COLORS[index % ETHNICITY_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div ref={unemploymentRef} style={{ width: '48%', backgroundColor: '#ffffff', boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)', padding: '20px', border: highlightedSection === 'unemployment' ? '2px solid #313131' : 'none' }}>
              <h3 className="text-lg mb-4">Unemployment Rate</h3>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={unemploymentData} cx="50%" cy="50%" outerRadius={120} dataKey="value">
                    {unemploymentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={UNEMPLOYMENT_COLORS[index % UNEMPLOYMENT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
