import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
import { FaEye, FaTrash, FaCheck, FaUser } from "react-icons/fa";
import "./AdminApplicants.css";
import AdminNavBar from "./AdminNavBar";

const AdminApplicants = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/job-offers/applicants")
      .then((response) => {
        const formattedJobs = response.data.map((job) => ({
          id: job.job_offer_id,
          title: job.job_title,
          company: job.company_name,
          datePosted: new Date(job.job_created_at).toLocaleDateString(),
          applicants: job.applicants.map((applicant) => ({
            id: applicant.applicant_id,
            name: applicant.profession,
            cvPath: applicant.cv_path,
            status: "pending",
          })),
        }));
        setJobs(formattedJobs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job offers:", error);
        setError("Failed to load job offers.");
        setLoading(false);
      });
  }, []);

  const handleViewApplicants = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    setCurrentJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentJob(null);
  };

  return (
    <>
      <AdminNavBar />
      <div className="AA-container">
        <h2 className="AA-title">Job Applications Management</h2>
        {loading ? (
          <p>Loading job offers...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="AA-table-container">
            <Table striped bordered hover className="AA-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Date Posted</th>
                  <th>Applicants</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.datePosted}</td>
                    <td className="AA-applicant-count">
                      <FaUser /> {job.applicants.length}
                    </td>
                    <td className="AA-actions-cell">
                      <Button
                        variant="primary"
                        className="AA-view-btn"
                        onClick={() => handleViewApplicants(job.id)}
                      >
                        <FaEye /> View Applicants
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton className="AA-modal-header">
            <Modal.Title className="AA-modal-title">
              Applicants for {currentJob?.title} at {currentJob?.company}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="AA-modal-body">
            {currentJob && currentJob.applicants.length > 0 ? (
              <Table striped bordered hover className="AA-applicant-table">
                <thead>
                  <tr>
                    <th>Applicant ID</th>
                    <th>Profession</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentJob.applicants.map((applicant) => (
                    <tr key={applicant.id}>
                      <td>{applicant.id}</td>
                      <td>{applicant.name}</td>
                      <td className="AA-applicant-actions">
                        <Button
                          variant="success"
                          size="sm"
                          className="AA-select-btn"
                        >
                          <FaCheck /> Select
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="AA-delete-btn"
                        >
                          <FaTrash /> Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="AA-no-applicants">No applicants found for this position.</p>
            )}
          </Modal.Body>
          <Modal.Footer className="AA-modal-footer">
            <Button variant="secondary" onClick={handleCloseModal} className="AA-modal-close-btn">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AdminApplicants;
