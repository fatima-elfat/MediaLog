import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the Layout component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('renders the HomePage for the root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('homepage')).toBeInTheDocument();
  });

  it('renders the LoginPage for the /login route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('login')).toBeInTheDocument();
  });

  it('renders the RegisterPage for the /register route', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('register')).toBeInTheDocument();
  });

  it('renders the DashboardPage for the /dashboard route', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });
});