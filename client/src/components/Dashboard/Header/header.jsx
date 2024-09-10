import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSun, FiMoon } from 'react-icons/fi';

const Header = () => {
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false); // State to handle dark mode

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserName(response.data.firstName);
        setProfileImage(response.data.profileImage);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();

    // Check local storage for dark mode preference
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem('darkMode', !isDarkMode);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div>
        <h1 className="text-xs">Welcome Back!</h1>
        <p className="text-xl font-semibold dark:text-gray-100">{userName}</p>
      </div>
      <div className="flex items-center space-x-5">
        <button className="text-2xl" onClick={toggleDarkMode}>
          {isDarkMode ? <FiMoon size={28} /> : <FiSun size={28} />}
        </button>
        <img
          className="w-12 h-12 rounded-full border-4 border-purple-400"
          src={profileImage ? `http://localhost:5000${profileImage}` : 'default_image_url'}
          alt="User Profile"
        />
      </div>
    </div>
  );
};

export default Header;


