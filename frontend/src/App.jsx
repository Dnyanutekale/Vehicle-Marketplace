import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import VehicleDetails from './pages/VehicleDetails';
import Manufacturing from './pages/Manufacturing';
import AuthModal from './components/AuthModal';
import Dashboard from './pages/Dashboard';
import Cars from './pages/Cars';
import Bikes from './pages/Bikes';
import EVHub from './pages/EVHub';
import LuxuryExperience from './pages/LuxuryExperience';
import ShowroomMap from './pages/ShowroomMap';
import Quiz from './pages/Quiz';
import Contact from './pages/Contact';
import Analytics from './pages/Analytics';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar onAuthClick={() => setIsAuthOpen(true)} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/vehicle/:id" element={<VehicleDetails />} />
            <Route path="/manufacturing" element={<Manufacturing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/bikes" element={<Bikes />} />
            <Route path="/ev-hub" element={<EVHub />} />
            <Route path="/experience" element={<LuxuryExperience />} />
            <Route path="/showroom" element={<ShowroomMap />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
        <Footer />
      </div>
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
    </Router>
  );
}

export default App;
