import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import IWNavBar from "./IWNavBar";
import { Modal } from "react-bootstrap";
import {
  BsClockHistory,
  BsFileEarmarkText,
  BsCheckCircle,
} from "react-icons/bs";
import "./IWDashboard.css";
import { FaSearch, FaSlidersH } from "react-icons/fa";

const jobs = [
  {
    title: "Service client",
    location: "Ariana, Tunis",
    type: "Temps plein, 9h - 17h",
    salary: "TN 20/heure",
    color: "#337ab7",
  },
  {
    title: "Assistant de stockage",
    location: "Hammamet, Nabeul",
    type: "Temps partiel, 6h - 14h",
    salary: "TN 35/heure",
    color: "#d9534f",
  },
  {
    title: "Clerc de saisie",
    location: "Mourouj, Tunis",
    type: "Temps partiel, 8h - 16h",
    salary: "TN 25/heure",
    color: "#f0ad4e",
  },
];

const IWDashboard = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="IWD-dashboard-container">
      <IWNavBar />
      <div className="IWD-main-content">
            <div className="IWD-left-content">
              <h1>
                Bienvenue,{" "}
                <span className="IWD-highlight">
                  Collaborateur intérimaire Iheb
                </span>
              </h1>
              <h2>Trouver un emploi qui vous convient ... </h2>

              <div className="IWD-search-bar">
                <FaSearch className="IWD-search-icon" />
                <input type="text" placeholder="Poste, Lieu" />
                <button
                  className="IWD-filter-btn"
                  onClick={() => setShowPopup(true)}
                >
                  <FaSlidersH />
                </button>
              </div>

          <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
            <div className="IWD-popup-container">
              <button
                className="IWD-close-btn"
                onClick={() => setShowPopup(false)}
              >
                ✖
              </button>
              <h2 className="IWD-popup-title">Filtrer</h2>

              <div className="IWD-input-container">
                <div className="IWD-input-box">
                  <input type="text" placeholder="Utilisateur" />
                  <FaSearch className="IWD-input-icon" />
                </div>

                <div className="IWD-input-box">
                  <input type="text" placeholder="Compagnies" />
                  <FaSlidersH className="IWD-input-icon" />
                </div>
              </div>

              <button className="IWD-search-btn">Rechercher</button>
            </div>
          </Modal>
        </div>

        {/* Recent Activity Section */}
        <Container className="IWD-section-container">
          <h3 className="IWD-section-title">Activité récente</h3>
          <Row className="gy-4 justify-content-center">
            <Col md={4}>
              <Card className="IWD-activity-card bg-pink">
                <Card.Body className="d-flex flex-column align-items-center text-center">
                  <BsClockHistory className="IWD-activity-icon" />
                  <Card.Title className="IWD-activity-title">
                    Nombre d'heures travaillées
                  </Card.Title>
                  <Card.Text className="IWD-activity-value">20 heures</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="IWD-activity-card bg-orange">
                <Card.Body className="d-flex flex-column align-items-center text-center">
                  <BsFileEarmarkText className="IWD-activity-icon" />
                  <Card.Title className="IWD-activity-title">Contrat</Card.Title>
                  <Card.Text className="IWD-activity-value">
                    2 contrats signés
                    <br />1 contrat actif
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="IWD-activity-card bg-blue">
                <Card.Body className="d-flex flex-column align-items-center text-center">
                  <BsCheckCircle className="IWD-activity-icon" />
                  <Card.Title className="IWD-activity-title">
                    Candidatures acceptées
                  </Card.Title>
                  <Card.Text className="IWD-activity-value">
                    5 candidatures acceptées
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Jobs You May Be Interested In Section */}
        <Container className="IWD-suggestion-cards" style={{ marginTop: "30px", marginBottom: "50px" }}>
          <h3 className="IWD-section-title">Emplois qui pourraient vous intéresser</h3>
          <Row className="gy-4 justify-content-center">
            {jobs.map((job, index) => (
              <Col md={4} key={index}>
                <Card
                  className="IWD-job-card"
                  style={{ backgroundColor: job.color, color: "white" }}
                >
                  <Card.Body className="IWD-text-center">
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Text
                      style={{ backgroundColor: job.color, color: "white" }}
                    >
                      <i>{job.location}</i>
                    </Card.Text>
                    <Card.Text
                      style={{ backgroundColor: job.color, color: "white" }}
                    >
                      {job.type}
                    </Card.Text>
                    <Card.Text
                      style={{ backgroundColor: job.color, color: "white" }}
                    >
                      <strong>{job.salary}</strong>
                    </Card.Text>
                    <Button variant="light">Postuler maintenant</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default IWDashboard;
