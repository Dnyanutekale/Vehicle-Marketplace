import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Moon, Sun, User, LogOut, Menu } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onAuthClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="navbar glass">
      <div className="container nav-container">
        <Link to="/" className="brand-logo">
          <span className="brand-text">AURA</span> MotorCars
        </Link>
        
        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/cars" onClick={() => setIsMenuOpen(false)}>Cars</Link>
          <Link to="/bikes" onClick={() => setIsMenuOpen(false)}>Bikes</Link>
          <Link to="/ev-hub" onClick={() => setIsMenuOpen(false)}>EV Hub</Link>
          <Link to="/experience" onClick={() => setIsMenuOpen(false)}>Experience</Link>
          <Link to="/marketplace" onClick={() => setIsMenuOpen(false)}>Stock</Link>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {user ? (
            <div className="user-menu">
              <Link to="/dashboard" className="welcome-text hover-underline">Hi, {user.username}</Link>
              <button className="icon-btn" onClick={logout} aria-label="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button className="login-btn" onClick={onAuthClick}>
              <User size={18} /> Sign In
            </button>
          )}

          <button className="mobile-menu-btn icon-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
