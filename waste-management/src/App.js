import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import SignUpPage from "./Components/SignUp";
import LoginPage from "./Components/LoginPage";
import EducationalResources from "./Components/EductaionalResources";
import DashBoard from './Components/DashBoard';
import CompostingPage from "./Components/Composting";
import VehicleTracking from "./Components/VechileTracking";
import BinReporting from "./Components/BinReporting";
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
      </Routes>
    </Router>  
   
    </>
   
  );
}

export default App;

