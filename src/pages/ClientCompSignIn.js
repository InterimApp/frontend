import React, { useState } from "react";
import "./ClientCompSignIn.css";
import { FaBuilding, FaFileInvoice } from "react-icons/fa";
import analysis from "../assets/analysis.jpeg";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar"; 

const ClientCompSignin = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/signup1");
  };

  const handleSignClick = () => {
    navigate("/clientcompDashboard");
  };

  return (
    <div className="clientComp-signin-page">
      <NavBar />
      <div className="clientComp-signin-container">
        <div className="clientComp-form-container">
          <h2>
            Sign in to your <span>account</span>
          </h2>
          <div className="divider"></div>

          <form>
            <label>Nom de la compagnie</label>
            <div className="input-icon">
              <input type="text" placeholder="Entrez le nom de la compagnie" />
              <FaBuilding className="icon" />
            </div>
            <label>Matricule fiscale</label>
            <div className="input-icon">
              <input type="text" placeholder="Entrez le matricule fiscale" />
              <FaFileInvoice className="icon" />
            </div>

            <div className="signin-buttons-container">
              <button className="signin-back-btn" onClick={handleBackClick}>
                Retour
              </button>

              <button className="signin-submit-btn" onClick={handleSignClick}>Sign In</button>
            </div>
          </form>
        </div>
      </div>
      <div className="image-section">
        <img src={analysis} alt="Analysis" />
      </div>
    </div>
  );
};

export default ClientCompSignin;
