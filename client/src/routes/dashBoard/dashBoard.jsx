import React, { useState, useCallback, useMemo } from 'react';
import './dashBoard.scss';

/**
 * Media type configuration with icons and display names.
 * Centralized configuration for consistent media type handling.
 */
const MEDIA_TYPES = {
  books: { icon: '📚', label: 'Books' },
  movies: { icon: '🎬', label: 'Movies' },
  tv: { icon: '📺', label: 'TV Shows' },
  podcasts: { icon: '🎙️', label: 'Podcasts' }
};

/**
 * Sample media data for demonstration purposes.
 * In a real application, this would be fetched from an API.
 */
const SAMPLE_MEDIA_DATA = {
  books: [
    {
      id: 'book-1',
      title: 'The Name of the Wind',
      author: 'Patrick Rothfuss',
      progress: 350,
      total: 662,
      progressPercentage: Math.round((350 / 662) * 100),
    },
    {
      id: 'book-2',
      title: 'Dune',
      author: 'Frank Herbert',
      progress: 120,
      total: 412,
      progressPercentage: Math.round((120 / 412) * 100),
    },
  ],
  movies: [
    {
      id: 'movie-1',
      title: 'Inception',
      director: 'Christopher Nolan',
      status: 'Watched',
      statusClass: 'watched',
    },
    {
      id: 'movie-2',
      title: 'The Martian',
      director: 'Ridley Scott',
      status: 'Unwatched',
      statusClass: 'unwatched',
    },
  ],
  tv: [
    {
      id: 'tv-1',
      title: 'Stranger Things',
      progress: 'Season 4, Episode 2',
    },
  ],
  podcasts: [
    {
      id: 'podcast-1',
      title: 'The Daily',
      progress: 'Latest Episode',
    },
  ],
};

/**
 * Dashboard component for managing and viewing media consumption.
 * 
 * Features:
 * - Media type filtering (books, movies, TV, podcasts)
 * - Media card display with progress tracking
 * - Responsive design for all screen sizes
 * - Add new media functionality (placeholder)
 * 
 * @returns {JSX.Element} The dashboard component
 */
