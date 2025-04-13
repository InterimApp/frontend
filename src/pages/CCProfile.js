import React, { useState, useEffect } from "react";
import { 
  FaBuilding, 
  FaIdCard, 
  FaIndustry, 
  FaPhone, 
  FaEnvelope,
  FaEdit,
  FaSave,
  FaGlobe,
  FaFileAlt
} from "react-icons/fa";
import { Button, Form, Badge, Alert, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CCNavBar from "./CCNavBar";
import "./CCProfile.css";

const CCProfile = () => {
  const [company, setCompany] = useState({
    company_name: "",
    matricule_fiscale: "",
    industry: "",
    user: {
      name: "",
      email: "",
      phone: ""
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setIsLoading(true);
        // Replace with actual API call
        const mockCompany = {
          company_name: "TechnoBuild SARL",
          matricule_fiscale: "MF123456789TND",
          industry: "Construction & Engineering",
          user: {
            name: "Mohamed Ali",
            email: "contact@technobuild.tn",
            phone: "+216 70 123 456"
          }
        };
        setCompany(mockCompany);
      } catch (err) {
        setError("Failed to load company data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in company.user) {
      setCompany(prev => ({
        ...prev,
        user: {
          ...prev.user,
          [name]: value
        }
      }));
    } else {
      setCompany(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // Here you would make the API call to update company data
      // await updateCompanyAPI(company);
      setSuccess("Company profile updated successfully");
      setTimeout(() => setSuccess(null), 3000);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update company profile");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="CCP-loading">
        <CCNavBar />
        <div className="CCP-spinner-container">
          <div className="CCP-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="CCP-error">
        <CCNavBar />
        <Alert variant="danger" className="CCP-alert">
          {error}
        </Alert>
      </div>
    );
  }

  return (
    <>
      <CCNavBar />
      <div className="CCP-container">
        <div className="CCP-header">
          <h1 className="CCP-main-title">
            <FaBuilding /> Company Profile
          </h1>
          <div className="CCP-actions">
            {!isEditing ? (
              <Button
                variant="outline-primary"
                onClick={() => setIsEditing(true)}
                className="CCP-edit-btn"
              >
                <FaEdit /> Edit Profile
              </Button>
            ) : (
              <div className="CCP-save-actions">
                <Button
                  variant="outline-secondary"
                  onClick={() => setIsEditing(false)}
                  className="CCP-cancel-btn"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  className="CCP-save-btn"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : <><FaSave /> Save Changes</>}
                </Button>
              </div>
            )}
          </div>
        </div>

        {success && (
          <Alert variant="success" className="CCP-alert">
            {success}
          </Alert>
        )}

        <Card className="CCP-profile-card">
          <Card.Body>
            <div className="CCP-section">
              <h2 className="CCP-section-title">
                <FaBuilding /> Company Information
              </h2>
              <div className="CCP-detail-grid">
                <div className="CCP-detail-item">
                  <div className="CCP-detail-label">Company Name</div>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      name="company_name"
                      value={company.company_name}
                      onChange={handleInputChange}
                      className="CCP-input"
                    />
                  ) : (
                    <div className="CCP-detail-value">{company.company_name}</div>
                  )}
                </div>

                <div className="CCP-detail-item">
                  <div className="CCP-detail-label">Fiscal Registration</div>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      name="matricule_fiscale"
                      value={company.matricule_fiscale}
                      onChange={handleInputChange}
                      className="CCP-input"
                    />
                  ) : (
                    <div className="CCP-detail-value">
                      <Badge bg="secondary" className="CCP-badge">
                        <FaFileAlt /> {company.matricule_fiscale}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="CCP-detail-item">
                  <div className="CCP-detail-label">Industry</div>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      name="industry"
                      value={company.industry}
                      onChange={handleInputChange}
                      className="CCP-input"
                    />
                  ) : (
                    <div className="CCP-detail-value">
                      <Badge bg="info" className="CCP-badge">
                        <FaIndustry /> {company.industry}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="CCP-section">
              <h2 className="CCP-section-title">
                <FaIdCard /> Legal Representative
              </h2>
              <div className="CCP-detail-grid">
                <div className="CCP-detail-item">
                  <div className="CCP-detail-label">Full Name</div>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      name="name"
                      value={company.user.name}
                      onChange={handleInputChange}
                      className="CCP-input"
                    />
                  ) : (
                    <div className="CCP-detail-value">{company.user.name}</div>
                  )}
                </div>

                <div className="CCP-detail-item">
                  <div className="CCP-detail-label">Email</div>
                  {isEditing ? (
                    <Form.Control
                      type="email"
                      name="email"
                      value={company.user.email}
                      onChange={handleInputChange}
                      className="CCP-input"
                    />
                  ) : (
                    <div className="CCP-detail-value">
                      <FaEnvelope /> {company.user.email}
                    </div>
                  )}
                </div>

                <div className="CCP-detail-item">
                  <div className="CCP-detail-label">Phone</div>
                  {isEditing ? (
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={company.user.phone}
                      onChange={handleInputChange}
                      className="CCP-input"
                    />
                  ) : (
                    <div className="CCP-detail-value">
                      <FaPhone /> {company.user.phone}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default CCProfile;