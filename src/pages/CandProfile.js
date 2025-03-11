import React, { useState } from "react";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaMapMarkerAlt,
  FaTrash,
} from "react-icons/fa";
import "./Profile.css";
import CanNavBar from "./CandidateNavBar";

const CandProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "Iheb",
    lastName: "Abed",
    age: 21,
    gender: "Homme",
    email: "iheb.abed@example.com",
    password: "",
    confirmPassword: "",
    location: "Brasil",
    profession: "Data Scientist",
    skills: "Java",
    cv: null,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(URL.createObjectURL(file));
  };

  const handleProfileImageDelete = () => {
    setProfileImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated profile:", formData);
    alert("Profile Updated");
  };

  return (
    <div className="IWP-syrine">
      <CanNavBar />

      <div className="IWP-profile-container">
        <div className="IWP-profile-image-section">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="IWP-profile-image"
            />
          ) : (
            <div className="IWP-placeholder-image">Pas d'Image</div>
          )}
          <button>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </button>
          <h2 className="IWP-h2">
            {formData.firstName} {formData.lastName}
          </h2>
          <div className="IWP-role">
            <h>Candidat</h>
          </div>
        </div>

        {/* Right side: Profile Form */}
        <div className="IWP-profile-card">
          <h1>Modifie ton Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="IWP-input-container">
              <label>Prénom</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="IWP-input-container">
              <label>Nom</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="IWP-grid IWP-grid-cols-2">
              <div className="IWP-input-container">
                <label>Âge</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

              <div className="IWP-input-container">
                <label>Sexe</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Femme">Femme</option>
                  <option value="Homme">Homme</option>
                </select>
              </div>
            </div>

            <div className="IWP-input-container">
              <label>Email</label>
              <div className="IWP-input-icon">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <FaEnvelope className="IWP-icon" />
              </div>
            </div>

            <div className="IWP-input-container">
              <label>Mot de passe</label>
              <div className="IWP-input-icon">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="IWP-icon"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="IWP-icon"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>

            <div className="IWP-grid IWP-grid-cols-2">
              <div className="IWP-input-container">
                <label>CV</label>
                <input type="file" name="cv" onChange={handleChange} />
              </div>

              <div className="IWP-input-container">
                <label>Localisation</label>
                <div className="IWP-input-icon">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  <FaMapMarkerAlt className="IWP-icon" />
                </div>
              </div>
            </div>

            <div className="IWP-input-container">
              <label>Profession</label>
              <select
                name="profession"
                value={formData.profession}
                onChange={handleChange}
              >
                <option>Ingénieur logiciel</option>
                <option>Data Scientist</option>
                <option>Ingénieur mécanique</option>
                <option>Spécialiste marketing</option>
              </select>
            </div>

            <div className="IWP-input-container">
              <label>Compétences</label>
              <select
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              >
                <option>Python</option>
                <option>Java</option>
                <option>React</option>
                <option>Gestion de projet</option>
              </select>
            </div>
            <div className="IWP-between">
              <button className="IWP-submit-btn" type="submit">
                Enregistrer
              </button>
              <button className="IWP-delete-btn" type="submit">
                <FaTrash /> Supprimer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CandProfile;
