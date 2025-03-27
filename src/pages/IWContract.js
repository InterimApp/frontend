import React, { useState } from "react";
import "./IWContract.css"; 
import { FaEye } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { TbContract } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./IWNavBar";

const PDF_FILE_URL = "http://localhost:3000/file_pdf.png";

const activeContract = {
  jobTitle: "Assistant d'entrepôt",
  company: "XYZ Corporation",
  startDate: "1er janvier 2025",
  endDate: "31 décembre 2025",
  status: "Non signé",
  terms: {
    salary: "$40,000 par an",
    workingHours: "40 heures par semaine",
    location: "Entrepôt XYZ, Centre-ville",
  },
};

const contractHistory = [
  {
    jobTitle: "Assistant commercial",
    company: "ABC Corporation",
    startDate: "1er janvier 2024",
    endDate: "31 décembre 2024",
    status: "Expiré",
  },
  {
    jobTitle: "Représentant du service clientèle",
    company: "KFK Corporation",
    startDate: "15 janvier 2023",
    endDate: "15 décembre 2023",
    status: "Expiré",
  },
];

const IWContract = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  const openModal = (contract) => {
    setSelectedContract(contract);
    setIsModalOpen(true);
  };

  const downloadFileAtURL = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));
        const fileName = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  };

  return (
    <div className="IWC-contract-container">
      <NavBar />

      {/* Section des contrats actifs */}
      <div className="IWC-active-card IWC-table-card">
        <h1 className="IWC-title-contract">Contrats actifs</h1>
        <div className="IWC-mini-bar-header">
          <h6>Titre du poste</h6>
          <h6>Entreprise</h6>
          <h6>Date de début</h6>
          <h6>Date de fin</h6>
          <h6>Statut</h6>
          <h6>Actions</h6>
        </div>

        <div className="IWC-mini-bar-row">
          <span>{activeContract.jobTitle}</span>
          <span>{activeContract.company}</span>
          <span>{activeContract.startDate}</span>
          <span>{activeContract.endDate}</span>
          <span className="IWC-not-signed">{activeContract.status}</span>
          <span>
            <button
              className="IWC-button"
              onClick={() => openModal(activeContract)}
            >
              <FaEye />
            </button>
            <Link to="/Signature">
              <button className="IWC-button">
                <TbContract />
              </button>
            </Link>
            <button
              className="IWC-button"
              onClick={() => downloadFileAtURL(PDF_FILE_URL)}
            >
              <IoMdDownload />
            </button>
          </span>
        </div>
      </div>

      {/* Section de l'historique des contrats */}
      <div className="IWC-history-card IWC-table-card">
        <h1 className="IWC-title-contract">Historique de vos contrats</h1>
        <div className="IWC-mini-bar-header">
          <h6>Titre du poste</h6>
          <h6>Entreprise</h6>
          <h6>Date de début</h6>
          <h6>Date de fin</h6>
          <h6>Statut</h6>
          <h6>Actions</h6>
        </div>

        {contractHistory.map((contract, index) => (
          <div className="IWC-mini-bar-row" key={index}>
            <span>{contract.jobTitle}</span>
            <span>{contract.company}</span>
            <span>{contract.startDate}</span>
            <span>{contract.endDate}</span>
            <span className="IWC-expired">{contract.status}</span>
            <span>
              <button
                className="IWC-button"
                onClick={() => openModal(contract)}
              >
                <FaEye />
              </button>
              <button
                className="IWC-button"
                onClick={() => downloadFileAtURL(PDF_FILE_URL)}
              >
                <IoMdDownload />
              </button>
            </span>
          </div>
        ))}
      </div>

      {/* Fenêtre modale */}
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>
        <div className="IWC-popup-container">
          <button
            className="IWC-close-btn"
            onClick={() => setIsModalOpen(false)}
          >
            <FaTimes />
          </button>

          {selectedContract && (
            <div>
              <h2>Détails du contrat</h2>
              <table className="IWC-contract-details-table">
                <tbody>
                  <tr>
                    <th>Titre du poste</th>
                    <td>{selectedContract.jobTitle}</td>
                  </tr>
                  <tr>
                    <th>Entreprise</th>
                    <td>{selectedContract.company}</td>
                  </tr>
                  <tr>
                    <th>Date de début</th>
                    <td>{selectedContract.startDate}</td>
                  </tr>
                  <tr>
                    <th>Date de fin</th>
                    <td>{selectedContract.endDate}</td>
                  </tr>
                  <tr>
                    <th>Statut</th>
                    <td
                      className={
                        selectedContract.status === "Non signé"
                          ? "IWC-not-signed"
                          : "IWC-expired"
                      }
                    >
                      {selectedContract.status}
                    </td>
                  </tr>
                </tbody>
              </table>

              {selectedContract === activeContract && (
                <>
                  <h4>Conditions du contrat :</h4>
                  <ul>
                    <li>Salaire : {activeContract.terms.salary}</li>
                    <li>Heures de travail : {activeContract.terms.workingHours}</li>
                    <li>Lieu : {activeContract.terms.location}</li>
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default IWContract;
