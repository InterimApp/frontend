import React from "react";
import { Row, Col, Dropdown } from "react-bootstrap"; // Import Dropdown
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";
import logo from "../assets/manpower-logo.png";
import linkedin from "../assets/linkedin.jpeg";
import facebook from "../assets/facebook.jpeg";
import instagram from "../assets/instagram.jpeg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <Row className="top-bar d-flex align-items-center px-4">
        <Col xs="auto" className="logo d-flex justify-content-start">
          <img src={logo} alt="ManPower Logo" className="img-fluid" />
        </Col>
        <Col className="d-flex justify-content-end social-icons">
          <p style={{ marginTop: "12px" }}>Suivez-nous </p>
          <a
            href="https://www.facebook.com/people/ManpowerGroup-Tunisie/100057696534788/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook} alt="Facebook" className="social-icon" />
          </a>
          <a
            href="https://www.instagram.com/manpowergrouptunisie"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram} alt="Instagram" className="social-icon" />
          </a>
          <a
            href="https://www.linkedin.com/company/manpowergroup-tunisie/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin} alt="LinkedIn" className="social-icon" />
          </a>
        </Col>
      </Row>

      <nav className="navigation">
        <Link to="/#home">Home</Link>
        <Dropdown>
          <Dropdown.Toggle variant="link" id="dropdown-basic">
            About
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/#pourquoi-choisir">Pourquoi choisir ManPower</Dropdown.Item>
            <Dropdown.Item as={Link} to="/#temoignages">Témoignages de nos clients</Dropdown.Item>
            <Dropdown.Item as={Link} to="/#nos-statistiques">Nos statistiques</Dropdown.Item>
            <Dropdown.Item as={Link} to="/#mission-vision">Mission & Vision</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Link to="/signup1">Sign Up</Link>
        <Link to="/hiw">How it works</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </>
  );
};

export default NavBar;
