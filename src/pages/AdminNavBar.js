import React from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminNavBar.css";
import logo from "../assets/manpower-logo.png";
import { Link } from "react-router-dom";
import profilePic from "../assets/MrMohamedMejri.png";
import { FaBell } from "react-icons/fa"; // Import Bell Icon

const AdminNavBar = () => {
  return (
    <>
      <Row className="AD-top-bar d-flex align-items-center px-4">
        <Col xs="auto" className="AD-logo d-flex justify-content-start">
          <img src={logo} alt="Logo ManPower" className="img-fluid" />
        </Col>
        <Col className="d-flex justify-content-end AD-profile-section">
          <img src={profilePic} alt="Profil" className="AD-profile-pic" />
        </Col>
      </Row>

      <nav className="AD-navigation">
        <Link to="/admindashboard">Tableau de bord</Link>
        <Link to="/adminmanagement">Gestion</Link>
        <Link to="/adminApplicants">Candidats</Link>
        <Link to="/admindocuments">Documents</Link> 
        <Link to="/adminPayslips">Fiches de paie</Link>

        <Link to="/adminnotifications" className="AD-notification-link">
          <FaBell className="AD-notification-icon" /> {/* Icône de cloche */}
        </Link>
      </nav>
    </>
  );
};

export default AdminNavBar;
