import React, { useState, useEffect } from 'react';
import './Contract.css';
import { FaEye } from 'react-icons/fa';
import { IoMdDownload } from 'react-icons/io';
import { TbContract } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchContracts, downloadContract } from '../services/ContractApi';

const Contract = () => {
  const [state, setState] = useState({
    contracts: [],
    loading: true,
    error: null,
    currentContract: null,
    showModal: false
  });

  const userId = 8; // Replace with actual user ID from auth

  useEffect(() => {
    const loadContracts = async () => {
      try {
        const response = await fetchContracts(userId);
        setState(prev => ({
          ...prev,
          contracts: response.data || [],
          loading: false,
          error: null
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error.message,
          contracts: []
        }));
      }
    };

    loadContracts();
  }, [userId]);

  const handleViewContract = (contract) => {
    setState(prev => ({ ...prev, currentContract: contract, showModal: true }));
  };

  const handleDownload = async (contractId) => {
    try {
      const response = await downloadContract(contractId);
      window.open(response.data.downloadUrl, '_blank');
    } catch (error) {
      alert('Failed to download contract');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (state.loading) return <div className="contract-container">Loading contracts...</div>;
  if (state.error) return <div className="contract-container">Error: {state.error}</div>;

  const activeContracts = state.contracts.filter(c => 
    c.status === 'active' && new Date() <= new Date(c.end_date)
  );
  
  const contractHistory = state.contracts.filter(c => 
    c.status !== 'active' || new Date() > new Date(c.end_date)
  );

  return (
    <div className="contract-container">
      {/* Active Contract Section */}
      <div className="active-card table-card">
        <h1 className="title-contract">Active Contracts</h1>
        <div className="mini-bar-header">
          <h6>Job Title</h6>
          <h6>Company</h6>
          <h6>Start Date</h6>
          <h6>End Date</h6>
          <h6>Status</h6>
          <h6>Actions</h6>
        </div>
        
        {activeContracts.length > 0 ? (
          activeContracts.map(contract => (
            <div className="mini-bar-row" key={contract.id}>
              <span>{contract.job_title}</span>
              <span>{contract.company_name}</span>
              <span>{formatDate(contract.start_date)}</span>
              <span>{formatDate(contract.end_date)}</span>
              <span className={contract.signed ? 'signed' : 'not-signed'}>
                {contract.signed ? 'Signed' : 'Not signed'}
              </span>
              <span>
                <button onClick={() => handleViewContract(contract)}>
                  <FaEye />
                </button>
                {!contract.signed && (
                  <Link to="/signature" state={{ contractId: contract.id }}>
                    <button>
                      <TbContract />
                    </button>
                  </Link>
                )}
                <button onClick={() => handleDownload(contract.id)}>
                  <IoMdDownload />
                </button>
              </span>
            </div>
          ))
        ) : (
          <div className="mini-bar-row">
            <span style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
              No active contracts found
            </span>
          </div>
        )}
      </div>

      {/* Contract History Section */}
      <div className="history-card table-card">
        <h1 className="title-contract">Your Contracts History</h1>
        <div className="mini-bar-header">
          <h6>Job Title</h6>
          <h6>Company</h6>
          <h6>Start Date</h6>
          <h6>End Date</h6>
          <h6>Status</h6>
          <h6>Actions</h6>
        </div>
        
        {contractHistory.length > 0 ? (
          contractHistory.map(contract => (
            <div className="mini-bar-row" key={contract.id}>
              <span>{contract.job_title}</span>
              <span>{contract.company_name}</span>
              <span>{formatDate(contract.start_date)}</span>
              <span>{formatDate(contract.end_date)}</span>
              <span className="expired">Expired</span>
              <span>
                <button onClick={() => handleViewContract(contract)}>
                  <FaEye />
                </button>
                <button onClick={() => handleDownload(contract.id)}>
                  <IoMdDownload />
                </button>
              </span>
            </div>
          ))
        ) : (
          <div className="mini-bar-row">
            <span style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
              No contract history available
            </span>
          </div>
        )}
      </div>

      {/* Modal Popup */}
      <Modal show={state.showModal} onHide={() => setState(prev => ({ ...prev, showModal: false }))} centered>
        {state.currentContract && (
          <div className="IWD-popup-container">
            <button className="IWD-close-btn" onClick={() => setState(prev => ({ ...prev, showModal: false }))}>
              ✖
            </button>
            <div>
              <h2>Contract Details</h2>
              <table className="contract-details-table">
                <tbody>
                  <tr>
                    <th>Job Title</th>
                    <td>{state.currentContract.job_title}</td>
                  </tr>
                  <tr>
                    <th>Company</th>
                    <td>{state.currentContract.company_name}</td>
                  </tr>
                  <tr>
                    <th>Start Date</th>
                    <td>{formatDate(state.currentContract.start_date)}</td>
                  </tr>
                  <tr>
                    <th>End Date</th>
                    <td>{formatDate(state.currentContract.end_date)}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td className={state.currentContract.signed ? 'signed' : 'not-signed'}>
                      {state.currentContract.signed ? 'Signed' : 'Not Signed'}
                    </td>
                  </tr>
                  <tr>
                    <th>Location</th>
                    <td>{state.currentContract.location}</td>
                  </tr>
                  <tr>
                    <th>Salary</th>
                    <td>${state.currentContract.salary}</td>
                  </tr>
                </tbody>
              </table>

              <h4>Contract Terms:</h4>
              <ul>
                <li>Salary: ${state.currentContract.salary}</li>
                <li>Duration: {state.currentContract.duration} months</li>
                <li>Working Hours: {state.currentContract.work_hours || 40} hours/week</li>
                <li>Location: {state.currentContract.location}</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default Contract;