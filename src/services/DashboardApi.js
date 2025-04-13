const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

export const fetchDashboardData = async (workerId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/${workerId}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to load dashboard data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

export const searchJobs = async (workerId, { location, profession, page = 1, limit = 10 }) => {
  try {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (profession) params.append('profession', profession);
    params.append('page', page);
    params.append('limit', limit);

    const response = await fetch(`${API_BASE_URL}/dashboard/${workerId}/jobs/search?${params}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to search jobs');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching jobs:', error);
    throw error;
  }
};

export const applyForJob = async (jobId, userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/job-applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        jobId,
        userId
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Application failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error applying for job:', error);
    throw error;
  }
};