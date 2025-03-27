
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp1.css";
import analysis from "../assets/analysis.jpeg";
import { Button } from "react-bootstrap";
import NavBar from "./NavBar";

const SignUp1 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTravailleurClick = () => {
    navigate("/CondidateSignUp"); 
  };

  const handleSignClick = () => {
    navigate("/Signin"); 
  };

  return (
    <>
      <NavBar />
      <div className="signup-page">
        <div id="signup1"  className="signup-container">
          <h2>S'enregistrer</h2>
          <Button className="travailleur-btn" onClick={handleTravailleurClick}>Candidat</Button>
          <p>
            Vous avez déja un compte? <span className="signin-link" onClick={handleSignClick}>Se connecter</span>
          </p>
        </div>
        <div className="image-section">
          <img src={analysis} alt="Analysis" />
        </div>
      </div>
    </>
  );
};

export default SignUp1;