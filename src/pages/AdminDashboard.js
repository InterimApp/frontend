import React, { useState } from "react"; 
import "./AdminDashboard.css";
import AdminNavBar from "./AdminNavBar";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import company from "../assets/company.png";
import employee from "../assets/employee.png";
import newworker from "../assets/newworker.png";


const AdminDashboard = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="AD-dashboard-container">
      <AdminNavBar />
      
      {/* IWDashboard Search Section (scrollable) */}
      <div className="AD-dashboard">
        <div className="AD-content">
          <div className="AD-left-content">
            <h1>
              Bienvenue, <span className="AD-highlight">Admin Iheb</span>
            </h1>
            <h2>Gérer les utilisateurs, contrats et rapports efficacement</h2>

            <div className="AD-search-bar">
              <FaSearch className="AD-search-icon" />
              <input type="text" placeholder="Utilisateurs, Compagnies" />
              <button className="AD-filter-btn" onClick={() => setShowPopup(true)}>
                <FaSlidersH />
              </button>
            </div>
          </div>
        </div>

        <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
          <div className="AD-popup-container">
            <button className="AD-close-btn" onClick={() => setShowPopup(false)}>
              ✖
            </button>
            <h2 className="AD-popup-title">Filtrer</h2>

            <div className="AD-input-container">
              <div className="AD-input-box">
                <input type="text" placeholder="User" />
                <FaSearch className="AD-input-icon" />
              </div>

              <div className="AD-input-box">
                <input type="text" placeholder="Compagnies" />
                <FaSlidersH className="AD-input-icon" />
              </div>
            </div>

            <button className="AD-search-btn">Rechercher</button>
          </div>
        </Modal>
      </div>

      {/* Admin Dashboard Overview Section */}
      <div className="AD-overview">
        <h2>Admin Dashboard Overview</h2>

        <div className="AD-metrics">
          <div className="AD-metric-box AD-red">
            <p className="AD-metric-title">Total Registered Companies</p>
            <img src={company} alt="Companies" className="AD-metric-img" />
            <p className="AD-metric-value">50</p>
          </div>

          <div className="AD-metric-box AD-orange">
            <p className="AD-metric-title">Total Interim Workers</p>
            <img src={employee} alt="Workers" className="AD-metric-img" />
            <p className="AD-metric-value">1,200</p>
          </div>

          <div className="AD-metric-box AD-blue">
            <p className="AD-metric-title">New Workers Added This Week</p>
            <img src={newworker} alt="New Workers" className="AD-metric-img" />
            <p className="AD-metric-value">30</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
