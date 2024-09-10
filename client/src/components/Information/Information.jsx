import React from 'react';
import './Information.css'; 
import { FaMapMarkerAlt, FaBox, FaUserTie, FaDumbbell } from 'react-icons/fa'; 

const Information = ({ onClassesClick , onProductsClick ,onTrainersClick ,onMapClick}) => {
  return (
    <div className="Main-info">
      <div className="location"  onClick={onMapClick}>
        <FaMapMarkerAlt className="icon"/>
        <p>Location</p>
      </div> 

      <div className="Products" onClick={onProductsClick}>
        <FaBox className="icon" />
        <p>Products</p>
      </div> 

      <div className="Trainers" onClick={onTrainersClick}>
        <FaUserTie className="icon" />
        <p>Trainers</p>
      </div>

      <div className="Classes" onClick={onClassesClick}>
        <FaDumbbell className="icon" />
        <p>Classes</p>
      </div>
    </div>
  );
};

export default Information;