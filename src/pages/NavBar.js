import React from "react";
import { Row, Col, Dropdown } from "react-bootstrap"; 
import { Link, useLocation } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";
import logo from "../assets/manpower-logo.png";
import linkedin from "../assets/linkedin.jpeg";
import facebook from "../assets/facebook.jpeg";
import instagram from "../assets/instagram.jpeg";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import Contract from "./Contract";
=======
>>>>>>> origin/iheb

const NavBar = () => {
  const location = useLocation(); // Get current route

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
        <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
          Acceuil
        </Link>

        <Dropdown>
          <Dropdown.Toggle variant="link" id="dropdown-basic">
            À propos
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/#pourquoi-choisir" className={location.pathname === "/#pourquoi-choisir" ? "active-link" : ""}>
              Pourquoi choisir ManPower
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/#temoignages" className={location.pathname === "/#temoignages" ? "active-link" : ""}>
              Témoignages de nos clients
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/#nos-statistiques" className={location.pathname === "/#nos-statistiques" ? "active-link" : ""}>
              Nos statistiques
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/#mission-vision" className={location.pathname === "/#mission-vision" ? "active-link" : ""}>
              Mission & Vision
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
<<<<<<< HEAD
        <Link to="/signup1">Sign Up</Link>
        <Link to="/hiw">How it works</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/contract">Contract</Link>

=======

        <Link to="/signup1" className={location.pathname === "/signup1" ? "active-link" : ""}>
          S'inscrire
        </Link>
        <Link to="/hiw" className={location.pathname === "/hiw" ? "active-link" : ""}>
          Comment ça marche
        </Link>
        <Link to="/contact" className={location.pathname === "/contact" ? "active-link" : ""}>
          Contact
        </Link>
>>>>>>> origin/iheb
      </nav>
    </>
  );
};

export default NavBar;
