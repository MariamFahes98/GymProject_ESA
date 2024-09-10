//SettingsForm:

import React, { useState, useEffect } from 'react';
import axios from 'axios';


const SettingsForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    phoneNumber: '',
    country: '',
    city: '',
    email: '',
    length: '',
    weight: ''
  });

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
       
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: token }
        });
        setFormData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/auth/profile', formData, {
        headers: { Authorization: token }
      });
      console.log('Response:', response.data); // Affiche la réponse dans la console pour le débogage
      alert('Profile updated successfully');
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message); // Affiche l'erreur dans la console pour le débogage
      alert('Failed to update profile');
    }
  };
  

  return (
    <div className="settings-form">
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="input-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="input-group">
            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} min={0} max={100} required />
          </div>
        </div>
        <div className="row">
          <div className="input-group">
            <label>Phone Number</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Country</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="input-group">
            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="input-group">
            <label>Length</label>
            <input type="number" name="length" value={formData.length} onChange={handleChange} min={0} max={250} required />
          </div>
          <div className="input-group">
            <label>Weight</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} min={0} max={300} required />
          </div>
        </div>
        <div className="button-container">
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;