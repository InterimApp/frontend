import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoMdDownload } from 'react-icons/io';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchUserPayslips, fetchPayslipDetails, downloadPayslip } from '../services/PayslipApi';
import './IWPayment.css';

const IWPayment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPayslip, setCurrentPayslip] = useState(null);
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = 2; // Replace with actual user ID from auth

  useEffect(() => {
    const loadPayslips = async () => {
      try {
        setLoading(true);
        console.log('Fetching payslips...'); // Debug log
        const response = await fetchUserPayslips(userId);
        console.log('API Response:', response); // Debug log
        
        if (!response) {
          throw new Error('Empty response from server');
        }
  
        const transformedPayslips = response.map(payslip => ({
          ...payslip,
          date: new Date(payslip.date).toLocaleDateString('fr-FR'),
          salary: "5000.00" // Temporary mock value
        }));
        
        setPayslips(transformedPayslips);
      } catch (error) {
        console.error('Failed to load payslips:', error);
        alert(`Error loading payslips: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    loadPayslips();
  }, [userId]);

  const handleViewDetails = async (payslipId) => {
    try {
      const payslipDetails = await fetchPayslipDetails(payslipId);
      setCurrentPayslip({
        ...payslipDetails,
        formatted_date: new Date(payslipDetails.date).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to load payslip details:', error);
      alert('Error loading payslip details');
    }
  };

  const handleDownload = async (payslipId) => {
  try {
    console.log(`Initiating download for payslip ID: ${payslipId}`);
    
    // For development (direct download):
    const response = await fetch(`http://localhost:8080/api/payslips/download/${payslipId}`);
    if (response.status === 200) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payslip_${payslipId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }

    // For production (Firebase signed URL):
    const result = await downloadPayslip(payslipId);
    console.log('Received download URL:', result);
    window.open(result, '_blank');
    
  } catch (error) {
    console.error('Download failed:', error);
    alert(`Échec du téléchargement: ${error.message}`);
  }
};

  const getStatusColor = (status) => {
    return status === 'Paid' ? '#28a745' : '#ffa726';
  };

  return (
    <div className="IWPA-contract-container">
      <div className="IWPA-table-card">
        <div className="IWPA-report-header">
          <h1 className="IWPA-title-contract">Your Payslips</h1>
        </div>
        
        <div className="IWPA-mini-bar-header">
          <h6>ID</h6>
          <h6>Date</h6>
          <h6>Salary</h6>
          <h6>Status</h6>
          <h6>Actions</h6>
        </div>

        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : payslips.length > 0 ? (
          payslips.map((payslip) => (
            <div key={payslip.id} className="IWPA-mini-bar-row">
              <span>{payslip.id}</span>
              <span>{payslip.date}</span>
              <span>${payslip.salary}</span>
              <span style={{ color: getStatusColor(payslip.status), fontWeight: 600 }}>
                {payslip.status}
              </span>
              <span className="IWPA-action-icons">
                <button 
                  className="btn btn-link p-0"
                  onClick={() => handleViewDetails(payslip.id)}
                >
                  <FaEye className="text-primary" />
                </button>
                <button 
                  className="btn btn-link p-0 ml-2"
                  onClick={() => handleDownload(payslip.id)}
                >
                  <IoMdDownload className="text-success" />
                </button>
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-4">No payslips found</div>
        )}
      </div>

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payslip Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentPayslip && (
            <div className="IWPA-popup-container">
              <table className="IWPA-contract-details-table">
                <tbody>
                  <tr>
                    <th>Employee</th>
                    <td>{currentPayslip.employee_name}</td>
                  </tr>
                  <tr>
                    <th>Company</th>
                    <td>{currentPayslip.company}</td>
                  </tr>
                  <tr>
                    <th>Position</th>
                    <td>{currentPayslip.job_title}</td>
                  </tr>
                  <tr>
                    <th>Payment Date</th>
                    <td>{currentPayslip.formatted_date}</td>
                  </tr>
                  <tr>
                    <th>Salary</th>
                    <td>${currentPayslip.salary}</td>
                  </tr>
                  <tr>
                    <th>Regular Hours</th>
                    <td>{currentPayslip.work_hours}</td>
                  </tr>
                  <tr>
                    <th>Overtime Hours</th>
                    <td>{currentPayslip.overtime_hours}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td style={{ color: getStatusColor(currentPayslip.status), fontWeight: 600 }}>
                      {currentPayslip.status}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
          <button 
  className="btn btn-link p-0 ml-2"
  onClick={() => handleDownload(payslips.id)}
  disabled={loading}
>
  {loading ? (
    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  ) : (
    <IoMdDownload className="text-success" />
  )}
</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IWPayment;