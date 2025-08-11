import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'; // Add this
import LandingPage from "./Components/LandingPage";
import SignUpPage from "./Components/SignUp";
import LoginPage from "./Components/LoginPage";
import EducationalResources from "./Components/EductaionalResources";
import DashBoard from './Components/DashBoard';
import CompostingPage from "./Components/Composting";
import VehicleTracking from "./Components/VechileTracking";
import BinReporting from "./Components/BinReporting";
import AdoptBin from "./Components/AdoptBin";
import SpecializedPickUps from "./Components/SpecializedPickUps";
import RoleSelection from "./Components/RoleSelection";
import MDashBoard from "./Municipality/MDashBoard"
import Reports from "./Municipality/Reports"
import Scheduling from "./Municipality/Scheduling"

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
       <Route path="/dashboard" element={<DashBoard />} />
       <Route path="/educational-resources" element={<EducationalResources />} />
       <Route path="/composting" element={<CompostingPage />} />
       <Route path="/vehicle-track" element={<VehicleTracking />} />
       <Route path="/bin-reporting" element={<BinReporting />} />
       <Route path="/adopt-bin" element={< AdoptBin/>} />
       <Route path="/specialized-pickup" element={< SpecializedPickUps />} />

       <Route path="/choose-role" element={<RoleSelection />} />
      <Route path="/municipality-dashboard" element={<MDashBoard/>} />
      <Route path="/scheduling" element={<Scheduling/>} />
      <Route path="/reports" element={<Reports/>} />
      </Routes>
    </Router>   
   
   
    </>
   
  );
}

export default App;

