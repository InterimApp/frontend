import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FaEye, FaTimes, FaSquare, FaDownload, FaFilePdf } from "react-icons/fa";
import "./AdminMGT.css";
import AdminNavBar from "./AdminNavBar";

const AdminMGT = () => {
  const [activeTab, setActiveTab] = useState("utilisateurs");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const utilisateurs = [
    {
      id: "10001",
      nom: "Jean Dupont",
      role: "Travailleur Intérimaire",
      age: 32,
      localisation: "Ariana, tunis",
      skills: ["React", "Node.js", "MongoDB"],
      experience: 5,
      profession: "Développeur Full Stack",
      cvFile: "jean_dupont_cv.pdf"
    },
    {
      id: "20001",
      nom: "XYZ Entreprise",
      role: "Entreprise",
      secteur: "Technologie",
      taille: "50-100 employés",
      localisation: "Nabeul, tunis"
    }
  ];

  const offresEmploi = [
    {
      id: "5001",
      poste: "Ingénieur Logiciel",
      entreprise: "Entreprise ABC",
      datePublication: "2025-03-01",
      nombreCandidats: 3,
      competencesRequises: ["JavaScript", "React", "Node.js", "TypeScript"],
      experienceRequise: 5,
      description: "Nous recherchons un ingénieur logiciel expérimenté pour rejoindre notre équipe de développement. Vous serez responsable de la conception et de l'implémentation de nouvelles fonctionnalités pour nos applications web.",
      localisation: "Mehdia, tunis",
      typeContrat: "CDI",
      salaire: "100-150 dt",
    },
    {
      id: "5002",
      poste: "Analyste de Données",
      entreprise: "Entreprise XYZ",
      datePublication: "2025-02-28",
      nombreCandidats: 2,
      competencesRequises: ["Python", "SQL", "Machine Learning", "Tableau"],
      experienceRequise: 3,
      description: "Nous cherchons un analyste de données pour aider à interpréter nos données clients et fournir des insights actionnables. Le candidat idéal aura une solide expérience en analyse de données et en visualisation.",
      localisation: "Ben arous, tunis",
      typeContrat: "CDD",
      salaire: "80-100 dt",
    }
  ];

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
                    <td>{utilisateur.nom}</td>
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
                  <th>Candidats Requis</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {offresEmploi.map((offre) => (
                  <tr key={offre.id}>
                    <td>{offre.id}</td>
                    <td>{offre.poste}</td>
                    <td>{offre.entreprise}</td>
                    <td>{offre.datePublication}</td>
                    <td>{offre.nombreCandidats}</td>
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
                <span className="AMG-detail-value">{selectedUser.nom}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Rôle:</span>
                <span className="AMG-detail-value">{selectedUser.role}</span>
              </div>
              
              {selectedUser.role === "Travailleur Intérimaire" && (
                <>
                  <div className="AMG-detail-row">
                    <span className="AMG-detail-label">Âge:</span>
                    <span className="AMG-detail-value">{selectedUser.age}</span>
                  </div>
                  <div className="AMG-detail-row">
                    <span className="AMG-detail-label">Localisation:</span>
                    <span className="AMG-detail-value">{selectedUser.localisation}</span>
                  </div>
                  <div className="AMG-detail-row">
                    <span className="AMG-detail-label">Compétences:</span>
                    <span className="AMG-detail-value">
                      {selectedUser.skills.join(", ")}
                    </span>
                  </div>
                  <div className="AMG-detail-row">
                    <span className="AMG-detail-label">Années d'expérience:</span>
                    <span className="AMG-detail-value">{selectedUser.experience}</span>
                  </div>
                  <div className="AMG-detail-row">
                    <span className="AMG-detail-label">Profession:</span>
                    <span className="AMG-detail-value">{selectedUser.profession}</span>
                  </div>
                  <div className="AMG-detail-row">
                    <span className="AMG-detail-label">CV:</span>
                    <Button 
                      variant="link" 
                      className="AMG-cv-download"
                      onClick={() => handleDownloadCV(selectedUser.cvFile)}
                    >
                      <FaFilePdf /> {selectedUser.cvFile}
                    </Button>
                  </div>
                </>
              )}

              {selectedUser.role === "Entreprise" && (
                <>
                  <div className="AMG-detail-row">
                    <span className="AMG-detail-label">Secteur:</span>
                    <span className="AMG-detail-value">{selectedUser.secteur}</span>
                  </div>
                  <div className="AMG-detail-row">
                    <span className="AMG-detail-label">Taille:</span>
                    <span className="AMG-detail-value">{selectedUser.taille}</span>
                  </div>
                  <div className="AMG-detail-row">
                    <span className="AMG-detail-label">Localisation:</span>
                    <span className="AMG-detail-value">{selectedUser.localisation}</span>
                  </div>
                </>
              )}
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
                <span className="AMG-detail-label">Poste:</span>
                <span className="AMG-detail-value">{selectedJob.poste}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Entreprise:</span>
                <span className="AMG-detail-value">{selectedJob.entreprise}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Date de Publication:</span>
                <span className="AMG-detail-value">{selectedJob.datePublication}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Nombre de Candidats Requis:</span>
                <span className="AMG-detail-value">{selectedJob.nombreCandidats}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Compétences Requises:</span>
                <span className="AMG-detail-value">
                  {selectedJob.competencesRequises.join(", ")}
                </span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Expérience Requise:</span>
                <span className="AMG-detail-value">{selectedJob.experienceRequise} ans</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Localisation:</span>
                <span className="AMG-detail-value">{selectedJob.localisation}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Type de Contrat:</span>
                <span className="AMG-detail-value">{selectedJob.typeContrat}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Salaire:</span>
                <span className="AMG-detail-value">{selectedJob.salaire}</span>
              </div>
              <div className="AMG-detail-row">
                <span className="AMG-detail-label">Description:</span>
                <span className="AMG-detail-value">
                  <div className="AMG-job-description">
                    {selectedJob.description}
                  </div>
                </span>
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