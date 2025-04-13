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
  const [searchTerm, setSearchTerm] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [companySearch, setCompanySearch] = useState("");

  const users = [
    { fullName: "Iheb Admin", email: "iheb@admin.com", role: "Admin" },
    { fullName: "John Doe", email: "john@doe.com", role: "Collaborator" },
  ];

  const companies = [
    {
      name: "ABC Industries",
      industry: "Manufacturing",
      codeFiscale: "TN123456",
    },
    { name: "TechCorp", industry: "Software", codeFiscale: "TN789101" },
  ];

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
            <button
              className="AD-filter-btn"
              onClick={() => setShowPopup(true)}
            >
              <FaSlidersH />
            </button>
          </div>
        </div>
        <Modal
          show={showPopup}
          onHide={() => {
            setShowPopup(false);
            setUserSearch("");
            setCompanySearch("");
          }}
          centered
        >
          <div className="AD-popup-container">
            <button
              className="AD-close-btn"
              onClick={() => {
                setShowPopup(false);
                setUserSearch("");
                setCompanySearch("");
              }}
            >
              ✖
            </button>

            <h2 className="AD-popup-title">Filtrer</h2>

            <div className="AD-input-container">
              <div className="AD-input-box">
                <input
                  type="text"
                  placeholder="User"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value.toLowerCase())}
                  disabled={companySearch !== ""}
                />
                <FaSearch className="AD-input-icon" />
              </div>

              <div className="AD-input-box">
                <input
                  type="text"
                  placeholder="Compagnies"
                  value={companySearch}
                  onChange={(e) =>
                    setCompanySearch(e.target.value.toLowerCase())
                  }
                  disabled={userSearch !== ""}
                />
                <FaSlidersH className="AD-input-icon" />
              </div>
            </div>

            <button
              className="AD-search-btn"
              onClick={() => {
                const combinedSearch = `${userSearch} ${companySearch}`;
                setSearchTerm(combinedSearch);
              }}
            >
              Rechercher
            </button>
            {userSearch !== "" &&
              users
                .filter((user) =>
                  user.fullName.toLowerCase().includes(userSearch)
                )
                .map((user, idx) => (
                  <div key={idx} className="AD-result-card">
                    <p>
                      👤 <strong>{user.fullName}</strong>
                    </p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                  </div>
                ))}

            {companySearch !== "" &&
              companies
                .filter((comp) =>
                  comp.name.toLowerCase().includes(companySearch)
                )
                .map((comp, idx) => (
                  <div key={idx} className="AD-result-card">
                    <p>
                      🏢 <strong>{comp.name}</strong>
                    </p>
                    <p>Industry: {comp.industry}</p>
                    <p>Code Fiscale: {comp.codeFiscale}</p>
                  </div>
                ))}
          </div>
        </Modal>
      </div>

      {/* Admin Dashboard Overview Section */}
      <div className="AD-overview">
        <h2>Aperçu du tableau de bord Admin</h2>

        <div className="AD-metrics">
          <div className="AD-metric-box AD-red">
            <p className="AD-metric-title">
              Total des entreprises enregistrées
            </p>
            <img src={company} alt="Companies" className="AD-metric-img" />
            <p className="AD-metric-value">50</p>
          </div>

          <div className="AD-metric-box AD-orange">
            <p className="AD-metric-title">
              Total des travailleurs intérimaires
            </p>
            <img src={employee} alt="Workers" className="AD-metric-img" />
            <p className="AD-metric-value">1,200</p>
          </div>

          <div className="AD-metric-box AD-blue">
            <p className="AD-metric-title">
              Nouveaux collaborateurs ajoutés cette semaine
            </p>
            <img src={newworker} alt="New Workers" className="AD-metric-img" />
            <p className="AD-metric-value">30</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
