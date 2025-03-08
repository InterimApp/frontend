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
import IWDashboard from './pages/IWDashboard';
import Profile from './pages/Profile';
import Candidature from './pages/Candidature';
import AdminSignIn from './pages/AdminSignIn';
import AdminDashboard from './pages/AdminDashboard';
import AdminMGT from './pages/AdminMGT';
import AdminDoc from './pages/AdminDoc';
import CandidateDashboard from './pages/CandidateDashboard';
import CandidateCand from './pages/CandidateCand';
import AdminNot from './pages/AdminNot';

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
}

const App = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
 
    };



    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <ScrollToHash />
      <div 
        className="app-container" 

      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup1" element={<SignUp1 />} />
          <Route path="/CondidateSignUp" element={<CondidateSignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/hiw" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/IWSignin" element={<IWSignin />} />
          <Route path="/CandidateSignIn" element={<CandidateSignIn />} />
          <Route path="/ClientCompSignin" element={<ClientCompSignin />} />
          <Route path="/IWDashboard" element={<IWDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Candidature" element={<Candidature />} />
          <Route path="/admin" element={<AdminSignIn />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/adminmanagement" element={<AdminMGT />} />
          <Route path="/admindocuments" element={<AdminDoc />} />
          <Route path="/candidatedashboard" element={<CandidateDashboard />} />
          <Route path="/candidatecand" element={<CandidateCand />} />
          <Route path="/adminnotifications" element={<AdminNot />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
