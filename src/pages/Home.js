import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import analysis from "../assets/analysis.jpeg";
import complianceImg from "../assets/conformite.png";
import hiringImg from "../assets/hiringImg.png";
import insightsImg from "../assets/insightsImg.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import effiency from "../assets/effiency.png";
import user_sat from "../assets/user_sat.png";
import missionIcon from "../assets/missionIcon.png";
import visionIcon from "../assets/visionIcon.png";
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
  const navigate = useNavigate();

  const nextTestimonial = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleCommencerClick = () => {
    navigate("./signup1");
  };


  return (
    <div id="home" className="home-container">
      <div className="first-screen-container">
        <Container fluid>

          <Row className="content-section d-flex align-items-left justify-content-center text-center">
            <Col md={6}>
              <span className="tag">#GérerAvecFacilité</span>
              <h1>
                Donnez du pouvoir à votre personnel grâce à une gestion
                transparente
              </h1>
              <p>
                Notre plateforme simplifie a pour mission d’accompagner les
                entreprises dans leur nécessité d’adaptation pour répondre plus
                spécifiquement à leurs défis RH. Notre force tient dans la
                solidité et la coopération de nos marques pour bâtir les
                solutions les plus expertes pour nos clients.
              </p>
              <Button className="start-btn" onClick={handleCommencerClick}>Commencer</Button>
              <Button className="demo-btn">Demo</Button>
            </Col>
            <Col md={6} className="image-section">
              <img src={analysis} alt="Analysis" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </div>

      <div id="pourquoi-choisir" className="separator">
        <h2 className="title-heading">Pourquoi choisir Manpower ?</h2>
      </div>

      <div className="second-screen-container">
        <Container>
          <Row>
            <Col md={4} className="feature-card">
              <div className="card-content">
                <span className="feature-tag">#One</span>
                <h3 className="card-heading">Conformité facile</h3>
                <img
                  src={complianceImg}
                  alt="Compliance"
                  className="feature-image"
                />
                <x>
                  Suivez la sécurité et assurez la conformité ISO sans effort.
                </x>
              </div>
            </Col>
            <Col md={3} className="feature-card">
              <div className="card-content">
                <span className="feature-tag">#Two</span>
                <h3 className="card-heading">Recrutement simplifié</h3>
                <img
                  src={hiringImg}
                  alt="Recrutement"
                  className="feature-image"
                />
                <x>
                  Publiez des offres d'emploi, évaluez les candidats et gérez
                  les contrats rapidement.
                </x>
              </div>
            </Col>
            <Col md={4} className="feature-card">
              <div className="card-content">
                <span className="feature-tag">#Three</span>
                <h3 className="card-heading">Informations en temps réel</h3>
                <img
                  src={insightsImg}
                  alt="Insights"
                  className="feature-image"
                />
                <x>
                  Surveillez les performances et la conformité avec des rapports
                  en direct.
                </x>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div id="temoignages" className="separator">
        <h2 className="title-heading">Témoignages de nos clients</h2>
      </div>

      <div className="testimonials-container">
        <div className="testimonial-card">
          <p className="testimonial-text">"{testimonials[index].text}"</p>
          <h4 className="testimonial-name">{testimonials[index].name}</h4>
          <p className="testimonial-role">{testimonials[index].role}</p>
        </div>

        <div className="testimonial-controls">
          <button className="arrow-btn" onClick={prevTestimonial}>
            <FaChevronLeft />
          </button>
          <button className="arrow-btn" onClick={nextTestimonial}>
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div id="nos-statistiques" className="separator">
        <h2 className="title-heading">Nos Statistiques</h2>
      </div>

      <div className="platform-glance-container">
        <Container>
          <Row className="platform-stats">
            <Col md={5} className="stat-card">
              <img
                src={user_sat}
                alt="Satisfaction des utilisateurs"
                className="stat-image"
              />
              <h3 className="stat-title">Satisfaction des utilisateurs</h3>
              <p className="stat-description">
                "Nos utilisateurs adorent le design intuitif et le processus de
                gestion simplifié."
              </p>
            </Col>
            <Col md={5} className="stat-card">
              <img
                src={effiency}
                alt="Efficacité du recrutement"
                className="stat-image"
              />
              <h3 className="stat-title">
                Augmentation de l'efficacité du recrutement
              </h3>
              <p className="stat-description">
                "Les entreprises constatent un processus de recrutement plus
                rapide et plus fluide grâce à notre plateforme."
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div id="mission-vision" className="separator">
        <h2 className="title-heading">Notre plateforme en un coup d'oeil</h2>
      </div>

      <div className="platform-overview">
        <Container>
          <Row className="overview-section">
            {/* Mission Section */}
            <Col md={5} className="overview-card">
              <div className="card-header">
                <img
                  src={missionIcon}
                  alt="Mission Icon"
                  className="overview-icon"
                />
                <h4>Mission</h4>
              </div>
              <p>
                {" "}
                <i>
                  “Notre mission est de simplifier la gestion des effectifs en
                  offrant des services fiables et des solutions évolutives et
                  flexibles. Notre objectif est de combler le fossé entre les
                  personnes qualifiées professionnels et organisations,
                  permettant une croissance mutuelle tout en assurant le respect
                  des normes réglementaires et l’excellence dans chaque
                  interaction.”
                </i>
              </p>
            </Col>

            {/* Vision Section */}
            <Col md={5} className="overview-card">
              <div className="card-header">
                <img
                  src={visionIcon}
                  alt="Vision Icon"
                  className="overview-icon"
                />
                <h4>Vision</h4>
              </div>
              <p>
                <i>
                  “Être la principale plateforme de solutions de main-d'œuvre
                  intérimaire, révolutionnant la manière dont les organisations
                  et les individus se connectent en fournissant des services
                  transparents, efficaces et des services de main-d'œuvre
                  innovants qui responsabilisent les entreprises et favorisent
                  croissance professionnelle.”
                </i>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
