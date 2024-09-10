import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../images/logo0.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-section logo-section">
        <img src={logo} alt="Fitness Point" className="footer-logo" />
        <p>
          <a href="https://wa.me/76915446" target="_blank" rel="noopener noreferrer">76 915 446</a>
        </p>
        <p>Lebanon, Beirut City</p>
        <p>
          <a href="mailto:info@FlexZoneGym.com">info@FlexZoneGym.com</a>
        </p>
      </div>
      <div className="footer-section links-section">
        <h3>Quick Links</h3>
        <div className="links-grid">
          <ul>
            <li><Link to="/mainpage">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/classes">Classes</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/membership">Membership</Link></li>
          </ul>
          <ul>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/team">Our Team</Link></li>
            <li><Link to="/timetable">Timetable</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-section gym-hours">
        <h3>GYM Hours</h3>
        <ul>
          <li>Monday: 5am - 12pm</li>
          <li>Tuesday to Friday: 6am - 10pm</li>
          <li>Saturday: 7am - 7pm</li>
          <li>Sunday: 8am - 6pm</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;







/*

//code 1 vrai

//code sha8al bass badi mashi men 5ilal page li abli ana
// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Footer.css';
import logo from '../images/logo0.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-section">
        <img src={logo} alt="Fitness Point" className="footer-logo" />
        <p>
          <a href="https://wa.me/76915446" target="_blank" rel="noopener noreferrer">76 915 446</a>
        </p>
        <p>Lebanon, Beirut City</p>
        <p>
          <a href="mailto:info@FlexZoneGym.com">info@FlexZoneGym.com</a>
        </p>
      </div>
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/classes">Classes</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/membership">Membership</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/team">Our Team</Link></li>
          <li><Link to="/timetable">Timetable</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>GYM Hours</h3>
        <p>Monday: 5am - 12pm</p>
        <p>Tuesday to Friday: 6am - 10pm</p>
        <p>Saturday: 7am - 7pm</p>
        <p>Sunday: 8am - 6pm</p>
      </div>
    </div>
  );
};

export default Footer;

*/