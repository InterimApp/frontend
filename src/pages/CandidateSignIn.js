import React, { useState } from "react";
import "./CandidateSignIn.css";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import analysis from "../assets/analysis.jpeg";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar"; 
import { auth } from "../config/Firebase"; // Import Firebase auth
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase sign-in method

const CandidateSignin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
 
  const handleBackClick = () => {
    navigate("/signup1");
  };

  const handleSignUpClick = () => {
    navigate("/signup1");
  };

  const handleSignInClick = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // Sign in using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User signed in successfully:", user.email);
      navigate("/candidatedashboard"); // Redirect to dashboard upon successful sign-in
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <div className="candidate-signin-page">
      <NavBar />
      <div className="candidate-signin-container">
        <div className="candidate-form-container">
          <h2>
            Sign in to your <span>account</span>
          </h2>
          <div className="divider"></div>

          <form>
            <label>Email</label>
            <div className="input-icon">
              <input
                type="email"
                placeholder="Entrer votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
              />
              <FaEnvelope className="icon" />
            </div>
            <label>Mot de Passe</label>
            <div className="input-icon">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Entrer votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
              />
              {showPassword ? (
                <FaEyeSlash className="icon" onClick={() => setShowPassword(false)} />
              ) : (
                <FaEye className="icon" onClick={() => setShowPassword(true)} />
              )}
            </div>

            <div className="signin-buttons-container">
              <button className="signin-back-btn" onClick={handleBackClick}>
                Retour
              </button>

              <button className="signin-submit-btn" onClick={handleSignInClick}>
                Login
              </button>
            </div>

            <p>
              Vous n'avez pas déjà un compte?{" "}
              <span className="signin-link" onClick={handleSignUpClick}>
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
