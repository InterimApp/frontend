import React, { useState } from "react";
import { FaEye, FaPlus, FaFileAlt } from "react-icons/fa";
import { Modal, Button, Table, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CCNavBar from "./CCNavBar";
import "./CCDoc.css";

const CCDoc = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [reports, setReports] = useState([
    { 
      id: "1001", 
      date: "10/01/2025", 
      title: "Problème de sécurité sur le chantier A", 
      status: "Soumis", 
      description: "Plusieurs équipements de sécurité manquants sur le site de construction." 
    },
    { 
      id: "2030", 
      date: "02/02/2025", 
      title: "Retard de livraison matériel", 
      status: "Examiné", 
      description: "Le fournisseur n'a pas respecté les délais de livraison prévus." 
    },
    { 
      id: "1147", 
      date: "12/01/2025", 
      title: "Conflit entre équipes", 
      status: "En cours d'examen", 
      description: "Tensions entre les équipes de jour et de nuit sur les priorités de travail." 
    },
  ]);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      const newId = (Math.random() * 10000).toFixed(0);
      const newReport = {
        id: newId,
        date: new Date().toLocaleDateString('fr-FR'),
        title: formData.title,
        status: "Soumis",
        description: formData.description
      };
      
      setReports([...reports, newReport]);
      setFormData({ title: "", description: "" });
      setIsFormOpen(false);
      alert("Rapport soumis avec succès!");
    }
  };

  const handleViewReport = (report) => {
    setCurrentReport(report);
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Soumis": return "#009fdb";
      case "Examiné": return "#28a745";
      case "En cours d'examen": return "#ff580a";
      default: return "#333";
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CCNavBar />
      <div className="CCD-container">
        {/* Header Section */}
        <div className="CCD-header">
          <h1 className="CCD-title"><FaFileAlt /> Suivi des rapports de conformité</h1>
          <Button 
            variant="primary" 
            onClick={() => setIsFormOpen(true)}
            className="CCD-submit-button"
          >
            <FaPlus /> Soumettre un rapport
          </Button>
        </div>

        {/* Reports Table */}
        <div className="CCD-table-container">
          <Table striped bordered hover className="CCD-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date de création</th>
                <th>Titre</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.date}</td>
                  <td>{report.title}</td>
                  <td>
                    <Badge 
                      className="CCD-status-badge"
                      style={{ backgroundColor: getStatusColor(report.status) }}
                    >
                      {report.status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleViewReport(report)}
                      className="CCD-action-btn"
                      title="Voir les détails"
                    >
                      <FaEye />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Report Details Modal */}
        <Modal show={isModalOpen} onHide={handleCloseModal} centered>
          <Modal.Header closeButton className="CCD-modal-header">
            <Modal.Title>Détails du rapport</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentReport && (
              <div className="CCD-details-container">
                <table className="CCD-details-table">
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <td>{currentReport.id}</td>
                    </tr>
                    <tr>
                      <th>Date de création</th>
                      <td>{currentReport.date}</td>
                    </tr>
                    <tr>
                      <th>Titre</th>
                      <td>{currentReport.title}</td>
                    </tr>
                    <tr>
                      <th>Statut</th>
                      <td>
                        <Badge 
                          className="CCD-status-badge"
                          style={{ backgroundColor: getStatusColor(currentReport.status) }}
                        >
                          {currentReport.status}
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>{currentReport.description}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Submit Report Modal */}
        <Modal show={isFormOpen} onHide={() => setIsFormOpen(false)} centered>
          <Modal.Header closeButton className="CCD-modal-header">
            <Modal.Title>Soumettre un nouveau rapport</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmitReport} className="CCD-report-form">
              <div className="CCD-form-group">
                <label>Titre du rapport *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Titre du rapport"
                  className="CCD-input"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="CCD-form-group">
                <label>Description détaillée *</label>
                <textarea
                  name="description"
                  placeholder="Décrivez le problème ou la situation"
                  className="CCD-textarea"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="5"
                  required
                />
              </div>
              
              <div className="CCD-form-actions">
                <Button 
                  variant="secondary" 
                  onClick={() => setIsFormOpen(false)}
                  className="CCD-cancel-btn"
                >
                  Annuler
                </Button>
                <Button 
                  variant="primary" 
                  type="submit"
                  className="CCD-submit-form-btn"
                >
                  Envoyer le rapport
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default CCDoc;