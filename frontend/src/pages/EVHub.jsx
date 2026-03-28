import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Battery, Zap, Leaf } from 'lucide-react';
import VehicleCard from '../components/VehicleCard';
import './EVHub.css';

const EVHub = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/vehicles/')
      .then(res => setVehicles(res.data.filter(v => v.vehicle_type === 'EV' || v.vehicle_type === 'Concept')))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="ev-container animate-fade-in">
      <div className="ev-hero">
        <div className="container">
          <h1>Electric Innovation</h1>
          <p>The dawn of silent, emission-free, record-shattering performance.</p>
        </div>
        <div className="hero-overlay-dark"></div>
      </div>

      <div className="education-section container">
        <div className="edu-card glass">
          <Battery className="edu-icon" size={40} />
          <h3>Solid State Batteries</h3>
          <p>Our upcoming models utilize cutting edge solid state tech, enabling 1000km+ range with zero degradation and ultimate safety.</p>
        </div>
        <div className="edu-card glass">
          <Zap className="edu-icon" size={40} />
          <h3>Hyper Charging</h3>
          <p>800V architecture allows you to gain 300km of range in just 5 minutes at supported HyperCharger stations worldwide.</p>
        </div>
        <div className="edu-card glass">
          <Leaf className="edu-icon" size={40} />
          <h3>Zero Emissions</h3>
          <p>A commitment to a sustainable future without compromising on the luxury or performance you expect from our brands.</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '6rem' }}>
        <div className="marketplace-header" style={{ marginBottom: '3rem', marginTop: '4rem' }}>
          <h2>Available EV Models</h2>
        </div>
        
        {vehicles.length === 0 ? (
          <p style={{textAlign: 'center', opacity: 0.5}}>No EVs available at this moment.</p>
        ) : (
          <div className="vehicles-grid">
            {vehicles.map(v => <VehicleCard key={v.id} vehicle={v} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default EVHub;
