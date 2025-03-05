import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FaEye, FaTimes, FaSquare } from "react-icons/fa";
import "./AdminMGT.css";
import AdminNavBar from "./AdminNavBar";

const AdminMGT = () => {
  const [activeTab, setActiveTab] = useState("utilisateurs");

  const utilisateurs = [
    {
      id: "10001",
      nom: "Jean Dupont",
      role: "Travailleur Intérimaire"
    },
    {
      id: "20001",
      nom: "XYZ Entreprise",
      role: "Entreprise"
    }
  ];

  const offresEmploi = [
    {
      id: "5001",
      poste: "Ingénieur Logiciel",
      entreprise: "Entreprise ABC",
      datePublication: "2025-03-01"
    },
    {
      id: "5002",
      poste: "Analyste de Données",
      entreprise: "Entreprise XYZ",
      datePublication: "2025-02-28"
    }
  ];

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
                    <td>
                      <FaEye className="AMG-icon AMG-view" />
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
                    <td>
                      <FaEye className="AMG-icon AMG-view" />
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
    </>
  );
};

export default AdminMGT;
