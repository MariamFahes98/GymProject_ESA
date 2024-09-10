import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css'; // Import CSS Module
import logo from '../assets/images/logo.png';
import img from '../assets/images/login.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
  
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('loginTime', new Date().toISOString());
        localStorage.setItem('email', email);
        localStorage.setItem('firstName', res.data.user.firstName); // Store firstName
        localStorage.setItem('lastName', res.data.user.lastName);   // Store lastName
  
        if (email.trim().toLowerCase() === 'admin@flexzonegym.com') {
          navigate('/dashboard');
        } else if (res.data.redirectUrl) {
          navigate(res.data.redirectUrl);
        } else {
          alert('Login successful, but no redirect URL provided');
        }
      } else {
        alert('Login failed');
      }
    } catch (err) {
      alert('Invalid credentials');
    }
  };
  
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Check if the session has expired
  const checkSession = () => {
    const loginTime = localStorage.getItem('loginTime');
    if (loginTime) {
      const now = new Date();
      const sessionStart = new Date(loginTime);
      const sessionDuration = 30 * 60 * 1000; // 30 minutes in milliseconds

      if (now - sessionStart > sessionDuration) {
        localStorage.removeItem('token');
        localStorage.removeItem('loginTime');
        alert('Session expired. Please log in again.');
        navigate('/login');
      }
    }
  };

  // Check session expiry on component mount
  React.useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <img src={logo} alt="Gym Logo" className={styles.logoImg} />
        </div>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.header}>Log in</h2>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputGroupInput}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputGroupInput}
            />
            <span
              className={styles.showPassword}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <div className={styles.options}>
            <label>
              <input type="checkbox" /> Keep me logged in
            </label>
            <Link to="/forgot-password" className={styles.optionsLink}>Forgot password?</Link>
          </div>
          <button type="submit" className={styles.buttonn}>Log in</button>
          <div className={styles.registerLink}>
            Don't have an account? <Link to="/register" className={styles.registerLinkAnchor}>Register</Link>
          </div>
        </form>
        <div className={styles.footer}>
          <Link to="/terms" className={styles.footerAnchor}>Terms of Use</Link> | <Link to="/privacy" className={styles.footerAnchor}>Privacy Policy</Link>
        </div>
      </div>
      <div className={styles.loginImage}>
        <img src={img} alt="Fitness" className={styles.loginImageImg} />
      </div>
    </div>
  );
};

export default Login;
