import React, { useState } from "react";
import "./ClientCompSignIn.css";
import { FaBuilding, FaFileInvoice } from "react-icons/fa";
import analysis from "../assets/analysis.jpeg";
import { useNavigate } from "react-router-dom";
// import { db } from "../config/Firebase"; // Import Firestore
// import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore methods to query user data
import NavBar from "./NavBar";
// import { db } from "../config/Firebase"; // Import Firestore

const ClientCompSignin = () => {
  const [companyName, setCompanyName] = useState(""); // State for company name
  const [matriculeFiscale, setMatriculeFiscale] = useState(""); // State for matricule fiscale
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/signup1");
  };

  const handleSignInClick = async (e) => {
    e.preventDefault(); // Prevent page reload
    setErrorMessage(""); // Clear any previous error messages

    // Basic form validation
    if (!companyName || !matriculeFiscale) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    // 🔓 Bypass Firestore logic and go directly to dashboard
    console.log("Bypassing Firestore check. Navigating to dashboard...");
    navigate("/CompanyDashboard");

    // 🔒 Original Firestore authentication logic (commented out)
    /*
    try {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("role", "==", "client_company"),
        where("matriculeFiscale", "==", matriculeFiscale)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrorMessage("No company found with this matricule fiscale.");
        return;
      }

      let companyFound = false;
      querySnapshot.forEach((doc) => {
        const companyData = doc.data();
        if (companyData.companyName.toLowerCase() === companyName.toLowerCase()) {
          companyFound = true;
          console.log("Company signed in successfully:", companyName);
          navigate("/CompanyDashboard");
        }
      });

      if (!companyFound) {
        setErrorMessage("Company name does not match the matricule fiscale.");
      }
    } catch (error) {
      setErrorMessage("Error signing in: " + error.message);
      console.error("Error signing in:", error.message);
    }
    */
  };

  return (
    <div className="clientComp-signin-page">
      <NavBar />
      <div className="clientComp-signin-container">
        <div className="clientComp-form-container">
          <h2>
            Sign in to your <span>account</span>
          </h2>
          <div className="divider"></div>

          <form>
            <label>Nom de la compagnie</label>
            <div className="input-icon">
              <input
                type="text"
                placeholder="Entrez le nom de la compagnie"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)} // Update company name state
              />
              <FaBuilding className="icon" />
            </div>
            <label>Matricule fiscale</label>
            <div className="input-icon">
              <input
                type="text"
                placeholder="Entrez le matricule fiscale"
                value={matriculeFiscale}
                onChange={(e) => setMatriculeFiscale(e.target.value)} // Update matricule fiscale state
              />
              <FaFileInvoice className="icon" />
            </div>

            {/* Display error message if there's one */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="signin-buttons-container">
              <button className="signin-back-btn" onClick={handleBackClick}>
                Retour
              </button>

              <button
                className="signin-submit-btn"
                onClick={handleSignInClick} // Handle sign-in logic
              >
                Sign In
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

export default ClientCompSignin;
