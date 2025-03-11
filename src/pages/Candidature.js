import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BsEye, BsGeoAlt } from "react-icons/bs";
import "./Candidature.css";
import NavBar from "./IWNavBar";
import hpLogo from "../assets/hp-logo.png";
import phoenixLogo from "../assets/phoenix-logo.png";
import slLogo from "../assets/sl-logo.png";

const emplois = [
  {
    id: 1,
    logo: hpLogo,
    titre: "Service Client",
    localisation: "Ariana, Tunis",
    horaire: "Temps plein, 9h – 17h",
    salaire: "TN 20/heure",
  },
  {
    id: 2,
    logo: phoenixLogo,
    titre: "Service Client",
    localisation: "Ariana, Tunis",
    horaire: "Temps plein, 9h – 17h",
    salaire: "TN 20/heure",
  },
  {
    id: 3,
    logo: slLogo,
    titre: "Service Client",
    localisation: "Ariana, Tunis",
    horaire: "Temps plein, 9h – 17h",
    salaire: "TN 20/heure",
  },
];

const Candidature = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />
      <Container className="job-list-container">
        <h2 className="find-job-title" style={{ marginTop: "130px" }}>
          Trouver un emploi
        </h2>
        {emplois.map((emploi) => (
          <Card key={emploi.id} className="job-card">
            <Card.Body className="d-flex align-items-center">
              <img src={emploi.logo} alt="Logo de l'entreprise" className="company-logo" />
              <div className="job-details">
                <h5 className="job-title">
                  {emploi.titre} <BsEye className="view-icon" />
                </h5>
                <p className="job-location">
                  <BsGeoAlt className="location-icon" /> {emploi.localisation}
                </p>
                <p className="job-time">
                  {emploi.horaire} <span className="job-salary">{emploi.salaire}</span>
                </p>
              </div>
              <Button className="apply-button">Postuler</Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default Candidature;
