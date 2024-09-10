// src/components/GenderChart.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GenderChart = () => {
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);

  useEffect(() => {
    const fetchUserGenders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const users = response.data;
        console.log(users); // Check if users data is being logged
  
        const males = users.filter(user => user.gender === 'male').length;
        const females = users.filter(user => user.gender === 'female').length;
  
        console.log('Males:', males, 'Females:', females); // Check counts
  
        setMaleCount(males);
        setFemaleCount(females);
      } catch (err) {
        console.error('Error fetching user genders', err);
      }
    };
  
    fetchUserGenders();
  }, []);
  

  const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Gender Distribution',
        data: [maleCount, femaleCount],
        backgroundColor: ['#89cff0', '#f4c2c2'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} users`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 shadow-md rounded-lg  dark:bg-gray-800 dark:text-gray-300  dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4">Members Gender Distribution</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default GenderChart;
