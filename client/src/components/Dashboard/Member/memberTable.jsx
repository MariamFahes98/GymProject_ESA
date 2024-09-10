import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DefaultProfile from "../../../assets/images/defaultProfile.png"; // Ensure this path is correct

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center py-4 text-red-500">Error: {error}</p>;

  return (
    <div className='dark:bg-gray-800 h-[700px]'>
    <div className="p-4 h-full dark:border-gray-700 dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Our Members</h1>
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
        <thead>
          <tr className="w-full bg-custom-gradient dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 text-left text-gray-600 dark:text-gray-100">
            <th className="py-3 px-4 text-gray-600">Profile Image</th>
            <th className="py-3 px-4 text-gray-600">First Name</th>
            <th className="py-3 px-4 text-gray-600">Last Name</th>
            <th className="py-3 px-4 text-gray-600">Email</th>
            <th className="py-3 px-4 text-gray-600 text-gray-600">Gender</th>
            <th className="py-3 px-4 text-gray-600">Phone Number</th>
            <th className="py-3 px-4 text-gray-600">Age</th>
            <th className="py-3 px-4 text-gray-600">Length</th>
            <th className="py-3 px-4 text-gray-600">Weight</th>
            <th className="py-3 px-4 text-gray-600">City</th>
            <th className="py-3 px-4 text-gray-600">Country</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="py-2 px-4">
                <img
                  src={user.profileImage ? `http://localhost:5000${user.profileImage}` : DefaultProfile}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{user.firstName || '-'}</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{user.lastName || '-'}</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{user.email || '-'}</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{user.gender || '-'}</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{user.phoneNumber || '-'}</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{user.age || '-'}</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{user.length || '-'}</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{user.weight || '-'}</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{user.city || '-'}</td>
              <td className="py-2 px-4 text-gray-900 dark:text-gray-100">{user.country || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default UserTable;