const DashBoard = () => {
  const [activeMediaType, setActiveMediaType] = useState('books');

  /**
   * Handles media type selection.
   * Updates the active media type and triggers re-render of content.
   * 
   * @param {string} mediaType - The selected media type
   */
  const handleMediaTypeChange = useCallback((mediaType) => {
    if (MEDIA_TYPES[mediaType]) {
      setActiveMediaType(mediaType);
    }
  }, []);

  /**
   * Handles adding new media items.
   * Currently a placeholder function - would integrate with API in real app.
   * 
   * @param {string} mediaType - The type of media to add
   */
  const handleAddMedia = useCallback((mediaType) => {
    // TODO: Implement add media functionality
    console.log(`Add new ${mediaType} functionality not yet implemented`);
  }, []);

  /**
   * Renders a book media card with progress tracking.
   * 
   * @param {Object} item - The book item data
   * @returns {JSX.Element} The book card component
   */
  const renderBookCard = useCallback((item) => (
    <div key={item.id} className="media-card">
      <h3 className="card-title">{item.title}</h3>
      <p className="card-subtitle">Author: {item.author}</p>
      <p className="card-progress">
        Progress: <span className="progress-value">{item.progress} / {item.total} pages</span>
      </p>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${item.progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={item.progressPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`${item.progressPercentage}% complete`}
        />
      </div>
    </div>
  ), []);

  /**
   * Renders a movie media card with watch status.
   * 
   * @param {Object} item - The movie item data
   * @returns {JSX.Element} The movie card component
   */
  const renderMovieCard = useCallback((item) => (
    <div key={item.id} className="media-card">
      <h3 className="card-title">{item.title}</h3>
      <p className="card-subtitle">Director: {item.director}</p>
      <p className="card-status">
        Status: <span className={`status-value ${item.statusClass}`}>{item.status}</span>
      </p>
    </div>
  ), []);

  /**
   * Renders a TV show media card with progress information.
   * 
   * @param {Object} item - The TV show item data
   * @returns {JSX.Element} The TV show card component
   */
  const renderTvCard = useCallback((item) => (
    <div key={item.id} className="media-card">
      <h3 className="card-title">{item.title}</h3>
      <p className="card-progress">
        Progress: <span className="progress-value">{item.progress}</span>
      </p>
    </div>
  ), []);

  /**
   * Renders a podcast media card with progress information.
   * 
   * @param {Object} item - The podcast item data
   * @returns {JSX.Element} The podcast card component
   */
  const renderPodcastCard = useCallback((item) => (
    <div key={item.id} className="media-card">
      <h3 className="card-title">{item.title}</h3>
      <p className="card-progress">
        Progress: <span className="progress-value">{item.progress}</span>
      </p>
    </div>
  ), []);

  /**
   * Renders the appropriate media card based on the media type.
   * 
   * @param {Object} item - The media item data
   * @param {string} type - The media type
   * @returns {JSX.Element|null} The rendered media card or null if type not supported
   */
  const renderMediaCard = useCallback((item, type) => {
    switch (type) {
      case 'books':
        return renderBookCard(item);
      case 'movies':
        return renderMovieCard(item);
      case 'tv':
        return renderTvCard(item);
      case 'podcasts':
        return renderPodcastCard(item);
      default:
        console.warn(`Unknown media type: ${type}`);
        return null;
    }
  }, [renderBookCard, renderMovieCard, renderTvCard, renderPodcastCard]);

  /**
   * Memoized media items for the active media type.
   * Prevents unnecessary re-renders when switching between media types.
   */
  const activeMediaItems = useMemo(() => {
    return SAMPLE_MEDIA_DATA[activeMediaType] || [];
  }, [activeMediaType]);

  /**
   * Memoized media type buttons for the sidebar.
   * Prevents unnecessary re-renders of the sidebar.
   */
  const mediaTypeButtons = useMemo(() => {
    return Object.entries(MEDIA_TYPES).map(([type, config]) => (
      <li key={type} className="media-type-item">
        <button
          onClick={() => handleMediaTypeChange(type)}
          className={`media-type-button ${activeMediaType === type ? 'active' : ''}`}
          aria-pressed={activeMediaType === type}
          aria-label={`Switch to ${config.label} view`}
        >
          <span role="img" aria-label={config.label} className="media-icon">
            {config.icon}
          </span>
          {config.label}
        </button>
      </li>
    ));
  }, [activeMediaType, handleMediaTypeChange]);

  return (
    <div className="dashboard">
      <main className="main-content">
        <div className="content-wrapper">
          {/* Left Sidebar for Media Types */}
          <nav className="sidebar" aria-label="Media type navigation">
            <h2 className="sidebar-title">Media Types</h2>
            <ul className="media-types" role="tablist">
              {mediaTypeButtons}
            </ul>
          </nav>

          {/* Right Content Area for Trackers */}
          <div className="content-area">
            <div className="content-header">
              <h2 className="content-title">
                My {MEDIA_TYPES[activeMediaType]?.label || 'Media'}
              </h2>
              <button 
                className="add-button"
                onClick={() => handleAddMedia(activeMediaType)}
                aria-label={`Add new ${MEDIA_TYPES[activeMediaType]?.label || 'media'}`}
              >
                Add New {MEDIA_TYPES[activeMediaType]?.label?.slice(0, -1) || 'Media'}
              </button>
            </div>
            <div className="media-grid" role="grid">
              {activeMediaItems.length > 0 ? (
                activeMediaItems.map((item) => renderMediaCard(item, activeMediaType))
              ) : (
                <div className="empty-state">
                  <p>No {MEDIA_TYPES[activeMediaType]?.label?.toLowerCase() || 'media'} found.</p>
                  <p>Click "Add New" to get started!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
