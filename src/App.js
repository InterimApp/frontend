import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import IWPayment from "./pages/IWPayment";
import IWNavBar from "./pages/IWNavBar";
import Footer from "./pages/footer";  // Fixed case to match file name
import Profile from './pages/Profile';
import Contract from './pages/Contract';
import IWDoc from './pages/IWDoc';
import IWNot from './pages/IWNot';  // Fixed import path
import IWDashboard from './pages/IWDashboard';  // Fixed import path
import React, { useState, useEffect } from 'react';
import Signature from './pages/Signature';

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
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <IWNavBar />
      <ScrollToHash />
      <div className="app-container" style={{
        maxWidth: '1280px', 
        margin: '0 auto', 
        height: 'auto',
        overflow: 'hidden',
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="iwdashboard" element={<IWDashboard />} />
          <Route path="contract" element={<Contract />} />
          <Route path="signature" element={<Signature />} />

          <Route path="iwdocument" element={<IWDoc />} />
          <Route path="iwpayment" element={<IWPayment />} />
          <Route path="profile" element={<Profile />} />
          <Route path="iwnot" element={<IWNot />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;