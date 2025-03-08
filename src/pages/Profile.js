import React, { useState } from 'react';
import {
  FaEnvelope,
  FaVenusMars,
  FaEye,
  FaEyeSlash,
  FaMapMarkerAlt,
  FaTrash,
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
              <label>Prénom</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="input-container">
              <label>Nom</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="input-container">
                <label>Âge</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

              <div className="input-container">
                <label>Sexe</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option>Femme</option>
                  <option>Homme</option>
                </select>
              </div>
            </div>

            <div className="input-container">
              <label>Email</label>
              <div className="input-icon">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <FaEnvelope className="icon" />
              </div>
            </div>

            <div className="input-container">
              <label>Mot de passe</label>
              <div className="input-icon">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
            </div>

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
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  <FaMapMarkerAlt className="icon" />
                </div>
              </div>
            </div>

            <div className="input-container">
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

            <div className="input-container">
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

            <div className='between'>
              <button className="submit-btn" type="submit">Enregistrer</button>
              <button className="delete-btn" type="button" onClick={handleDeleteProfile}>
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
