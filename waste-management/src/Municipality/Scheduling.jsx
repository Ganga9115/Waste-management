import { useState } from "react";
import { CheckCircle } from "lucide-react";

const dummyData = [
  { id: "VH001", area: "Velachery", days: "Mon, Wed, Fri", timeSlot: "9:00 - 10:00 A.M.", approved: true },
  { id: "VH002", area: "T. Nagar", days: "Tue, Thu", timeSlot: "10:00 - 11:00 A.M.", approved: true },
  { id: "VH003", area: "Guindy", days: "Mon, Sat", timeSlot: "8:30 - 9:30 A.M.", approved: false },
  { id: "VH004", area: "Adyar", days: "Wed, Fri", timeSlot: "9:30 - 10:30 A.M.", approved: true },
  { id: "VH005", area: "Anna Nagar", days: "Tue, Sat", timeSlot: "10:00 - 11:00 A.M.", approved: true },
  { id: "VH006", area: "Perungudi", days: "Mon, Thu", timeSlot: "8:00 - 9:00 A.M.", approved: false },
  { id: "VH007", area: "Kodambakkam", days: "Tue, Fri", timeSlot: "9:00 - 10:00 A.M.", approved: true },
  { id: "VH008", area: "Mylapore", days: "Mon, Wed", timeSlot: "10:00 - 11:00 A.M.", approved: false },
  { id: "VH009", area: "Nungambakkam", days: "Thu, Sat", timeSlot: "8:30 - 9:30 A.M.", approved: true },
  { id: "VH010", area: "Tambaram", days: "Wed, Fri", timeSlot: "9:30 - 10:30 A.M.", approved: true },
  { id: "VH011", area: "Egmore", days: "Mon, Thu", timeSlot: "7:30 - 8:30 A.M.", approved: false },
  { id: "VH012", area: "Ashok Nagar", days: "Tue, Fri", timeSlot: "9:00 - 10:00 A.M.", approved: true },
];

const CollectionSchedule = () => {
  const [filterText, setFilterText] = useState("");

  const filtered = dummyData.filter(
    (item) =>
      item.id.toLowerCase().includes(filterText.toLowerCase()) ||
      item.area.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="bg-green-50 min-h-screen p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Collection Schedule</h2>
        <input
          type="text"
          placeholder="Search by ID or Area"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm text-sm w-80"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-md shadow border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3"><input type="checkbox" /></th>
              <th className="px-4 py-3">Vehicle ID</th>
              <th className="px-4 py-3">Area</th>
              <th className="px-4 py-3">Days</th>
              <th className="px-4 py-3">Time Slot</th>
              <th className="px-4 py-3">Approved</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50 transition-all duration-150"
              >
                <td className="px-4 py-3">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">{item.id}</td>
                <td className="px-4 py-3">{item.area}</td>
                <td className="px-4 py-3">{item.days}</td>
                <td className="px-4 py-3">{item.timeSlot}</td>
                <td className="px-4 py-3">
                  {item.approved ? (
                    <CheckCircle className="text-green-600 w-5 h-5" />
                  ) : (
                    <span className="text-gray-400">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition-all">
          SCHEDULE
        </button>
      </div>
    </div>
  );
};

export default CollectionSchedule;
