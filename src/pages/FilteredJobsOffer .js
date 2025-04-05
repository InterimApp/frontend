// JobResultsScreen.js
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from "react-icons/fa";

const FilteredJobOffer = ({ jobs, searchTerm, filters }) => {
  return (
    <div className="job-results-screen">
      <Container className="job-results-container">
        <div className="job-results-header">
          <h2>Résultats de recherche</h2>
          <div className="search-criteria">
            {searchTerm && (
              <span className="search-term">Recherche: "{searchTerm}"</span>
            )}
            {filters.location && (
              <span className="filter-tag">
                <FaMapMarkerAlt /> {filters.location}
              </span>
            )}
            {filters.profession && (
              <span className="filter-tag">
                <FaBriefcase /> {filters.profession}
              </span>
            )}
          </div>
        </div>

        <Row className="job-results-grid">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Col md={4} key={job.id}>
                <Card className="job-card">
                  <Card.Body>
                    <div className="job-badge" style={{ backgroundColor: job.color }}>
                      {job.profession}
                    </div>
                    <Card.Title className="job-title">{job.title}</Card.Title>
                    <div className="job-meta">
                      <span className="job-location">
                        <FaMapMarkerAlt /> {job.location}
                      </span>
                      <span className="job-type">
                        <FaBriefcase /> {job.type}
                      </span>
                    </div>
                    <div className="job-salary">
                      <FaMoneyBillWave /> {job.salary}
                    </div>
                    <div className="job-posted">{job.posted}</div>
                    <Button variant="primary" className="apply-btn">
                      Postuler maintenant
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div className="no-results">
              <p>Aucun emploi ne correspond à vos critères de recherche.</p>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default FilteredJobOffer;