import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./WorkerSignUp.css";
import {
  FaEnvelope,
  FaVenusMars,
  FaEye,
  FaEyeSlash,
  FaMapMarkerAlt,
} from "react-icons/fa";
import analysis from "../assets/analysis.jpeg";

const WorkerSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleBackClick = () => {
    navigate("/signup1");
  };

  return (
    <div className="worker-signup-page">
      <div className="worker-signup-container">
        <div className="worker-form-container">
          <h2>
            Créez votre <span>compte travailleur</span>
          </h2>
          <div className="divider"></div>

          <form>
            <label>Prénom</label>
            <input type="text" placeholder="Entrez votre prénom" />

            <label>Nom</label>
            <input type="text" placeholder="Entrez votre nom" />

            <div className="age-gender">
              <div className="age">
                <label>Âge</label>
                <input type="number" placeholder="Âge" />
              </div>
              <div className="gender">
                <label>Sexe</label>
                <div className="input-icon">
                  <input type="text" placeholder="Sexe" />
                  <FaVenusMars className="icon" />
                </div>
              </div>
            </div>

            <label>Email</label>
            <div className="input-icon">
              <input type="email" placeholder="Entrez votre email" />
              <FaEnvelope className="icon" />
            </div>

            <div className="password-container">
              <label>Mot de passe</label>
              <div className="input-icon">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez le mot de passe"
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="icon"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="icon"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>

              <label>Confirmer le mot de passe</label>
              <div className="input-icon">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmer le mot de passe"
                />
                {showConfirmPassword ? (
                  <FaEyeSlash
                    className="icon"
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="icon"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )}
              </div>
            </div>

            <div className="cv-location">
              <div className="cv">
                <label>Uploader le CV</label>
                <div className="input-icon">
                  <input type="file" />
                </div>
              </div>

              <div className="location">
                <label>Localisation</label>
                <div className="input-icon">
                  <input type="text" placeholder="Entrez la localisation" />
                  <FaMapMarkerAlt className="icon" />
                </div>
              </div>
            </div>

            <label>Profession</label>
            <select>
              <option>Ingénieur logiciel</option>
              <option>Data Scientist</option>
              <option>Ingénieur mécanique</option>
              <option>Spécialiste marketing</option>
            </select>

            <label>Compétences</label>
            <select>
              <option>Python</option>
              <option>Java</option>
              <option>React</option>
              <option>Gestion de projet</option>
            </select>

            <div className="buttons-container">
              <button className="back-btn" onClick={handleBackClick}>
                Retour
              </button>

              <button className="worker-submit-btn">S'inscrire</button>
            </div>
          </form>
        </div>
      </div>
      <div className="image-section">
        <img src={analysis} alt="Analyse" />
      </div>
    </div>
  );
};

export default WorkerSignUp;
