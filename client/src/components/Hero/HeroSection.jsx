
import React from 'react';
import './HeroSection.css';
//import imgfo from '../images/img1footer.jpg';
import imgfo from '../../assets/images/img00foot.jpg';


const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>THE BEST TRAINERS OUT THERE</h1>
        {/* <p>Are you a trainer? <a href="#">Join us.</a></p> */}
      </div>
      <div className="hero-image">
        <img src={imgfo} alt="Trainer" />
      </div>
    </div>
  );
};

export default HeroSection;