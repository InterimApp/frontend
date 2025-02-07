import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import NavBar from "./NavBar";
import analysis from "../assets/analysis.jpeg";
import complianceImg from "../assets/conformite.png";
import hiringImg from "../assets/hiringImg.png";
import insightsImg from "../assets/insightsImg.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Add this import

const testimonials = [
  {
    name: "Alice Dupont",
    role: "Manager RH",
    text: "Grâce à Manpower, nous avons optimisé notre gestion des employés intérimaires avec une grande facilité.",
  },
  {
    name: "Jean Morel",
    role: "Directeur des opérations",
    text: "Une plateforme intuitive et efficace qui nous a fait gagner un temps précieux.",
  },
  {
    name: "Sophie Lambert",
    role: "Consultante en recrutement",
    text: "Le suivi des contrats et des performances est un vrai atout pour notre entreprise.",
  },
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate(); // Initialize navigate

  const nextTestimonial = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleCommencerClick = () => {
    navigate("./signup1");
  };

  return (
    <div className="home-container">
      <div className="first-screen-container">
        <Container fluid>
          <NavBar />

          <Row className="content-section d-flex align-items-left justify-content-center text-center">
            <Col md={6}>
              <span className="tag">#GérerAvecFacilité</span>
              <h1>Donnez du pouvoir à votre personnel grâce à une gestion transparente</h1>
              <p>Notre plateforme simplifie la gestion des travailleurs intérimaires...</p>
              <Button className="start-btn" onClick={handleCommencerClick}>Commencer</Button>
              <Button className="demo-btn">Demo</Button>
            </Col>
            <Col md={6} className="image-section">
              <img src={analysis} alt="Analysis" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </div>

      <div className="separator">
        <h2 className="title-heading">Pourquoi choisir Manpower ?</h2>
      </div>

      <div className="second-screen-container">
        <Container>
          <Row>
            <Col md={4} className="feature-card">
              <div className="card-content">
                <span className="feature-tag">#One</span>
                <h3 className="card-heading">Conformité facile</h3>
                <img src={complianceImg} alt="Compliance" className="feature-image" />
                <x>Suivez la sécurité et assurez la conformité ISO sans effort.</x>
              </div>
            </Col>
            <Col md={3} className="feature-card">
              <div className="card-content">
                <span className="feature-tag">#Two</span>
                <h3 className="card-heading">Recrutement simplifié</h3>
                <img src={hiringImg} alt="Recrutement" className="feature-image" />
                <x>Publiez des offres d'emploi, évaluez les candidats et gérez les contrats rapidement.</x>
              </div>
            </Col>
            <Col md={4} className="feature-card">
              <div className="card-content">
                <span className="feature-tag">#Three</span>
                <h3 className="card-heading">Informations en temps réel</h3>
                <img src={insightsImg} alt="Insights" className="feature-image" />
                <x>Surveillez les performances et la conformité avec des rapports en direct.</x>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="separator">
        <h2 className="title-heading">Témoignages de nos clients</h2>
      </div>

      <div className="testimonials-container">
        <div className="testimonial-card">
          <p className="testimonial-text">"{testimonials[index].text}"</p>
          <h4 className="testimonial-name">{testimonials[index].name}</h4>
          <p className="testimonial-role">{testimonials[index].role}</p>
        </div>

        <div className="testimonial-controls">
          <button className="arrow-btn" onClick={prevTestimonial}><FaChevronLeft /></button>
          <button className="arrow-btn" onClick={nextTestimonial}><FaChevronRight /></button>
        </div>
      </div>
    </div>
  );
};

export default Home;
