import { useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import Menu from "../../assets/asset01.png";
import Pdp from "../../assets/asset06.png";
import "./navbar.scss";
import { AuthContext } from "../../context/AuthProvider";
import SearchBar from "../searchBar/SearchBar";

/**
 * Navigation bar component for the MediaLog application.
 * 
 * Features:
 * - Responsive design with mobile menu
 * - User authentication state handling
 * - Logo and navigation links
 * - Search functionality integration
 * 
 * @returns {JSX.Element} The navigation bar component
 */
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  /**
   * Handles closing the mobile menu when a link is clicked.
   * This prevents the menu from staying open after navigation.
   */
  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  /**
   * Toggles the mobile menu visibility.
   * Used for the hamburger menu on mobile devices.
   */
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  /**
   * Renders the user profile section when user is authenticated.
   * 
   * @returns {JSX.Element} User profile section
   */
  const renderUserProfile = () => (
    <div className="user">
      <img 
        src={currentUser?.avatar || Pdp} 
        alt={`${currentUser?.username || 'User'} profile`}
        onError={(e) => {
          // Fallback to default avatar if image fails to load
          e.target.src = Pdp;
        }}
      />
      <span>{currentUser?.username || 'User'}</span>
      <Link to="/profile" className="profile" onClick={handleLinkClick}>
        <span>Profile</span>
      </Link>
    </div>
  );

  /**
   * Renders the authentication links when user is not authenticated.
   * 
   * @returns {JSX.Element} Authentication links section
   */
  const renderAuthLinks = () => (
    <>
      <div className="favorite-icon" role="button" tabIndex={0} aria-label="Favorites">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 3.69364 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <Link to="/login" className="auth-link" onClick={handleLinkClick}>
        Sign in
      </Link>
      <Link to="/register" className="register auth-link" onClick={handleLinkClick}>
        <span>Sign up</span>
      </Link>
    </>
  );

  return (
    <nav role="navigation" aria-label="Main navigation">
      <div className="left">
        <Link to="/" className="logo" onClick={handleLinkClick}>
          <div className="logo-text" aria-label="MediaLog Logo">ML</div>
          <span>MediaLog</span>
        </Link>
        <Link to="/" onClick={handleLinkClick}>About</Link>
      </div>
      
      <div className="center">
        <SearchBar />
      </div>
      
      <div className="right">
        {currentUser ? renderUserProfile() : renderAuthLinks()}
        
        <div className="menuIcon">
          <img
            src={Menu}
            alt="Menu"
            onClick={toggleMenu}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          />
        </div>
        
        <div className={isMenuOpen ? "menu active" : "menu"}>
          <Link to="/" onClick={handleLinkClick}>About</Link>
          {!currentUser && (
            <>
              <Link to="/login" onClick={handleLinkClick}>Sign in</Link>
              <Link to="/register" onClick={handleLinkClick}>Sign up</Link>
            </>
          )}
          {currentUser && (
            <Link to="/profile" onClick={handleLinkClick}>Profile</Link>
          )}
        </div>      </div>
    </nav>
  );
}

export default Navbar;
