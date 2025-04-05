import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import IWNavBar from "./IWNavBar";
import { BsClockHistory, BsFileEarmarkText, BsCheckCircle } from "react-icons/bs";
import "./IWDashboard.css";
import { FaSearch, FaSlidersH, FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaTimes } from "react-icons/fa";

const jobs = [
  {
    id: 1,
    title: "Service client",
    location: "Ariana, Tunis",
    type: "Temps plein, 9h - 17h",
    salary: "TN 20/heure",
    profession: "Service Client",
    posted: "Il y a 2 jours",
    color: "#FF914D",
  },
  {
    id: 2,
    title: "Assistant de stockage",
    location: "Hammamet, Nabeul",
    type: "Temps partiel, 6h - 14h",
    salary: "TN 35/heure",
    profession: "Logistique",
    posted: "Il y a 1 jour",
    color: "#4CAF50",
  },
  {
    id: 3,
    title: "Clerc de saisie",
    location: "Mourouj, Tunis",
    type: "Temps partiel, 8h - 16h",
    salary: "TN 25/heure",
    profession: "Administratif",
    posted: "Il y a 3 jours",
    color: "#2196F3",
  },
];

const IWDashboard = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    profession: ""
  });
  const navigate = useNavigate();

  const filteredJobs = jobs.filter(job =>
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     job.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filters.location === "" || job.location.includes(filters.location)) &&
    (filters.profession === "" || job.profession.includes(filters.profession))
  );

  const handleSearchSubmit = () => {
    navigate("/job-results", {
      state: {
        jobs: filteredJobs,
        searchTerm,
        filters
      }
    });
  };

  return (
    <div className="iw-dashboard">
      <IWNavBar />
      
      <div className="iw-content">
        {/* Welcome Section */}
        <section className="iw-welcome">
          <h1>Bienvenue, <span>Collaborateur intérimaire Iheb</span></h1>
          <p>Trouvez l'emploi parfait pour vos compétences</p>
          
          <div className="iw-search-container">
            <div className="iw-search-bar">
              <FaSearch className="iw-search-icon" />
              <input 
                type="text" 
                placeholder="Rechercher par poste ou lieu..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
              />
              <button
                className="iw-filter-btn"
                onClick={() => setShowFilter(true)}
              >
                <FaSlidersH className="iw-filter-icon" />
                <span>Filtrer</span>
              </button>
              <button 
                className="iw-search-btn"
                onClick={handleSearchSubmit}
              >
                Rechercher
              </button>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <Container className="iw-stats">
          <h3 className="iw-section-title">Votre activité</h3>
          <Row className="iw-stats-row">
            <Col md={4}>
              <Card className="iw-stat-card">
                <Card.Body>
                  <div className="iw-stat-icon">
                    <BsClockHistory />
                  </div>
                  <Card.Title>Heures travaillées</Card.Title>
                  <Card.Text className="iw-stat-value">20 heures</Card.Text>
                  <Card.Text className="iw-stat-description">Cette semaine</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="iw-stat-card">
                <Card.Body>
                  <div className="iw-stat-icon">
                    <BsFileEarmarkText />
                  </div>
                  <Card.Title>Contrats</Card.Title>
                  <Card.Text className="iw-stat-value">2 signés</Card.Text>
                  <Card.Text className="iw-stat-description">1 actif</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="iw-stat-card">
                <Card.Body>
                  <div className="iw-stat-icon">
                    <BsCheckCircle />
                  </div>
                  <Card.Title>Candidatures</Card.Title>
                  <Card.Text className="iw-stat-value">5 acceptées</Card.Text>
                  <Card.Text className="iw-stat-description">Ce mois-ci</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Job Recommendations */}
        <Container className="iw-jobs">
          <h3 className="iw-section-title">Recommandations pour vous</h3>
          <Row className="iw-jobs-grid">
            {filteredJobs.map((job) => (
              <Col md={4} key={job.id}>
                <Card className="iw-job-card">
                  <Card.Body>
                    <div className="iw-job-badge" style={{ backgroundColor: job.color }}>
                      {job.profession}
                    </div>
                    <Card.Title className="iw-job-title">{job.title}</Card.Title>
                    <div className="iw-job-meta">
                      <span className="iw-job-location">
                        <FaMapMarkerAlt /> {job.location}
                      </span>
                      <span className="iw-job-type">
                        <FaBriefcase /> {job.type}
                      </span>
                    </div>
                    <div className="iw-job-salary">
                      <FaMoneyBillWave /> {job.salary}
                    </div>
                    <div className="iw-job-posted">{job.posted}</div>
                    <Button variant="primary" className="iw-apply-btn">
                      Postuler maintenant
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Filter Modal */}
      <Modal show={showFilter} onHide={() => setShowFilter(false)} centered>
        <div className="iw-filter-modal">
          <button
            className="iw-close-btn"
            onClick={() => setShowFilter(false)}
          >
            <FaTimes />
          </button>
          <h2 className="iw-modal-title">Options de filtrage</h2>

          <div className="iw-filter-section">
            <h4 className="iw-filter-subtitle">Localisation</h4>
            <div className="iw-input-box">
              <FaMapMarkerAlt className="iw-input-icon" />
              <input 
                type="text" 
                placeholder="Ville ou région" 
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              />
            </div>
          </div>

          <div className="iw-filter-section">
            <h4 className="iw-filter-subtitle">Profession</h4>
            <div className="iw-input-box">
              <FaBriefcase className="iw-input-icon" />
              <input 
                type="text" 
                placeholder="Type de profession" 
                value={filters.profession}
                onChange={(e) => setFilters({...filters, profession: e.target.value})}
              />
            </div>
          </div>

          <button 
            className="iw-apply-filters"
            onClick={() => setShowFilter(false)}
          >
            Appliquer les filtres
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default IWDashboard;