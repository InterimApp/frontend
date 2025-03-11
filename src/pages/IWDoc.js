import React, { useState } from "react";
import "./IWDoc.css";
import { FaEye, FaPlus, FaTimes } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import IWNavBar from "./IWNavBar";

const IWDoc = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null); // Store current report to show in modal
  const [reports, setReports] = useState([
    { id: "1001", date: "Jan 10, 2025", title: "AZERTY", status: "Soumis" },
    { id: "2030", date: "Feb 02, 2025", title: "LALAL", status: "Révisé" },
    { id: "1147", date: "Jan 12, 2025", title: "AAAA", status: "En cours de révision" },
  ]);

  const handleViewReport = (report) => {
    setCurrentReport(report); // Set current report data
    setIsModalOpen(true); // Open the modal
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Soumis":
        return "#009fdb"; // Blue
      case "Révisé":
        return "#28a745"; // Green
      case "En cours de révision":
        return "#f75429"; // Orange
      default:
        return "#333"; // Default color (dark grey)
    }
  };

  const handleDeleteReport = (reportId) => {
    // Filter out the report that was deleted by matching its ID
    setReports(reports.filter((report) => report.id !== reportId));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="IWDC-contract-container">
      <IWNavBar />
      <div className="IWDC-table-card">
        <div className="IWDC-report-header">
          <h1 className="IWDC-title-contract">Suivi des rapports soumis</h1>
          <button className="IWDC-submit-button">
            Soumettre <FaPlus />
          </button>
        </div>

        <div className="IWDC-mini-bar-header">
          <h6>ID</h6>
          <h6>Date de l'incident</h6>
          <h6>Titre</h6>
          <h6>Statut</h6>
          <h6>Actions</h6>
        </div>

        {reports.map((report, index) => (
          <div key={report.id} className="IWDC-mini-bar-row">
            <span>{index + 1}</span>
            <span>{report.date}</span>
            <span>{report.title}</span>
            <span style={{ color: getStatusColor(report.status) }}>
              {report.status}
            </span>
            <span>
              <FaEye onClick={() => handleViewReport(report)} />
              <FaTimes onClick={() => handleDeleteReport(report.id)} />
            </span>
          </div>
        ))}
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
                    <th>Date de l'incident</th>
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
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default IWDoc;
