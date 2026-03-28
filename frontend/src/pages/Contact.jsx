import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="contact-container container animate-fade-in">
      <div className="contact-header text-center">
        <h1>Contact Us</h1>
        <p>Reach out to our global concierges for immediate support.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info glass">
          <h3>Get In Touch</h3>
          <p className="mb-4">Our dedicated team of automotive specialists is available 24/7 to assist with your bespoke inquiries.</p>
          
          <div className="info-list">
            <div className="info-row">
              <Phone className="contact-icon"/>
              <span>+44 20 7499 6000</span>
            </div>
            <div className="info-row">
              <Mail className="contact-icon"/>
              <span>concierge@auramotors.com</span>
            </div>
            <div className="info-row">
              <MapPin className="contact-icon"/>
              <span>1 Berkeley Square, Mayfair, London</span>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper glass">
          {submitted ? (
            <div className="success-prompt text-center padding-3">
              <Send size={48} className="contact-icon success-pulse" style={{ margin: '0 auto 1.5rem' }}/>
              <h3>Message Sent Successfully</h3>
              <p>A personal concierge will be in touch with you shortly.</p>
              <button className="primary-btn mt-4" onClick={() => setSubmitted(false)}>Send Another Message</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                >
                  <option value="">Select an inquiry type</option>
                  <option value="Bespoke Build">Bespoke Build Inquiry</option>
                  <option value="Service">Service & Maintenance</option>
                  <option value="Press">Press & Media</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  required 
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="How can we assist you today?"
                ></textarea>
              </div>
              <button type="submit" className="primary-btn full-width mt-4">
                <Send size={16} /> Send Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
