import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import analysis from "../assets/analysis.jpeg";
import { Button } from "react-bootstrap";
import NavBar from "./NavBar";

const Signin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCandidateClick = () => {
    navigate("/CandidateSignIn"); 
  };

  const handleIWClick = () => {
    navigate("/IWSignIn"); 
  };

  const handleClientCompClick = () => {
    navigate("/ClientCompSignIn"); 
  };

  const handleSignClick = () => {
    navigate("/SignUp1"); 
  };

  return (
    <div className="signin-page">
      <NavBar /> 
      <div id="signin" className="signin-container">
        <h2>Se connecter</h2>
        <Button className="travailleur-btn" onClick={handleCandidateClick}>
          Comme un Candidat
        </Button>
        <Button className="travailleur-btn" onClick={handleIWClick}>
          Comme un collaborateur interimaire
        </Button>
        <Button className="travailleur-btn" onClick={handleClientCompClick}>
          Comme une compagnie cliente
        </Button>
        <p>
          Vous n'avez pas encore de compte ? 
          <span className="signin-link" onClick={handleSignClick}>Créer un compte</span>
        </p>
      </div>
      <div className="image-section">
        <img src={analysis} alt="Analysis" />
      </div>
    </div>
  );
};

export default Signin;
