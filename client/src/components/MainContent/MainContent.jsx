import React from 'react';
import './MainContent.css'; 
import frontImage from "../../assets/images/front-image.png"



const MainContent = () => {
  return (
    <div className="main-content">
      <div className="left-side">
        <h1>DON'T STOP TILL<br />YOUR SUCCESS!<br /> <span className='title'>GET FIT TO HAPPY</span> </h1>
        <p> we strive to provide a comprehensive fitness experience that goes beyond traditional workouts.
          <br />
          Our state-of-the-art facilities and expert trainers are here to help you reach your personal fitness goals.
        </p>
        <button className="Explore-button">Explore More</button>
       
      </div>
      <div className="right-side">
        <div className="half-circle"></div>
        <img src={frontImage} alt="Your Image" className="image" />
      </div>

      
    </div>
  );
};

export default MainContent;