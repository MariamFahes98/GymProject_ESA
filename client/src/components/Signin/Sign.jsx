import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sign.css';

const Sign = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');

    if (token) {
      setIsLoggedIn(true);
      setUserEmail(email);
      setUserName(`${firstName} ${lastName}`); // Set the user's full name
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('loginTime');
    setIsLoggedIn(false);
    navigate('/');
  };

  const SignIn = () => {
    navigate('/login');
  };

  const SignUp = () => {
    navigate('/register');
  };

  return (
    <div className="sign">
      <div className="sign-content">
        {isLoggedIn ? (
          <div className="user-info flex space-x-2 ">
            <p className="user-email pt-4">{userName}</p> {/* Display the user's full name */}
            <button className="logout-button pt-4 hover:bg-custom-gradient hover:text-white" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <>
            <button className="Sign-button1" onClick={SignIn}>
              Sign In
            </button>
            <button className="Sign-button" onClick={SignUp}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sign;




