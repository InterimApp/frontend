<<<<<<< HEAD
import React, { useState } from 'react';
import {
  FaEnvelope,
  FaVenusMars,
=======
import React, { useState } from "react";
import {
  FaEnvelope,
>>>>>>> origin/iheb
  FaEye,
  FaEyeSlash,
  FaMapMarkerAlt,
  FaTrash,
<<<<<<< HEAD
} from 'react-icons/fa';
import './Profile.css'; // Import the CSS file
import { MdAddAPhoto } from "react-icons/md";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: 'Syrine',
    lastName: 'Eladeb',
    age: 24,
    gender: 'Femme',
    email: 'syrine.eladeb@medtech.tn',
    password: '',
    confirmPassword: '',
    location: 'Tunisie',
    profession: 'Ingénieur logiciel',
    skills: 'Python',
=======
} from "react-icons/fa";
import "./Profile.css";
import IWNavBar from "./IWNavBar";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "Syrine",
    lastName: "Eladeb",
    age: 24,
    gender: "Femme",
    email: "syrine.eladeb@medtech.tn",
    password: "",
    confirmPassword: "",
    location: "Tunisie",
    profession: "Ingénieur logiciel",
    skills: "Python",
>>>>>>> origin/iheb
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
<<<<<<< HEAD
    console.log('Updated profile:', formData);
    alert('Profile Updated');
  };

  const handleDeleteProfile = () => {
    alert('Profile Deleted');
    // Implement the deletion logic
  };

  return (
    <div className="syrine">
      <div className="profile-container">
        {/* Left side: Profile Image Section */}
        <div className="profile-image-section">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profile-image" />
          ) : (
            <div className="placeholder-image">No Image</div>
          )}
          <div className="profile-image-actions">
          <label htmlFor="upload-button" className="upload-btn">
            <MdAddAPhoto className="upload-icon" />
            <input
              id="upload-button"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              style={{ display: 'none' }}
            />
          </label>

            {profileImage && (
              <button className="delete-img-btn" onClick={handleProfileImageDelete}>
                <FaTrash /> Supprimer Image
              </button>
            )}
          </div>
          <h2>{formData.firstName} {formData.lastName}</h2>
          <div className='role'><h3>Interim Worker</h3></div>
        </div>

        {/* Right side: Profile Form */}
        <div className="profile-card">
          <h1>Edit Your Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
=======
    console.log("Profil mis à jour :", formData);
    alert("Profil mis à jour");
  };

  return (
    <div className="IWP-syrine">
      <IWNavBar />

      <div className="IWP-profile-container">
        <div className="IWP-profile-image-section">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profil"
              className="IWP-profile-image"
            />
          ) : (
            <div className="IWP-placeholder-image">Pas d'image</div>
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
            <h>Collaborateur intérimaire</h>
          </div>
        </div>

        {/* Côté droit : Formulaire de profil */}
        <div className="IWP-profile-card">
          <h1>Modifier votre profil</h1>
          <form onSubmit={handleSubmit}>
            <div className="IWP-input-container">
>>>>>>> origin/iheb
              <label>Prénom</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

<<<<<<< HEAD
            <div className="input-container">
=======
            <div className="IWP-input-container">
>>>>>>> origin/iheb
              <label>Nom</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

<<<<<<< HEAD
            <div className="grid grid-cols-2 gap-4">
              <div className="input-container">
=======
            <div className="IWP-grid IWP-grid-cols-2">
              <div className="IWP-input-container">
>>>>>>> origin/iheb
                <label>Âge</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

<<<<<<< HEAD
              <div className="input-container">
=======
              <div className="IWP-input-container">
>>>>>>> origin/iheb
                <label>Sexe</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
<<<<<<< HEAD
                  <option>Femme</option>
                  <option>Homme</option>
=======
                  {" "}
                  <option value="Femme">Femme</option>{" "}
                  <option value="Homme">Homme</option>{" "}
>>>>>>> origin/iheb
                </select>
              </div>
            </div>

<<<<<<< HEAD
            <div className="input-container">
              <label>Email</label>
              <div className="input-icon">
=======
            <div className="IWP-input-container">
              <label>Email</label>
              <div className="IWP-input-icon">
>>>>>>> origin/iheb
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
<<<<<<< HEAD
                <FaEnvelope className="icon" />
              </div>
            </div>

            <div className="input-container">
              <label>Mot de passe</label>
              <div className="input-icon">
                <input
                  type={showPassword ? 'text' : 'password'}
=======
                <FaEnvelope className="IWP-icon" />
              </div>
            </div>

            <div className="IWP-input-container">
              <label>Mot de passe</label>
              <div className="IWP-input-icon">
                <input
                  type={showPassword ? "text" : "password"}
>>>>>>> origin/iheb
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <FaEyeSlash
<<<<<<< HEAD
                    className="icon"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye className="icon" onClick={() => setShowPassword(true)} />
=======
                    className="IWP-icon"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="IWP-icon"
                    onClick={() => setShowPassword(true)}
                  />
>>>>>>> origin/iheb
                )}
              </div>
            </div>

<<<<<<< HEAD
            <div className="grid grid-cols-2 gap-4">
              <div className="input-container">
                <label>CV</label>
                <input
                  type="file"
                  name="cv"
                  onChange={handleChange}
                />
              </div>

              <div className="input-container">
                <label>Localisation</label>
                <div className="input-icon">
=======
            <div className="IWP-grid IWP-grid-cols-2">
              <div className="IWP-input-container">
                <label>CV</label>
                <input type="file" name="cv" onChange={handleChange} />
              </div>

              <div className="IWP-input-container">
                <label>Localisation</label>
                <div className="IWP-input-icon">
>>>>>>> origin/iheb
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
<<<<<<< HEAD
                  <FaMapMarkerAlt className="icon" />
=======
                  <FaMapMarkerAlt className="IWP-icon" />
>>>>>>> origin/iheb
                </div>
              </div>
            </div>

<<<<<<< HEAD
            <div className="input-container">
=======
            <div className="IWP-input-container">
>>>>>>> origin/iheb
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

<<<<<<< HEAD
            <div className="input-container">
=======
            <div className="IWP-input-container">
>>>>>>> origin/iheb
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
<<<<<<< HEAD

            <div className='between'>
              <button className="submit-btn" type="submit">Enregistrer</button>
              <button className="delete-btn" type="button" onClick={handleDeleteProfile}>
=======
            <div className="IWP-between">
              <button className="IWP-submit-btn" type="submit">
                Enregistrer
              </button>
              <button className="IWP-delete-btn" type="submit">
>>>>>>> origin/iheb
                <FaTrash /> Supprimer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
