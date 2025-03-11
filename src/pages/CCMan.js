import React, { useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { FaEye, FaUpload, FaTrash, FaCheckCircle } from "react-icons/fa";
import "./CCMan.css";
import CCNavBar from "./CCNavBar";

const CCMan = () => {
  const [activeTab, setActiveTab] = useState("travailleurs");
  const [workers, setWorkers] = useState([
    {
      id: "1000",
      nom: "John Doe",
      poste: "Assistant Commercial",
      isApproved: false,
    },
    {
      id: "0002",
      nom: "Clerk",
      poste: "Employé d'Entrepôt",
      isApproved: false,
    },
    { id: "0122", nom: "Syrine", poste: "Service Client", isApproved: false },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  const contrats = [
    {
      id: "5001",
      nomPostulant: "Alice Dupont",
      poste: "Ingénieur Logiciel",
      statutContrat: "Actif",
      date: "01/03/2025",
    },
    {
      id: "5002",
      nomPostulant: "Marc Lemoine",
      poste: "Analyste de Données",
      statutContrat: "Terminé",
      date: "28/02/2025",
    },
  ];

  const handleCheckboxChange = (id) => {
    setWorkers(
      workers.map((worker) =>
        worker.id === id
          ? { ...worker, isApproved: !worker.isApproved }
          : worker
      )
    );
  };

  const handleDeleteWorker = (id) => {
    setWorkers(workers.filter((worker) => worker.id !== id));
  };

  const handleUploadClick = (contractId) => {
    setSelectedContract(contractId);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedContract(null);
  };

  return (
    <>
      <CCNavBar />
      <div className="CCM-container">
        {/* Section des onglets */}
        <div className="CCM-tabs-box">
          <button
            className={`CCM-tab ${
              activeTab === "travailleurs"
                ? "CCM-active-tab"
                : "CCM-inactive-tab"
            }`}
            onClick={() => setActiveTab("travailleurs")}
          >
            Travailleurs
          </button>
          <button
            className={`CCM-tab ${
              activeTab === "contrats" ? "CCM-active-tab" : "CCM-inactive-tab"
            }`}
            onClick={() => setActiveTab("contrats")}
          >
            Contrats
          </button>
        </div>

        {/* Affichage conditionnel des sections */}
        {activeTab === "travailleurs" ? (
          <div className="CCM-table-container">
            <h2 className="CCM-title">Sélectionnez vos travailleurs finaux</h2>
            <Table striped bordered hover className="CCM-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Poste</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker) => (
                  <tr key={worker.id}>
                    <td>{worker.id}</td>
                    <td>{worker.nom}</td>
                    <td>{worker.poste}</td>
                    <td>
                      <div className="CCM-actions-container">
                        <FaEye className="CCM-icon CCM-view" />
                        <input
                          type="checkbox"
                          checked={worker.isApproved}
                          onChange={() => handleCheckboxChange(worker.id)}
                          className="CCM-checkbox"
                        />
                        <FaTrash
                          className="CCM-icon CCM-delete"
                          onClick={() => handleDeleteWorker(worker.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="CCM-table-container">
            <h2 className="CCM-title">Liste des Contrats</h2>
            <Table striped bordered hover className="CCM-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom du Postulant</th>
                  <th>Poste</th>
                  <th>Statut du Contrat</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contrats.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.nomPostulant}</td>
                    <td>{c.poste}</td>
                    <td
                      style={{
                        color: c.statutContrat === "Actif" ? "green" : "black",
                      }}
                    >
                      {c.statutContrat}
                    </td>
                    <td>{c.date}</td>
                    <td>
                      <div className="CCM-actions-container">
                        <FaEye className="CCM-icon CCM-view" />
                        <FaUpload
                          className="CCM-icon CCM-upload-red"
                          onClick={() => handleUploadClick(c.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {/* Modal for Upload */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Document</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Upload document for contract ID: {selectedContract}</p>
            <input type="file" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary">Upload</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default CCMan;
