import React, { useState } from "react";
import { Table, Modal, Button, ListGroup, Badge, Form } from "react-bootstrap";
import { 
  FaUserTie,
  FaFileContract,
  FaUserCircle,
  FaFileAlt,
  FaFileUpload,
  FaFilePdf,
  FaUsers,
  FaInfoCircle,
  FaCalendarDay,
  FaMapMarkerAlt,
  FaStar,
  FaTools
} from "react-icons/fa";
import "./CCMan.css";
import CCNavBar from "./CCNavBar";

const CCMan = () => {
  const [activeTab, setActiveTab] = useState("workers");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState("");
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  // Workers data
  const [workers, setWorkers] = useState([
    {
      id: "1000",
      name: "John Doe",
      position: "Assistant Commercial",
      age: 32,
      skills: ["Sales", "Customer Relations", "Microsoft Office"],
      experience: "3 years",
      location: "Paris",
      rating: 4.5,
      contractId: "5001",
      contractLink: "/contracts/5001.pdf",
      status: "active",
      payslips: []
    },
    {
      id: "0002",
      name: "Jane Smith",
      position: "Warehouse Employee",
      age: 28,
      skills: ["Inventory Management", "Forklift Operation", "Teamwork"],
      experience: "2 years",
      location: "Lyon",
      rating: 4.2,
      contractId: "5002",
      contractLink: "/contracts/5002.pdf",
      status: "active",
      payslips: []
    },
    { 
      id: "0122", 
      name: "Syrine Ben Ali", 
      position: "Customer Service", 
      age: 25,
      skills: ["Communication", "Problem Solving", "Multilingual"],
      experience: "1 year",
      location: "Marseille",
      rating: 4.0,
      contractId: "5003",
      contractLink: "/contracts/5003.pdf",
      status: "pending",
      payslips: []
    },
  ]);

  // Contracts data
  const [contracts, setContracts] = useState([
    {
      id: "5001",
      title: "Commercial Assistant Contract",
      workerName: "John Doe",
      workerId: "1000",
      position: "Assistant Commercial",
      status: "active",
      date: "01/03/2025",
      file: "/contracts/5001.pdf",
      assignedWorkers: ["1000"]
    },
    {
      id: "5002",
      title: "Warehouse Employment Contract",
      workerName: "Jane Smith",
      workerId: "0002",
      position: "Warehouse Employee",
      status: "active",
      date: "15/03/2025",
      file: "/contracts/5002.pdf",
      assignedWorkers: ["0002", "0122"]
    },
    {
      id: "5003",
      title: "Customer Service Contract",
      workerName: "Syrine Ben Ali",
      workerId: "0122",
      position: "Customer Service",
      status: "pending",
      date: "20/03/2025",
      file: "/contracts/5003.pdf",
      assignedWorkers: ["0122"]
    },
  ]);

  const handleViewDetails = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedItem(null);
    setModalType("");
  };

  const handlePayslipUpload = (worker) => {
    setSelectedWorker(worker);
    setShowPayslipModal(true);
  };

  const handlePayslipSubmit = (e) => {
    e.preventDefault();
    const file = e.target.payslip.files[0];
    if (file) {
      alert(`Payslip uploaded for ${selectedWorker.name}`);
      setShowPayslipModal(false);
      setWorkers(workers.map(w => 
        w.id === selectedWorker.id 
          ? {...w, payslips: [...w.payslips, file.name]}
          : w
      ));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "#28a745";
      case "pending": return "#f75429";
      case "terminated": return "#6c757d";
      default: return "#333";
    }
  };

  const getAssignedWorkers = (contractId) => {
    const contract = contracts.find(c => c.id === contractId);
    if (!contract) return [];
    return workers.filter(worker => contract.assignedWorkers.includes(worker.id));
  };

  return (
    <>
      <CCNavBar />
      <div className="CCM-container">
        {/* Tabs Section */}
        <div className="CCM-tabs-box">
          <button
            className={`CCM-tab ${activeTab === "workers" ? "CCM-active-tab" : "CCM-inactive-tab"}`}
            onClick={() => setActiveTab("workers")}
          >
            <FaUserTie /> Workers
          </button>
          <button
            className={`CCM-tab ${activeTab === "contracts" ? "CCM-active-tab" : "CCM-inactive-tab"}`}
            onClick={() => setActiveTab("contracts")}
          >
            <FaFileContract /> Contracts
          </button>
        </div>

        {/* Workers Table */}
        {activeTab === "workers" && (
          <div className="CCM-table-container">
            <h2 className="CCM-title"><FaUserTie /> Your Finalized Workers</h2>
            <Table striped bordered hover className="CCM-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Contract ID</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker) => (
                  <tr key={worker.id}>
                    <td>{worker.id}</td>
                    <td>{worker.name}</td>
                    <td>{worker.position}</td>
                    <td>{worker.contractId}</td>
                    <td>
                      <Badge 
                        className="CCM-status-badge"
                        style={{ backgroundColor: getStatusColor(worker.status) }}
                      >
                        {worker.status}
                      </Badge>
                    </td>
                    <td>
                      <div className="CCM-actions-container">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleViewDetails(worker, "workerDetails")}
                          className="CCM-action-btn"
                          title="View Profile"
                        >
                          <FaUserCircle />
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => {
                            const contract = contracts.find(c => c.id === worker.contractId);
                            if (contract) handleViewDetails(contract, "workerContract");
                          }}
                          className="CCM-action-btn"
                          title="View Contract"
                        >
                          <FaFileAlt />
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handlePayslipUpload(worker)}
                          className="CCM-action-btn"
                          title="Upload Payslip"
                        >
                          <FaFileUpload />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {/* Contracts Table */}
        {activeTab === "contracts" && (
          <div className="CCM-table-container">
            <h2 className="CCM-title"><FaFileContract /> Contract Management</h2>
            <Table striped bordered hover className="CCM-table">
              <thead>
                <tr>
                  <th>Contract ID</th>
                  <th>Title</th>
                  <th>Worker Name</th>
                  <th>Worker ID</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract) => (
                  <tr key={contract.id}>
                    <td>{contract.id}</td>
                    <td>{contract.title}</td>
                    <td>{contract.workerName}</td>
                    <td>{contract.workerId}</td>
                    <td>
                      <Badge 
                        className="CCM-status-badge"
                        style={{ backgroundColor: getStatusColor(contract.status) }}
                      >
                        {contract.status}
                      </Badge>
                    </td>
                    <td>{contract.date}</td>
                    <td>
                      <div className="CCM-actions-container">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          href={contract.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="CCM-action-btn"
                          title="View PDF"
                        >
                          <FaFilePdf />
                        </Button>
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() => handleViewDetails(contract, "contractWorkers")}
                          className="CCM-action-btn"
                          title="View Workers"
                        >
                          <FaUsers />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {/* Worker Details Modal */}
        <Modal show={showModal && modalType === "workerDetails"} onHide={handleModalClose} centered size="lg">
          <Modal.Header closeButton className="CCM-modal-header">
            <Modal.Title>
              <FaUserCircle /> Worker Profile: {selectedItem?.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <div className="CCM-details-container">
                <div className="CCM-detail-row">
                  <FaInfoCircle className="CCM-detail-icon" />
                  <span className="CCM-detail-label">Worker ID:</span>
                  <span>{selectedItem.id}</span>
                </div>
                <div className="CCM-detail-row">
                  <FaUserTie className="CCM-detail-icon" />
                  <span className="CCM-detail-label">Position:</span>
                  <span>{selectedItem.position}</span>
                </div>
                <div className="CCM-detail-row">
                  <FaCalendarDay className="CCM-detail-icon" />
                  <span className="CCM-detail-label">Age:</span>
                  <span>{selectedItem.age}</span>
                </div>
                <div className="CCM-detail-row">
                  <FaStar className="CCM-detail-icon" />
                  <span className="CCM-detail-label">Experience:</span>
                  <span>{selectedItem.experience}</span>
                </div>
                <div className="CCM-detail-row">
                  <FaMapMarkerAlt className="CCM-detail-icon" />
                  <span className="CCM-detail-label">Location:</span>
                  <span>{selectedItem.location}</span>
                </div>
                <div className="CCM-detail-row">
                  <FaStar className="CCM-detail-icon" />
                  <span className="CCM-detail-label">Rating:</span>
                  <span>{selectedItem.rating}/5</span>
                </div>
                <div className="CCM-detail-row">
                  <FaTools className="CCM-detail-icon" />
                  <span className="CCM-detail-label">Skills:</span>
                  <div className="CCM-skills-container">
                    {selectedItem.skills.map((skill, index) => (
                      <Badge key={index} pill className="CCM-skill-badge">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="CCM-detail-row">
                  <span className="CCM-detail-label">Status:</span>
                  <Badge 
                    className="CCM-status-badge"
                    style={{ backgroundColor: getStatusColor(selectedItem.status) }}
                  >
                    {selectedItem.status}
                  </Badge>
                </div>
                {selectedItem.payslips.length > 0 && (
                  <div className="CCM-detail-row">
                    <FaFilePdf className="CCM-detail-icon" />
                    <span className="CCM-detail-label">Payslips:</span>
                    <div className="CCM-payslips-list">
                      {selectedItem.payslips.map((payslip, index) => (
                        <div key={index} className="CCM-payslip-item">
                          <span>{payslip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose} className="CCM-modal-btn">
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Worker Contract Modal */}
        <Modal show={showModal && modalType === "workerContract"} onHide={handleModalClose} centered size="lg">
          <Modal.Header closeButton className="CCM-modal-header">
            <Modal.Title>
              <FaFileAlt /> Assigned Contract: {selectedItem?.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <div className="CCM-details-container">
                <div className="CCM-detail-row">
                  <FaInfoCircle className="CCM-detail-icon" />
                  <span className="CCM-detail-label">Contract ID:</span>
                  <span>{selectedItem.id}</span>
                </div>
                <div className="CCM-detail-row">
                  <FaUserTie className="CCM-detail-icon" />
                  <span className="CCM-detail-label">Worker Name:</span>
                  <span>{selectedItem.workerName}</span>
                </div>
                <div className="CCM-detail-row">
                  <FaInfoCircle className="CCM-detail-icon" />
                  <span className="CCM-detail-label">Worker ID:</span>
                  <span>{selectedItem.workerId}</span>
                </div>
                <div className="CCM-detail-row">
                  <FaUserTie className="CCM-detail-icon" />
                  <span className="CCM-detail-label">Position:</span>
                  <span>{selectedItem.position}</span>
                </div>
                <div className="CCM-detail-row">
                  <span className="CCM-detail-label">Status:</span>
                  <Badge 
                    className="CCM-status-badge"
                    style={{ backgroundColor: getStatusColor(selectedItem.status) }}
                  >
                    {selectedItem.status}
                  </Badge>
                </div>
                <div className="CCM-detail-row">
                  <FaCalendarDay className="CCM-detail-icon" />
                  <span className="CCM-detail-label">Date:</span>
                  <span>{selectedItem.date}</span>
                </div>
                <div className="CCM-detail-row">
                  <span className="CCM-detail-label">Contract Document:</span>
                  <Button
                    variant="outline-danger"
                    href={selectedItem.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="CCM-contract-btn"
                  >
                    <FaFilePdf /> View Contract PDF
                  </Button>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose} className="CCM-modal-btn">
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Contract Workers Modal */}
        <Modal show={showModal && modalType === "contractWorkers"} onHide={handleModalClose} centered size="lg">
          <Modal.Header closeButton className="CCM-modal-header">
            <Modal.Title>
              <FaUsers /> Workers Assigned to Contract: {selectedItem?.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <div className="CCM-details-container">
                <div className="CCM-contract-info">
                  <div className="CCM-info-row">
                    <FaInfoCircle className="CCM-detail-icon" />
                    <span className="CCM-info-label">Contract ID:</span>
                    <span className="CCM-info-value">{selectedItem.id}</span>
                  </div>
                  <div className="CCM-info-row">
                    <FaUserTie className="CCM-detail-icon" />
                    <span className="CCM-info-label">Position:</span>
                    <span className="CCM-info-value">{selectedItem.position}</span>
                  </div>
                  <div className="CCM-info-row">
                    <span className="CCM-info-label">Status:</span>
                    <Badge 
                      className="CCM-status-badge"
                      style={{ backgroundColor: getStatusColor(selectedItem.status) }}
                    >
                      {selectedItem.status}
                    </Badge>
                  </div>
                  <div className="CCM-info-row">
                    <FaCalendarDay className="CCM-detail-icon" />
                    <span className="CCM-info-label">Date:</span>
                    <span className="CCM-info-value">{selectedItem.date}</span>
                  </div>
                </div>
                
                <h5 className="CCM-workers-title">
                  <FaUsers /> Assigned Workers ({getAssignedWorkers(selectedItem.id).length})
                </h5>
                
                <div className="CCM-workers-list">
                  {getAssignedWorkers(selectedItem.id).map(worker => (
                    <div key={worker.id} className="CCM-worker-card">
                      <div className="CCM-worker-main-info">
                        <div className="CCM-worker-avatar">
                          {worker.name.charAt(0)}
                        </div>
                        <div className="CCM-worker-details">
                          <h6 className="CCM-worker-name">{worker.name}</h6>
                          <p className="CCM-worker-position">{worker.position}</p>
                          <p className="CCM-worker-id">
                            <FaInfoCircle /> ID: {worker.id}
                          </p>
                        </div>
                      </div>
                      <div className="CCM-worker-status">
                        <Badge 
                          className="CCM-status-badge"
                          style={{ backgroundColor: getStatusColor(worker.status) }}
                        >
                          {worker.status}
                        </Badge>
                      </div>
                      <div className="CCM-worker-actions">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            handleModalClose();
                            handleViewDetails(worker, "workerDetails");
                          }}
                          className="CCM-view-worker-btn"
                          title="View Profile"
                        >
                          <FaUserCircle />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose} className="CCM-modal-btn">
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Payslip Upload Modal */}
        <Modal show={showPayslipModal} onHide={() => setShowPayslipModal(false)} centered>
          <Modal.Header closeButton className="CCM-modal-header">
            <Modal.Title>
              <FaFileUpload /> Upload Payslip for {selectedWorker?.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handlePayslipSubmit}>
              <Form.Group controlId="formPayslip" className="mb-3">
                <Form.Label>Select Payslip PDF:</Form.Label>
                <Form.Control 
                  type="file" 
                  name="payslip"
                  accept=".pdf" 
                  required 
                />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button 
                  variant="secondary" 
                  onClick={() => setShowPayslipModal(false)} 
                  className="me-2"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  <FaFileUpload /> Upload
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default CCMan;