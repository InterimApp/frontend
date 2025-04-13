import React, { useState } from "react";
import "./CCDashboard.css";
import { FaSearch, FaSlidersH, FaUserTie, FaFileContract, FaBriefcase } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import NavBar from "./CCNavBar";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CCDashboard = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    workerName: "",
    jobTitle: ""
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    // Here you would typically call your search API with the filters
    console.log("Applying filters:", filters);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      workerName: "",
      jobTitle: ""
    });
  };

  // Sample data - replace with real data from your API
  const statsData = {
    collaborators: 120,
    activeContracts: 50,
    jobOffers: 12
  };

  return (
    <div className="CCD-dashboard">
      <NavBar />
      
      <div className="CCD-content-wrapper">
        <div className="CCD-content">
          <div className="CCD-header-section">
            <h1 className="CCD-welcome-title">
              Bienvenue, <span className="CCD-company-name">Company X</span>
            </h1>
            <h2 className="CCD-subtitle">
              Gérez votre main-d'œuvre et vos offres d'emploi en toute simplicité
            </h2>

            <div className="CCD-search-container">
              <div className="CCD-search-bar">
                <FaSearch className="CCD-search-icon" />
                <input
                  type="text"
                  placeholder="Rechercher par nom ou poste..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="CCD-filter-btn"
                  onClick={() => setShowFilters(true)}
                  aria-label="Filtres"
                >
                  <FaSlidersH />
                  <span className="CCD-filter-text">Filtres</span>
                </button>
              </div>
            </div>
          </div>

          <div className="CCD-stats-container">
            <div className="CCD-stat-box">
              <div className="CCD-stat-icon">
                <FaUserTie />
              </div>
              <div className="CCD-stat-header red-gradient">Collaborateurs</div>
              <div className="CCD-stat-value">{statsData.collaborators}</div>
            </div>
            
            <div className="CCD-stat-box">
              <div className="CCD-stat-icon">
                <FaFileContract />
              </div>
              <div className="CCD-stat-header orange-gradient">
                Contrats actifs
              </div>
              <div className="CCD-stat-value">{statsData.activeContracts}</div>
            </div>
            
            <div className="CCD-stat-box">
              <div className="CCD-stat-icon">
                <FaBriefcase />
              </div>
              <div className="CCD-stat-header purple-gradient">Offres d'emploi</div>
              <div className="CCD-stat-value">{statsData.jobOffers}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Filter Modal */}
      <Modal show={showFilters} onHide={() => setShowFilters(false)} centered>
        <div className="CCD-popup-container">
          <button className="CCD-close-btn" onClick={() => setShowFilters(false)}>
            <RiCloseLine />
          </button>
          <h2 className="CCD-popup-title">Filtrer les résultats</h2>

          <div className="CCD-filter-section">
            <label className="CCD-filter-label">Nom du collaborateur</label>
            <div className="CCD-input-box">
              <input
                type="text"
                name="workerName"
                placeholder="Entrez un nom..."
                value={filters.workerName}
                onChange={handleFilterChange}
              />
              <FaSearch className="CCD-input-icon" />
            </div>
          </div>

          <div className="CCD-filter-section">
            <label className="CCD-filter-label">Intitulé du poste</label>
            <div className="CCD-input-box">
              <input
                type="text"
                name="jobTitle"
                placeholder="Entrez un poste..."
                value={filters.jobTitle}
                onChange={handleFilterChange}
              />
              <FaSlidersH className="CCD-input-icon" />
            </div>
          </div>

          <div className="CCD-filter-actions">
            <button className="CCD-clear-btn" onClick={resetFilters}>
              Réinitialiser
            </button>
            <button className="CCD-search-btn" onClick={applyFilters}>
              Appliquer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CCDashboard;