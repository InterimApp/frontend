import React, { useState, useEffect } from 'react';
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
      <NavBar />
      <ScrollToHash />
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
      </div>
      <Footer />
    </Router>
  );
};

export default App;