import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, BarChart3, Database } from 'lucide-react';
import './Analytics.css';

const Analytics = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    axios.get('http://localhost:8000/api/analytics/')
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user || (!user.is_staff && user.username !== 'admin')) {
    return (
      <div className="container" style={{padding: '6rem 0', textAlign: 'center'}}>
        <h2>Access Denied</h2>
        <p style={{color: 'var(--text-secondary)'}}>Only administrators can view the analytics dashboard.</p>
      </div>
    );
  }

  if (loading) return <div className="loading-state glass">Compiling reports...</div>;

  return (
    <div className="analytics-container container animate-fade-in">
      <div className="analytics-header">
        <h1>Global Sales & Analytics</h1>
        <p>Real-time telemetry and financial reporting for Aura MotorCars.</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card glass glow-border">
          <div className="metric-icon-wrap bg-primary">
            <Database size={24} className="metric-icon" />
          </div>
          <div className="metric-info">
            <p>Total Allocations</p>
            <h3>{data?.total_orders || 0}</h3>
          </div>
        </div>

        <div className="metric-card glass glow-border">
          <div className="metric-icon-wrap bg-success">
            <TrendingUp size={24} className="metric-icon" />
          </div>
          <div className="metric-info">
            <p>Gross Target Revenue</p>
            <h3>${Number(data?.total_revenue || 0).toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="charts-section glass">
        <div className="charts-header">
          <BarChart3 size={24} className="text-accent" />
          <h2>Top Performing Vehicles</h2>
        </div>
        
        <div className="bar-chart-container">
          {data?.top_vehicles && data.top_vehicles.length > 0 ? (
            data.top_vehicles.map((v, idx) => {
              const maxOrders = Math.max(...data.top_vehicles.map(vx => vx.order_count || 1));
              const percentage = ((v.order_count || 0) / maxOrders) * 100;
              
              return (
                <div key={v.id} className="bar-row">
                  <div className="bar-label">
                    <span className="rank-num">#{idx + 1}</span> 
                    {v.name}
                  </div>
                  <div className="bar-track">
                    <div 
                      className="bar-fill" 
                      style={{ width: `${Math.max(percentage, 5)}%` }}
                    ></div>
                  </div>
                  <div className="bar-value">{v.order_count || 0} Orders</div>
                </div>
              );
            })
          ) : (
            <p className="empty-text">Not enough sales data to generate charts.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
