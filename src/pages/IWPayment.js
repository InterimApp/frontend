import React, { useState } from "react";
import "./IWPayment.css";
import { FaEye, FaSearch, FaSlidersH } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { TbContract } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import IWNavBar from "./IWNavBar";

const URL_FICHIER_PDF = "http://localhost:3000/file_pdf.png";

const IWPayment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const telechargerFichierDepuisURL = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));
        const nomFichier = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download", nomFichier);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const donneesBulletinsDeSalaire = [
    // Inclure les bulletins de salaire actifs et historiques dans un même tableau
    {
      id: "01",
      date: "8 mars 2025",
      titre: "Assistant d'entrepôt",
      entreprise: "XYZ",
      statut: "En attente",
    },
    {
      id: "02",
      date: "10 févr. 2025",
      titre: "Assistant commercial",
      entreprise: "XYZ",
      statut: "Payé",
    },
    {
      id: "03",
      date: "20 janv. 2025",
      titre: "Représentant du service clientèle",
      entreprise: "XYZ",
      statut: "Payé",
    },
  ];

  return (
    <div className="IWPA-contract-container">
      <IWNavBar />
      <div className="IWPA-table-card">
        <h1 className="IWPA-title-contract">Vos Bulletins de Salaire</h1>
        <div className="IWPA-mini-bar-header">
          <h6>ID du bulletin de salaire</h6>
          <h6>Date d'émission</h6>
          <h6>Titre du poste</h6>
          <h6>Entreprise</h6>
          <h6>Statut</h6>
          <h6>Actions</h6>
        </div>

        {donneesBulletinsDeSalaire.map((bulletin) => (
          <div key={bulletin.id} className="IWPA-mini-bar-row">
            <span>{bulletin.id}</span>
            <span>{bulletin.date}</span>
            <span>{bulletin.titre}</span>
            <span>{bulletin.entreprise}</span>
            <span
              className={
                bulletin.statut === "Payé" ? "IWPA-expired" : "IWPA-not-signed"
              }
            >
              {bulletin.statut}
            </span>
            <span>
              <button className="IWPA-button" onClick={handleOpenModal}>
                <FaEye />
              </button>
              <button className="IWPA-button" onClick={() => telechargerFichierDepuisURL(URL_FICHIER_PDF)}>
                <IoMdDownload />
              </button>
            </span>
          </div>
        ))}
      </div>

      <Modal show={isModalOpen} onHide={handleCloseModal} centered>
        <div className="IWPA-popup-container">
          <button className="IWPA-close-btn" onClick={handleCloseModal}>
            ✖
          </button>
          <div>
            <h2>Détails du Bulletin de Salaire</h2>
            <table className="IWPA-contract-details-table">
              <tbody>
                <tr>
                  <th>ID du bulletin</th>
                  <td>01</td>
                </tr>
                <tr>
                  <th>Date d'émission</th>
                  <td>8 mars 2025</td>
                </tr>
                <tr>
                  <th>Titre du poste</th>
                  <td>Assistant d'entrepôt</td>
                </tr>
                <tr>
                  <th>Entreprise</th>
                  <td>XYZ Corporation</td>
                </tr>
                <tr>
                  <th>Statut</th>
                  <td className="IWPA-not-signed">En attente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default IWPayment;
