import React from 'react';
import { Link } from 'react-router-dom';
import { Battery, Sliders, Zap } from 'lucide-react';
import './VehicleCard.css';

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="vehicle-card glass">
      <div className="vehicle-image-container">
        <img 
          src={vehicle.image ? `http://localhost:8000${vehicle.image}` : 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&auto=format&fit=crop'} 
          alt={vehicle.name} 
          className="vehicle-image"
        />
        <span className="badge">{vehicle.vehicle_type}</span>
        {vehicle.is_trending && <span className="badge trending">Trending</span>}
      </div>
      
      <div className="vehicle-info">
        <div className="vehicle-header">
          <small className="brand-name">{vehicle.brand?.name}</small>
          <h3 className="vehicle-name">{vehicle.name}</h3>
        </div>
        
        <div className="vehicle-price">
          <span className="current-price">${Number(vehicle.price).toLocaleString()}</span>
        </div>
        
        <div className="vehicle-specs">
          {vehicle.power && (
            <div className="spec-item"><Zap size={14}/> {vehicle.power}</div>
          )}
          {vehicle.engine && (
            <div className="spec-item"><Sliders size={14}/> {vehicle.engine}</div>
          )}
          {vehicle.battery && (
            <div className="spec-item"><Battery size={14}/> {vehicle.battery}</div>
          )}
        </div>
        
        <Link to={`/vehicle/${vehicle.id}`} className="view-btn">View Details</Link>
      </div>
    </div>
  );
};

export default VehicleCard;
