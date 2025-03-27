import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, useRoutes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SignUp1 from './pages/SignUp1';
import WorkerSignUp from './pages/WorkerSignUp';
import CompanySignUp from './pages/CompanySignUp';
import Signin from './pages/Signin';
import NavBar from './pages/NavBar';
import Footer from './pages/footer';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Contract from './pages/Contract';
import Signature from './pages/Signature';
=======
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Authentication Pages
import Home from "./pages/Home";
import SignUp1 from "./pages/SignUp1";
import CondidateSignUp from "./pages/CondidateSignUp";
import Signin from "./pages/Signin";
import IWSignin from "./pages/IWSignIn";
import CandidateSignIn from "./pages/CandidateSignIn";
import ClientCompSignin from './pages/ClientCompSignIn';

// Dashboard/Management Pages
import IWDashboard from './pages/IWDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import CCDashboard from './pages/CCDashboard';

// Profile and Candidature Pages
import Profile from './pages/Profile';
import Candidature from './pages/Candidature';
import CandidateCand from './pages/CandidateCand';
import CandProfile from './pages/CandProfile';

// Admin Pages
import AdminSignIn from './pages/AdminSignIn';
import AdminMGT from './pages/AdminMGT';
import AdminDoc from './pages/AdminDoc';
import AdminNot from './pages/AdminNot';

// Contract/Document Pages
import Contract from './pages/IWContract';
import Signature from './pages/Signature';
import IWNot from './pages/IWNot';
import CCJob from './pages/CCJob';
import CCMan from './pages/CCMan';
import IWDoc from './pages/IWDoc';
import IWPayment from './pages/IWPayment';
import CCNot from './pages/CCNot';
import CCDoc from './pages/CCDoc';

// Other Pages
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
>>>>>>> origin/iheb

// Footer Component
import Footer from "./pages/footer";

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
<<<<<<< HEAD

const AppRoutes = () => {
  const location = useLocation();
  const userId = location.state?.userId;

  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/signup1', element: <SignUp1 /> },
    { path: '/WorkerSignUp', element: <WorkerSignUp /> },
    { path: '/CompanySignUp', element: <CompanySignUp /> },
    { path: '/signin', element: <Signin /> },
    { path: '/hiw', element: <HowItWorks /> },
    { path: '/contact', element: <Contact /> },
    { path: '/profile', element: <Profile /> },
    { path: '/contract', element: <Contract /> },
    { path: '/signature', element: <Signature userId={userId} /> }, // Pass userId here
  ]);

  return routes;
};
=======
>>>>>>> origin/iheb

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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <ScrollToHash />
<<<<<<< HEAD
      <div
        className="app-container"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          height: 'auto',
          overflow: 'hidden',
        }}
      >
        <AppRoutes />
=======
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
          <Route path="/candprofile" element={<CandProfile />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminSignIn />} />
          <Route path="/adminmanagement" element={<AdminMGT />} />
          <Route path="/admindocuments" element={<AdminDoc />} />
          <Route path="/adminnotifications" element={<AdminNot />} />

          {/* Contract/Document Routes */}
          <Route path="/iwcontract" element={<Contract />} />
          <Route path="/signature" element={<Signature />} />
          <Route path="/iwnotifications" element={<IWNot />} />
          <Route path="/clientcompJobPostings" element={<CCJob />} />
          <Route path="/clientcompManagement" element={<CCMan />} />
          <Route path="/iwdocument" element={<IWDoc />} />
          <Route path="/iwpayment" element={<IWPayment />} />
          <Route path="/ccdnotifications" element={<CCNot />} />
          <Route path="/clientcompDocuments" element={<CCDoc />} />

          {/* Other Routes */}
          <Route path="/hiw" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
>>>>>>> origin/iheb
      </div>
      <Footer />
    </Router>
  );
};

export default App;