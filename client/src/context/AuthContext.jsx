// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data using token or validate the token
      // This is a simplified example; adjust according to your backend
      fetch('http://localhost:5000/api/user', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then(response => response.json())
        .then(data => setUser(data.user))
        .catch(() => setUser(null));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

