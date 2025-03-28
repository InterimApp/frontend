import React, { useState } from 'react';
import './Contract.css'; // Import the CSS file
import { FaEye, FaSearch, FaSlidersH } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { TbContract } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PDF_FILE_URL = 'http://localhost:3000/file_pdf.png';

const Contract = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const downloadFileAtURL = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));
        const fileName = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
        {/* Sample row for active contract */}
        <div className="mini-bar-row">
          <span>Warehouse Assistant</span>
          <span>XYZ</span>
          <span>January 1, 2025</span>
          <span>December 31, 2025</span>
          <span className="not-signed">Not signed</span>
          <span>
            <button onClick={handleOpenModal}>
              <FaEye />
            </button>
            <Link to="/Signature">
              <button>
                <TbContract />
              </button>
            </Link>
            <button onClick={() => downloadFileAtURL(PDF_FILE_URL)}>
              <IoMdDownload />
            </button>
          </span>
        </div>
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
        {/* Sample rows for contract history */}
        <div className="mini-bar-row">
          <span>Sales Assistant</span>
          <span>XYZ</span>
          <span>Jan 1, 2024</span>
          <span>Dec 31, 2024</span>
          <span className="expired">Expired</span>
          <span>
            <button onClick={handleOpenModal}>
              <FaEye />
            </button>
            <button>
              <IoMdDownload />
            </button>
          </span>
        </div>

        <div className="mini-bar-row">
          <span>Customer Service Rep</span>
          <span>XYZ</span>
          <span>Jan 15, 2023</span>
          <span>Dec 15, 2023</span>
          <span className="expired">Expired</span>
          <span>
            <button onClick={handleOpenModal}>
              <FaEye />
            </button>
            <button>
              <IoMdDownload />
            </button>
          </span>
        </div>
      </div>

      {/* Modal Popup */}
      <Modal show={isModalOpen} onHide={handleCloseModal} centered>
        <div className="IWD-popup-container">
          <button className="IWD-close-btn" onClick={handleCloseModal}>
            ✖
          </button>
          <div >
          <h2>Contract Details</h2>
        <table className="contract-details-table">
          <tbody>
            <tr>
              <th>Job Title</th>
              <td>Warehouse Assistant</td>
            </tr>
            <tr>
              <th>Company</th>
              <td>XYZ Corporation</td>
            </tr>
            <tr>
              <th>Start Date</th>
              <td>January 1, 2025</td>
            </tr>
            <tr>
              <th>End Date</th>
              <td>December 31, 2025</td>
            </tr>
            <tr>
              <th>Status</th>
              <td className="not-signed">Not Signed</td>
            </tr>
          </tbody>
        </table>

        <h4>Contract Terms:</h4>
        <ul>
          <li>Salary: $40,000 per year</li>
          <li>Working Hours: 40 hours per week</li>
          <li>Location: XYZ Warehouse, Downtown</li>
        </ul>
           
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Contract;