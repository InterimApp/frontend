import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignUp1 from "./pages/SignUp1";
import WorkerSignUp from "./pages/WorkerSignUp";
import CompanySignUp from "./pages/CompanySignUp";
import Signin from "./pages/Signin";
import NavBar from "./pages/NavBar";
import Footer from "./pages/footer";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";

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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <NavBar />
      <ScrollToHash />
      <div 
        className="app-container" 
        style={{
          maxWidth: '1280px', 
          margin: '0 auto', 
          height: 'auto', // Allow content to flow naturally and scroll
          overflow: 'hidden', // Prevent horizontal overflow
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup1" element={<SignUp1 />} />
          <Route path="/WorkerSignUp" element={<WorkerSignUp />} />
          <Route path="/CompanySignUp" element={<CompanySignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/hiw" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
