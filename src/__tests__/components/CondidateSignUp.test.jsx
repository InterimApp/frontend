import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CondidateSignUp from '../../pages/CondidateSignUp';
import { BrowserRouter } from 'react-router-dom';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: '12345', email: 'test@example.com' }
  })),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({
    user: { uid: '12345', email: 'test@example.com' }
  })),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({ /* mock Firestore instance */ })),
  setDoc: jest.fn(() => Promise.resolve()),
  doc: jest.fn(() => ({})),
  serverTimestamp: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(() => ({})),
}));

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: { secure_url: 'mockCvUrl' } })),
}));


const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

test('renders all form fields', () => {
  renderWithRouter(<CondidateSignUp />);
  
  expect(screen.getByTestId('first-name-input')).toBeInTheDocument();
  expect(screen.getByTestId('last-name-input')).toBeInTheDocument();
  expect(screen.getByTestId('age-input')).toBeInTheDocument();
  expect(screen.getByTestId('email-input')).toBeInTheDocument();
  expect(screen.getByTestId('password-input')).toBeInTheDocument();
  expect(screen.getByTestId('cv-upload')).toBeInTheDocument();
  expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
});

test('handles input changes correctly', () => {
  renderWithRouter(<CondidateSignUp />);
  
  fireEvent.change(screen.getByTestId('first-name-input'), {
    target: { value: 'John' },
  });
  expect(screen.getByTestId('first-name-input').value).toBe('John');
});


