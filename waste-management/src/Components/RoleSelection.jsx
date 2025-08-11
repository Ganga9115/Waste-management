
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-6">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Select Your Role</h1>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => navigate("/login?role=user")}
          className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600"
        >
          User Login
        </button>
        <button
          onClick={() => navigate("/login?role=admin")}
          className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600"
        >
          Municipality Login
        </button>
      </div>
    </div>
  );
}
