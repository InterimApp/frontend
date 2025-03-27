import React, { useState } from "react";
import "./CCDashboard.css";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import NavBar from "./CCNavBar";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CCDashboard = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="CCD-dashboard">
      <NavBar />
      <div className="CCD-content">
        <div className="CCD-left-content">
          <h1>
            Bienvenue, <span className="CCD-highlight">Company X</span>
          </h1>
          <h2>
            Gérez votre main-d'œuvre et vos offres d'emploi en toute simplicité
          </h2>

          <div className="CCD-search-bar">
            <FaSearch className="CCD-search-icon" />
            <input
              type="text"
              placeholder="Utilisateur, intitulé de poste..."
            />
            <button
              className="CCD-filter-btn"
              onClick={() => setShowPopup(true)}
            >
              <FaSlidersH />
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="CCD-stats-container">
        <div className="CCD-stat-box">
          <div className="CCD-stat-header red-gradient">Nº de Collaborateur</div>
          <div className="CCD-stat-value">120</div>
        </div>
        <div className="CCD-stat-box">
          <div className="CCD-stat-header orange-gradient">
            Contrats actifs
          </div>
          <div className="CCD-stat-value">50</div>
        </div>
        <div className="CCD-stat-box">
          <div className="CCD-stat-header red-gradient">Offre d'emploi</div>
          <div className="CCD-stat-value">12</div>
        </div>
      </div>

      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <div className="CCD-popup-container">
          <button className="CCD-close-btn" onClick={() => setShowPopup(false)}>
            ✖
          </button>
          <h2 className="CCD-popup-title">Trouver un emploi</h2>

          <div className="CCD-input-container">
            <div className="CCD-input-box">
              <input type="text" placeholder="Lieu" />
              <FaSearch className="CCD-input-icon" />
            </div>

            <div className="CCD-input-box">
              <input type="text" placeholder="Poste" />
              <FaSlidersH className="CCD-input-icon" />
            </div>
          </div>

          <button className="CCD-search-btn">Rechercher</button>
        </div>
      </Modal>
    </div>
  );
};

export default CCDashboard;
