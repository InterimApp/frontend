import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Authentication Pages
import Home from "./pages/Home";
import SignUp1 from "./pages/SignUp1";
import WorkerSignUp from "./pages/WorkerSignUp.js";
import CompanySignUp from "./pages/CompanySignUp";
import CondidateSignUp from "./pages/CondidateSignUp";
import Signin from "./pages/Signin";
import IWSignin from "./pages/IWSignIn";
import CandidateSignIn from "./pages/CandidateSignIn";
import ClientCompSignin from './pages/ClientCompSignIn';
import AdminApplicants from './pages/AdminApplicants.js';
import AdminPayslips from './pages/AdminPayslips.js';
// Profile and Candidature Pages
import Profile from './pages/Profile';

// Admin Pages
import AdminSignIn from './pages/AdminSignIn';
import AdminMGT from './pages/AdminMGT';
import AdminDoc from './pages/AdminDoc';
import AdminNot from './pages/AdminNot';
import AdminDashboard from './pages/AdminDashboard';
// Contract/Document Pages


// Other Pages
import HowItWorks from "./pages/HowItWorks";
import Footer from "./pages/footer";
import AdminNavBar from './pages/AdminNavBar.js';
// ScrollToHash Component for Smooth Scrolling
const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
};

const App = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <ScrollToHash />
      <AdminNavBar />
      <div className="app-container" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        height: 'auto',
        overflow: 'hidden',
      }}>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/" element={<AdminDashboard/>} />
         
          <Route path="/admin" element={<AdminSignIn />} />
          <Route path="/adminmanagement" element={<AdminMGT />} />
          <Route path="/admindocuments" element={<AdminDoc />} />
          <Route path="/adminnotifications" element={<AdminNot />} />
          <Route path="/adminApplicants" element={<AdminApplicants/>} />
          <Route path="/adminPayslips" element={<AdminPayslips/>} />

          {/* Contract/Document Routes */}
         

          {/* Other Routes */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;