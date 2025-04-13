import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FaEye, FaTrash, FaCheck, FaUser } from "react-icons/fa";
import "./AdminApplicants.css";
import AdminNavBar from "./AdminNavBar";

const AdminApplicants = () => {
  const [jobs, setJobs] = useState([
    {
      id: "1001",
      title: "Développeur Frontend",
      company: "Tech Solutions Inc.",
      datePosted: "2024-03-15",
      applicants: [
        { id: "A101", name: "John Smith", status: "pending" },
        { id: "A102", name: "Sarah Johnson", status: "pending" }
      ]
    },
    {
      id: "1002",
      title: "Analyste de données",
      company: "Analytics Corp",
      datePosted: "2024-03-10",
      applicants: [
        { id: "A103", name: "Michael Brown", status: "pending" }
      ]
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  const handleViewApplicants = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    setCurrentJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentJob(null);
  };

  const handleSelectApplicant = (jobId, applicantId) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          applicants: job.applicants.map(applicant => 
            applicant.id === applicantId 
              ? { ...applicant, status: "selected" } 
              : applicant
          )
        };
      }
      return job;
    }));
    console.log(`Candidat ${applicantId} sélectionné pour le poste ${jobId}`);
  };

  const handleDeleteApplicant = (jobId, applicantId) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          applicants: job.applicants.filter(a => a.id !== applicantId)
        };
      }
      return job;
    }));
    console.log(`Candidat ${applicantId} supprimé du poste ${jobId}`);
  };

  return (
    <div className="AA-container">
      <AdminNavBar />
      <h2 className="AA-title">Gestion des candidatures</h2>

      <div className="AA-table-container">
        <Table striped bordered hover className="AA-table">
          <thead>
            <tr>
              <th>Intitulé du poste</th>
              <th>Entreprise</th>
              <th>Date de publication</th>
              <th>Candidats</th>
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
                    <FaEye /> Voir les candidats
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal des candidats */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton className="AA-modal-header">
          <Modal.Title className="AA-modal-title">
            Candidats pour {currentJob?.title} chez {currentJob?.company}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="AA-modal-body">
          {currentJob && currentJob.applicants.length > 0 ? (
            <Table striped bordered hover className="AA-applicant-table">
              <thead>
                <tr>
                  <th>ID du candidat</th>
                  <th>Nom</th>
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
                        onClick={() => handleSelectApplicant(currentJob.id, applicant.id)}
                        disabled={applicant.status === "selected"}
                      >
                        <FaCheck /> Sélectionner
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="AA-delete-btn"
                        onClick={() => handleDeleteApplicant(currentJob.id, applicant.id)}
                      >
                        <FaTrash /> Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="AA-no-applicants">Aucun candidat trouvé pour ce poste.</p>
          )}
        </Modal.Body>
        <Modal.Footer className="AA-modal-footer">
          <Button variant="secondary" onClick={handleCloseModal} className="AA-modal-close-btn">
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminApplicants;
