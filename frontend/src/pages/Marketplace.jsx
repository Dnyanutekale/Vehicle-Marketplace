import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, Loader } from 'lucide-react';
import VehicleCard from '../components/VehicleCard';
import './Marketplace.css';

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    type: searchParams.get('type') || 'All',
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/vehicles/');
      setVehicles(res.data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.type !== 'All') params.set('type', newFilters.type);
    setSearchParams(params);
  };

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                          v.brand?.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.type === 'All' || v.vehicle_type === filters.type;
    return matchesSearch && matchesType;
  });

  return (
    <div className="marketplace-container container animate-fade-in">
      <div className="marketplace-header">
        <h1>Discover Perfection</h1>
        <p>Explore our curated collection of extraordinary vehicles.</p>
      </div>

      <div className="marketplace-controls glass">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            name="search"
            placeholder="Search make or model..." 
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>
        
        <div className="filter-group">
          <Filter size={20} className="filter-icon" />
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="All">All Types</option>
            <option value="Car">Luxury Cars</option>
            <option value="Bike">Classic Bikes</option>
            <option value="EV">Electric Vehicles</option>
            <option value="Concept">Concept Vehicles</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <Loader className="spinner" size={40} />
          <p>Loading collection...</p>
        </div>
      ) : (
        <div className="vehicles-grid">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))
          ) : (
            <div className="empty-state">
              <h3>No vehicles found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
