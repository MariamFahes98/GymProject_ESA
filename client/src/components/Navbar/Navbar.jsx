import React from 'react';
import './Navbar.css'; 
import { Link } from 'react-router-dom';
import Sign from '../Signin/Sign'; 

const Navbar = ({ onClassesClick, onProductsClick, onHomeClick, onAboutUsClick,onServicesClick }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <p onClick={onHomeClick}>FitnessZone</p>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/" onClick={onHomeClick}>Home</Link></li>
        <li><Link to="/" onClick={onServicesClick}>Services</Link></li>
        {/* Call the onAboutUsClick function when "About Us" is clicked */}
        <li><Link to="#" onClick={onAboutUsClick}>About Us</Link></li>
        <li><Link to="#" onClick={onClassesClick}>Classes</Link></li>
        <li><Link to="#" onClick={onProductsClick}>Products</Link></li>
      </ul>
      <div className="navbar-actions">
        <Sign />
      </div>
    </nav>
  );
};

export default Navbar;
