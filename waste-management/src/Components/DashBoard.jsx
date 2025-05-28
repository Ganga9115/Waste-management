import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const barData = [
  { day: "01", last6Days: 40, lastWeek: 30 },
  { day: "02", last6Days: 35, lastWeek: 25 },
  { day: "03", last6Days: 50, lastWeek: 40 },
  { day: "04", last6Days: 60, lastWeek: 45 },
  { day: "05", last6Days: 55, lastWeek: 50 },
  { day: "06", last6Days: 70, lastWeek: 60 },
  { day: "07", last6Days: 65, lastWeek: 55 },
];

const heatmapData = [
  { date: "2024-01-01", count: 2 },
  { date: "2024-01-05", count: 3 },
  { date: "2024-02-10", count: 5 },
  { date: "2024-03-15", count: 4 },
  { date: "2024-04-20", count: 6 },
];

const DashBoard = () => {
  return (
    <div className="min-h-screen w-full bg-green-50 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-white text-black rounded-lg px-6 py-6 w-full h-[14%] max-w-screen-xl">
        <div className="text-lg font-semibold">🏅 REWARDS 🏅</div>
        <div className="text-lg font-medium">PERFORMANCE ⭐⭐⭐⭐☆</div>
        <div className="text-lg">POINTS: <strong>6782</strong></div>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium">👋 Username</span>
          <span className="text-xl">🔔</span>
          <span className="text-xl">👤</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-grow w-full gap-4 mt-4 px-4 max-w-screen-xl">
        {/* Left Section */}
        <div className="flex flex-col flex-2 gap-4 w-3/4">
          {/* Waste Generation Chart */}
          <div className="bg-white p-4 rounded-xl shadow-md w-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">WASTE GENERATION CHART</h3>
              <button className="bg-green-400 text-white px-4 py-1 rounded hover:bg-green-500">View Report</button>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="last6Days" fill="green" />
                <Bar dataKey="lastWeek" fill="darkgreen" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Heatmap */}
          <div className="bg-white p-4 rounded-xl shadow-md w-full">
            <h3 className="text-lg font-semibold mb-2">Contributions</h3>
            <CalendarHeatmap
              startDate={new Date("2024-01-01")}
              endDate={new Date("2024-12-31")}
              values={heatmapData}
              classForValue={(value) => {
                if (!value) return "color-empty";
                return `color-scale-${value.count}`;
              }}
              tooltipDataAttrs={(value) => {
                if (!value || !value.date) return null;
                return {
                  "data-tip": `${value.date} — ${value.count} contributions`,
                };
              }}
            />
          </div>
        </div>

        {/* Leaderboard */}
        <div className="flex-1 bg-green-50 p-4 rounded-xl shadow-md h-full w-1/4">
          <h3 className="bg-green-500 text-white text-center py-2 rounded-md mb-3 font-semibold">LEADERBOARD</h3>
          <ul className="list-none p-0 space-y-2">
            <li className="bg-green-900 text-white font-bold text-center py-2 rounded">1.JOHN DOE</li>
            <li className="text-center py-2 border-b border-green-200">2. DANIEL</li>
            <li className="text-center py-2 border-b border-green-200">3. BOB</li>
            <li className="text-center py-2 border-b border-green-200">4.ALIS</li>
            <li className="text-center py-2 border-b border-green-200">5. CLARA</li>
            <li className="text-center py-2 border-b border-green-200">6.PRINCE</li>
            <li className="text-center py-2 border-b border-green-200">7. TAMISEMI TANZANIA</li>
            <li className="text-center py-2 border-b border-green-200">8. TAMWA TANZANIA</li>
            <li className="text-center py-2 border-b border-green-200">9. TANROADS TANZANIA</li>
            <li className="text-center py-2 border-b border-green-200">10. TARURA TANZANIA</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
