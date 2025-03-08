import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FaEye, FaTimes, FaSquare, FaDownload } from "react-icons/fa"; // Import FaDownload
import "./AdminDoc.css";
import AdminNavBar from "./AdminNavBar";

const AdminDoc = () => {
  const [activeTab, setActiveTab] = useState("conformite");

  // Declare the companies and reports data
  const rapportsConformite = [
    {
      id: "3001",
      entreprise: "Entreprise ABC",
      sujet: "Audit de Sécurité"
    },
    {
      id: "3002",
      entreprise: "Entreprise XYZ",
      sujet: "Inspection du Travail"
    }
  ];

  const contrats = [
    {
      id: "6001",
      travailleur: "Jean Dupont",
      entreprise: "Entreprise ABC",
      dateDebut: "2024-01-10",
      dateFin: "2025-01-10"
    },
    {
      id: "6002",
      travailleur: "Marie Curie",
      entreprise: "Entreprise XYZ",
      dateDebut: "2023-05-15",
      dateFin: "2024-05-15"
    }
  ];

  return (
    <>
      <AdminNavBar />
      <div className="ADC-container">
        {/* Section des onglets */}
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

        {/* Affichage conditionnel des sections */}
        {activeTab === "conformite" ? (
          <div className="ADC-table-container">
            <h2 className="ADC-title">Gestion des Rapports de Conformité</h2>
            <Table striped bordered hover className="ADC-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Entreprise</th>
                  <th>Sujet</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rapportsConformite.map((rapport) => (
                  <tr key={rapport.id}>
                    <td>{rapport.id}</td>
                    <td>{rapport.entreprise}</td>
                    <td>{rapport.sujet}</td>
                    <td>
                      <FaEye className="ADC-icon ADC-view" />
                      <FaDownload className="ADC-icon ADC-download" />
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
                  <th>Date de Début</th>
                  <th>Date de Fin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contrats.map((contrat) => (
                  <tr key={contrat.id}>
                    <td>{contrat.id}</td>
                    <td>{contrat.travailleur}</td>
                    <td>{contrat.entreprise}</td>
                    <td>{contrat.dateDebut}</td>
                    <td>{contrat.dateFin}</td>
                    <td>
                      <FaEye className="ADC-icon ADC-view" />
                      <FaDownload className="ADC-icon ADC-download" />
                      <FaTimes className="ADC-icon ADC-delete" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDoc;
