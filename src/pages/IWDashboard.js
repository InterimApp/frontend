import React, { useState } from "react";
import "./IWDashboard.css";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import analysis from "../assets/analysis.jpeg";
import NavBar from "./IWNavBar";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const IWDashboard = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="IWD-dashboard">
      <NavBar />
      <div className="IWD-content">
        <div className="IWD-left-content">
          <h1>
            Bienvenue, <span className="IWD-highlight">Iheb pas Syrine !</span>
          </h1>
          <h2>Trouver un emploi qui vous convient ... </h2>

          <div className="IWD-search-bar">
            <FaSearch className="IWD-search-icon" />
            <input type="text" placeholder="Poste, Lieu ..." />
            <button className="IWD-filter-btn" onClick={() => setShowPopup(true)}>
              <FaSlidersH />
            </button>
          </div>
        </div>

        <div className="IWD-image-section">
          <img src={analysis} alt="Analyse" />
        </div>
      </div>

      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <div className="IWD-popup-container">
          <button className="IWD-close-btn" onClick={() => setShowPopup(false)}>
            ✖
          </button>
          <h2 className="IWD-popup-title">Trouver un emploi</h2>

          <div className="IWD-input-container">
            <div className="IWD-input-box">
              <input type="text" placeholder="Lieu" />
              <FaSearch className="IWD-input-icon" />
            </div>

            <div className="IWD-input-box">
              <input type="text" placeholder="Poste" />
              <FaSlidersH className="IWD-input-icon" />
            </div>
          </div>

          <button className="IWD-search-btn">Rechercher</button>
        </div>
      </Modal>
    </div>
  );
};

export default IWDashboard;
