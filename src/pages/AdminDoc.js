import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FaUserCheck, FaUpload } from "react-icons/fa";
import "./AdminDoc.css";
import AdminNavBar from "./AdminNavBar";
import { FaEye, FaDownload, FaTimes } from 'react-icons/fa';

const AdminDoc = () => {
  const [activeTab, setActiveTab] = useState("conformite");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [file, setFile] = useState(null);

  // Sample data
  const rapportsConformite = [
    {
      id: "3001",
      entreprise: "Entreprise ABC",
      sujet: "Audit de Sécurité",
      type: "Audit Annuel",
      date: "2025-01-15",
      statut: "Approuvé",
      description: "Audit complet des systèmes de sécurité informatique et des procédures de protection des données. L'audit a révélé une conformité à 92% avec les réglementations en vigueur.",
      responsable: "Pierre Martin",
      recommendations: [
        "Mettre à jour les politiques de mot de passe",
        "Former le personnel sur les nouvelles menaces de phishing",
        "Implémenter un système de détection d'intrusion"
      ],
      fichier: "audit_securite_abc_2025.pdf"
    },
    {
      id: "3002",
      entreprise: "Entreprise XYZ",
      sujet: "Inspection du Travail",
      type: "Inspection Surprise",
      date: "2025-02-20",
      statut: "En Révision",
      description: "Inspection des conditions de travail et de conformité aux normes de sécurité. Plusieurs non-conformités mineures ont été identifiées dans les zones de stockage.",
      responsable: "Sophie Lambert",
      recommendations: [
        "Améliorer l'éclairage dans les zones de stockage",
        "Former les employés sur les procédures de levage sécuritaire",
        "Vérifier les extincteurs mensuellement"
      ],
      fichier: "inspection_travail_xyz_2025.pdf"
    }
  ];

  const contrats = [
    {
      id: "6001",
      travailleur: "Jean Dupont",
      entreprise: "Entreprise ABC",
      postedDate: "2024-01-10"
    },
    {
      id: "6002",
      travailleur: "Marie Curie",
      entreprise: "Entreprise XYZ",
      postedDate: "2023-05-15"
    }
  ];

  const handleAssignClick = (contract) => {
    setSelectedContract(contract);
    setShowAssignModal(true);
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const handleCloseModal = () => {
    setShowAssignModal(false);
    setShowReportModal(false);
    setSelectedContract(null);
    setSelectedReport(null);
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    console.log("Assigning contract:", selectedContract.id);
    console.log("Uploaded file:", file);
    // Add your assignment and file upload logic here
    handleCloseModal();
  };

  const handleDownloadReport = (filename) => {
    console.log(`Downloading report: ${filename}`);
    // Implement actual download logic here
  };

  return (
    <>
      <AdminNavBar />
      <div className="ADC-container">
        {/* Tab section */}
        <div className="ADC-tabs-box">
          <button
            className={`ADC-tab ${activeTab === "conformite" ? "ADC-active-tab" : "ADC-inactive-tab"}`}
            onClick={() => setActiveTab("conformite")}
          >
            Rapports de Conformité
          </button>
          <button
            className={`ADC-tab ${activeTab === "contrats" ? "ADC-active-tab" : "ADC-inactive-tab"}`}
            onClick={() => setActiveTab("contrats")}
          >
            Contrats
          </button>
        </div>

        {/* Conditional rendering */}
        {activeTab === "conformite" ? (
          <div className="ADC-table-container">
            <h2 className="ADC-title">Gestion des Rapports de Conformité</h2>
            <Table striped bordered hover className="ADC-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Entreprise</th>
                  <th>Sujet</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rapportsConformite.map((rapport) => (
                  <tr key={rapport.id}>
                    <td>{rapport.id}</td>
                    <td>{rapport.entreprise}</td>
                    <td>{rapport.sujet}</td>
                    <td>{rapport.date}</td>
                    <td>
                      <span className={`ADC-status ADC-status-${rapport.statut.toLowerCase().replace(' ', '-')}`}>
                        {rapport.statut}
                      </span>
                    </td>
                    <td>
                      <FaEye 
                        className="ADC-icon ADC-view" 
                        onClick={() => handleViewReport(rapport)} 
                      />
                      <FaDownload 
                        className="ADC-icon ADC-download" 
                        onClick={() => handleDownloadReport(rapport.fichier)}
                      />
                      <FaTimes className="ADC-icon ADC-delete" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="ADC-table-container">
            <h2 className="ADC-title">Gestion des Contrats</h2>
            <Table striped bordered hover className="ADC-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Travailleur</th>
                  <th>Entreprise</th>
                  <th>Posted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contrats.map((contrat) => (
                  <tr key={contrat.id}>
                    <td>{contrat.id}</td>
                    <td>{contrat.travailleur}</td>
                    <td>{contrat.entreprise}</td>
                    <td>{contrat.postedDate}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        className="ADC-assign-btn"
                        onClick={() => handleAssignClick(contrat)}
                      >
                        <FaUserCheck className="ADC-icon" /> Assign
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      {/* Assign Modal */}
      <Modal show={showAssignModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="ADC-modal-header">
          <Modal.Title>Assign Contract - {selectedContract?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAssignSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Worker: {selectedContract?.travailleur}</Form.Label>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Company: {selectedContract?.entreprise}</Form.Label>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Upload Contract File</Form.Label>
              <div className="ADC-file-upload">
                <label htmlFor="contract-upload" className="ADC-upload-label">
                  <FaUpload className="ADC-upload-icon" />
                  <span>{file ? file.name : "Choose a file to upload"}</span>
                </label>
                <input
                  id="contract-upload"
                  type="file"
                  onChange={handleFileChange}
                  required
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </Form.Group>
            
            <div className="ADC-modal-actions">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Confirm Assignment
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Report Details Modal */}
      <Modal show={showReportModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton className="ADC-modal-header">
          <Modal.Title>Détails du Rapport de Conformité</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ADC-modal-body">
          {selectedReport && (
            <div className="ADC-report-details">
              <div className="ADC-detail-row">
                <span className="ADC-detail-label">ID:</span>
                <span className="ADC-detail-value">{selectedReport.id}</span>
              </div>
              <div className="ADC-detail-row">
                <span className="ADC-detail-label">Entreprise:</span>
                <span className="ADC-detail-value">{selectedReport.entreprise}</span>
              </div>
              <div className="ADC-detail-row">
                <span className="ADC-detail-label">Sujet:</span>
                <span className="ADC-detail-value">{selectedReport.sujet}</span>
              </div>
           
              <div className="ADC-detail-row">
                <span className="ADC-detail-label">Date:</span>
                <span className="ADC-detail-value">{selectedReport.date}</span>
              </div>
              <div className="ADC-detail-row">
                <span className="ADC-detail-label">Statut:</span>
                <span className={`ADC-detail-value ADC-status ADC-status-${selectedReport.statut.toLowerCase().replace(' ', '-')}`}>
                  {selectedReport.statut}
                </span>
              </div>
              
              <div className="ADC-detail-row">
                <span className="ADC-detail-label">Description:</span>
                <span className="ADC-detail-value">
                  <div className="ADC-report-description">
                    {selectedReport.description}
                  </div>
                </span>
              </div>
          
              </div>
              
          )}
        </Modal.Body>
        <Modal.Footer className="ADC-modal-footer">
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminDoc;