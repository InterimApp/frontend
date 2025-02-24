import React from "react"; 
import { Row, Col, Dropdown } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./IWNavBar.css"; 
import logo from "../assets/manpower-logo.png"; 
import { Link } from "react-router-dom"; 
import profilePic from "../assets/Director2.png"; 

const IWNavBar = () => {
  return (
    <>
      <Row className="top-bar d-flex align-items-center px-4">
        <Col xs="auto" className="logo d-flex justify-content-start">
          <img src={logo} alt="ManPower Logo" className="img-fluid" />
        </Col>
        <Col className="d-flex justify-content-end profile-section">
          <img src={profilePic} alt="Profile" className="profile-pic" />
        </Col>
      </Row>

      <nav className="navigation">
        <Link to="/#job-application">Candidature</Link>
        <Link to="/#contract">Contrat</Link>
        <Link to="/#document">Document</Link>
        <Link to="/#payment">Paiement</Link>
        <Link to="/#notifications" className="notification-link">
          <i className="notification-icon"></i> Notifications
        </Link>
      </nav>
    </>
  );
};

export default IWNavBar;
