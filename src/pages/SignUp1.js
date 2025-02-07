import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp1.css";
import NavBar from "./NavBar";
import analysis from "../assets/analysis.jpeg";
import { Container, Row, Col, Button } from "react-bootstrap";

const SignUp = () => {
  const navigate = useNavigate();

  const handleTravailleurClick = () => {
    navigate("/WorkerSignUp"); 
  };

  const handleCompanyClick = () => {
    navigate("/CompanySignUp"); 
  };
  

  return (
    <div className="signup-page">
      <div className="signup-container">
      <NavBar />
        <h2>S'enregistrer</h2>
        <Button className="travailleur-btn" onClick={handleTravailleurClick}>Travailleur</Button>
        <Button className="Company-btn" onClick={handleCompanyClick}>Companie</Button>
        <p>
          Vous avez déja un compte? <span className="signin-link" onClick={() => navigate("/signin")}>Se connecter</span>
        </p>
      </div>
      <div className="image-container">
        <img src={analysis} alt="Analysis" />
      </div>
    </div>
  );
};

export default SignUp;
