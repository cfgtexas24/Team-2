import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

// Sample data for the Bar Chart (Race Distribution)
const data = [
  { race: 'Black', count: 80 },
  { race: 'Hispanic', count: 50 },
  { race: 'White', count: 30 },
  { race: 'Asian', count: 25 },
  { race: 'Native', count: 10 },
  { race: 'Other', count: 5 },
];

// Sample data for the Donut Chart (Income Distribution)
const donutData = [
  { name: 'High Income', value: 11 },
  { name: 'Middle Income', value: 31 },
  { name: 'Low Income', value: 58 },
];

// Sample data for Ethnicity Distribution chart
const ethnicityData = [
  { name: 'Not Hispanic/Latino', value: 62 },
  { name: 'Hispanic/Latino', value: 36 },
  { name: 'Unreported', value: 2 },
];

// Sample data for Unemployment Rate chart
const unemploymentData = [
  { name: 'Employed', value: 47 },
  { name: 'Unemployed', value: 53 },
];

// Color schemes used for different charts
const COLORS = ['#6C5846', '#a06c5f', '#e6d2c2']; // Colors for income distribution chart
const ETHNICITY_COLORS = ['#a06c5f', '#8b857c', '#5d4d49']; // Colors for ethnicity chart
const UNEMPLOYMENT_COLORS = ['#8b857c', '#a06c5f']; // Colors for unemployment chart

const AdminHome = () => {
  const [view, setView] = useState('dashboard');  // State to toggle between "dashboard" and "userData"
  const [userData, setUserData] = useState([]);   // State to store user data

  // Function to fetch user data from the backend
  const fetchUserData = () => {
    axios.get('http://localhost:5000/get-user-data')  // Replace with your backend endpoint
      .then(response => {
        setUserData(response.data);  // Store fetched data in state
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  // Handle switching between views
  const handleViewSwitch = (selectedView) => {
    setView(selectedView);
    if (selectedView === 'userData') {
      fetchUserData();  // Fetch user data when "User Data" is selected
    }
  };

  return (
    <div style={{ display: 'flex', height: '120vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#2d2d2d', color: '#ffffff', padding: '30px' }}>
        <h2 className="text-2xl mb-6">Options</h2>
        <ul>
          <li className="py-2 cursor-pointer" onClick={() => handleViewSwitch('dashboard')}>
            Dashboard
          </li>
          <li className="py-2 cursor-pointer" onClick={() => handleViewSwitch('userData')}>
            User Data
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1, backgroundColor: '#f8f8f8' }}>
        {/* Top Bar */}
        <div style={{ height: '70px', backgroundColor: '#ffffff', boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <h2 className="text-xl">Admin Dashboard</h2>
        </div>

        {/* Conditional Rendering based on selected view */}
        <div style={{ padding: '20px' }}>
          {view === 'dashboard' ? (
            <div>
              {/* Dashboard Content (Graphs) */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Bar Chart Section for Race Distribution */}
                <div style={{ width: '48%', backgroundColor: '#ffffff', padding: '20px' }}>
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
                <div style={{ width: '48%', backgroundColor: '#ffffff', padding: '20px' }}>
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
                <div style={{ width: '48%', backgroundColor: '#ffffff', padding: '20px' }}>
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
                <div style={{ width: '48%', backgroundColor: '#ffffff', padding: '20px' }}>
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
          ) : (
            <div>
              {/* User Data Table */}
              <h3 className="text-lg mb-4">User Data</h3>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4">User ID</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">First Name</th>
                    <th className="text-left py-3 px-4">Last Name</th>
                    <th className="text-left py-3 px-4">Address</th>
                    <th className="text-left py-3 px-4">Phone</th>
                    <th className="text-left py-3 px-4">DOB</th>
                    <th className="text-left py-3 px-4">Emergency Contact</th>
                    <th className="text-left py-3 px-4">Homelessness</th>
                    <th className="text-left py-3 px-4">Depression</th>
                    <th className="text-left py-3 px-4">Employment Status</th>
                    <th className="text-left py-3 px-4">Dependencies</th>
                    <th className="text-left py-3 px-4">Pregnancy Start</th>
                    <th className="text-left py-3 px-4">Anxiety</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user) => (
                    <tr key={user.id}>
                      <td className="text-left py-3 px-4">{user.id}</td>
                      <td className="text-left py-3 px-4">{user.email}</td>
                      <td className="text-left py-3 px-4">{user.first_name}</td>
                      <td className="text-left py-3 px-4">{user.last_name}</td>
                      <td className="text-left py-3 px-4">{user.address}</td>
                      <td className="text-left py-3 px-4">{user.phone}</td>
                      <td className="text-left py-3 px-4">{user.dob}</td>
                      <td className="text-left py-3 px-4">{user.emergency_contact}</td>
                      <td className="text-left py-3 px-4">{user.homelessness ? 'Yes' : 'No'}</td>
                      <td className="text-left py-3 px-4">{user.depression ? 'Yes' : 'No'}</td>
                      <td className="text-left py-3 px-4">{user.employment_status}</td>
                      <td className="text-left py-3 px-4">{user.dependencies}</td>
                      <td className="text-left py-3 px-4">{user.pregnancy_start}</td>
                      <td className="text-left py-3 px-4">{user.anxiety ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
