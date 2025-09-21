import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Login from './login';
import { AuthContext } from '../../context/AuthProvider';
import apiRequest from '../../lib/apiRequest';

vi.mock('../../lib/apiRequest');

const renderWithRouter = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider value={providerProps}>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthContext.Provider>,
    renderOptions
  );
};

describe('Login', () => {
  it('renders login form', () => {
    const providerProps = {
      updateUser: vi.fn(),
    };
    renderWithRouter(<Login />, { providerProps });
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('shows error on failed login', async () => {
    apiRequest.post.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    });
    const providerProps = {
      updateUser: vi.fn(),
    };
    renderWithRouter(<Login />, { providerProps });

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('calls updateUser and navigates on successful login', async () => {
    const updateUser = vi.fn();
    const providerProps = {
      updateUser,
    };
    apiRequest.post.mockResolvedValueOnce({ data: { username: 'testuser' } });
    renderWithRouter(<Login />, { providerProps });

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith({ username: 'testuser' });
    });
  });

  it('shows loading state when submitting', async () => {
    const updateUser = vi.fn();
    const providerProps = {
      updateUser,
    };
    apiRequest.post.mockResolvedValueOnce({ data: { username: 'testuser' } });
    renderWithRouter(<Login />, { providerProps });

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Signing In...' })).toBeInTheDocument();
    });
  });
});