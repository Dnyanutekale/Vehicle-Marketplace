import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Camera, Shield, ShieldAlert, Sparkles } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand-logo mb-2" style={{display: 'inline-block'}}>
            <span className="brand-text">AURA</span> MotorCars
          </Link>
          <p className="footer-desc">
            Redefining the pinnacle of mobility. We build bespoke experiences for those who demand nothing but absolute perfection.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Instagram"><Camera size={20}/></a>
            <a href="#" aria-label="Twitter"><MessageCircle size={20}/></a>
            <a href="#" aria-label="GitHub"><Globe size={20}/></a>
          </div>
        </div>

        <div className="footer-links-col">
          <h4>Showroom</h4>
          <ul>
            <li><Link to="/cars">Luxury Automobiles</Link></li>
            <li><Link to="/bikes">Adventure Motorcycles</Link></li>
            <li><Link to="/ev-hub">Electric Innovation</Link></li>
            <li><Link to="/marketplace">All Stock</Link></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Experience</h4>
          <ul>
            <li><Link to="/experience">The Bespoke Journey</Link></li>
            <li><Link to="/manufacturing">Manufacturing</Link></li>
            <li><Link to="/quiz">Knowledge Quiz</Link></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Support</h4>
          <ul>
            <li><Link to="/showroom">Global Locations</Link></li>
            <li><Link to="/contact">Contact Concierge</Link></li>
            <li><Link to="/analytics" className="admin-link">Analytics Dashboard</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container bottom-flex">
          <p>&copy; {new Date().getFullYear()} Aura MotorCars. All rights reserved.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
