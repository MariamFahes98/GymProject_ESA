import React, { useState, useEffect } from 'react';
import Schedule from '../Schedeuele/Schedule.jsx';
import { RiImageEditLine } from "react-icons/ri";
import axios from 'axios';
import DefaultProfile from "../../../assets/images/defaultProfile.png";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    length: '',
    weight: '',
    age: '',
    profileImage: DefaultProfile
  });
  const [profileImageFile, setProfileImageFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const profileData = response.data;
        setFormData({
          name: `${profileData.firstName} ${profileData.lastName}`,
          email: profileData.email,
          length: profileData.length || '',
          weight: profileData.weight || '',
          age: profileData.age || '',
          profileImage: profileData.profileImage
            ? `http://localhost:5000${profileData.profileImage}`
            : DefaultProfile
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
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
      const form = new FormData();
      
      // Split the full name into firstName and lastName
      const [firstName, lastName] = formData.name.split(' ');
  
      // Append form data
      form.append('firstName', firstName);
      form.append('lastName', lastName);
      form.append('email', formData.email);
      form.append('length', formData.length);
      form.append('weight', formData.weight);
      form.append('age', formData.age);
  
      // Append profile image file if changed
      if (profileImageFile) {
        form.append('profileImage', profileImageFile);
      }
  
      // Send the PUT request to update the profile
      const response = await axios.put('http://localhost:5000/api/auth/profile', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Response:', response.data);
      alert('Profile updated successfully');
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      alert('Failed to update profile');
    }
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setFormData({
        ...formData,
        profileImage: URL.createObjectURL(file)
      });
    }
  };

  return (

    <div>
      <form onSubmit={handleSubmit}>
    <div className="bg-white h-fit shadow-lg rounded-lg border border-gray-200 p-6 flex flex-col items-center relative dark:bg-gray-800 dark:border-gray-700">
      
        <div className="relative mb-4 ">
          <img
            src={formData.profileImage || DefaultProfile}
            alt="Profile"
            onError={(e) => e.target.src = DefaultProfile}
            className="w-32 h-32 rounded-full border-4 border-purple-400 object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute top-2 right-2 opacity-0 cursor-pointer w-8 h-8 dark:border-gray-700 "
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md cursor-pointer hover:bg-gray-100"
          >
            <RiImageEditLine className="text-purple-400 w-6 h-6" />
          </label>
        </div>
        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-300">Edit Profile</h2>
        <div className='border border-gray-300 w-full rounded-lg flex space-x-4 justify-center mb-2 dark:border-gray-700'>
          <div>
            <h2 className="font-semibold dark:text-gray-300">{formData.weight}Kg</h2>
            <p className="text-gray-300 dark:text-gray-300">Weight</p>
          </div>
          <div>
            <h2 className="font-semibold dark:text-gray-300">{formData.length}cm</h2>
            <p className="text-gray-300 dark:text-gray-300">Height</p>
          </div>
          <div>
            <h2 className="font-semibold dark:text-gray-300">{formData.age} year</h2>
            <p className="text-gray-300 dark:text-gray-300">Age</p>
          </div>
        </div>

        <div className="flex flex-col w-full mb-4">
          <label className="text-sm font-medium mb-1 dark:text-gray-300" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        <div className="flex flex-col w-full mb-4">
          <label className="text-sm font-medium mb-1 dark:text-gray-300" htmlFor="email" >Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled
            readOnly 
            className="border border-gray-300 rounded-lg p-2 w-full dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        <div className="flex flex-col w-full mb-4">
          <label className="text-sm font-medium mb-1 dark:text-gray-300" htmlFor="length">Height (cm)</label>
          <input
            id="length"
            name="length"
            type="number"
            value={formData.length}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        <div className="flex flex-col w-full mb-4">
          <label className="text-sm font-medium mb-1 dark:text-gray-300" htmlFor="weight">Weight (kg)</label>
          <input
            id="weight"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        <div className="flex flex-col w-full mb-4">
          <label className="text-sm font-medium mb-1 dark:text-gray-300" htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        <div className="flex-none w-80">
          <Schedule />
        </div>

        <button
          type="submit"
          className="bg-custom-gradient text-white py-2 px-4 rounded-lg hover:bg-purple-600 w-full"
        >
          Save
        </button>
      
    </div>
    </form>
    </div>
  );
};

export default Profile;





