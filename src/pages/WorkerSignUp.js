import React, { useState } from "react";
import "./WorkerSignUp.css";
import { FaEnvelope, FaPhone, FaVenusMars, FaEye, FaEyeSlash, FaFileUpload, FaMapMarkerAlt } from "react-icons/fa";
import analysis from "../assets/analysis.jpeg";
import NavBar from "./NavBar";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="signup-page">
      <div className="signup-container">
      <NavBar />
      <div className="form-container">
        <h2>Create your <span>worker account</span></h2>
        <div className="divider"></div>

        <form>
          <label>First name</label>
          <input type="text" placeholder="Enter your first name" />

          <label>Last name</label>
          <input type="text" placeholder="Enter your last name" />

          <div className="age-gender">
            <div className="age">
              <label>Age</label>
              <input type="number" placeholder="Age" />
            </div>
            <div className="gender">
              <label>Gender</label>
              <div className="input-icon">
                <input type="text" placeholder="Gender" />
                <FaVenusMars className="icon" />
              </div>
            </div>
          </div>

          <label>Email</label>
          <div className="input-icon">
            <input type="email" placeholder="Enter your email" />
            <FaEnvelope className="icon" />
          </div>

          <div className="password-container">
            <label>Password</label>
            <div className="input-icon">
              <input type={showPassword ? "text" : "password"} placeholder="Enter password" />
              {showPassword ? (
                <FaEyeSlash className="icon" onClick={() => setShowPassword(false)} />
              ) : (
                <FaEye className="icon" onClick={() => setShowPassword(true)} />
              )}
            </div>

            <label>Confirm Password</label>
            <div className="input-icon">
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" />
              {showConfirmPassword ? (
                <FaEyeSlash className="icon" onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <FaEye className="icon" onClick={() => setShowConfirmPassword(true)} />
              )}
            </div>
          </div>

          <div className="cv-location">
            <div className="cv">
              <label>Upload CV</label>
              <div className="input-icon">
                <input type="file" />
              </div>
            </div>

            <div className="location">
              <label>Location</label>
              <div className="input-icon">
                <input type="text" placeholder="Enter location" />
                <FaMapMarkerAlt className="icon" />
              </div>
            </div>
          </div>

          <label>Profession</label>
          <select>
            <option>Software Engineer</option>
            <option>Data Scientist</option>
            <option>Mechanical Engineer</option>
            <option>Marketing Specialist</option>
          </select>

          <label>Skills</label>
          <select>
            <option>Python</option>
            <option>Java</option>
            <option>React</option>
            <option>Project Management</option>
          </select>

          <button className="submit-btn">Sign Up</button>
        </form>
      </div>
</div>
       <div className="image-container">
              <img src={analysis} alt="Analysis" />
            </div>
      <div/>
    </div>
  );
};

export default SignUp;
