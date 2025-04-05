import React, { useState, useEffect } from 'react';
import { 
  FaEnvelope, 
  FaVenusMars, 
  FaEye, 
  FaEyeSlash, 
  FaMapMarkerAlt, 
  FaTrash, 
  FaUser, 
  FaBirthdayCake, 
  FaBriefcase, 
  FaCode 
} from 'react-icons/fa';
import { MdAddAPhoto } from "react-icons/md";
import { fetchProfile, updateProfile, uploadCV } from '../services/ProfileApi';
import './Profile.css';
import IWNavBar from "./IWNavBar";

const Profile = () => {
  const userId = 2; // Replace with dynamic user ID from auth context
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: 'Femme',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    profession: '',
    skills: '',
    cv: null,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await fetchProfile(userId);
        setFormData(prev => ({
          ...prev,
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          age: profile.age || '',
          gender: profile.gender || 'Femme',
          email: profile.email || '',
          location: profile.location || '',
          profession: profile.profession || '',
          skills: profile.skills || '',
        }));
        if (profile.profileImage) {
          setProfileImage(profile.profileImage);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load profile:", error);
        setError("Failed to load profile. Please try again.");
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }
      setProfileImage(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleProfileImageDelete = () => {
    setProfileImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Password validation
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const profileData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        gender: formData.gender,
        email: formData.email,
        location: formData.location,
        profession: formData.profession,
        skills: formData.skills,
        ...(formData.password && { password: formData.password })
      };

      await updateProfile(userId, profileData);

      if (formData.cv) {
        await uploadCV(userId, formData.cv);
      }

      setSuccess('Profile updated successfully!');
      setError(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message || "Failed to update profile");
    }
  };

  const handleDeleteProfile = () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      // Implement deletion logic here
      alert('Profile deleted');
    }
  };

  if (loading) {
    return (
      <div className="IWP-profile-wrapper">
        <IWNavBar />
        <div className="IWP-loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="IWP-profile-wrapper">
      <IWNavBar />
      
      {/* Success and Error Messages */}
      {success && (
        <div className="IWP-alert IWP-alert-success">
          {success}
          <button onClick={() => setSuccess(null)}>×</button>
        </div>
      )}
      {error && (
        <div className="IWP-alert IWP-alert-danger">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="IWP-profile-container">
        {/* Left side: Profile Image Section */}
        <div className="IWP-profile-image-section">
          <div className="IWP-image-container">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="IWP-profile-image" />
            ) : (
              <div className="IWP-placeholder-image">
                <FaUser size={80} color="#7f8c8d" />
              </div>
            )}
            <div className="IWP-profile-image-actions">
              <label htmlFor="IWP-upload-button" className="IWP-upload-btn">
                <MdAddAPhoto className="IWP-upload-icon" />
                <span>Change</span>
                <input
                  id="IWP-upload-button"
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  style={{ display: 'none' }}
                />
              </label>

              {profileImage && (
                <button 
                  className="IWP-delete-img-btn" 
                  onClick={handleProfileImageDelete}
                  type="button"
                >
                  <FaTrash /> Delete
                </button>
              )}
            </div>
          </div>
          
          <div className="IWP-profile-info">
            <h2 className="IWP-profile-name">{formData.firstName} {formData.lastName}</h2>
            <div className="IWP-profile-role">Interim Collaborator</div>
            <div className="IWP-profile-details">
              <div className="IWP-detail-item">
                <FaBriefcase className="IWP-detail-icon" />
                <span>{formData.profession || 'Not specified'}</span>
              </div>
              <div className="IWP-detail-item">
                <FaMapMarkerAlt className="IWP-detail-icon" />
                <span>{formData.location || 'Not specified'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Profile Form */}
        <div className="IWP-profile-card">
          <h1 className="IWP-profile-title">Edit Your Profile</h1>
          <form onSubmit={handleSubmit} className="IWP-profile-form">
            <div className="IWP-form-grid">
              <div className="IWP-input-container">
                <label>First Name</label>
                <div className="IWP-input-with-icon">
                  <FaUser className="IWP-input-icon" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
              </div>

              <div className="IWP-input-container">
                <label>Last Name</label>
                <div className="IWP-input-with-icon">
                  <FaUser className="IWP-input-icon" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="IWP-form-grid">
              <div className="IWP-input-container">
                <label>Age</label>
                <div className="IWP-input-with-icon">
                  <FaBirthdayCake className="IWP-input-icon" />
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    min="18"
                    max="100"
                  />
                </div>
              </div>

              <div className="IWP-input-container">
                <label>Gender</label>
                <div className="IWP-input-with-icon">
                  <FaVenusMars className="IWP-input-icon" />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="Femme">Female</option>
                    <option value="Homme">Male</option>
                    <option value="Autre">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="IWP-input-container">
              <label>Email</label>
              <div className="IWP-input-with-icon">
                <FaEnvelope className="IWP-input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="IWP-form-grid">
              <div className="IWP-input-container">
                <label>Password</label>
                <div className="IWP-input-with-icon">
                  {showPassword ? (
                    <FaEyeSlash
                      className="IWP-password-icon"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FaEye
                      className="IWP-password-icon"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <div className="IWP-input-container">
                <label>Confirm Password</label>
                <div className="IWP-input-with-icon">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>

            <div className="IWP-input-container">
              <label>Location</label>
              <div className="IWP-input-with-icon">
                <FaMapMarkerAlt className="IWP-input-icon" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your location"
                />
              </div>
            </div>

            <div className="IWP-form-grid">
              <div className="IWP-input-container">
                <label>Profession</label>
                <div className="IWP-input-with-icon">
                  <FaBriefcase className="IWP-input-icon" />
                  <select
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                  >
                    <option value="">Select profession</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Mechanical Engineer">Mechanical Engineer</option>
                    <option value="Marketing Specialist">Marketing Specialist</option>
                  </select>
                </div>
              </div>

              <div className="IWP-input-container">
                <label>Skills</label>
                <div className="IWP-input-with-icon">
                  <FaCode className="IWP-input-icon" />
                  <select
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                  >
                    <option value="">Select skills</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="React">React</option>
                    <option value="Project Management">Project Management</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="IWP-input-container">
              <label>CV (PDF)</label>
              <label className="IWP-cv-upload-label">
                {formData.cv ? formData.cv.name : 'Choose file'}
                <input
                  type="file"
                  name="cv"
                  onChange={handleChange}
                  accept=".pdf"
                  className="IWP-file-input"
                />
              </label>
              {formData.cv && (
                <div className="IWP-cv-preview">
                  Selected: {formData.cv.name}
                </div>
              )}
            </div>

            <div className="IWP-form-actions">
              <button 
                className="IWP-submit-btn" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                className="IWP-delete-btn" 
                type="button" 
                onClick={handleDeleteProfile}
                disabled={loading}
              >
                <FaTrash /> Delete Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;