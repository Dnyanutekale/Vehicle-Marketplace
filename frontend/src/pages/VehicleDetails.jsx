import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Battery, Sliders, Zap, CheckCircle2, ChevronLeft, Heart, Star, Send } from 'lucide-react';
import './VehicleDetails.css';

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  // Phase 2 specifics
  const [activeImage, setActiveImage] = useState('');
  const [activeColor, setActiveColor] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    fetchVehicle();
    checkWishlist();
  }, [id, user]);

  const fetchVehicle = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/vehicles/${id}/`);
      setVehicle(res.data);
      setActiveImage(res.data.image);
      if(res.data.colors && res.data.colors.length > 0) setActiveColor(res.data.colors[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkWishlist = async () => {
    if (!user) return;
    try {
      const res = await axios.get('http://localhost:8000/api/wishlists/');
      if (res.data.length > 0) {
        const vehicles = res.data[0].vehicles;
        if (vehicles.find(v => v.id === parseInt(id))) {
          setInWishlist(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleWishlist = async () => {
    if (!user) {
      alert("Please sign in to save vehicles to your wishlist.");
      return;
    }
    try {
      const method = inWishlist ? 'DELETE' : 'POST';
      await axios({
        method: method,
        url: `http://localhost:8000/api/wishlist/toggle/${id}/`
      });
      setInWishlist(!inWishlist);
    } catch (err) {
      console.error(err);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to leave a review.");
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/reviews/', {
        vehicle: vehicle.id,
        rating: reviewRating,
        comment: reviewText
      });
      setReviewText('');
      fetchVehicle(); // refresh to show new review
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    }
  };

  const handleOrder = async () => {
    if (!user) {
      alert("Please sign in to place an order.");
      return;
    }
    setOrdering(true);
    try {
      await axios.post('http://localhost:8000/api/orders/', {
        vehicle_id: vehicle.id,
        delivery_address: "123 Luxury Lane, Beverly Hills, CA 90210"
      });
      setOrderSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    } finally {
      setOrdering(false);
    }
  };

  if (loading) return <div className="loading-state glass">Loading perfection...</div>;
  if (!vehicle) return <div className="loading-state glass">Vehicle not found</div>;

  return (
    <div className="vehicle-details-container animate-fade-in">
      <div className="container">
        <div className="details-top-bar">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} /> Back to Showroom
          </button>
          
          <button 
            className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
            onClick={toggleWishlist}
            aria-label="Add to Wishlist"
          >
            <Heart size={24} fill={inWishlist ? "currentColor" : "none"} />
            {inWishlist ? "Saved" : "Save to Wishlist"}
          </button>
        </div>

        <div className="details-layout">
          <div className="details-image-section">
            <div className="main-image-wrapper">
              <img 
                src={activeImage ? `http://localhost:8000${activeImage}` : 'https://images.unsplash.com/photo-1542282088-fe8426682b8f'} 
                alt={vehicle.name} 
                className="main-image"
              />
            </div>
            
            {/* Phase 2 Gallery */}
            {vehicle.images && vehicle.images.length > 0 && (
              <div className="gallery-thumbnails">
                <img 
                  src={`http://localhost:8000${vehicle.image}`} 
                  onClick={() => setActiveImage(vehicle.image)}
                  className={`thumbnail ${activeImage === vehicle.image ? 'active' : ''}`}
                  alt="Main view"
                />
                {vehicle.images.map(img => (
                  <img 
                    key={img.id} 
                    src={`http://localhost:8000${img.image}`} 
                    onClick={() => setActiveImage(img.image)}
                    className={`thumbnail ${activeImage === img.image ? 'active' : ''}`}
                    alt="Gallery view"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="details-info-section glass">
            <h4 className="brand-label">{vehicle.brand?.name}</h4>
            <h1 className="model-title">{vehicle.name}</h1>
            
            <div className="price-block" style={{ marginBottom: "1.5rem" }}>
              <div className="current-price">
                <span className="label">Current Value</span>
                <h2>${Number(vehicle.price).toLocaleString()}</h2>
              </div>
              {vehicle.future_expected_price && (
                <div className="future-price">
                  <span className="label">Expected Value (AI)</span>
                  <h3 className="positive-trend">${Number(vehicle.future_expected_price).toLocaleString()}</h3>
                </div>
              )}
            </div>

            {/* Phase 2 Colors */}
            {vehicle.colors && vehicle.colors.length > 0 && (
              <div className="color-selection">
                <span className="label">Exterior Finish: {activeColor?.name}</span>
                <div className="color-options">
                  {vehicle.colors.map(color => (
                    <button 
                      key={color.id}
                      className={`color-dot ${activeColor?.id === color.id ? 'active' : ''}`}
                      style={{ backgroundColor: color.hex_code }}
                      onClick={() => setActiveColor(color)}
                      aria-label={color.name}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            <p className="description">{vehicle.description}</p>

            <div className="specs-grid">
              {vehicle.power && (
                <div className="spec-card">
                  <Zap className="spec-icon"/>
                  <span>Power</span>
                  <strong>{vehicle.power}</strong>
                </div>
              )}
              {vehicle.engine && (
                <div className="spec-card">
                  <Sliders className="spec-icon"/>
                  <span>Drivetrain</span>
                  <strong>{vehicle.engine}</strong>
                </div>
              )}
              {vehicle.battery && (
                <div className="spec-card">
                  <Battery className="spec-icon"/>
                  <span>Battery</span>
                  <strong>{vehicle.battery}</strong>
                </div>
              )}
              {vehicle.mileage_or_range && (
                <div className="spec-card">
                  <Zap className="spec-icon"/>
                  <span>Range/Mileage</span>
                  <strong>{vehicle.mileage_or_range}</strong>
                </div>
              )}
            </div>

            <div className="features-list">
              <h3>Key Features</h3>
              <ul>
                {vehicle.features?.split(',').map((feat, idx) => (
                  <li key={idx}><CheckCircle2 size={16} className="text-success"/> {feat.trim()}</li>
                ))}
              </ul>
            </div>

            <div className="action-section">
              {orderSuccess ? (
                <div className="success-message glass">
                  <CheckCircle2 size={24} />
                  <div>
                    <strong>Allocation Confirmed</strong>
                    <p>Your bespoke configuration for {activeColor ? activeColor.name : 'this vehicle'} is secured.</p>
                  </div>
                </div>
              ) : (
                <button 
                  className="primary-btn full-width" 
                  onClick={handleOrder}
                  disabled={ordering}
                >
                  {ordering ? 'Processing...' : 'Secure Your Allocation'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Phase 2: Reviews Section */}
        <div className="reviews-section glass">
          <div className="reviews-header">
            <h2>Ownership Experiences</h2>
          </div>
          
          {user && (
            <form className="review-form" onSubmit={submitReview}>
              <h4>Leave a Review</h4>
              <div className="rating-select">
                {[1,2,3,4,5].map(num => (
                  <Star 
                    key={num} 
                    size={24}
                    fill={num <= reviewRating ? "var(--accent-secondary)" : "none"}
                    color={num <= reviewRating ? "var(--accent-secondary)" : "var(--text-secondary)"}
                    onClick={() => setReviewRating(num)}
                    style={{cursor: 'pointer'}}
                  />
                ))}
              </div>
              <textarea 
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Share your experience..." 
                required 
                className="review-input"
              />
              <button type="submit" className="primary-btn submit-review">
                <Send size={16} /> Post Experience
              </button>
            </form>
          )}

          <div className="reviews-list">
            {vehicle.reviews && vehicle.reviews.length > 0 ? (
              vehicle.reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-meta">
                    <strong>{review.user_name}</strong>
                    <div className="stars">
                      {[1,2,3,4,5].map(num => (
                        <Star key={num} size={14} fill={num <= review.rating ? "var(--accent-secondary)" : "none"} color={num <= review.rating ? "var(--accent-secondary)" : "var(--text-secondary)"} />
                      ))}
                    </div>
                  </div>
                  <p className="review-body">{review.comment}</p>
                  <small className="review-date">{new Date(review.created_at).toLocaleDateString()}</small>
                </div>
              ))
            ) : (
              <p className="empty-text">Be the first to share your experience with this vehicle.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VehicleDetails;
