import React from "react"; 
import { Row, Col } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./IWNavBar.css"; 
import logo from "../assets/manpower-logo.png"; 
import { Link } from "react-router-dom"; 
import profilePic from "../assets/Director2.png"; 
import { FaBell } from "react-icons/fa"; // Import the Bell Icon

const IWNavBar = () => {
  return (
    <>
      <Row className="IWD-top-bar d-flex align-items-center px-4">
        <Col xs="auto" className="IWD-logo d-flex justify-content-start">
          <img src={logo} alt="ManPower Logo" className="img-fluid" />
        </Col>
        <Col className="d-flex justify-content-end IWD-profile-section">
          <img src={profilePic} alt="Profile" className="IWD-profile-pic" />
        </Col>
      </Row>

      <nav className="IWD-navigation">
        <Link to="/IWDashboard">Dashboard</Link>
        <Link to="/contract">Contrat</Link>
        <Link to="/iwdocument">Document</Link>
        <Link to="/iwpayment">Paiement</Link>
 
        <Link to="/profile">Profile</Link>
        <Link to="/IWNot" className="IWD-notification-link">
          <FaBell className="IWD-notification-icon" /> 
        </Link>
      </nav>
    </>
  );
};

export default IWNavBar;