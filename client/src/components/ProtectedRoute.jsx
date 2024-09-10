import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const loginTime = localStorage.getItem('loginTime');
  const email = localStorage.getItem('email'); // Store the email in localStorage on login

  // Check if the token exists and if the session is valid
  const isSessionValid = () => {
    if (loginTime) {
      const now = new Date();
      const sessionStart = new Date(loginTime);
      const sessionDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
      return now - sessionStart <= sessionDuration;
    }
    return false;
  };

  const isAdmin = email === 'admin@flexzonegym.com';

  return token && isSessionValid() && isAdmin ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;


