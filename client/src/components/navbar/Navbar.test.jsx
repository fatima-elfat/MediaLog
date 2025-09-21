import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Navbar from './Navbar';
import { AuthContext } from '../../context/AuthProvider';

const renderWithRouter = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider value={providerProps}>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthContext.Provider>,
    renderOptions
  );
};

describe('Navbar', () => {
  it('renders logo and navigation links', () => {
    const providerProps = {
      currentUser: null,
    };
    renderWithRouter(<Navbar />, { providerProps });
    expect(screen.getByText('MediaLog')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('shows sign-in and sign-up links when user is not authenticated', () => {
    const providerProps = {
      currentUser: null,
    };
    renderWithRouter(<Navbar />, { providerProps });
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('shows user information and logout when user is authenticated', () => {
    const providerProps = {
      currentUser: { username: 'testuser' },
    };
    renderWithRouter(<Navbar />, { providerProps });
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    const providerProps = {
      currentUser: null,
    };
    renderWithRouter(<Navbar />, { providerProps });
    const menuIcon = screen.getByAltText('menu');
    fireEvent.click(menuIcon);
    expect(screen.getByRole('navigation')).toHaveClass('active');
    fireEvent.click(menuIcon);
    expect(screen.getByRole('navigation')).not.toHaveClass('active');
  });
});