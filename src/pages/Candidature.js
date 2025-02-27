import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BsEye, BsGeoAlt } from "react-icons/bs";
import "./Candidature.css";
import NavBar from "./IWNavBar";
import hpLogo from "../assets/hp-logo.png";
import phoenixLogo from "../assets/phoenix-logo.png";
import slLogo from "../assets/sl-logo.png";

const jobs = [
  {
    id: 1,
    logo: hpLogo,
    title: "Customer Service",
    location: "Ariana, tunis",
    time: "Full-time, 9 AM – 5 PM",
    salary: "TN 20/hour",
  },
  {
    id: 2,
    logo: phoenixLogo,
    title: "Customer Service",
    location: "Ariana, tunis",
    time: "Full-time, 9 AM – 5 PM",
    salary: "TN 20/hour",
  },
  {
    id: 3,
    logo: slLogo,
    title: "Customer Service",
    location: "Ariana, tunis",
    time: "Full-time, 9 AM – 5 PM",
    salary: "TN 20/hour",
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
    <h2 className="find-job-title" style={{ marginTop: "130px" }}>Find job</h2>
    {jobs.map((job) => (
      <Card key={job.id} className="job-card">
        <Card.Body className="d-flex align-items-center">
          <img src={job.logo} alt="Company Logo" className="company-logo" />
          <div className="job-details">
            <h5 className="job-title">
              {job.title} <BsEye className="view-icon" />
            </h5>
            <p className="job-location">
              <BsGeoAlt className="location-icon" /> {job.location}
            </p>
            <p className="job-time">
              {job.time} <span className="job-salary">{job.salary}</span>
            </p>
          </div>
          <Button className="apply-button">Apply</Button>
        </Card.Body>
      </Card>
    ))}
  </Container>
</>

  );
};

export default Candidature;
