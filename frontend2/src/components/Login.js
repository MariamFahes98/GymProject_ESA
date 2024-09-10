// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import logo from '../images/logo0.png';
import img from '../images/img77login.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting login form'); // Débogage
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        if (res.data.redirectUrl) {
          navigate(res.data.redirectUrl); // Redirection en fonction de l'URL retournée par le backend
        } else {
          console.error('No redirect URL provided');
          alert('Login successful, but no redirect URL provided');
        }
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.error('Error:', err); // Débogage
      alert('Invalid credentials');
    }

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src={logo} alt="Gym Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h2>Log in</h2>
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
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="show-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Keep me logged in
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <button type="submit">Log in</button>
          <div className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </form>
        <div className="footer">
          <Link to="/terms">Terms of Use</Link> | <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
      <div className="login-image">
        <img src={img} alt="Fitness" />
      </div>
    </div>
  );
};

export default Login;

/*import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import logo from '../images/logo0.png';
import img from '../images/img77login.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting login form'); // Débogage
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      console.log('Response:', res.data); // Débogage

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        if (res.data.redirectUrl) {
          navigate(res.data.redirectUrl); // Redirection en fonction de l'URL retournée par le backend
        } else {
          console.error('No redirect URL provided');
          alert('Login successful, but no redirect URL provided');
        }
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.error('Error:', err); // Débogage
      alert('Invalid credentials');
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src={logo} alt="Gym Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h2>Log in</h2>
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
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="show-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Keep me logged in
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <button type="submit">Log in</button>
          <div className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </form>
        <div className="footer">
          <Link to="/terms">Terms of Use</Link> | <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
      <div className="login-image">
        <img src={img} alt="Fitness" />
      </div>
    </div>
  );
};

export default Login;
 */