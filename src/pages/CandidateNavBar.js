import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CandidateNavBar.css";
import logo from "../assets/manpower-logo.png";
import { Link } from "react-router-dom";
import profilePic from "../assets/Director3.png";
import { FaLock } from "react-icons/fa";

const CandidateNavBar = () => {
  const [isInterimWorker, setIsInterimWorker] = useState(false);
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
        <Link to="/candidatedashboard">Dashboard</Link>
        <Link to="/candidatecand">Candidature</Link>

        <Link
          to="/#contract"
          className={isInterimWorker ? "" : "IWD-disabled-link"}
        >
          {!isInterimWorker && <FaLock />} Contrat
        </Link>

        <Link
          to="/#document"
          className={isInterimWorker ? "" : "IWD-disabled-link"}
        >
          {!isInterimWorker && <FaLock />} Document
        </Link>

        <Link
          to="/#payment"
          className={isInterimWorker ? "" : "IWD-disabled-link"}
        >
          {!isInterimWorker && <FaLock />} Paiement
        </Link>

        <Link
          to="/#notifications"
          className={`IWD-notification-link ${
            isInterimWorker ? "" : "IWD-disabled-link"
          }`}
        >
          {!isInterimWorker && <FaLock />} Notifications
        </Link>

        <Link to="/candprofile">Profile</Link>
      </nav>
    </>
  );
};

export default CandidateNavBar;
