import React from 'react';
import './Services.css';
import Women from "../../assets/images/women.png"

const Services = React.forwardRef((props, ref) => {
  return (
    <div className="App" ref={ref}>
      <div className="background-text">Our Services</div>
      <div className="left-section">
        <h1>Services We Provide</h1>
        <div className="text-block">
          <br/>          <br/>
          <br/>

          <h2 style={{color:'gray',fontSize:'50px'}}>01</h2>
          <h3 style={{fontWeight:'bold',fontSize:'30px'}}>Fitness Training:</h3>
          <p style={{color:'gray',fontWeight:'bold',fontSize:'20px'}}>Our comprehensive fitness training programs are designed to help you achieve your health and fitness goals, whether you're a beginner or an advanced athlete.</p>
        </div>
        <div className="text-block">
          <h2 style={{color:'gray',fontSize:'50px'}}>02</h2>
          <h3  style={{fontWeight:'bold',fontSize:'30px'}}>Yoga:</h3>
          <p style={{color:'gray',fontWeight:'bold',fontSize:'20px'}}>Experience the tranquility and flexibility of our yoga sessions, which cater to all levels and promote physical and mental well-being.</p>
        </div>
      </div>
      <div className="image-container">
        <img src={Women} alt="Women" className="center-image" />
      </div>
      <div className="right-section">
        <div className="text-block">
        <h2 style={{color:'gray',fontSize:'50px'}}>03</h2>
        <h3  style={{fontWeight:'bold',fontSize:'30px'}}>Gymnastics:</h3>
          <p style={{color:'gray',fontWeight:'bold',fontSize:'20px'}}>Our gymnastics classes offer a dynamic blend of strength, coordination, and agility training for all ages and skill levels.</p>
        </div>
        <div className="text-block">
        <h2 style={{color:'gray',fontSize:'50px'}}>04</h2>

          <h3  style={{fontWeight:'bold',fontSize:'30px'}}>Karate:</h3>
          <p style={{color:'gray',fontWeight:'bold',fontSize:'20px'}}>Join our karate classes to develop self-discipline, confidence, and physical fitness through traditional martial arts training.</p>
        </div>
      </div>
    </div>
  );
});

export default Services;