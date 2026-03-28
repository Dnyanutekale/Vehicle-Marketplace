import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleCard from '../components/VehicleCard';

const Bikes = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/vehicles/')
      .then(res => setVehicles(res.data.filter(v => v.vehicle_type === 'Bike')))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="marketplace-container container animate-fade-in">
      <div className="marketplace-header" style={{ marginBottom: '4rem' }}>
        <h1>Classic & Adventure Motorcycles</h1>
        <p>Two-wheeled freedom engineered to perfection.</p>
      </div>
      {vehicles.length === 0 ? (
        <p style={{textAlign: 'center', opacity: 0.5}}>No bikes available right now.</p>
      ) : (
        <div className="vehicles-grid">
          {vehicles.map(v => <VehicleCard key={v.id} vehicle={v} />)}
        </div>
      )}
    </div>
  );
};
export default Bikes;
