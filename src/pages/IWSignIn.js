import React, { useState } from "react";
import "./IWSignIn.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import analysis from "../assets/analysis.jpeg";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar"; 

const IWSignin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/signup1");
  };

  const handleSignClick = () => {
    navigate("/IWDashboard");
  };

  return (
    <div className="iw-signin-page">
      <NavBar /> 
      <div className="iw-signin-container">
        <div className="iw-form-container">
          <h2>
            Sign in to your <span>account</span>
          </h2>
          <div className="divider"></div>

          <form>
            <label>Code Interimaire</label>
            <div className="input-icon">
              <input type="text" placeholder="Entrer votre code interimaire" />
            </div>
            <label>Mot de Passe</label>
            <div className="input-icon">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Entrer votre mot de passe"
              />
              {showPassword ? (
                <FaEyeSlash
                  className="icon"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye className="icon" onClick={() => setShowPassword(true)} />
              )}
            </div>

            <div className="signin-buttons-container">
              <button className="signin-back-btn" onClick={handleBackClick}>
                Retour
              </button>

              <button className="signin-submit-btn" onClick={handleSignClick}>Login</button>
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

export default IWSignin;