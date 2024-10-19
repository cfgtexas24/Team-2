import React, { useState, useRef, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

// Sample data for the Bar Chart, representing the race distribution and the number of people for each race.
const data = [
  { race: 'Black', count: 80 },
  { race: 'Hispanic', count: 50 },
  { race: 'White', count: 30 },
  { race: 'Asian', count: 25 },
  { race: 'Native', count: 10 },
  { race: 'Other', count: 5 },
];

// Sample data for the Donut Chart, representing income distribution.
const donutData = [
  { name: 'High Income', value: 11 },  // 11% are High Income
  { name: 'Middle Income', value: 31 }, // 31% are Middle Income
  { name: 'Low Income', value: 58 },   // 58% are Low Income
];

// Sample data for Ethnicity distribution chart
const ethnicityData = [
  { name: 'Not Hispanic/Latino', value: 62 },  // 62% Not Hispanic/Latino
  { name: 'Hispanic/Latino', value: 36 },      // 36% Hispanic/Latino
  { name: 'Unreported', value: 2 },            // 2% Unreported
];

// Sample data for Unemployment rate
const unemploymentData = [
  { name: 'Employed', value: 47 },  // 47% are Employed
  { name: 'Unemployed', value: 53 }, // 53% are Unemployed
];

// Color schemes used for different charts
const COLORS = ['#6C5846', '#a06c5f', '#e6d2c2']; // Colors for income distribution chart
const ETHNICITY_COLORS = ['#a06c5f', '#8b857c', '#5d4d49']; // Colors for ethnicity chart
const UNEMPLOYMENT_COLORS = ['#8b857c', '#a06c5f']; // Colors for unemployment chart

const AdminDashboard = () => {
  // State to manage the current search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');

  // State to manage which chart section is currently highlighted (used for adding/removing borders)
  const [highlightedSection, setHighlightedSection] = useState('');

  // References for each chart section to allow scrolling and interaction
  const raceRef = useRef(null);
  const incomeRef = useRef(null);
  const ethnicityRef = useRef(null);
  const unemploymentRef = useRef(null);

  // Effect that listens for any click on the page and removes the highlight border and clears the search input
  useEffect(() => {
    const removeBorderAndClearSearch = () => {
      setHighlightedSection('');  // Remove the highlight
      setSearchTerm('');          // Clear the search box
    };

    // Attach click event listener to the entire window
    window.addEventListener('click', removeBorderAndClearSearch);

    // Cleanup function to remove event listener when the component unmounts
    return () => {
      window.removeEventListener('click', removeBorderAndClearSearch);
    };
  }, []);

  // Function that triggers the search functionality and scrolls to the appropriate section
  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();  // Normalize the search term to avoid case-sensitive issues
    
    // Check if the search term matches any chart titles and scroll to the corresponding section
    if (term === 'race distribution') {
      raceRef.current.scrollIntoView({ behavior: 'smooth' });  // Smoothly scroll to Race Distribution chart
      setHighlightedSection('race');  // Highlight this section
    } else if (term === 'income distribution') {
      incomeRef.current.scrollIntoView({ behavior: 'smooth' });  // Scroll to Income Distribution chart
      setHighlightedSection('income');  // Highlight this section
    } else if (term === 'ethnicity distribution') {
      ethnicityRef.current.scrollIntoView({ behavior: 'smooth' });  // Scroll to Ethnicity Distribution chart
      setHighlightedSection('ethnicity');  // Highlight this section
    } else if (term === 'unemployment rate') {
      unemploymentRef.current.scrollIntoView({ behavior: 'smooth' });  // Scroll to Unemployment Rate chart
      setHighlightedSection('unemployment');  // Highlight this section
    }
  };

  // Handle keydown events on the search input to trigger search when the user presses 'Enter'
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();  // Trigger the search when 'Enter' is pressed
    }
  };

  return (
    <div style={{ display: 'flex', height: '120vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#2d2d2d', color: '#ffffff', padding: '30px' }}>
        <h2 className="text-2xl mb-6">Options</h2>
        <ul>
          <li className="py-2">Dashboard</li>
          <li className="py-2">Settings</li>
          <li className="py-2">User Data</li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1, backgroundColor: '#f8f8f8' }}>
        {/* Top Bar for the Admin Dashboard */}
        <div style={{ height: '70px', backgroundColor: '#ffffff', boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <h2 className="text-xl">Admin Dashboard</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Search input where users can type chart titles to jump to specific charts */}
            <input 
              type="text" 
              className="border p-2 mr-4" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}  // Update search term on every keystroke
              onKeyDown={handleKeyDown}  // Trigger search on 'Enter' keypress
            />
            <div style={{ backgroundColor: '#cccccc', padding: '10px', borderRadius: '50%' }}>Profile</div>
          </div>
        </div>

        {/* Dashboard Content containing all charts */}
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Bar Chart Section for Race Distribution */}
            <div 
              ref={raceRef}  // Reference to Race Distribution chart
              style={{ 
                width: '48%', 
                backgroundColor: '#ffffff', 
                boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)', 
                padding: '20px', 
                border: highlightedSection === 'race' ? '2px solid #313131' : 'none'  // Add dark border if highlighted
              }}
            >
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

            {/* Donut Chart Section for Income Distribution */}
            <div
              ref={incomeRef}  // Reference to Income Distribution chart
              style={{ 
                width: '48%', 
                backgroundColor: '#ffffff', 
                boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)', 
                padding: '20px', 
                border: highlightedSection === 'income' ? '2px solid #313131' : 'none'  // Add dark border if highlighted
              }}
            >
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
            {/* Ethnicity Pie Chart Section */}
            <div
              ref={ethnicityRef}  // Reference to Ethnicity Distribution chart
              style={{ 
                width: '48%', 
                backgroundColor: '#ffffff', 
                boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)', 
                padding: '20px', 
                border: highlightedSection === 'ethnicity' ? '2px solid #313131' : 'none'  // Add dark border if highlighted
              }}
            >
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

            {/* Unemployment Rate Pie Chart Section */}
            <div
              ref={unemploymentRef}  // Reference to Unemployment Rate chart
              style={{ 
                width: '48%', 
                backgroundColor: '#ffffff', 
                boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)', 
                padding: '20px', 
                border: highlightedSection === 'unemployment' ? '2px solid #313131' : 'none'  // Add dark border if highlighted
              }}
            >
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

export default AdminDashboard;
