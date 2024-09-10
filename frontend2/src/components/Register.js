// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import logo from '../images/logo0.png';
import img from '../images/img77login.png';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        firstName,
        lastName,
        email,
        gender,
        password,
      });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/mainpage'); // Redirect to home page after successful registration
      } else {
        alert('Registration failed: ' + res.data.msg);
      }
    } catch (err) {
      console.error(err);
      alert('Error during registration');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="logo">
          <img src={logo} alt="Gym Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <select
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
          <div className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
        <div className="footer">
          <Link to="/terms">Terms of Use</Link> | <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
      <div className="register-image">
        <img src={img} alt="Fitness" />
      </div>
    </div>
  );
};

export default Register;
