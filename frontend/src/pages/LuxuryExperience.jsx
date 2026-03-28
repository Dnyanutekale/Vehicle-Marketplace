import React, { useEffect, useRef } from 'react';
import { Sparkles, Diamond, Compass, Award, Shield } from 'lucide-react';
import './LuxuryExperience.css';

const LuxuryExperience = () => {
  const chapterRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.chapter');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="luxury-container">
      {/* Chapter 1: Inspiring Greatness */}
      <section className="chapter chapter-hero">
        <div className="chapter-overlay"></div>
        <div className="chapter-content text-center">
          <Sparkles size={48} className="chapter-icon pulse-animation" />
          <h1 className="chapter-title">Inspiring Greatness</h1>
          <p className="chapter-desc tracking-wide">
            Automotive artistry that transcends time. A symphony of engineering and bespoke luxury.
          </p>
        </div>
      </section>

      {/* Chapter 2: Bespoke */}
      <section className="chapter chapter-split">
        <div className="chapter-image bespoke-img"></div>
        <div className="chapter-text-block glass">
          <Diamond size={32} className="chapter-icon" />
          <h2 className="chapter-subtitle">The Bespoke Collective</h2>
          <p className="chapter-desc">
            Your imagination is our only limit. From Starlight Headliners that map the exact constellation of your birth night, to paint colored matched to your favorite possession. 
            The Bespoke Collective is a team of engineers, designers, and craftspeople dedicated to making your vision a reality.
          </p>
        </div>
      </section>

      {/* Chapter 3: Provenance */}
      <section className="chapter chapter-split reverse">
        <div className="chapter-image provenance-img"></div>
        <div className="chapter-text-block glass">
          <Compass size={32} className="chapter-icon" />
          <h2 className="chapter-subtitle">Provenance & Heritage</h2>
          <p className="chapter-desc">
            Every masterpiece holds a story. A certified pre-owned program that treats legendary items with the reverence they deserve. 
            Meticulously inspected to ensure that every vehicle leaving our Goodwood facilities remains a testament to absolute perfection.
          </p>
        </div>
      </section>

      {/* Chapter 4: Ownership & Boutiques */}
      <section className="chapter chapter-grid">
        <div className="grid-header">
          <h2>The Journey of Ownership</h2>
          <p>Beyond driving. A lifestyle.</p>
        </div>
        <div className="grid-cards container">
          <div className="grid-card glass">
            <Award size={40} className="grid-icon" />
            <div className="grid-content">
              <h3>Whispers App</h3>
              <p>Exclusive access to a digital world reserved only for owners. Curated content, exclusive events, and direct contact with the manufacturer.</p>
            </div>
          </div>
          <div className="grid-card glass glow-border">
            <Shield size={40} className="grid-icon text-accent" />
            <div className="grid-content">
              <h3>White Glove Service</h3>
              <p>Global support at the touch of a button. Our flying doctors approach means service comes to you, anywhere in the world.</p>
            </div>
          </div>
          <div className="grid-card glass">
            <Sparkles size={40} className="grid-icon" />
            <div className="grid-content">
              <h3>Boutique Escapes</h3>
              <p>Tailored luggage, picnic hampers, and lifestyle accessories designed specifically to match your vehicle's interior.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LuxuryExperience;
