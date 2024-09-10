// src/components/HeroFooter.js
import React from 'react';
import HeroSection from './HeroSection';
import Footer from './Footer';
import './HeroFooter.css'; // Si vous avez des styles spécifiques pour HeroFooter

const HeroFooter = () => {
  return (
    <div className="hero-footer">
      <HeroSection />
      <Footer />
    </div>
  );
};

export default HeroFooter;
