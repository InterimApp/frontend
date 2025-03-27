import React, { useState } from "react";
import "./AdminSignIn.css";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import analysis from "../assets/manpower-logo.png";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar"; 

const AdminSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const handleSignClick = () => {
    navigate("/admindashboard"); 
  };

  return (
    <div className="admin-signin-page">
      <NavBar />
      <div className="admin-signin-container">
        <div className="admin-form-container">
          <h2>
           Admin Sign In <span>account</span>
          </h2>
          <div className="divider"></div>

          <form>
            <label>Email</label>
            <div className="input-icon">
              <input type="email" placeholder="Enter your email" />
              <FaEnvelope className="icon" />
            </div>
            <label>Password</label>
            <div className="input-icon">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
                Back
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

export default AdminSignIn;
