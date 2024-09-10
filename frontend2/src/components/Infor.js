import React from 'react';
import './Infor.css'; 
import { FaMapMarkerAlt, FaBox, FaUserTie, FaDumbbell } from 'react-icons/fa'; 

const Infor = ({ onClassesClick, onProductsClick }) => {  // Define as 'Infor'
  return (
    <div className="Main-info">
      <div className="location">
        <FaMapMarkerAlt className="icon" />
        <p>Location</p>
      </div>

      <div className="Products" onClick={onProductsClick}>
        <FaBox className="icon" />
        <p>Products</p>
      </div> 

      <div className="Trainers">
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

export default Infor;  // Export as 'Infor'
