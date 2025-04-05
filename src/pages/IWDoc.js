import React, { useState, useEffect } from "react";
import { FaEye, FaPlus } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { submitReport, fetchUserReports } from "../services/ReportApi";
import IWNavBar from "./IWNavBar";
import "./IWDoc.css";

// Temporary hardcoded values - replace these with real values from your database
const TEMP_USER_ID = 2; // Interim collaborator user ID that exists in your database
const TEMP_ADMIN_ID = 1; // Admin user ID that exists in your database
const TEMP_TOKEN = "development-token"; // Mock token for development

const IWDoc = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ subject: "", description: "" });

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        const response = await fetchUserReports(TEMP_USER_ID, TEMP_TOKEN);
        
        const transformedReports = response.data.map(report => ({
          id: report.id,
          date: new Date(report.created_at).toLocaleDateString('fr-FR'),
          title: report.subject,
          status: report.status || "Soumis",
          description: report.description
        }));
        
        setReports(transformedReports);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
        alert("Erreur lors du chargement des rapports");
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    try {
      const reportData = {
        submitted_by: TEMP_USER_ID,
        submitted_to: TEMP_ADMIN_ID,
        subject: formData.subject,
        description: formData.description
      };

      const response = await submitReport(reportData, TEMP_TOKEN);
      
      setReports(prev => [...prev, {
        id: response.data.id,
        date: new Date().toLocaleDateString('fr-FR'),
        title: response.data.subject,
        status: "Soumis",
        description: response.data.description
      }]);

      setFormData({ subject: "", description: "" });
      setIsFormOpen(false);
      alert("Rapport soumis avec succès!");
    } catch (error) {
      console.error("Submission Error:", error);
      alert(`Erreur: ${error.message}`);
    }
  };

  const handleViewReport = (report) => {
    setCurrentReport(report);
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Soumis": return "#009fdb";
      case "Révisé": return "#28a745";
      case "En cours de révision": return "#f75429";
      default: return "#333";
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="IWDC-contract-container">
      <IWNavBar />
      <div className="IWDC-table-card">
        <div className="IWDC-report-header">
          <h1 className="IWDC-title-contract">Suivi des rapports soumis</h1>
          <button 
            className="IWDC-submit-button"
            onClick={() => setIsFormOpen(true)}
          >
            Soumettre <FaPlus />
          </button>
        </div>

        <div className="IWDC-mini-bar-header">
          <h6>ID</h6>
          <h6>Date de création</h6>
          <h6>Titre</h6>
          <h6>Statut</h6>
          <h6>Actions</h6>
        </div>

        {loading ? (
          <div className="text-center py-4">Chargement en cours...</div>
        ) : (
          reports.map((report, index) => (
            <div key={report.id} className="IWDC-mini-bar-row">
              <span>{index + 1}</span>
              <span>{report.date}</span>
              <span>{report.title}</span>
              <span style={{ color: getStatusColor(report.status) }}>
                {report.status}
              </span>
              <span>
                <FaEye 
                  onClick={() => handleViewReport(report)} 
                  className="action-icon" 
                />
              </span>
            </div>
          ))
        )}
      </div>

      <Modal show={isModalOpen} onHide={handleCloseModal} centered>
        <div className="IWDC-popup-container">
          <button className="IWDC-close-btn" onClick={handleCloseModal}>
            ✖
          </button>
          {currentReport && (
            <div>
              <h2>Détails du rapport</h2>
              <table className="IWDC-contract-details-table">
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
                    <td>{currentReport.status}</td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{currentReport.description || "Aucune description"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Modal>

      <Modal show={isFormOpen} onHide={() => setIsFormOpen(false)} centered>
        <div className="IWDC-popup-container">
          <button className="IWDC-close-btn" onClick={() => setIsFormOpen(false)}>
            ✖
          </button>
          <h2>Soumettre un nouveau rapport</h2>
          <form onSubmit={handleSubmitReport} className="IWDC-report-form">
            <div className="form-group">
              <label>Sujet du rapport *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Description détaillée *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={() => setIsFormOpen(false)}>
                Annuler
              </button>
              <button type="submit" className="submit-btn">
                Envoyer le rapport
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default IWDoc;