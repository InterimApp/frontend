import React, { useState } from "react";
import "./CompanySignUp.css";
import { FaEnvelope, FaPhone, FaVenusMars, FaEye, FaEyeSlash, FaFileUpload, FaMapMarkerAlt } from "react-icons/fa";
import analysis from "../assets/analysis.jpeg";
import NavBar from "./NavBar";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="signup-page">
      <div className="signup-container">
      <NavBar />
      <div className="form-container">
        <h2>Creez votre <span>compte d'entreprise</span></h2>
        <div className="divider"></div>

        <form>
          <label>Nom de l'entreprise</label>
          <input type="text" placeholder="Entrer le nom de l'entreprise" />

          <label>Domaine de travail</label>
          <input type="text" placeholder="Entrer le domaine d'activité" />

            <div className="age">
              <label>Taille de l'entreprise</label>
              <input type="number" placeholder="Nombre d'employés" />
            </div>
            <div className="gender">
              <label>Localisation</label>
              <div className="input-icon">
                <input type="text" placeholder="Localisation" />
              </div>
            </div>

          <label>Email</label>
          <div className="input-icon">
            <input type="email" placeholder="Enter your email" />
            <FaEnvelope className="icon" />
          </div>

          <div className="password-container">
            <label>Mot de passe</label>
            <div className="input-icon">
              <input type={showPassword ? "text" : "password"} placeholder="Entrer le mot de passe" />
              {showPassword ? (
                <FaEyeSlash className="icon" onClick={() => setShowPassword(false)} />
              ) : (
                <FaEye className="icon" onClick={() => setShowPassword(true)} />
              )}
            </div>

            <label>Confirmer le mot de passe</label>
            <div className="input-icon">
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirmer le mot de passe" />
              {showConfirmPassword ? (
                <FaEyeSlash className="icon" onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <FaEye className="icon" onClick={() => setShowConfirmPassword(true)} />
              )}
            </div>
          </div>

            <div className="cv">
              <label>Logo</label>
              <div className="input-icon">
                <input type="file" />
              </div>
            </div>

            <div className="location">
              <label>E-mail (Compliance officer)</label>
              <div className="input-icon">
                <input type="text" placeholder="E-mail" />
              </div>
            </div>

          <div>

          </div>
          <button className="submit-btn">Sign Up</button>
        </form>
      </div>
</div>
       <div className="image-container">
              <img src={analysis} alt="Analysis" />
            </div>
      <div/>
    </div>
  );
};

export default SignUp;
