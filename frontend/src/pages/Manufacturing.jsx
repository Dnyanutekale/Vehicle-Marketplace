import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader, Cog, ShieldCheck, Wrench } from 'lucide-react';
import './Manufacturing.css';

const Manufacturing = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/vehicles/');
      const withStages = res.data.filter(v => v.manufacturing_stages && v.manufacturing_stages.length > 0);
      setVehicles(withStages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-state glass">Loading factory data...</div>;

  return (
    <div className="manufacturing-container animate-fade-in">
      <div className="manufacturing-hero">
        <div className="container">
          <h1>The Art of Bespoke Manufacturing</h1>
          <p>Witness the meticulous craftsmanship behind our most exclusive vehicles.</p>
        </div>
        <div className="hero-overlay"></div>
      </div>

      <div className="container content-section">
        <div className="process-intro">
          <div className="intro-card glass">
            <Cog className="intro-icon" />
            <h3>Precision Engineering</h3>
            <p>Every component is machined to sub-millimeter tolerances.</p>
          </div>
          <div className="intro-card glass">
            <Wrench className="intro-icon" />
            <h3>Handcrafted Details</h3>
            <p>Master artisans spend hundreds of hours hand-finishing interiors.</p>
          </div>
          <div className="intro-card glass">
            <ShieldCheck className="intro-icon" />
            <h3>Rigorous Testing</h3>
            <p>Each vehicle undergoes extreme condition stress testing before delivery.</p>
          </div>
        </div>

        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="vehicle-showcase">
            <div className="showcase-header">
              <h2>{vehicle.brand?.name} {vehicle.name}</h2>
              <p>Production Timeline</p>
            </div>
            
            <div className="timeline">
              {vehicle.manufacturing_stages.map((stage, index) => (
                <div key={stage.id} className="timeline-item">
                  <div className="timeline-marker">{index + 1}</div>
                  <div className="timeline-content glass">
                    <h3>{stage.stage_name}</h3>
                    <p>{stage.description}</p>
                    {stage.image && (
                      <img src={`http://localhost:8000${stage.image}`} alt={stage.stage_name} className="stage-image"/>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {vehicles.length === 0 && (
          <div className="empty-state">
            <h3>No manufacturing data available</h3>
            <p>We are currently updating our factory floor documentation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manufacturing;
