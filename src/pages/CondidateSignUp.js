import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
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
import { auth, db } from "../config/Firebase";
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

  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "age" ? parseInt(value, 10) || "" : value,
    }));
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate("/signup1");
  };

  const handleFileUpload = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      console.error("No file selected!");
      return;
    }

    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "interim");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dxpua2z4b/upload",
        uploadData
      );
      const downloadURL = response.data.secure_url;
      setFormData((prev) => ({ ...prev, cvUrl: downloadURL }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleCondidateSignup = async (e) => {
    e.preventDefault();
    setEmailError("");

    if (!formData.email.includes("@")) {
      setEmailError("Adresse email invalide");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      const role = "condidate";

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role,
        passwordHash: formData.password,
        cvUrl: formData.cvUrl,
        createdAt: serverTimestamp(),
      });

      const firestoreUserId = user.uid;

      await axios.post("http://localhost:8080/api/user/createUsers", {
        headers: { "Content-Type": "application/json" },
        firestoreUserId,
        name: formData.firstName + " " + formData.lastName,
        email: formData.email,
        role: role,
        age: formData.age,
        gender: formData.gender,
        location: formData.location,
        profession: formData.profession,
        academic_level: formData.academic_level,
        experience: formData.experience,
      });

      setSuccess(true);
      setTimeout(() => navigate("/signup1"), 2000);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

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
            <input
              type="text"
              name="firstName"
              placeholder="Entrez votre prénom"
              value={formData.firstName}
              onChange={handleChange}
              required
              data-testid="first-name-input" // Add data-testid
            />

            <label>Nom</label>
            <input
              type="text"
              name="lastName"
              placeholder="Entrez votre nom"
              value={formData.lastName}
              onChange={handleChange}
              required
              data-testid="last-name-input" // Add data-testid
            />

            <div className="age-gender">
              <div className="age">
                <label>Âge</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Âge"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  data-testid="age-input" // Add data-testid
                />
              </div>
              <div className="gender">
                <label>Sexe</label>
                <div className="input-icon">
                  <input
                    type="text"
                    name="gender"
                    placeholder="Sexe"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    data-testid="gender-input" // Add data-testid
                  />
                  <FaVenusMars className="icon" />
                </div>
              </div>
            </div>

            <label>Email</label>
            <div className="input-icon">
              <input
                type="email"
                name="email"
                placeholder="Entrez votre email"
                value={formData.email}
                onChange={handleChange}
                required
                data-testid="email-input" // Add data-testid
              />
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
                  data-testid="password-input" // Add data-testid
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="icon"
                    onClick={() => setShowPassword(false)}
                    data-testid="password-eye-slash" // Add data-testid
                  />
                ) : (
                  <FaEye
                    className="icon"
                    onClick={() => setShowPassword(true)}
                    data-testid="password-eye" // Add data-testid
                  />
                )}
              </div>
            </div>

            <div className="cv-location">
              <div className="cv">
                <label>Uploader le CV</label>
                <input
                  type="file"
                  required
                  onChange={handleFileUpload}
                  name="cv"
                  data-testid="cv-upload" // Add data-testid
                />
              </div>

              <div className="location">
                <label>Localisation</label>
                <div className="input-icon">
                  <input
                    type="text"
                    name="location"
                    placeholder="Entrez la localisation"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    data-testid="location-input" // Add data-testid
                  />
                  <FaMapMarkerAlt className="icon" />
                </div>
              </div>
            </div>

            <label>Profession</label>
            <select
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              required
              data-testid="profession-select" // Add data-testid
            >
              <option value="">Sélectionner une profession</option>
              <option value="Ingénieur logiciel">Ingénieur logiciel</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Ingénieur mécanique">Ingénieur mécanique</option>
              <option value="Spécialiste marketing">
                Spécialiste marketing
              </option>
            </select>

            <label>Niveau académique</label>
            <select
              name="academic_level"
              value={formData.academic_level}
              onChange={handleChange}
              required
              data-testid="academic-level-select" // Add data-testid
            >
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
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              data-testid="experience-select" // Add data-testid
            >
              <option value="">Sélectionner une expérience</option>
              <option value="Moins d'un an">Moins d'un an</option>
              <option value="Un à deux ans">Un à deux ans</option>
              <option value="Plus de 2 ans">Plus de 2 ans</option>
              <option value="Plus de 5 ans">Plus de 5 ans</option>
            </select>

            {emailError && (
              <p style={{ color: "red" }} data-testid="email-error">
                {emailError}
              </p>
            )}

            {success && (
              <p style={{ color: "green" }} data-testid="success-message">
                Registration successful!
              </p>
            )}

            <div className="buttons-container">
              <button
                className="back-btn"
                onClick={handleBackClick}
                data-testid="back-btn"
              >
                Retour
              </button>
              <button
                className="candidate-submit-btn"
                type="submit"
                data-testid="submit-btn"
              >
                Sign Up
              </button>
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
