import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DashBoard from './dashBoard';

describe('DashBoard', () => {
  it('renders the dashboard with default media type', () => {
    render(<DashBoard />);
    expect(screen.getByText('My Books')).toBeInTheDocument();
    expect(screen.getByText('The Name of the Wind')).toBeInTheDocument();
  });

  it('switches between media types', () => {
    render(<DashBoard />);
    fireEvent.click(screen.getByText('Movies'));
    expect(screen.getByText('My Movies')).toBeInTheDocument();
    expect(screen.getByText('Inception')).toBeInTheDocument();

    fireEvent.click(screen.getByText('TV Shows'));
    expect(screen.getByText('My TV Shows')).toBeInTheDocument();
    expect(screen.getByText('Stranger Things')).toBeInTheDocument();
  });

  it('renders the correct number of items for the selected media type', () => {
    render(<DashBoard />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2); // 2 books

    fireEvent.click(screen.getByText('Movies'));
    expect(screen.getAllByRole('listitem')).toHaveLength(2); // 2 movies

    fireEvent.click(screen.getByText('TV Shows'));
    expect(screen.getAllByRole('listitem')).toHaveLength(1); // 1 TV show
  });

  it('renders the progress bar for books', () => {
    render(<DashBoard />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});