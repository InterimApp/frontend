import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignUp1 from "./pages/SignUp1";
import CondidateSignUp from "./pages/CondidateSignUp";
import Signin from "./pages/Signin";
import Footer from "./pages/footer";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import IWSignin from "./pages/IWSignIn";
import CandidateSignIn from "./pages/CandidateSignIn";
import ClientCompSignin from './pages/ClientCompSignIn';

// Dashboard/Management Routes
import IWDashboard from './pages/IWDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import CCDashboard from './pages/CCDashboard';

// Profile and Candidature Routes
import Profile from './pages/Profile';
import Candidature from './pages/Candidature';
import CandidateCand from './pages/CandidateCand';

// Admin Routes
import AdminSignIn from './pages/AdminSignIn';
import AdminMGT from './pages/AdminMGT';
import AdminDoc from './pages/AdminDoc';
import AdminNot from './pages/AdminNot';

// Contract/Document Routes
import Contract from './pages/IWContract';
import Signature from './pages/Signature';
import IWNot from './pages/IWNot';
import CCJob from './pages/CCJob';
import CCMan from './pages/CCMan';
import IWDoc from './pages/IWDoc';
import IWPayment from './pages/IWPayment';
import CCNot from './pages/CCNot';
import CCDoc from './pages/CCDoc';
import CandProfile from './pages/CandProfile';

// ScrollToHash Component for Smooth Scrolling
const ScrollToHash = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1)); 
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return null;
};

const App = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <ScrollToHash />
      <div className="app-container">
        <Routes>
          {/* Authentication Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup1" element={<SignUp1 />} />
          <Route path="/CondidateSignUp" element={<CondidateSignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/IWSignin" element={<IWSignin />} />
          <Route path="/CandidateSignIn" element={<CandidateSignIn />} />
          <Route path="/ClientCompSignin" element={<ClientCompSignin />} />

          {/* Dashboard/Management Routes */}
          <Route path="/IWDashboard" element={<IWDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/candidatedashboard" element={<CandidateDashboard />} />
          <Route path="/clientcompDashboard" element={<CCDashboard />} />


          {/* Profile and Candidature Routes */}
          <Route path="/iwprofile" element={<Profile />} />
          <Route path="/Candidature" element={<Candidature />} />
          <Route path="/candidatecand" element={<CandidateCand />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminSignIn />} />
          <Route path="/adminmanagement" element={<AdminMGT />} />
          <Route path="/admindocuments" element={<AdminDoc />} />
          <Route path="/adminnotifications" element={<AdminNot />} />

          {/* Contract/Document Routes */}
          <Route path="/iwcontract" element={<Contract />} />
          <Route path="/signature" element={<Signature />} />
          <Route path="/iwnotifications" element={<IWNot />} />

          {/* Other Routes */}
          <Route path="/hiw" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/clientcompJobPostings" element={<CCJob />} />
          <Route path="/clientcompManagement" element={<CCMan />} />
          <Route path="/iwdocument" element={<IWDoc />} />
          <Route path="/iwpayment" element={<IWPayment />} />
          <Route path="/ccdnotifications" element={<CCNot />} />
          <Route path="/clientcompDocuments" element={<CCDoc />} />
          <Route path="/candprofile" element={<CandProfile />} />

          
      
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
