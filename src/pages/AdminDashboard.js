import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [dashboardData, setDashboardData] = useState({
    totalClientCompanies: 0,
    totalInterimCollaborators: 0,
    totalActiveMissions: 0,
  });

  // Fetch data from backend API on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/dashboard");
        if (response.status === 200) {
          setDashboardData({
            totalClientCompanies: response.data.total_client_companies,
            totalInterimCollaborators: response.data.total_interim_collaborators,
            totalActiveMissions: response.data.total_active_missions,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);


  return (
    <div className="AD-dashboard-container">
      <AdminNavBar />
      
      {/* IWDashboard Search Section (scrollable) */}
      <div className="AD-dashboard">
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
        <h2>Aperçu du tableau de bord Admin</h2>

        <div className="AD-metrics">
          <div className="AD-metric-box AD-red">
            <p className="AD-metric-title">Total des entreprises enregistrées</p>
            <img src={company} alt="Companies" className="AD-metric-img" />
            <p className="AD-metric-value">{dashboardData.totalClientCompanies}</p>
          </div>

          <div className="AD-metric-box AD-orange">
            <p className="AD-metric-title">Total des travailleurs intérimaires</p>
            <img src={employee} alt="Workers" className="AD-metric-img" />
            <p className="AD-metric-value">{dashboardData.totalInterimCollaborators}</p>
          </div>

          <div className="AD-metric-box AD-blue">
            <p className="AD-metric-title">Nombre total des missions actives</p>
            <img src={newworker} alt="New Workers" className="AD-metric-img" />
            <p className="AD-metric-value">{dashboardData.totalActiveMissions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;