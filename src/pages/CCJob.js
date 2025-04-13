import React, { useState } from "react";
import { 
  FaEye, 
  FaUserTie, 
  FaUsers, 
  FaPlus, 
  FaFileContract, 
  FaUserCheck,
  FaUserClock,
  FaFileUpload,
  FaPaperPlane,
  FaCheckCircle,
  FaBusinessTime,
  FaCalendarAlt
} from "react-icons/fa";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CCNavBar from "./CCNavBar";
import "./CCJob.css";

const calculateDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return "";
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} jours`;
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
};

const CCJob = () => {
  const [jobs, setJobs] = useState([
    {
      id: "10001",
      title: "Assistant Commercial",
      date: "15/02/2025",
      postedDate: "18/02/2025",
      startDate: "2025-03-01",
      endDate: "2025-03-15",
      duration: "15 jours",
      experience: 2,
      workersNeeded: 3,
      status: "candidates-selected",
      contractSubmitted: true,
      candidates: [
        { id: 1, name: "Jean Dupont", selected: false, final: false, interviewed: false },
        { id: 2, name: "Marie Lambert", selected: false, final: false, interviewed: false },
        { id: 3, name: "Ahmed Ben Salah", selected: false, final: false, interviewed: false }
      ],
      notifications: 2
    }
  ]);

  const [modalType, setModalType] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    experience: "",
    workersNeeded: "",
    startDate: "",
    endDate: "",
    duration: "",
    contractFile: null
  });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => {
      const updated = {...prev, [name]: value};
      if (updated.startDate && updated.endDate) {
        updated.duration = calculateDuration(updated.startDate, updated.endDate);
      }
      return updated;
    });
  };

  const handleSubmitJob = () => {
    if (newJob.title && newJob.description && newJob.experience && 
        newJob.workersNeeded && newJob.contractFile && newJob.duration) {
      const newJobEntry = {
        id: `J${Date.now()}`,
        title: newJob.title,
        date: new Date().toLocaleDateString('fr-FR'),
        postedDate: "",
        startDate: newJob.startDate,
        endDate: newJob.endDate,
        duration: newJob.duration,
        description: newJob.description,
        experience: newJob.experience,
        workersNeeded: newJob.workersNeeded,
        status: "submitted",
        contractSubmitted: true,
        candidates: [],
        notifications: 0
      };
      
      setJobs([...jobs, newJobEntry]);
      setNewJob({
        title: "",
        description: "",
        experience: "",
        workersNeeded: "",
        startDate: "",
        endDate: "",
        duration: "",
        contractFile: null
      });
      setModalType(null);
    }
  };

  const toggleCandidateSelection = (jobId, candidateId) => {
    setJobs(prevJobs => 
      prevJobs.map(job => {
        if (job.id === jobId) {
          const updatedCandidates = job.candidates.map(candidate => 
            candidate.id === candidateId 
              ? { ...candidate, selected: !candidate.selected } 
              : candidate
          );
          
          const selectedCount = updatedCandidates.filter(c => c.selected).length;
          if (selectedCount > job.workersNeeded) {
            return job;
          }
          
          return {
            ...job,
            candidates: updatedCandidates
          };
        }
        return job;
      })
    );
  };

  const markAsInterviewed = (jobId, candidateId) => {
    setJobs(prevJobs => 
      prevJobs.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            candidates: job.candidates.map(candidate => 
              candidate.id === candidateId 
                ? { ...candidate, interviewed: true } 
                : candidate
            )
          };
        }
        return job;
      })
    );
  };

  const handleFinalSelection = (jobId) => {
    setJobs(prevJobs => 
      prevJobs.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            status: "completed",
            notifications: 0
          };
        }
        return job;
      })
    );
    setModalType(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted": return "#009fdb";
      case "posted": return "#28a745";
      case "candidates-selected": return "#f75429";
      case "completed": return "#8e24aa";
      default: return "#333";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "submitted": return <FaPaperPlane />;
      case "posted": return <FaBusinessTime />;
      case "candidates-selected": return <FaUserClock />;
      case "completed": return <FaCheckCircle />;
      default: return null;
    }
  };

  return (
    <div className="CCJ-contract-container">
      <CCNavBar />
      
      <div className="CCJ-table-card">
        <div className="CCJ-report-header">
          <h1 className="CCJ-title-contract">Offres d'Emploi Soumises</h1>
          <button 
            className="CCJ-submit-button"
            onClick={() => setModalType("add")}
          >
            <FaPlus /> Soumettre une Offre
          </button>
        </div>

        <div className="CCJ-mini-bar-header">
          <h6>ID</h6>
          <h6>Titre</h6>
          <h6>Date</h6>
          <h6>Durée</h6>
          <h6>Expérience</h6>
          <h6>Postes</h6>
          <h6>Statut</h6>
          <h6>Actions</h6>
        </div>

        {jobs.map((job) => (
          <div key={job.id} className="CCJ-mini-bar-row">
            <span>{job.id}</span>
            <span>{job.title}</span>
            <span>{job.date}</span>
            <span>{job.duration || "-"}</span>
            <span>{job.experience} ans</span>
            <span>{job.workersNeeded}</span>
            <span style={{ color: getStatusColor(job.status) }}>
              {getStatusIcon(job.status)} {job.status === "submitted" && "Soumis"}
              {job.status === "posted" && "Publié"}
              {job.status === "candidates-selected" && "Sélection en cours"}
              {job.status === "completed" && "Finalisé"}
            </span>
            <span className="CCJ-action-icons">
              <FaEye 
                onClick={() => {
                  setSelectedJob(job);
                  setModalType("view");
                }} 
                className="CCJ-action-icon" 
                title="Voir les détails"
              />
              
              {job.status === "posted" && job.notifications > 0 && (
                <FaUsers
                  onClick={() => {
                    setSelectedJob(job);
                    setModalType("admin-selected");
                  }}
                  className="CCJ-action-icon CCJ-admin-selected-icon"
                  title="Candidats présélectionnés"
                />
              )}
              
              {job.status === "candidates-selected" && job.candidates.length > 0 && (
                <FaUserCheck
                  onClick={() => {
                    setSelectedJob(job);
                    setModalType("candidates");
                  }}
                  className="CCJ-action-icon CCJ-candidates-icon"
                  title="Sélection finale"
                />
              )}
              
              
            </span>
          </div>
        ))}
      </div>

      {/* View Job Details Modal */}
      <Modal show={modalType === "view"} onHide={() => setModalType(null)} centered size="lg">
        <div className="CCJ-popup-container">
          <button className="CCJ-close-btn" onClick={() => setModalType(null)}>
            ✖
          </button>
          {selectedJob && (
            <div>
              <h2><FaUserTie /> Détails de l'Offre: {selectedJob.title}</h2>
              <table className="CCJ-contract-details-table">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <td>{selectedJob.id}</td>
                  </tr>
                  <tr>
                    <th>Date de Soumission</th>
                    <td>{selectedJob.date}</td>
                  </tr>
                  <tr>
                    <th>Date de Début</th>
                    <td>{formatDate(selectedJob.startDate)}</td>
                  </tr>
                  <tr>
                    <th>Date de Fin</th>
                    <td>{formatDate(selectedJob.endDate)}</td>
                  </tr>
                  <tr>
                    <th>Durée</th>
                    <td>{selectedJob.duration || "-"}</td>
                  </tr>
                  <tr>
                    <th>Expérience Requise</th>
                    <td>{selectedJob.experience} ans</td>
                  </tr>
                  <tr>
                    <th>Nombre de Postes</th>
                    <td>{selectedJob.workersNeeded}</td>
                  </tr>
                  <tr>
                    <th>Statut</th>
                    <td style={{ color: getStatusColor(selectedJob.status) }}>
                      {getStatusIcon(selectedJob.status)} {selectedJob.status}
                    </td>
                  </tr>
                  <tr>
                    <th>Contrat</th>
                    <td>
                      {selectedJob.contractSubmitted ? (
                        <div className="CCJ-contract-info">
                          <FaFileContract /> Contrat déposé
                        </div>
                      ) : "Aucun contrat déposé"}
                    </td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{selectedJob.description || "Aucune description"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Modal>

      {/* Add New Job Modal */}
      <Modal show={modalType === "add"} onHide={() => setModalType(null)} centered size="lg">
        <div className="CCJ-popup-container">
          <button className="CCJ-close-btn" onClick={() => setModalType(null)}>
            ✖
          </button>
          <h2><FaPlus /> Nouvelle Offre d'Emploi</h2>
          <form className="CCJ-report-form">
            <div className="CCJ-form-group">
              <label>Titre du Poste *</label>
              <input
                type="text"
                value={newJob.title}
                onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                placeholder="Ex: Assistant Commercial"
                required
              />
            </div>
            
            <div className="CCJ-form-group">
              <label>Description *</label>
              <textarea
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                rows="5"
                required
              />
            </div>
            
            <div className="CCJ-form-row">
              <div className="CCJ-form-group">
                <label>Expérience (ans) *</label>
                <input 
                  type="number" 
                  value={newJob.experience}
                  onChange={(e) => setNewJob({...newJob, experience: e.target.value})}
                  min="0"
                  required
                />
              </div>
              
              <div className="CCJ-form-group">
                <label>Nombre de Postes *</label>
                <input 
                  type="number" 
                  value={newJob.workersNeeded}
                  onChange={(e) => setNewJob({...newJob, workersNeeded: e.target.value})}
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="CCJ-form-row">
              <div className="CCJ-form-group">
                <label>Date de Début *</label>
                <input
                  type="date"
                  name="startDate"
                  value={newJob.startDate}
                  onChange={handleDateChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="CCJ-form-group">
                <label>Date de Fin *</label>
                <input
                  type="date"
                  name="endDate"
                  value={newJob.endDate}
                  onChange={handleDateChange}
                  required
                  min={newJob.startDate || new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="CCJ-form-group">
                <label>Durée</label>
                <input
                  type="text"
                  value={newJob.duration}
                  readOnly
                  className="CCJ-duration-display"
                />
              </div>
            </div>
            
            <div className="CCJ-form-group">
              <label>Modèle de Contrat *</label>
              <div className="CCJ-file-upload">
                {newJob.contractFile ? (
                  <div className="CCJ-file-info">
                    <FaFileContract />
                    <span>{newJob.contractFile.name}</span>
                    <button 
                      onClick={() => setNewJob({...newJob, contractFile: null})}
                      className="CCJ-file-remove"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <input 
                      type="file" 
                      id="contract-upload"
                      onChange={(e) => setNewJob({...newJob, contractFile: e.target.files[0]})}
                      accept=".pdf,.doc,.docx"
                      required
                    />
                    <label htmlFor="contract-upload">
                      <FaFileUpload /> Téléverser le Contrat
                    </label>
                  </>
                )}
              </div>
            </div>
            
            <div className="CCJ-form-actions">
              <button 
                type="button" 
                className="CCJ-cancel-btn"
                onClick={() => setModalType(null)}
              >
                Annuler
              </button>
              <button 
                type="button" 
                className="CCJ-submit-btn"
                onClick={handleSubmitJob}
                disabled={!newJob.title || !newJob.description || !newJob.experience || 
                         !newJob.workersNeeded || !newJob.duration || !newJob.contractFile}
              >
                <FaPaperPlane /> Soumettre
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Admin Selected Candidates Modal */}
      <Modal show={modalType === "admin-selected"} onHide={() => setModalType(null)} centered size="lg">
        <div className="CCJ-popup-container">
          <button className="CCJ-close-btn" onClick={() => setModalType(null)}>
            ✖
          </button>
          {selectedJob && (
            <>
              <h2><FaUsers /> Candidats Présélectionnés</h2>
              <p className="CCJ-modal-subtitle">
                Pour: <strong>{selectedJob.title}</strong> ({selectedJob.workersNeeded} postes)
              </p>
              
              <div className="CCJ-candidates-list">
                {selectedJob.candidates.map(candidate => (
                  <div key={candidate.id} className="CCJ-candidate-item">
                    <div className="CCJ-candidate-info">
                      <FaUserTie />
                      <span>{candidate.name}</span>
                    </div>
                    
                    <button 
                      className={`CCJ-interview-btn ${candidate.interviewed ? "interviewed" : ""}`}
                      onClick={() => markAsInterviewed(selectedJob.id, candidate.id)}
                    >
                      {candidate.interviewed ? "Interviewé" : "Marquer comme interviewé"}
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="CCJ-form-actions">
                <button 
                  className="CCJ-cancel-btn"
                  onClick={() => setModalType(null)}
                >
                  Retour
                </button>
                <button 
                  className="CCJ-submit-btn"
                  onClick={() => {
                    setJobs(jobs.map(job => 
                      job.id === selectedJob.id ? { ...job, status: "candidates-selected" } : job
                    ));
                    setModalType(null);
                  }}
                  disabled={!selectedJob.candidates.every(c => c.interviewed)}
                >
                  Passer à la Sélection Finale
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Final Selection Modal */}
      <Modal show={modalType === "candidates"} onHide={() => setModalType(null)} centered size="lg">
        <div className="CCJ-popup-container">
          <button className="CCJ-close-btn" onClick={() => setModalType(null)}>
            ✖
          </button>
          {selectedJob && (
            <>
              <h2><FaUserCheck /> Sélection Finale</h2>
              <p className="CCJ-modal-subtitle">
                Pour: <strong>{selectedJob.title}</strong> (Sélectionnez {selectedJob.workersNeeded} candidats)
              </p>
              
              <div className="CCJ-candidates-list">
                {selectedJob.candidates.map(candidate => (
                  <div key={candidate.id} className="CCJ-candidate-item">
                    <div className="CCJ-candidate-info">
                      <FaUserTie />
                      <span>{candidate.name}</span>
                      {candidate.interviewed && <span className="CCJ-interviewed-badge">Interviewé</span>}
                    </div>
                    
                    <label className="CCJ-candidate-select">
                      <input 
                        type="checkbox" 
                        checked={candidate.selected}
                        onChange={() => toggleCandidateSelection(selectedJob.id, candidate.id)}
                        disabled={
                          !candidate.selected && 
                          selectedJob.candidates.filter(c => c.selected).length >= selectedJob.workersNeeded
                        }
                      />
                      <span>Sélectionner</span>
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="CCJ-selection-count">
                Sélectionnés: {selectedJob.candidates.filter(c => c.selected).length}/{selectedJob.workersNeeded}
              </div>
              
              <div className="CCJ-form-actions">
                <button 
                  className="CCJ-cancel-btn"
                  onClick={() => setModalType(null)}
                >
                  Retour
                </button>
                <button 
                  className="CCJ-submit-btn"
                  onClick={() => handleFinalSelection(selectedJob.id)}
                  disabled={
                    selectedJob.candidates.filter(c => c.selected).length !== selectedJob.workersNeeded
                  }
                >
                  Confirmer la Sélection
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CCJob;