import React, { useState, useEffect } from "react";
import "./CCJob.css";
import { FaEye, FaUser, FaTimes, FaPlus } from "react-icons/fa";
import CCNavBar from "./CCNavBar";

const CCJob = () => {
  const [jobs, setJobs] = useState([
    {
      id: "10001",
      title: "Assistant Commercial",
      date: "15/02/2025",
      startDate: "01/03/2025",
      endDate: "30/03/2025",
      description: "Job description here.",
      applicantsNeeded: 5,
      notifications: 1,
    },
    {
      id: "30021",
      title: "Employé d’Entrepôt",
      date: "20/01/2025",
      startDate: "01/02/2025",
      endDate: "28/02/2025",
      description: "Job description here.",
      applicantsNeeded: 10,
      notifications: 3,
    },
    {
      id: "2002",
      title: "Service Client",
      date: "05/01/2025",
      startDate: "10/01/2025",
      endDate: "10/02/2025",
      description: "Job description here.",
      applicantsNeeded: 7,
      notifications: 7,
    },
  ]);

  const [modalType, setModalType] = useState(null); // null, "view", "add"
  const [selectedJob, setSelectedJob] = useState(null);
  const [userListModal, setUserListModal] = useState(null); // New state for user selection modal

  const [newJob, setNewJob] = useState({
    id: "",
    title: "",
    date: "",
    startDate: "",
    endDate: "",
    description: "",
    applicantsNeeded: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setNewJob((prevState) => ({
      ...prevState,
      startDate: today,
      endDate: today,
      date: today,
    }));
  }, []);

  const getNextJobId = () => {
    const lastJob = jobs[jobs.length - 1];
    return (parseInt(lastJob.id) + 1).toString();
  };

  const handleInputChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const addJob = () => {
    if (
      newJob.title &&
      newJob.date &&
      newJob.startDate &&
      newJob.endDate &&
      newJob.description &&
      newJob.applicantsNeeded
    ) {
      setJobs([...jobs, { ...newJob, id: getNextJobId(), notifications: 0 }]);
      setNewJob({
        id: "",
        title: "",
        date: "",
        startDate: "",
        endDate: "",
        description: "",
        applicantsNeeded: "",
      });
      setModalType(null);
    }
  };

  const openJobDetails = (job) => {
    setSelectedJob(job);
    setModalType("view");
  };

  return (
    <div>
      <CCNavBar />

      <div className="CCJ-container">
        <h2 className="CCJ-title">Gestion des Offres d'Emploi</h2>

        <div className="CCJ-btn-container">
          <button className="CCJ-add-btn" onClick={() => setModalType("add")}>
            Ajouter <FaPlus className="CCJ-icon" />
          </button>
        </div>

        <table className="CCJ-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Intitulé du Poste</th>
              <th>Date de Publication</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index}>
                <td>{job.id}</td>
                <td>{job.title}</td>
                <td>{job.date}</td>
                <td className="CCJ-actions">
                  <FaEye
                    className="CCJ-icon CCJ-eye-icon"
                    onClick={() => openJobDetails(job)}
                  />
                  <div
                    className="CCJ-user-icon"
                    onClick={() => setUserListModal(true)}
                  >
                    <FaUser />
                    {job.notifications > 0 && (
                      <span className="CCJ-badge">{job.notifications}</span>
                    )}
                  </div>
                  <FaTimes className="CCJ-icon CCJ-delete-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalType === "view" && selectedJob && (
          <div className="CCJ-modal CCJ-view-modal">
            <div className="CCJ-modal-content">
            <h3 style={{ fontWeight: "bold", textAlign: "center" }}>
  Details de l'Offre: {selectedJob.title}
</h3>
              <div>
                <strong>ID:</strong> {selectedJob.id}
              </div>
              <div>
                <strong>Date de Publication:</strong> {selectedJob.date}
              </div>
              <div>
                <strong>Date de Début:</strong> {selectedJob.startDate}
              </div>
              <div>
                <strong>Date de Fin:</strong> {selectedJob.endDate}
              </div>
              <div>
                <strong>Description:</strong> {selectedJob.description}
              </div>
              <div>
                <strong>Nombre de Candidats Nécessaires:</strong>{" "}
                {selectedJob.applicantsNeeded}
              </div>
              <button
                className="CCJ-cancel-btn"
                onClick={() => setModalType(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        {modalType === "add" && (
          <div className="CCJ-modal CCJ-add-modal">
            <div className="CCJ-modal-content">
              <h3>Ajouter une Offre d'Emploi</h3>
              <label>
                <strong>Titre du Poste:</strong>
                <input
                  type="text"
                  name="title"
                  value={newJob.title}
                  onChange={handleInputChange}
                  placeholder="Titre du Poste"
                />
              </label>
              <label>
                <strong>Date de Publication:</strong>
                <input
                  type="date"
                  name="date"
                  value={newJob.date}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <strong>Date de Début:</strong>
                <input
                  type="date"
                  name="startDate"
                  value={newJob.startDate}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <strong>Date de Fin:</strong>
                <input
                  type="date"
                  name="endDate"
                  value={newJob.endDate}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <strong>Description:</strong>
                <textarea
                  name="description"
                  value={newJob.description}
                  onChange={handleInputChange}
                  placeholder="Description du Poste"
                />
              </label>
              <label>
                <strong>Nombre de Candidats Nécessaires:</strong>
                <input
                  type="number"
                  name="applicantsNeeded"
                  value={newJob.applicantsNeeded}
                  onChange={handleInputChange}
                />
              </label>
              <button
                className="CCJ-cancel-btn"
                onClick={() => setModalType(null)}
              >
                Annuler
              </button>
              <button className="CCJ-add-btn" onClick={addJob}>
                Ajouter l'Offre
              </button>
            </div>
          </div>
        )}

        {userListModal && (
          <div className="CCJ-modal CCJ-user-list-modal">
            <div className="CCJ-modal-content">
              <h3>Select your final list</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {["John Doe", "Abed Alrahman", "Syrine"].map(
                    (name, index) => (
                      <tr key={index}>
                        <td>{name}</td>
                        <td>
                          <FaEye className="CCJ-icon" />
                          <input type="checkbox" />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              <button className="CCJ-add-btn">Send</button>
              <button
                className="CCJ-cancel-btn"
                onClick={() => setUserListModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CCJob;
