import React from 'react';
import './Sign.css'; 
import { Link } from 'react-router-dom';

const Sign = () => {
  return (
    <div className="sign">
      <div className="sign-content">
        <ul className="navbar-menu">
          <li><Link to="/Login" className="Sign-button">Sign In</Link></li>
          <li><Link to="/register" className="Sign-button1">Sign Up</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sign;
