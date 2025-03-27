import React, { useState } from "react"; 
import "./CandidateDashboard.css"; // Using the same CSS as IWDashboard
import { FaSearch, FaSlidersH } from "react-icons/fa"; 
import analysis from "../assets/analysis.jpeg"; 
import CandidateNavBar from "./CandidateNavBar"; // Assuming CandidateNavBar is the separate nav bar for candidates
import { Modal } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css";

const CandidateDashboard = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="CD-dashboard">
      <CandidateNavBar /> {/* Using CandidateNavBar instead of IWNavBar */}
      <div className="CD-content">
        <div className="CD-left-content">
          <h1>
            Bienvenue, <span className="CD-highlight">Candidat !</span>
          </h1>
          <h2>Trouver un emploi qui vous convient ... </h2>

          <div className="CD-search-bar">
            <FaSearch className="CD-search-icon" />
            <input type="text" placeholder="Poste, Lieu ..." />
            <button className="CD-filter-btn" onClick={() => setShowPopup(true)}>
              <FaSlidersH />
            </button>
          </div>
        </div>

        <div className="CD-image-section">
          <img src={analysis} alt="Analyse" />
        </div>
      </div>

      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <div className="CD-popup-container">
          <button className="CD-close-btn" onClick={() => setShowPopup(false)}>
            ✖
          </button>
          <h2 className="CD-popup-title">Trouver un emploi</h2>

          <div className="CD-input-container">
            <div className="CD-input-box">
              <input type="text" placeholder="Lieu" />
              <FaSearch className="CD-input-icon" />
            </div>

            <div className="CD-input-box">
              <input type="text" placeholder="Poste" />
              <FaSlidersH className="CD-input-icon" />
            </div>
          </div>

          <button className="CD-search-btn">Rechercher</button>
        </div>
      </Modal>
    </div>
  );
};

export default CandidateDashboard;
