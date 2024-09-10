import React from 'react';
import './home3.css'; 
import { Link } from 'react-router-dom';
import Sign from './Sign'; 

const Navbar = ({ onClassesClick, onProductsClick, onHomeClick }) => {
  return (
    <nav className="navbar">
      <div className="logo1">
        <p onClick={onHomeClick}>FitnessZone</p>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/MainPage" onClick={onHomeClick}>Home</Link></li>
        <li><Link to="/" onClick={onHomeClick}>Services</Link></li>
        <li><Link to="/" onClick={onHomeClick}>About Us</Link></li>
        <li><Link to="#" onClick={onClassesClick}>Classes</Link></li>
        <li><Link to="#" onClick={onProductsClick}>Products</Link></li>
       
      </ul>
      <div className="navbar-actions">
         <Sign /> 
      </div>
    </nav>
    
  );
};

export default Navbar;  /* Navbar container */
