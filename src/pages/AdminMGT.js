import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FaEye, FaTimes, FaSquare, FaDownload, FaFilePdf } from "react-icons/fa";
import "./AdminMGT.css";
import AdminNavBar from "./AdminNavBar";
import axios from 'axios';

const AdminMGT = () => {
  const [activeTab, setActiveTab] = useState("utilisateurs");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [offresEmploi, setOffresEmploi] = useState([]);

  // Fetch utilisateurs and offresEmploi from the API
  useEffect(() => {
    // Fetching utilisateurs
    axios.get('http://localhost:8080/api/admin/users')
      .then(response => {
        setUtilisateurs(response.data.users); // Adjust based on your API response
      })
      .catch(error => console.error("Error fetching utilisateurs:", error));

    // Fetching offresEmploi
    axios.get('http://localhost:8080/api/admin/job-postings/requests')
      .then(response => {
        setOffresEmploi(response.data); // Assuming the response is an array of job offers
      })
      .catch(error => console.error("Error fetching offresEmploi:", error));
  }, []);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const handleCloseModal = () => {
    setShowUserModal(false);
    setShowJobModal(false);
    setSelectedUser(null);
    setSelectedJob(null);
  };

  const handleDownloadCV = (filename) => {
    console.log(`Downloading CV: ${filename}`);
    // Implement actual download logic here
  };

  return (
    <>
      <AdminNavBar />
      <div className="AMG-container">
        {/* Section des onglets */}
        <div className="AMG-tabs-box">
          <button
            className={`AMG-tab ${activeTab === "utilisateurs" ? "AMG-active-tab" : "AMG-inactive-tab"}`}
            onClick={() => setActiveTab("utilisateurs")}
          >
            Utilisateurs
          </button>
          <button
            className={`AMG-tab ${activeTab === "emplois" ? "AMG-active-tab" : "AMG-inactive-tab"}`}
            onClick={() => setActiveTab("emplois")}
          >
            Offres d'emploi
          </button>
        </div>

        {/* Affichage conditionnel des sections */}
        {activeTab === "utilisateurs" ? (
          <div className="AMG-table-container">
            <h2 className="AMG-title">Gestion des Utilisateurs</h2>
            <Table striped bordered hover className="AMG-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Rôle</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {utilisateurs.map((utilisateur) => (
                  <tr key={utilisateur.id}>
                    <td>{utilisateur.id}</td>
                    <td>{utilisateur.name}</td>
                    <td>{utilisateur.role}</td>
                    <td className="AMG-actions-cell">
                      <FaEye 
                        className="AMG-icon AMG-view" 
                        onClick={() => handleViewUser(utilisateur)} 
                      />
                      <FaTimes className="AMG-icon AMG-delete" />
                      <FaSquare className="AMG-icon AMG-square" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="AMG-table-container">
            <h2 className="AMG-title">Offres d'Emploi</h2>
            <Table striped bordered hover className="AMG-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Intitulé du Poste</th>
                  <th>Entreprise</th>
                  <th>Date de Publication</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {offresEmploi.map((offre) => (
                  <tr key={offre.id}>
                    <td>{offre.id}</td>
                    <td>{offre.job_title}</td>
                    <td>{offre.company_name}</td>
                    <td>{new Date(offre.created_at).toLocaleDateString()}</td>
                    <td>{offre.status}</td>
                    <td>
                      <FaEye 
                        className="AMG-icon AMG-view" 
                        onClick={() => handleViewJob(offre)} 
                      />
                      <FaTimes className="AMG-icon AMG-delete" />
                      <FaSquare className="AMG-icon AMG-square" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      <Modal show={showUserModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton className="AMG-modal-header">
          <Modal.Title>Détails de l'Utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body className="AMG-modal-body">
          {selectedUser && (
            <div className="AMG-user-details">
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">ID:</span>
                <span className="AMG-detail-value">{selectedUser.id}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Nom:</span>
                <span className="AMG-detail-value">{selectedUser.name}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Rôle:</span>
                <span className="AMG-detail-value">{selectedUser.role}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Profession:</span>
                <span className="AMG-detail-value">{selectedUser.profession}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Âge:</span>
                <span className="AMG-detail-value">{selectedUser.age}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Localisation:</span>
                <span className="AMG-detail-value">{selectedUser.location}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Années d'expérience:</span>
                <span className="AMG-detail-value">{selectedUser.experience_years}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">CV:</span>
                <Button 
                  variant="link" 
                  className="AMG-cv-download"
                  onClick={() => handleDownloadCV(selectedUser.code_interimaire)}
                >
                  <FaFilePdf /> {selectedUser.code_interimaire}
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="AMG-modal-footer">
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Job Details Modal */}
      <Modal show={showJobModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton className="AMG-modal-header">
          <Modal.Title>Détails de l'Offre d'Emploi</Modal.Title>
        </Modal.Header>
        <Modal.Body className="AMG-modal-body">
          {selectedJob && (
            <div className="AMG-user-details">
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">ID:</span>
                <span className="AMG-detail-value">{selectedJob.id}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Intitulé du Poste:</span>
                <span className="AMG-detail-value">{selectedJob.job_title}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Entreprise:</span>
                <span className="AMG-detail-value">{selectedJob.company_name}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Date de Publication:</span>
                <span className="AMG-detail-value">{new Date(selectedJob.created_at).toLocaleDateString()}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Expérience Requise:</span>
                <span className="AMG-detail-value">{selectedJob.required_experience} ans</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Description:</span>
                <span className="AMG-detail-value">{selectedJob.job_description}</span>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="AMG-modal-footer">
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminMGT;
