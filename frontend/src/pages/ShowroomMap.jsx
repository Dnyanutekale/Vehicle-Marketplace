import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './ShowroomMap.css';

const locations = [
  { id: 1, city: 'London', address: '1 Berkeley Square, Mayfair', phone: '+44 20 7499 6000', open: 'Mon-Sat: 10am - 7pm' },
  { id: 2, city: 'Dubai', address: 'Dubai Design District, Building 1', phone: '+971 4 456 7890', open: 'Sun-Thu: 9am - 8pm' },
  { id: 3, city: 'New York', address: 'Rodeo Drive, Beverly Hills', phone: '+1 310 555 0199', open: 'Mon-Sun: 10am - 6pm' },
  { id: 4, city: 'Tokyo', address: 'Ginza Six, Chuo City', phone: '+81 3 3289 0001', open: 'Mon-Sun: 11am - 8pm' },
];

const ShowroomMap = () => {
  const [activeLoc, setActiveLoc] = useState(locations[0]);

  return (
    <div className="showroom-container animate-fade-in">
      <div className="showroom-hero">
        <div className="container">
          <h1>Global Boutiques</h1>
          <p>Experience our physical presence across the world's most exclusive destinations.</p>
        </div>
      </div>
      
      <div className="container showroom-content">
        <div className="locations-sidebar glass">
          <h3 style={{marginBottom: '1.5rem'}}>Our Locations</h3>
          <div className="location-list">
            {locations.map(loc => (
              <button 
                key={loc.id} 
                className={`loc-btn ${activeLoc.id === loc.id ? 'active' : ''}`}
                onClick={() => setActiveLoc(loc)}
              >
                <MapPin size={18}/> {loc.city}
              </button>
            ))}
          </div>
        </div>

        <div className="location-details glass">
          <div className="loc-image-placeholder">
            <h2 className="city-watermark">{activeLoc.city}</h2>
          </div>
          
          <div className="loc-info-grid">
            <div className="info-item">
              <MapPin className="info-icon"/>
              <div>
                <strong>Address</strong>
                <p>{activeLoc.address}</p>
              </div>
            </div>
            
            <div className="info-item">
              <Phone className="info-icon"/>
              <div>
                <strong>Contact</strong>
                <p>{activeLoc.phone}</p>
              </div>
            </div>
            
            <div className="info-item">
              <Clock className="info-icon"/>
              <div>
                <strong>Opening Hours</strong>
                <p>{activeLoc.open}</p>
              </div>
            </div>
            
            <div className="info-item">
              <Mail className="info-icon"/>
              <div>
                <strong>Email</strong>
                <p>{activeLoc.city.toLowerCase()}@auramotors.com</p>
              </div>
            </div>
          </div>
          
          <button className="primary-btn mt-4">Book Private Viewing</button>
        </div>
      </div>
    </div>
  );
};

export default ShowroomMap;
