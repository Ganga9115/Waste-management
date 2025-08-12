import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-6">
      <div className="bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl p-8 shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">Select Your Role</h1>
        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={() => navigate("/login?role=user")}
            className="w-full bg-green-300 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            User Login
          </button>
          <button
            // ✅ UPDATED: Changed 'admin' to 'municipality'
            onClick={() => navigate("/login?role=municipality")}
            className="w-full bg-green-300 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Municipality Login
          </button>
        </div>
      </div>
    </div>
  );
}