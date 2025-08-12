import React, { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const [selectedReportId, setSelectedReportId] = useState('');
    const [selectedVehicleId, setSelectedVehicleId] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch reports and vehicles on component mount
    useEffect(() => {
        const fetchReportsAndVehicles = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` },
                };

                const reportsResponse = await axios.get(`${API_BASE_URL}/api/municipality/reports`, config);
                const vehiclesResponse = await axios.get(`${API_BASE_URL}/api/municipality/vehicles`, config);

                const pendingReports = reportsResponse.data.filter(r => r.status === 'Pending');
                const assignedReports = reportsResponse.data.filter(r => r.status === 'In Progress');

                setReports(pendingReports);
                setVehicles(vehiclesResponse.data);
                setAssignments(assignedReports);

                // Set initial selections if data exists
                if (pendingReports.length > 0) {
                    setSelectedReportId(pendingReports[0].id);
                }
                if (vehiclesResponse.data.length > 0) {
                    setSelectedVehicleId(vehiclesResponse.data[0].id);
                }

            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError("Failed to fetch reports or vehicles.");
                toast.error("Failed to load data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchReportsAndVehicles();
    }, []);

    const handleAssign = async () => {
        if (!selectedReportId || !selectedVehicleId) {
            toast.error("Please select both a report and a vehicle.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const response = await axios.post(
                `${API_BASE_URL}/api/municipality/reports/assign`,
                { reportId: selectedReportId, vehicleId: selectedVehicleId },
                config
            );

            // Update the state based on the successful assignment
            const assignedReport = response.data.report;
            const updatedReports = reports.filter(r => r.id !== assignedReport.id);

            setReports(updatedReports);
            setAssignments([...assignments, {
                ...assignedReport,
                assignedVehicle: vehicles.find(v => v.id === assignedReport.assignedVehicleId),
            }]);

            toast.success("Vehicle assigned successfully!");

            // Update selected report if the list isn't empty
            if (updatedReports.length > 0) {
                setSelectedReportId(updatedReports[0].id);
            } else {
                setSelectedReportId('');
            }
        } catch (err) {
            console.error("Failed to assign vehicle:", err);
            toast.error(err.response?.data?.message || "Failed to assign vehicle.");
        }
    };

    if (isLoading) {
        return <div className="text-center mt-20 text-gray-500">Loading reports...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <NavBar />
              <div className="mt-16">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">MANAGE REPORTS</h1>
            <div className="flex flex-col md:flex-row gap-8">
                {/* View Reports */}
                <div className="bg-white rounded-xl shadow-md p-6 flex-1">
                    <h2 className="text-2xl font-semibold text-green-800 mb-4">Pending Reports</h2>
                    {reports.length > 0 ? (
                        reports.map((report) => (
                            <div key={report.id} className="py-3 border-b last:border-none">
                                <div className="flex justify-between">
                                    <p className="font-semibold">ID: {report.id}</p>
                                    <p className="text-sm text-gray-500">Priority: {report.priority}</p>
                                </div>
                                <p className="text-sm text-gray-600">Lat: {report.latitude}, Lng: {report.longitude}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No pending reports.</p>
                    )}
                </div>

                {/* Assign Vehicle */}
                <div className="bg-white rounded-xl shadow-md p-6 flex-1">
                    <h2 className="text-2xl font-semibold text-green-800 mb-4">Assign Collection Vehicle</h2>

                    <label className="block mb-2 text-sm font-medium text-gray-700">Select Report</label>
                    <select
                        value={selectedReportId}
                        onChange={(e) => setSelectedReportId(e.target.value)}
                        className="w-full border rounded-md p-2 mb-4"
                        disabled={reports.length === 0}
                    >
                        {reports.length > 0 ? (
                            reports.map((report) => (
                                <option key={report.id} value={report.id}>
                                    ID: {report.id} - Priority: {report.priority}
                                </option>
                            ))
                        ) : (
                            <option>No Reports Available</option>
                        )}
                    </select>

                    <label className="block mb-2 text-sm font-medium text-gray-700">Select Vehicle</label>
                    <select
                        value={selectedVehicleId}
                        onChange={(e) => setSelectedVehicleId(e.target.value)}
                        className="w-full border rounded-md p-2 mb-4"
                        disabled={vehicles.length === 0}
                    >
                        {vehicles.length > 0 ? (
                            vehicles.map((vehicle) => (
                                <option key={vehicle.id} value={vehicle.id}>
                                    {vehicle.licensePlate} ({vehicle.status})
                                </option>
                            ))
                        ) : (
                            <option>No Vehicles Available</option>
                        )}
                    </select>

                    <button
                        onClick={handleAssign}
                        className="w-full bg-green-700 text-white py-2 rounded-md font-semibold hover:bg-green-800 transition disabled:bg-gray-400"
                        disabled={!selectedReportId || !selectedVehicleId}
                    >
                        Assign Vehicle
                    </button>

                    {/* Assigned Vehicles History */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Assigned Vehicles</h3>
                        <div className="space-y-3">
                            {assignments.length > 0 ? (
                                assignments.map((item) => (
                                    <div key={item.id} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">Report ID: {item.id}</p>
                                            <p className="text-xs text-gray-600">Vehicle: {item.assignedVehicle?.licensePlate || 'N/A'}</p>
                                        </div>
                                        <p className="text-orange-500 font-semibold">{item.status}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No vehicles have been assigned yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            </div>
        </div>
    );
};

export default Reports;