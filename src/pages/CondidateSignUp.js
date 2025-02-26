import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./WorkerSignUp.css";
import { 
  FaEnvelope, FaVenusMars, FaEye, FaEyeSlash, FaMapMarkerAlt 
} from "react-icons/fa";
import analysis from "../assets/analysis.jpeg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Firebase"; 
import { db } from "../config/Firebase"; 
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { storage } from "../config/Firebase"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 

const WorkerSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cvUrl, setCvUrl] = useState(""); // Store CV URL
  const navigate = useNavigate(); 

  const handleBackClick = (e) => {
    e.preventDefault(); // Prevent form submission
    navigate("/signup1");
  };

  const handleFileUpload = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      console.error("No file selected!");
      return;
    }

    const file = event.target.files[0]; // Get the selected file
    const storageRef = ref(storage, `uploads/${file.name}`); // Define storage path

    try {
      const snapshot = await uploadBytes(storageRef, file); // Upload file
      const downloadURL = await getDownloadURL(snapshot.ref); // Get URL
      console.log("File uploaded successfully! URL:", downloadURL);
      setCvUrl(downloadURL); // Store CV URL in state
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleCondidateSignup = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const role = "condidate"; // Define user role
      
      // Save user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role,
        passwordHash: password, // this is only for testing the passwords are securely stored and hashed in firestore
        cvUrl: cvUrl, // Store CV download URL in Firestore
        createdAt: serverTimestamp(), // Store Firestore timestamp
      });
  
      console.log("User created successfully, CV uploaded at:", cvUrl);
      
      // Store `cvUrl` in a variable for MySQL later
      const cvPathForMySQL = cvUrl;

      navigate("/signup1"); // Redirect after successful signup
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.error("This email is already registered. Try logging in instead.");
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="worker-signup-page">
      <div className="worker-signup-container">
        <div className="worker-form-container">
          <h2>Créez votre <span>compte travailleur</span></h2>
          <div className="divider"></div>

          <form onSubmit={handleCondidateSignup}>
            <label>Prénom</label>
            <input type="text" placeholder="Entrez votre prénom" required />

            <label>Nom</label>
            <input type="text" placeholder="Entrez votre nom" required />

            <div className="age-gender">
              <div className="age">
                <label>Âge</label>
                <input type="number" placeholder="Âge" required />
              </div>
              <div className="gender">
                <label>Sexe</label>
                <div className="input-icon">
                  <input type="text" placeholder="Sexe" required />
                  <FaVenusMars className="icon" />
                </div>
              </div>
            </div>

            <label>Email</label>
            <div className="input-icon">
              <input 
                type="email" 
                placeholder="Entrez votre email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <FaEnvelope className="icon" />
            </div>

            <div className="password-container">
              <label>Mot de passe</label>
              <div className="input-icon">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez le mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {showPassword ? (
                  <FaEyeSlash className="icon" onClick={() => setShowPassword(false)} />
                ) : (
                  <FaEye className="icon" onClick={() => setShowPassword(true)} />
                )}
              </div>

              <label>Confirmer le mot de passe</label>
              <div className="input-icon">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmer le mot de passe"
                  required
                />
                {showConfirmPassword ? (
                  <FaEyeSlash className="icon" onClick={() => setShowConfirmPassword(false)} />
                ) : (
                  <FaEye className="icon" onClick={() => setShowConfirmPassword(true)} />
                )}
              </div>
            </div>

            <div className="cv-location">
              <div className="cv">
                <label>Uploader le CV</label>
                <input type="file" required onChange={handleFileUpload}/>
              </div>

              <div className="location">
                <label>Localisation</label>
                <div className="input-icon">
                  <input type="text" placeholder="Entrez la localisation" required />
                  <FaMapMarkerAlt className="icon" />
                </div>
              </div>
            </div>

            <label>Profession</label>
            <select required>
              <option>Ingénieur logiciel</option>
              <option>Data Scientist</option>
              <option>Ingénieur mécanique</option>
              <option>Spécialiste marketing</option>
            </select>

            <label>Niveau académique</label>
            <select required>
              <option>Licence (Bac+3)</option>
              <option>Master (Bac+5)</option>
              <option>Doctorat</option>
              <option>Post-doctorat</option>
              <option>Étudiant en licence</option>
              <option>Étudiant en master</option>
              <option>Enseignant-chercheur</option>
            </select>

            <label>Expérience</label>
            <select required>
              <option>Moin d'un an</option>
              <option> Un à deux ans</option>
              <option>Plus de 2 ans</option>
              <option>Plus de 5 ans</option>
            </select>

            <div className="buttons-container">
              <button className="back-btn" onClick={handleBackClick}>Retour</button>
              <button className="company-submit-btn" type="submit">Sign Up</button>
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
