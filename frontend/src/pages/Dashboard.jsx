import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import VehicleCard from '../components/VehicleCard';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [ordersRes, wishlistRes] = await Promise.all([
        axios.get('http://localhost:8000/api/orders/'),
        axios.get('http://localhost:8000/api/wishlists/')
      ]);
      setOrders(ordersRes.data);
      if (wishlistRes.data && wishlistRes.data.length > 0) {
        setWishlist(wishlistRes.data[0].vehicles || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <div className="dashboard-container container animate-fade-in">
      <div className="dashboard-header">
        <h1>Welcome back, {user.username}</h1>
        <p>Manage your allocations, view history, and check your curated wishlist.</p>
      </div>

      <div className="dashboard-layout">
        <aside className="dashboard-sidebar glass">
          <button 
            className={`sidebar-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            My Allocations
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            Wishlist
          </button>
          <button 
            className="sidebar-btn text-error"
            onClick={logout}
          >
            Sign Out
          </button>
        </aside>

        <main className="dashboard-content glass">
          {activeTab === 'orders' && (
            <div className="tab-pane animate-fade-in">
              <h2>My Allocations & Orders</h2>
              {orders.length === 0 ? (
                <p className="empty-text">You have no active or previous vehicle orders.</p>
              ) : (
                <div className="orders-list">
                  {orders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-info">
                        <h3>{order.vehicle?.name}</h3>
                        <p>Ordered on: {new Date(order.order_date).toLocaleDateString()}</p>
                        <p>Status: <strong className="status-badge">{order.status}</strong></p>
                      </div>
                      <div className="order-price">
                        ${Number(order.vehicle?.price).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="tab-pane animate-fade-in">
              <h2>My Wishlist</h2>
              {wishlist.length === 0 ? (
                <p className="empty-text">Your wishlist is currently empty.</p>
              ) : (
                <div className="vehicles-grid">
                  {wishlist.map(vehicle => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
