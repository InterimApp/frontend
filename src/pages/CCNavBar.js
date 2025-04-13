import React from "react"; 
import { Row, Col } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./CCNavBar.css"; 
import logo from "../assets/manpower-logo.png"; 
import { Link } from "react-router-dom"; 
import profilePic from "../assets/sl-logo.png"; 
import { FaBell } from "react-icons/fa"; 

const CCNavBar = () => {
  return (
    <>
      <Row className="CC-top-bar d-flex align-items-center px-4">
        <Col xs="auto" className="CC-logo d-flex justify-content-start">
          <img src={logo} alt="ManPower Logo" className="img-fluid" />
        </Col>
        <Col className="d-flex justify-content-end CC-profile-section">
          <img src={profilePic} alt="Profile" className="CC-profile-pic" />
        </Col>
      </Row>

      <nav className="CC-navigation">
        <Link to="/clientcompDashboard">Tableau de bord</Link>
        <Link to="/clientcompJobPostings">Offres d'emploi</Link>
        <Link to="/clientcompManagement">Gestion</Link>
        <Link to="/clientcompDocuments">Documents</Link>
        <Link to="/profile">profile</Link>

        <Link to="/ccdnotifications" className="CC-notification-link">
          <FaBell className="CC-notification-icon" /> 
        </Link>
      </nav>
    </>
  );
};

export default CCNavBar;
