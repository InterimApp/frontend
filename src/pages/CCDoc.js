import React, { useState } from "react";
import "./CCDoc.css";
import { FaEye, FaPlus, FaUpload } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CCNavBar from "./CCNavBar";

const CCDoc = () => {
  const [activeTab, setActiveTab] = useState("conformite");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isDocSubmitModalOpen, setIsDocSubmitModalOpen] = useState(false);

  // Rapports de conformité prédéfinis
  const [conformiteReports, setConformiteReports] = useState([
    { id: "1001", date: "10 Jan, 2025", titre: "AZERTY", statut: "Soumis" },
    { id: "2030", date: "02 Fév, 2025", titre: "LALAL", statut: "Examiné" },
    { id: "1147", date: "12 Jan, 2025", titre: "AAAA", statut: "En cours d'examen" },
  ]);

  // Documents prédéfinis
  const [documents, setDocuments] = useState([
    { id: "5001", nom: "Alice Dupont", type: "Contrat", date: "01/03/2025" },
    { id: "5002", nom: "Marc Lemoine", type: "Fiche de paie", date: "28/02/2025" },
    {
      id: "5003",
      nom: "Sophia Bernard",
      type: "Contrat",
      date: "10/02/2025",
    },
  ]);

  const [nouveauRapport, setNouveauRapport] = useState({
    titre: "",
    localisation: "",
    date: "",
    description: "",
  });

  const [nouveauDoc, setNouveauDoc] = useState({
    nom: "",
    type: "",
    date: "",
    fichier: null,
  });

  const openSubmitModal = () => {
    setIsSubmitModalOpen(true);
  };

  const closeSubmitModal = () => {
    setIsSubmitModalOpen(false);
  };

  const openDocSubmitModal = () => {
    setIsDocSubmitModalOpen(true);
  };

  const closeDocSubmitModal = () => {
    setIsDocSubmitModalOpen(false);
  };

  const handleSubmitRapport = () => {
    if (nouveauRapport.titre && nouveauRapport.date) {
      const newId = (Math.random() * 10000).toFixed(0);
      const newEntry = {
        id: newId,
        date: nouveauRapport.date,
        titre: nouveauRapport.titre,
        statut: "Soumis",
      };
      setConformiteReports([...conformiteReports, newEntry]);
      setNouveauRapport({ titre: "", localisation: "", date: "", description: "" });
      closeSubmitModal();
    }
  };

  const handleSubmitDocument = () => {
    if (nouveauDoc.nom && nouveauDoc.type && nouveauDoc.date && nouveauDoc.fichier) {
      const newId = (Math.random() * 10000).toFixed(0);
      const newDocument = {
        id: newId,
        nom: nouveauDoc.nom,
        type: nouveauDoc.type,
        date: nouveauDoc.date,
      };
      setDocuments([...documents, newDocument]);
      setNouveauDoc({ nom: "", type: "", date: "", fichier: null });
      closeDocSubmitModal();
    }
  };

  return (
    <div className="CCDC-container">
      <CCNavBar />

      {/* Commutateur d'onglets */}
      <div className="CCDC-tab-container">
        <button
          className={`CCDC-tab ${activeTab === "conformite" ? "active" : ""}`}
          onClick={() => setActiveTab("conformite")}
        >
          Conformité
        </button>
        <button
          className={`CCDC-tab ${activeTab === "documents" ? "active" : ""}`}
          onClick={() => setActiveTab("documents")}
        >
          Documents
        </button>
      </div>

      {activeTab === "conformite" ? (
        <div className="CCDC-table-card">
          <div className="CCDC-report-header">
            <h1 className="CCDC-title">Soumission du rapport de conformité</h1>
            <button className="CCDC-submit-button" onClick={openSubmitModal}>
              Soumettre <FaPlus />
            </button>
          </div>
          <div className="CCDC-compliance-table-header">
            <h6>ID</h6>
            <h6>Date de l'incident</h6>
            <h6>Titre</h6>
            <h6>Statut</h6>
          </div>
          {conformiteReports.map((report) => (
            <div key={report.id} className="CCDC-compliance-table-row">
              <span>{report.id}</span>
              <span>{report.date}</span>
              <span>{report.titre}</span>
              <span>{report.statut}</span>
            </div>
          ))}
        </div>
      ) : (
        // Section Documents, mise à jour du bouton soumettre
        <div className="CCDC-table-card">
          <div className="CCDC-report-header">
            <h1 className="CCDC-title">Documents</h1>
            <button className="CCDC-submit-button" onClick={openDocSubmitModal}>
              Soumettre <FaPlus />
            </button>
          </div>
          <div className="CCDC-documents-table-header">
            <h6>ID</h6>
            <h6>Nom</h6>
            <h6>Type</h6>
            <h6>Date</h6>
            <h6>Actions</h6>
          </div>
          {documents.map((doc) => (
            <div key={doc.id} className="CCDC-documents-table-row">
              <span>{doc.id}</span>
              <span>{doc.nom}</span>
              <span>{doc.type}</span>
              <span>{doc.date}</span>
              <span>
                <FaEye className="CCDC-icon" />
                <FaUpload className="CCDC-icon" />
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Modal Soumission de conformité */}
      <Modal show={isSubmitModalOpen} onHide={closeSubmitModal} centered>
        <div className="CCDC-modal-container">
          <button className="CCDC-close-btn" onClick={closeSubmitModal}>
            ✖
          </button>
          <h2>Soumettre un rapport d'accident de travail</h2>
          <input
            type="text"
            placeholder="Titre"
            className="CCDC-input"
            value={nouveauRapport.titre}
            onChange={(e) =>
              setNouveauRapport({ ...nouveauRapport, titre: e.target.value })
            }
          />
          <div className="CCDC-input-group">
            <input
              type="text"
              placeholder="Localisation"
              className="CCDC-input"
              value={nouveauRapport.localisation}
              onChange={(e) =>
                setNouveauRapport({ ...nouveauRapport, localisation: e.target.value })
              }
            />
            <input
              type="date"
              className="CCDC-input"
              value={nouveauRapport.date}
              onChange={(e) =>
                setNouveauRapport({ ...nouveauRapport, date: e.target.value })
              }
            />
          </div>
          <textarea
            placeholder="Description"
            className="CCDC-input-textarea"
            value={nouveauRapport.description}
            onChange={(e) =>
              setNouveauRapport({ ...nouveauRapport, description: e.target.value })
            }
          ></textarea>
          <button
            className="CCDC-submit-modal-button"
            onClick={handleSubmitRapport}
          >
            Soumettre
          </button>
        </div>
      </Modal>

      {/* Modal Soumission de Document */}
      <Modal show={isDocSubmitModalOpen} onHide={closeDocSubmitModal} centered>
        <div className="CCDC-doc-modal-container">
          <button className="CCDC-close-btn" onClick={closeDocSubmitModal}>
            ✖
          </button>
          <h2>Soumettre un Document</h2>
          <input
            type="text"
            placeholder="Nom"
            className="CCDC-input"
            value={nouveauDoc.nom}
            onChange={(e) => setNouveauDoc({ ...nouveauDoc, nom: e.target.value })}
          />
          <div className="CCDC-input-group">
            <input
              type="text"
              placeholder="Type de Contrat"
              className="CCDC-input"
              value={nouveauDoc.type}
              onChange={(e) => setNouveauDoc({ ...nouveauDoc, type: e.target.value })}
            />
            <input
              type="date"
              className="CCDC-input"
              value={nouveauDoc.date}
              onChange={(e) => setNouveauDoc({ ...nouveauDoc, date: e.target.value })}
            />
          </div>
          <input
            type="file"
            className="CCDC-input"
            onChange={(e) => setNouveauDoc({ ...nouveauDoc, fichier: e.target.files[0] })}
          />
          <button
            className="CCDC-submit-modal-button"
            onClick={handleSubmitDocument}
          >
            Soumettre Document
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CCDoc;
