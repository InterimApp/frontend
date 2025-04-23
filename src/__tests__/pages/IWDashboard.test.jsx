import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import IWDashboard from '../../pages/IWDashboard';
import { BrowserRouter } from 'react-router-dom';
import { fetchDashboardData } from '../../services/DashboardApi';

// Global mock (this must be hoisted to top level)
jest.mock('../../services/DashboardApi', () => ({
  fetchDashboardData: jest.fn(),
}));

// Router wrapper
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

test('renders search input box', async () => {
    fetchDashboardData.mockImplementation(() =>
      Promise.resolve({
        data: {
          stats: {
            worker: { name: 'Ahmed' },
          },
          recommendations: [],
        },
      })
    );
  
    renderWithRouter(<IWDashboard />);
    const searchInput = await screen.findByPlaceholderText(/Search by job title/i);
    expect(searchInput).toBeInTheDocument();
  });
  
  test('renders recommendation section when data is loaded', async () => {
    fetchDashboardData.mockImplementation(() =>
      Promise.resolve({
        data: {
          stats: {
            worker: { name: 'Ahmed' },
          },
          recommendations: [], 
        },
      })
    );
  
    renderWithRouter(<IWDashboard />);
    const sectionTitle = await screen.findByText(/Recommended For You/i);
    expect(sectionTitle).toBeInTheDocument();
  });
  