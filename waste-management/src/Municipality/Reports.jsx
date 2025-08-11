import React, { useState } from 'react';
import NavBar from '../Components/NavBar';

const Reports = () => {
  const reports = [
    { area: 'T. Nagar', issue: 'Overflowing trash bin', time: 'Just now' },
    { area: 'Velachery', issue: 'Uncollected waste', time: '15 mins ago' },
    { area: 'Anna Nagar', issue: 'Damaged bin', time: '30 mins ago' },
    { area: 'Mylapore', issue: 'Overflowing trash bin', time: '1 hour ago' },
    { area: 'Adyar', issue: 'Broken bin lid', time: '2 hours ago' },
    { area: 'Kodambakkam', issue: 'Scattered trash', time: '3 hours ago' },
    { area: 'Royapettah', issue: 'Overflowing trash bin', time: 'Yesterday' },
    { area: 'Perambur', issue: 'Uncollected waste', time: '2 days ago' },
  ];

  const [selectedArea, setSelectedArea] = useState('T. Nagar');
  const [selectedVehicle, setSelectedVehicle] = useState('Vehicle 101');
  const [assignments, setAssignments] = useState([
    { area: 'Anna Nagar West', binCode: 'BIN2384', status: 'Clean' },
    { area: 'T Nagar', binCode: 'BIN1147', status: 'Clean' },
  ]);

  const handleAssign = () => {
    const newAssignment = {
      area: selectedArea,
      binCode: `BIN${Math.floor(Math.random() * 9000 + 1000)}`,
      status: 'Assigned',
    };
    setAssignments([newAssignment, ...assignments]);
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <NavBar/>
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">MANAGE REPORTS</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* View Reports */}
        <div className="bg-white rounded-xl shadow-md p-6 flex-1">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">View Reports</h2>
          {reports.map((report, index) => (
            <div key={index} className="py-3 border-b last:border-none">
              <div className="flex justify-between">
                <p className="font-semibold">{report.area}</p>
                <p className="text-sm text-gray-500">{report.time}</p>
              </div>
              <p className="text-sm text-gray-600">{report.issue}</p>
            </div>
          ))}
        </div>

        {/* Assign Vehicle */}
        <div className="bg-white rounded-xl shadow-md p-6 flex-1">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Assign Collection Vehicle</h2>

          <label className="block mb-2 text-sm font-medium text-gray-700">Select Area</label>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full border rounded-md p-2 mb-4"
          >
            {reports.map((report, idx) => (
              <option key={idx} value={report.area}>
                {report.area}
              </option>
            ))}
          </select>

          <label className="block mb-2 text-sm font-medium text-gray-700">Select Vehicle</label>
          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className="w-full border rounded-md p-2 mb-4"
          >
            <option>Vehicle 101</option>
            <option>Vehicle 102</option>
            <option>Vehicle 103</option>
          </select>

          <button
            onClick={handleAssign}
            className="w-full bg-green-700 text-white py-2 rounded-md font-semibold hover:bg-green-800 transition"
          >
            Assign Vehicle
          </button>

          {/* Assigned Vehicles History */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Assigned Vehicles</h3>
            <div className="space-y-3">
              {assignments.map((item, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.area} →</p>
                    <p className="text-xs text-gray-600">Bin Code: {item.binCode}</p>
                  </div>
                  <p className="text-green-700 font-semibold">{item.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
