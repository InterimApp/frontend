import React, { useState } from "react";
import "./CandidateSignIn.css";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import analysis from "../assets/analysis.jpeg";
import { useNavigate } from "react-router-dom";

const CandidateSignin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/signup1");
  };

  const handleSignClick = () => {
    navigate("/signup1"); // Navigate to the sign-up page
  };

  return (
    <div className="candidate-signin-page">
      <div className="candidate-signin-container">
        <div className="candidate-form-container">
          <h2>
            Sign in to your <span>account</span>
          </h2>
          <div className="divider"></div>

          <form>
            <label>Email</label>
            <div className="input-icon">
              <input type="email" placeholder="Entrer votre email" />
              <FaEnvelope className="icon" />
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

              <button className="signin-submit-btn">Login</button>
            </div>

            <p>
              Vous n'avez pas déjà un compte?{" "}
              <span className="signin-link" onClick={handleSignClick}>
                Crée un compte
              </span>
            </p>
            
          </form>
        </div>
      </div>
      <div className="image-section">
        <img src={analysis} alt="Analysis" />
      </div>
    </div>
  );
};

export default CandidateSignin;
