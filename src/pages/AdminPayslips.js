import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FaEye, FaUpload } from "react-icons/fa";
import "./AdminPayslips.css";
import AdminNavBar from "./AdminNavBar";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminPayslips = () => {
  // Sample payslip data
  const [payslips, setPayslips] = useState([
    {
      id: "1001",
      company: "Tech Solutions Inc.",
      workerName: "John Smith",
      period: "2024-3-4",
    },
    {
      id: "1002",
      company: "Analytics Corp",
      workerName: "Sarah Johnson",
      period: "2024-3-15",
    },
  ]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    company: "",
    workerName: "",
    period: "",
    file: null,
  });

  const handleViewDetails = (payslipId) => {
    console.log(`View details for payslip ${payslipId}`);
    // Add your view details logic here
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation if needed
    const newPayslip = {
      id: formData.id,
      company: formData.company,
      workerName: formData.workerName,
      period: formData.period,
    };

    setPayslips([...payslips, newPayslip]);
    setFormData({
      id: "",
      company: "",
      workerName: "",
      period: "",
      file: null,
    });
    handleCloseModal();
    console.log("Payslip submitted:", newPayslip);
    console.log("File uploaded:", formData.file?.name);
  };

  return (
    <div className="PS-container">
      <AdminNavBar />
      <div className="PS-header">
        <h2 className="PS-title">Payslips Management</h2>
        <Button
          variant="primary"
          className="PS-upload-btn"
          onClick={handleShowModal}
        >
          <FaUpload /> Upload Payslip
        </Button>
      </div>

      <div className="PS-table-container">
        <Table striped bordered hover className="PS-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Company Name</th>
              <th>Worker Name</th>
              <th>Period</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payslips.map((payslip) => (
              <tr key={payslip.id}>
                <td>{payslip.id}</td>
                <td>{payslip.company}</td>
                <td>{payslip.workerName}</td>
                <td>{payslip.period}</td>
                <td className="PS-actions-cell">
                  <FaEye
                    className="PS-icon PS-view"
                    onClick={() => handleViewDetails(payslip.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Upload Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload New Payslip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Payslip ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Worker Name</Form.Label>
              <Form.Control
                type="text"
                name="workerName"
                value={formData.workerName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Period </Form.Label>
              <Form.Control
                type="text"
                name="period"
                value={formData.period}
                onChange={handleInputChange}
                placeholder="e.g. 2024-4-2 "
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payslip File</Form.Label>
              <div className="file-input-wrapper">
                <label className="file-input-label">
                  <span>Choose File</span>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="file-input"
                    required
                  />
                </label>
                <span className="file-name">
                  {formData.file ? formData.file.name : "No file chosen"}
                </span>
              </div>
            </Form.Group>

            <div className="PS-modal-actions">
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                className="PS-modal-cancel"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="PS-modal-submit"
              >
                Upload Payslip
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminPayslips;
