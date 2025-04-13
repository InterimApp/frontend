import React, { useState, useEffect } from "react";
import { TUNISIAN_CITIES, PROFESSIONS } from '../constants/tunisia';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge, Modal, Form } from "react-bootstrap";
import IWNavBar from "./IWNavBar";
import { 
  BsClockHistory, 
  BsFileEarmarkText, 
  BsCheckCircle, 
  BsGraphUp,
  BsClock,
  BsStars
} from "react-icons/bs";
import { 
  FaSearch, 
  FaFilter,
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaMoneyBillWave,
  FaBuilding, 
  FaCalendarAlt,
  FaChevronRight,
  FaChevronDown,
  FaExclamationTriangle,
  FaSlidersH,
  FaTimes
} from "react-icons/fa";
import { fetchDashboardData, searchJobs, applyForJob } from "../services/DashboardApi";
import "./IWDashboard.css";

const IWDashboard = () => {
  // State management
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    profession: "",
    searchQuery: ""
  });
  const [statsLoading, setStatsLoading] = useState(false);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchPagination, setSearchPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  });
  const [hasSearched, setHasSearched] = useState(false);

  const workerId = 8; // Replace with actual auth logic

  // Data fetching
  useEffect(() => {
    const loadData = async () => {
      try {
        setStatsLoading(true);
        setRecommendationsLoading(true);
        
        const data = await fetchDashboardData(workerId);
        setDashboardData(data.data);
        
        setStatsLoading(false);
        setTimeout(() => setRecommendationsLoading(false), 500);
      } catch (err) {
        setError(err.message);
      } finally {
        setStatsLoading(false);
        setRecommendationsLoading(false);
      }
    };
    loadData();
  }, [workerId]);

  // Search handler
  const handleSearchSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await searchJobs(workerId, {
        location: filters.location,
        profession: filters.profession,
        searchQuery: filters.searchQuery,
        page: 1,
        limit: 10
      });
      
      setSearchResults(data.jobs);
      setSearchPagination(data.pagination);
      setHasSearched(true);
      setShowFilters(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setHasSearched(false);
    setSearchResults([]);
    setFilters({ 
      location: "", 
      profession: "",
      searchQuery: "" 
    });
  };

  const handlePageChange = async (newPage) => {
    try {
      setLoading(true);
      const { data } = await searchJobs(workerId, {
        location: filters.location,
        profession: filters.profession,
        searchQuery: filters.searchQuery,
        page: newPage,
        limit: searchPagination.limit
      });
      
      setSearchResults(data.jobs);
      setSearchPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Job application handler
  const handleApply = async (jobId) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?.id) throw new Error('User not authenticated');
  
      await applyForJob(jobId, user.id);
      alert("Application submitted successfully!");
      
      // Refresh data
      const data = await fetchDashboardData(user.id);
      setDashboardData(data.data);
    } catch (err) {
      setError(err.message);
      alert(`Application failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading && !dashboardData) return (
    <div className="loading-overlay">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p>Loading dashboard data...</p>
    </div>
  );

  // Error state
  if (error) return (
    <div className="error-overlay">
      <Alert variant="danger">
        <FaExclamationTriangle className="me-2" />
        <p>{error}</p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Alert>
    </div>
  );

  // Job Card Component
  const JobCard = ({ job, onApply }) => (
    <Col md={4} className="mb-4">
      <Card className="job-card h-100">
        <Card.Body className="d-flex flex-column">
          <div className="job-badge mb-2" style={{ backgroundColor: getColorForProfession(job.profession) }}>
            {job.profession}
          </div>
          <Card.Title className="job-title">{job.title}</Card.Title>
          <div className="job-company mb-2">
            <FaBuilding className="me-1" />
            {job.company}
          </div>
          <div className="job-meta mb-2">
            <span className="job-location">
              <FaMapMarkerAlt /> {job.location}
            </span>
            <span className="job-type">
              <FaBriefcase /> {job.type}
            </span>
          </div>
          <div className="job-salary mb-2">
            <FaMoneyBillWave /> {job.salary}
          </div>
          <div className="job-skills mb-3">
            <h6>Required Skills:</h6>
            <div className="skill-tags">
              {job.skills?.split(',').map(skill => (
                <span key={skill} className="skill-tag">{skill.trim()}</span>
              ))}
            </div>
          </div>
          <div className="job-posted mb-3">
            <small>
              <FaCalendarAlt className="me-1" />
              Posted: {job.posted}
            </small>
          </div>
          <Button 
            variant="primary" 
            className="apply-btn mt-auto"
            onClick={() => onApply(job.id)}
          >
            Apply Now
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <div className="dashboard">
      <IWNavBar />
      
      <div className="dashboard-content">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-header">
            <h1 >Welcome, <span className="nameW">{dashboardData?.stats?.worker?.name}</span></h1>
            <div className="last-login">
              <BsClock /> Last active: {new Date().toLocaleDateString()}
            </div>
          </div>
          <p className="welcome-subtitle">Find your next opportunity</p>
          
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by job title, city....." 
                className="search-input"
                value={filters.searchQuery}
                onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
              />
              <button 
                className="filter-btn"
                onClick={() => setShowFilters(true)}
              >
                <FaFilter className="me-2" /> Filters
              </button>
              <button 
                className="search-btn"
                onClick={handleSearchSubmit}
              >
                <FaSearch className="me-2" /> Rechercher
              </button>
            </div>
            {hasSearched && (
              <div className="active-filters mt-3">
                {filters.searchQuery && (
                  <Badge pill bg="light" text="dark" className="me-2">
                    Search: {filters.searchQuery}
                  </Badge>
                )}
                {filters.location && (
                  <Badge pill bg="light" text="dark" className="me-2">
                    <FaMapMarkerAlt className="me-1" />
                    {filters.location}
                  </Badge>
                )}
                {filters.profession && (
                  <Badge pill bg="light" text="dark" className="me-2">
                    <FaBriefcase className="me-1" />
                    {filters.profession}
                  </Badge>
                )}
                <Button 
                  variant="link" 
                  size="sm"
                  onClick={handleClearSearch}
                  className="text-danger"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Search Results Section - Now positioned right under search bar */}
          {hasSearched && (
            <div className="search-results-section">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="section-title">
                  <FaSearch className="me-2" />
                  Search Results
                  <small className="text-muted ms-2">
                    ({searchPagination.total} jobs found)
                  </small>
                </h3>
                <Button variant="outline-secondary" onClick={handleClearSearch}>
                  Back to recommendations
                </Button>
              </div>
              
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" />
                  <p>Loading search results...</p>
                </div>
              ) : error ? (
                <Alert variant="danger">
                  {error}
                  <Button variant="outline-danger" className="ms-3" size="sm" onClick={handleSearchSubmit}>
                    Retry
                  </Button>
                </Alert>
              ) : searchResults.length > 0 ? (
                <>
                  <Row className="jobs-grid">
                    {searchResults.map((job) => (
                      <JobCard key={job.id} job={job} onApply={handleApply} />
                    ))}
                  </Row>
                  {searchPagination.pages > 1 && (
                    <div className="pagination-controls mt-4 text-center">
                      <Button 
                        variant="outline-primary" 
                        disabled={searchPagination.page === 1}
                        onClick={() => handlePageChange(searchPagination.page - 1)}
                        className="me-2"
                      >
                        Previous
                      </Button>
                      <span className="mx-2">
                        Page {searchPagination.page} of {searchPagination.pages}
                      </span>
                      <Button 
                        variant="outline-primary" 
                        disabled={searchPagination.page === searchPagination.pages}
                        onClick={() => handlePageChange(searchPagination.page + 1)}
                        className="ms-2"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-results text-center py-5">
                  <div className="empty-state-icon mb-3">
                    <FaSearch size={48} className="text-muted" />
                  </div>
                  <h4>No jobs match your search criteria</h4>
                  <p className="text-muted mb-4">Try adjusting your filters or search terms</p>
                  <Button 
                    variant="primary"
                    onClick={() => setShowFilters(true)}
                  >
                    Modify Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Stats Section */}
        <Container className="stats-section">
          <h3 className="section-title">
            <BsGraphUp className="me-2" />
            Your Activity Summary
          </h3>
          <Row className="stats-row">
            <Col md={4}>
              <Card className="stat-card">
                <Card.Body>
                  <div className="stat-icon hours-icon">
                    <BsClockHistory />
                  </div>
                  <Card.Title>Hours Worked</Card.Title>
                  {statsLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <Card.Text className="stat-value">
                      {dashboardData?.stats?.totalHoursWorked || 0} <small>hours</small>
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="stat-card">
                <Card.Body>
                  <div className="stat-icon contracts-icon">
                    <BsFileEarmarkText />
                  </div>
                  <Card.Title>Active Contracts</Card.Title>
                  {statsLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <Card.Text className="stat-value">
                      {dashboardData?.stats?.activeMissions || 0} <small>missions</small>
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="stat-card">
                <Card.Body>
                  <div className="stat-icon applications-icon">
                    <BsCheckCircle />
                  </div>
                  <Card.Title>Pending Applications</Card.Title>
                  {statsLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <Card.Text className="stat-value">
                      {dashboardData?.stats?.pendingApplications || 0}
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Recommendations Section */}
        {!hasSearched && (
          <Container className="recommendations-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="section-title">
                <BsStars className="me-2" />
                Recommended For You
                <small className="text-muted ms-2">
                  Based on your profile and location
                </small>
              </h3>
              <Button variant="outline-primary" onClick={() => setShowFilters(true)}>
                <FaFilter className="me-1" /> Find Other Jobs
              </Button>
            </div>
            
            {recommendationsLoading ? (
              <div className="text-center py-5">
                <Spinner animation="border" />
                <p>Loading recommendations...</p>
              </div>
            ) : (
              <>
                {dashboardData?.recommendations?.length > 0 ? (
                  <Row className="jobs-grid">
                    {dashboardData.recommendations.map((job) => (
                      <JobCard key={job.id} job={job} onApply={handleApply} />
                    ))}
                  </Row>
                ) : (
                  <div className="no-results text-center py-5">
                    <div className="empty-state-icon mb-3">
                      <BsStars size={48} className="text-muted" />
                    </div>
                    <h4>No recommendations available</h4>
                    <p className="text-muted mb-4">We'll suggest jobs as we learn more about your preferences</p>
                    <Button 
                      variant="primary"
                      onClick={() => setShowFilters(true)}
                    >
                      Browse All Jobs
                    </Button>
                  </div>
                )}
              </>
            )}
          </Container>
        )}
      </div>

      {/* Filter Modal */}
      <Modal show={showFilters} onHide={() => setShowFilters(false)} centered className="filter-modal-colored">
  <Modal.Header closeButton className="border-0">
    <Modal.Title className="w-100 text-center">
      <div className="modal-header-content-colored">
        <div className="modal-icon-circle-colored">
          <FaFilter size={24} className="text-white" />
        </div>
        <h4 className="modal-title-text-colored">Filtrer les résultats</h4>
      </div>
    </Modal.Title>
  </Modal.Header>
  
  <Modal.Body>
    {/* Localisation */}
    <Form.Group className="mb-4">
      <Form.Label className="filter-label-colored">
        <FaMapMarkerAlt className="me-2" />
        Localisation
      </Form.Label>
      <div className="select-wrapper-colored">
        <Form.Select
          value={filters.location}
          onChange={(e) => setFilters({...filters, location: e.target.value})}
          className="form-select-colored"
        >
          <option value="">Toute la Tunisie</option>
          {TUNISIAN_CITIES.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </Form.Select>
        <FaChevronDown className="select-arrow-colored" />
      </div>
    </Form.Group>

    {/* Métier */}
    <Form.Group className="mb-4">
      <Form.Label className="filter-label-colored">
        <FaBriefcase className="me-2" />
        Métier
      </Form.Label>
      <div className="select-wrapper-colored">
        <Form.Select
          value={filters.profession}
          onChange={(e) => setFilters({...filters, profession: e.target.value})}
          className="form-select-colored"
        >
          <option value="">Tous les métiers</option>
          {PROFESSIONS.map(prof => (
            <option key={prof} value={prof}>{prof}</option>
          ))}
        </Form.Select>
        <FaChevronDown className="select-arrow-colored" />
      </div>
    </Form.Group>
  </Modal.Body>

  <Modal.Footer className="border-0">
    <div className="d-flex w-100 gap-3">
      <Button 
        variant="outline-orange" 
        onClick={handleClearSearch}
        className="filter-clear-btn"
      >
        Réinitialiser
      </Button>
      <Button 
        variant="orange" 
        onClick={() => {
          setShowFilters(false);
          handleSearchSubmit();
        }}
        className="filter-apply-btn"
      >
        Appliquer les filtres
      </Button>
    </div>
  </Modal.Footer>
</Modal>
    </div>
  );
};

// Helper function for profession colors
const getColorForProfession = (profession) => {
  const colors = {
    'Service Client': '#FF914D',
    'Logistique': '#4CAF50',
    'Administratif': '#2196F3',
    'IT': '#9C27B0',
    'default': '#607D8B'
  };
  return colors[profession] || colors.default;
};

export default IWDashboard;