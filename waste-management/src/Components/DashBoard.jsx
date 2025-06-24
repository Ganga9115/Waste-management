import { FaTrashAlt, FaCalendarAlt, FaMapMarkerAlt, FaTrophy} from 'react-icons/fa';
import NavBar from './NavBar';


const Dashboard = () => {
  // Sample data - replace with your actual data
  const collectionSchedule = [
    { day: 'Monday', time: '7:00 AM - 10:00 AM', status: 'Completed' },
    { day: 'Wednesday', time: '7:00 AM - 10:00 AM', status: 'Upcoming' },
    { day: 'Friday', time: '7:00 AM - 10:00 AM', status: 'Upcoming' },
  ];

  const recentReports = [
    { id: 1, location: 'Main Street', status: 'Resolved', date: '2023-06-10' },
    { id: 2, location: 'Park Avenue', status: 'Pending', date: '2023-06-12' },
  ];

  const educationalResources = [
    { title: 'Proper Waste Segregation', type: 'Video', duration: '5 min' },
    { title: 'Composting at Home', type: 'Article', duration: '8 min read' },
    { title: 'Recycling Guidelines', type: 'Infographic', duration: '2 min' },
  ];

  const upcomingEvents = [
    { title: 'Community Cleanup', date: 'June 18, 2023', participants: 24 },
    { title: 'Recycling Workshop', date: 'June 25, 2023', participants: 15 },
  ];

  const userStats = {
    points: 1250,
    level: 'Eco Champion',
    binsAdopted: 2,
    reportsSubmitted: 8,
    eventsAttended: 4,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     <NavBar/>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 mt-20">
        {/* Welcome Section */}
        <div className="bg-green-700 rounded-lg p-6 mb-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Eco Warrior!</h2>
          <p className="mb-4">You've contributed to a cleaner community. Keep up the great work!</p>
          <div className="flex justify-around items-center text-center">
            <div>
              <p className="text-sm">Your Eco Points</p>
              <p className="text-2xl font-bold">{userStats.points}</p>
            </div>
            <div>
              <p className="text-sm">Current Level</p>
              <p className="text-2xl font-bold">{userStats.level}</p>
            </div>
            <div>
              <p className="text-sm">Bins Adopted</p>
              <p className="text-2xl font-bold">{userStats.binsAdopted}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <button className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center hover:bg-green-50 transition-colors">
            <FaMapMarkerAlt className="text-green-600 mr-2" />
            <span>Track Collection</span>
          </button>
          <button className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center hover:bg-green-50 transition-colors">
            <FaTrashAlt className="text-green-600 mr-2" />
            <span>Report Bin</span>
          </button>
          <button className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center hover:bg-green-50 transition-colors">
            <FaCalendarAlt className="text-green-600 mr-2" />
            <span>Schedule Pickup</span>
          </button>
         <button className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center hover:bg-green-50 transition-colors">
  <FaTrashAlt className="text-green-600 mr-2" />
  <span>Adopt a Bin</span>
</button>


        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Collection Schedule */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Collection Schedule</h2>
                <button className="text-green-600 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {collectionSchedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium">{item.day}</p>
                      <p className="text-sm text-gray-500">{item.time}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Your Recent Reports</h2>
                <button className="text-green-600 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium">{report.location}</p>
                      <p className="text-sm text-gray-500">Reported on {report.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      report.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
             {/* Educational Resources */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Learn About Waste</h2>
                <button className="text-green-600 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {educationalResources.map((resource, index) => (
                  <div key={index} className="p-3 border-b border-gray-100 last:border-0 hover:bg-green-50 rounded transition-colors">
                    <p className="font-medium">{resource.title}</p>
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>{resource.type}</span>
                      <span>{resource.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
           

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
                <button className="text-green-600 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 border-b border-gray-100 last:border-0 hover:bg-green-50 rounded transition-colors">
                    <p className="font-medium">{event.title}</p>
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>{event.date}</span>
                      <span>{event.participants} participants</span>
                    </div>
                    <button className="mt-2 w-full py-1 bg-green-600 text-white rounded text-sm font-medium hover:bg-green-700 transition-colors">
                      Join Event
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Leaderboard */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Community Leaders</h2>
                <button className="text-green-600 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center p-2 hover:bg-green-50 rounded transition-colors">
                    <span className="font-medium text-gray-500 w-6">{item}.</span>
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-semibold mx-2">
                      {String.fromCharCode(64 + item)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">User {item}</p>
                      <p className="text-xs text-gray-500">{1000 - (item * 100)} points</p>
                    </div>
                    <FaTrophy className={item === 1 ? "text-yellow-400" : "text-gray-300"} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;