import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

// Fake data for the bar chart representing race distribution and the count of people identifying with each race
const data = [
  { race: 'Black', count: 80 },
  { race: 'Hispanic', count: 50 },
  { race: 'White', count: 30 },
  { race: 'Asian', count: 25 },
  { race: 'Native', count: 10 },
  { race: 'Other', count: 5 },
];

// Fake data for the donut chart representing income distribution
const donutData = [
  { name: 'High Income', value: 11 },  // 11% high income
  { name: 'Middle Income', value: 31 }, // 31% middle income
  { name: 'Low Income', value: 58 }, // 58% low income
];

// Data for the new ethnicity pie chart
const ethnicityData = [
  { name: 'Not Hispanic/Latino', value: 62 }, // 62% Not Hispanic/Latino
  { name: 'Hispanic/Latino', value: 36 }, // 36% Hispanic/Latino
  { name: 'Unreported', value: 2 }, // 2% Unreported
];

// Array of colors to be used for the different sections of the charts
const COLORS = ['#8b857c', '#a06c5f', '#e6d2c2']; 
const ETHNICITY_COLORS = ['#a06c5f', '#8b857c', '#5d4d49']; // Custom colors for the ethnicity chart

// Custom function to display labels outside the donut chart at the tip of each segment
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20; // Increase radius to place the label outside the segment
  const x = cx + radius * Math.cos(-midAngle * RADIAN); // Calculate the X position
  const y = cy + radius * Math.sin(-midAngle * RADIAN); // Calculate the Y position

  return (
    <text 
      x={x} 
      y={y} 
      fill="black" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={14} // Set font size for labels
    >
      {`${name}: ${value}%`} {/* Display the name and percentage */}
    </text>
  );
};

const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', color: '#313131' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#313131', color: '#ffffff', padding: '30px' }}>
        <h2 className="text-2xl mb-6">User Data</h2>
        <ul>
          <li className="py-2">Dashboard</li>
          <li className="py-2">Settings</li>
          <li className="py-2">Reports</li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1, backgroundColor: '#f8f8f8' }}>
        {/* Top Bar */}
        <div style={{ height: '70px', backgroundColor: '#f2ebe3', boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <h2 className="text-xl">Admin Dashboard</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="text" className="border p-2 mr-4" placeholder="Search..." />
          </div>
        </div>

        {/* Dashboard Content */}
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Bar Chart Section */}
            <div style={{ width: '48%', backgroundColor: '#ffffff', boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
              <h3 className="text-lg mb-4">Race Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={data} 
                  margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="race" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8f766e" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Donut Chart Section */}
            <div style={{ width: '48%', backgroundColor: '#ffffff', boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
              <h3 className="text-lg mb-4">Income Distribution</h3>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={donutData} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={80} 
                    outerRadius={120} 
                    fill="#8884d8" 
                    paddingAngle={5} 
                    dataKey="value" 
                    label={renderCustomizedLabel}
                  >
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

          {/* Ethnicity Pie Chart Section */}
          <div style={{ width: '48%', marginTop: '20px', backgroundColor: '#ffffff', boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
            <h3 className="text-lg mb-4">Ethnicity Distribution</h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={ethnicityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ethnicityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={ETHNICITY_COLORS[index % ETHNICITY_COLORS.length]} />
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
  );
};

export default AdminDashboard;
