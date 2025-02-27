import React from "react"; 
import { Row, Col } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./IWNavBar.css"; 
import logo from "../assets/manpower-logo.png"; 
import { Link } from "react-router-dom"; 
import profilePic from "../assets/Director2.png"; 

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
        <Link to="/Candidature">Candidature</Link>
        <Link to="/#contract">Contrat</Link>
        <Link to="/#document">Document</Link>
        <Link to="/#payment">Paiement</Link>
        <Link to="/#notifications" className="IWD-notification-link">
          <i className="IWD-notification-icon"></i> Notifications
        </Link>
        <Link to="/profile">Profile</Link>

      </nav>
    </>
  );
};

export default IWNavBar;
