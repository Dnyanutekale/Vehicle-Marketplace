import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Star } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container animate-fade-in">
      <section className="hero-section">
        <div className="hero-content container">
          <h1 className="hero-title">Experience the Future of Mobility</h1>
          <p className="hero-subtitle">Discover ultra-luxury vehicles, classic motorcycles, and extreme performance electric hypercars.</p>
          <div className="hero-actions">
            <Link to="/marketplace" className="primary-btn">Explore Showroom</Link>
            <Link to="/manufacturing" className="secondary-btn">View Bespoke Builds</Link>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      <section className="features-section container">
        <div className="section-header">
          <h2>Uncompromising Excellence</h2>
          <p>The pinnacle of automotive engineering at your fingertips.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card glass">
            <Shield className="feature-icon" />
            <h3>Heritage & Legacy</h3>
            <p>Century-old craftsmanship combined with modern reliability.</p>
          </div>
          <div className="feature-card glass">
            <Zap className="feature-icon" />
            <h3>Electric Performance</h3>
            <p>Record-shattering acceleration with cutting-edge EV technology.</p>
          </div>
          <div className="feature-card glass">
            <Star className="feature-icon" />
            <h3>Bespoke Luxury</h3>
            <p>Every detail customized to your exact specifications.</p>
          </div>
        </div>
      </section>

      <section className="categories-section container">
        <div className="category-card car-cat">
          <div className="cat-content">
            <h3>Luxury Cars</h3>
            <Link to="/marketplace?type=Car" className="cat-link">View Models <ArrowRight size={16}/></Link>
          </div>
        </div>
        <div className="category-card bike-cat">
          <div className="cat-content">
            <h3>Classic Bikes</h3>
            <Link to="/marketplace?type=Bike" className="cat-link">View Models <ArrowRight size={16}/></Link>
          </div>
        </div>
        <div className="category-card ev-cat">
          <div className="cat-content">
            <h3>Future EVs</h3>
            <Link to="/marketplace?type=EV" className="cat-link">View Models <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
