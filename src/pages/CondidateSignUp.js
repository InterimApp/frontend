import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cloudinary } from '@cloudinary/url-gen';
import "./CondidateSignUp.css";
import {
  FaEnvelope,
  FaVenusMars,
  FaEye,
  FaEyeSlash,
  FaMapMarkerAlt,
} from "react-icons/fa";
import analysis from "../assets/analysis.jpeg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Firebase";
import { db } from "../config/Firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import NavBar from "./NavBar";
import axios from "axios";

const CondidateSignUp = () => {
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    location: "",
    profession: "",
    academic_level: "",
    experience: "",
    cvUrl: "",
  });
  
  const navigate = useNavigate(); 
  //const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  
  const handleChange = (e) => {
    const { name: fieldName, value } = e.target;  // Extract fieldName 

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      [fieldName]: fieldName === "age" ? parseInt(value, 10) || "" : value, 
    }));
  };

  
  const handleBackClick = (e) => {
    e.preventDefault(); 
    navigate("/candidatedashboard");
  };


  //file upload
  const handleFileUpload = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      console.error("No file selected!");
      return;
    }
  
    const file = event.target.files[0]; // Get the selected file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "interim"); // Replace with your Cloudinary preset
  
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dxpua2z4b/upload", // Replace 'your_cloud_name' with your Cloudinary cloud name
        formData
      );
  
      const downloadURL = response.data.secure_url; // Get the uploaded file URL from Cloudinary
      console.log("CV uploaded successfully! URL:", downloadURL);
      setFormData((prev) => ({ ...prev, cvUrl: downloadURL }));
  
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  

  const handleCondidateSignup = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      const role = "condidate"; // Define user role

      // Save user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role,
        passwordHash: formData.password, // this is only for testing the passwords are securely stored and hashed in firestore
        cvUrl: formData.cvUrl, // Store CV download URL in Firestore
        createdAt: serverTimestamp(), // Store Firestore timestamp
      });
  
      console.log("User created successfully, CV uploaded at:", formData.cvUrl);
      
      // Store cvUrl in a variable for MySQL later
      const cvPathForMySQL = formData.cvUrl;


       // Send data to  backend using Axios
       await axios.post("http://localhost:8080/api/user/createUsers", {
        headers: { "Content-Type": "application/json" },
        name: formData.firstName + " " + formData.lastName,
        email: formData.email,
        role: role,
        age: formData.age,
        gender: formData.gender,
        location: formData.location,
        profession: formData.profession,
        academic_level: formData.academic_level,
        experience: formData.experience,
        //cvUrl: formData.cvUrl,
      });

      console.log("Data sent to backend successfully!");
      navigate("/signup1");
    } catch (error) {
      console.error("Error:", error.message);
    }
    }
  
  return (
    <div className="candidate-signup-page">
      <NavBar />
      <div className="candidate-signup-container">
        <div className="candidate-form-container">
          <h2>
            Créez votre <span>compte travailleur</span>
          </h2>
          <div className="divider"></div>

          <form onSubmit={handleCondidateSignup}>
  <label>Prénom</label>
  <input type="text" name="firstName" placeholder="Entrez votre prénom" value={formData.firstName} onChange={handleChange} required />

  <label>Nom</label>
  <input type="text" name="lastName" placeholder="Entrez votre nom" value={formData.lastName} onChange={handleChange} required />

  <div className="age-gender">
    <div className="age">
      <label>Âge</label>
      <input type="number" name="age" placeholder="Âge" value={formData.age} onChange={handleChange} required />
    </div>
    <div className="gender">
      <label>Sexe</label>
      <div className="input-icon">
        <input type="text" name="gender" placeholder="Sexe" value={formData.gender} onChange={handleChange} required />
        <FaVenusMars className="icon" />
      </div>
    </div>
  </div>

  <label>Email</label>
  <div className="input-icon">
    <input type="email" name="email" placeholder="Entrez votre email" value={formData.email} onChange={handleChange} required />
    <FaEnvelope className="icon" />
  </div>

  <div className="password-container">
    <label>Mot de passe</label>
    <div className="input-icon">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Entrez le mot de passe"
        value={formData.password}
        onChange={handleChange} 
        required
      />
      {showPassword ? (
        <FaEyeSlash className="icon" onClick={() => setShowPassword(false)} />
      ) : (
        <FaEye className="icon" onClick={() => setShowPassword(true)} />
      )}
    </div>
  </div>


            <div className="cv-location">
              <div className="cv">
                <label>Uploader le CV</label>
                <input type="file" required onChange={handleFileUpload} name="cv" />
              </div>

              <div className="location">
                <label>Localisation</label>
                <div className="input-icon">
                  <input
                    type="text"
                    placeholder="Entrez la localisation"
                    required
                  />
                  <FaMapMarkerAlt className="icon" />
                </div>
              </div>
            </div>


  <label>Profession</label>
  <select name="profession" value={formData.profession} onChange={handleChange} required>
    <option value="">Sélectionner une profession</option>
    <option value="Ingénieur logiciel">Ingénieur logiciel</option>
    <option value="Data Scientist">Data Scientist</option>
    <option value="Ingénieur mécanique">Ingénieur mécanique</option>
    <option value="Spécialiste marketing">Spécialiste marketing</option>
  </select>

  <label>Niveau académique</label>
  <select name="academic_level" value={formData.academic_level} onChange={handleChange} required>
    <option value="">Sélectionner un niveau académique</option>
    <option value="Licence (Bac+3)">Licence (Bac+3)</option>
    <option value="Master (Bac+5)">Master (Bac+5)</option>
    <option value="Doctorat">Doctorat</option>
    <option value="Post-doctorat">Post-doctorat</option>
    <option value="Étudiant en licence">Étudiant en licence</option>
    <option value="Étudiant en master">Étudiant en master</option>
    <option value="Enseignant-chercheur">Enseignant-chercheur</option>
  </select>

  <label>Expérience</label>
  <select name="experience" value={formData.experience} onChange={handleChange} required>
    <option value="">Sélectionner une expérience</option>
    <option value="Moins d'un an">Moins d'un an</option>
    <option value="Un à deux ans">Un à deux ans</option>
    <option value="Plus de 2 ans">Plus de 2 ans</option>
    <option value="Plus de 5 ans">Plus de 5 ans</option>
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

export default CondidateSignUp;
