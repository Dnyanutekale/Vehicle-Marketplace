import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X } from 'lucide-react';
import './AuthModal.css';

const AuthModal = ({ onClose }) => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      const success = await login(formData.username, formData.password);
      if (success) onClose();
      else setError('Invalid credentials');
    } else {
      // Stub for registration logic
      // Assume success for demo and just login
      const success = await login(formData.username, formData.password);
      if (success) onClose();
      else setError('Registration failed');
    }
  };

  return (
    <div className="modal-overlay glass animate-fade-in" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn icon-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <h2 className="modal-title">{isLogin ? 'Sign In' : 'Create Account'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              required
              value={formData.username}
              onChange={e => setFormData({...formData, username: e.target.value})}
              placeholder="Enter your username"
            />
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="Enter your email"
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              required
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="submit-btn login-btn">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>
        
        <div className="modal-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span className="toggle-mode" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Register here' : 'Sign in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
