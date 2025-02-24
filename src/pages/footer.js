import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import "./footer.css";
import logo from "../assets/white-logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        {/* Social Media Section */}
        <Row className="footer-top">
          {/* Logo on the Left */}
          <Col md={6} className="footer-logo">
            <img src={logo} alt="Manpower Logo" />
          </Col>

          {/* Social Media on the Right */}
          <Col md={6} className="footer-social">
            <div className="social-container">
              <p className="follow-text">Suivez-nous</p>
              <div className="social-icons">
                <a
                  href="https://www.facebook.com/people/ManpowerGroup-Tunisie/100057696534788/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.linkedin.com/company/manpowergroup-tunisie/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://www.instagram.com/manpowergrouptunisie"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <Row className="footer-bottom">
          <Col className="footer-policy">
            <a href="#">Mentions légales</a> |{" "}
            <a href="#">Données personnelles</a> | <a href="#">Éthique</a> |{" "}
            <a href="#">Contacter Nous</a>
          </Col>
          <Col className="footer-copyright">
            <p style={{ color: "white" }}>
              Copyright @ Manpower 2025 - Powered by ISS Team
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
