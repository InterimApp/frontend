import React, { useState } from "react";
import "./IWSignIn.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import analysis from "../assets/analysis.jpeg";
import { useNavigate } from "react-router-dom";
import { db } from "../config/Firebase"; // Import Firestore
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore methods to query user data
import NavBar from "./NavBar";

const IWSignin = () => {
  const [codeInterimaire, setCodeInterimaire] = useState(""); // State for code_interimaire
  const [password, setPassword] = useState(""); // State for password
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/signup1");
  };

  const handleSignInClick = async (e) => {
    e.preventDefault(); // Prevent page reload
    setErrorMessage(""); // Clear any previous error messages

    // Basic form validation
    if (!codeInterimaire || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    try {
      // Query Firestore to find the user by code_interimaire
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("code_interimaire", "==", codeInterimaire)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrorMessage("No user found with this code.");
        return;
      }

      // Get the first document that matches the code_interimaire (assuming code is unique)
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      // Check if the password matches (assuming password is stored as plain text)
      if (userData.passwordHash === password) {
        // Check if the user has the role 'interim_collaborator'
        if (userData.role === "interim_collaborator") {
          console.log(
            "Interim worker signed in successfully:",
            codeInterimaire
          );
          navigate("/IWDashboard"); // Redirect to the IW dashboard upon successful sign-in
        } else {
          setErrorMessage(
            "You are not authorized to sign in as an interim worker."
          );
          console.log("Unauthorized access attempt");
        }
      } else {
        setErrorMessage("Incorrect password.");
      }
    } catch (error) {
      setErrorMessage("Error signing in: " + error.message);
      console.error("Error signing in:", error.message);
    }
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
              <input
                type="text"
                placeholder="Entrer votre code interimaire"
                value={codeInterimaire}
                onChange={(e) => setCodeInterimaire(e.target.value)} // Update code_interimaire state
              />
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
                <FaEyeSlash
                  className="icon"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye className="icon" onClick={() => setShowPassword(true)} />
              )}
            </div>

            {/* Display error message if there's one */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="signin-buttons-container">
              <button className="signin-back-btn" onClick={handleBackClick}>
                Retour
              </button>

              <button className="signin-submit-btn" onClick={handleSignInClick}>
                Login
              </button>
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
