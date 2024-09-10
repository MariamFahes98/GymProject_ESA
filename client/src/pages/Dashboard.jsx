import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "../components/Dashboard/Card/card.jsx";
import MemberCard from "../components/Dashboard/Card/membercard.jsx";
import DefaultProfile from "../assets/images/defaultProfile.png";
import Profile from "../components/Dashboard/Profile/profile.jsx";
import GenderChart from '../components/Dashboard/genderchart/GenderChart.jsx';
import { dataLine, donutData, donutOptions } from '../assets/chartdata/ChartData.jsx';
import { Line, Bar } from 'react-chartjs-2';
import { FaBox } from 'react-icons/fa';
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, ArcElement);
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [classCount, setClassCount] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [trainerCount, setTrainerCount] = useState(null);
  const [memberCount, setMemberCount] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [classCapacities, setClassCapacities] = useState([]);
  const [popularTrainers, setPopularTrainers] = useState([]);
  const [popularMembers, setPopularMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/top-products');
        setTopProducts(response.data);
      } catch (error) {
        console.error('Error fetching top products:', error);
        setError('Failed to load top products');
      }
    };
    fetchTopProducts();
  }, []);

  useEffect(() => {
    const fetchOldestTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trainers/oldest');
        setPopularTrainers(response.data);
      } catch (error) {
        console.error('Error fetching popular trainers:', error);
        setError('Failed to load popular trainers');
      }
    };
    fetchOldestTrainers();
  }, []);

  useEffect(() => {
    const fetchOldestMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/oldest', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPopularMembers(response.data);
      } catch (error) {
        console.error('Error fetching popular members:', error);
        setError('Failed to load popular members');
      }
    };
    fetchOldestMembers();
  }, []);

  useEffect(() => {
    const fetchClassCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/class/count');
        setClassCount(response.data.count);
      } catch (error) {
        console.error('Error fetching class count:', error);
        setError('Failed to load class count');
      }
    };
    fetchClassCount();
  }, []);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/count');
        setProductCount(response.data.count);
      } catch (error) {
        console.error('Error fetching product count:', error);
        setError('Failed to load product count');
      }
    };
    fetchProductCount();
  }, []);

  useEffect(() => {
    const fetchTrainerCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trainers/count');
        setTrainerCount(response.data.count);
      } catch (error) {
        console.error('Error fetching trainer count:', error);
        setError('Failed to load trainer count');
      }
    };
    fetchTrainerCount();
  }, []);

  useEffect(() => {
    const fetchMemberCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/count', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMemberCount(response.data.count);
      } catch (error) {
        console.error('Error fetching member count:', error);
        setError('Failed to load member count');
      }
    };
    fetchMemberCount();
  }, []);

  useEffect(() => {
    const fetchClassCapacities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/class/capacities');
        setClassCapacities(response.data);
      } catch (error) {
        console.error('Error fetching class capacities:', error);
        setError('Failed to load class capacities');
      }
    };
    fetchClassCapacities();
  }, []);

  const donutData = {
    labels: classCapacities.map((classObj) => classObj.name),
    datasets: [
      {
        label: 'Capacity',
        data: classCapacities.map((classObj) => classObj.capacity),
        backgroundColor: ['#DDA0DD', '#800080', '#E6E6FA', '#C71585', '#FF69B4'],
        borderColor: ['#452c63', '#4B0082', '#33006F', '#8A2BE2', '#FF1493'],
        borderWidth: 1,
      },
    ],
  };

  const dataBar = {
    labels: topProducts.map(product => product.name),
    datasets: [
      {
        label: 'Quantity',
        data: topProducts.map(product => product.quantity),
        backgroundColor: 'rgba(214, 188, 250, 1)',
        borderColor: 'rgba(214, 188, 250, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='md:flex bg-white text-black dark:bg-gray-800'>
      <div className='grow p-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
          <Card icon={<CgGym />} title="Classes" value={classCount !== null ? classCount : error ? error : 'Loading...'} />
          <Card icon={<FaBox />} title="Products" value={productCount !== null ? productCount : error ? error : 'Loading...'} />
          <Card icon={<FaPeopleGroup />} title="Trainer" value={trainerCount !== null ? trainerCount : error ? error : 'Loading...'} />
          <Card icon={<IoIosPeople />} title="Member" value={memberCount !== null ? memberCount : error ? error : 'Loading...'} />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md'>
            <h3 className='text-lg font-semibold mb-4 dark:text-gray-300'>Products Data</h3>
            {topProducts.length > 0 ? (
              <Bar data={dataBar} />
            ) : (
              <p>{error ? error : 'Loading products data...'}</p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            {classCapacities.length > 0 ? (
              <Doughnut data={donutData} options={donutOptions} />
            ) : (
              <p>{error ? error : 'Loading class capacities...'}</p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <GenderChart />
          </div>
        </div>

        <div>
          <div className="grow p-4 mt-8">
            <h2 className='text-lg font-semibold mb-4 dark:text-gray-300'>Popular Trainers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {popularTrainers.length > 0 ? (
                popularTrainers.map(trainer => (
                  <MemberCard
                    key={trainer._id}
                    imageSrc={`http://localhost:5000/uploads/trainers/${trainer.imagePath}`}
                    title={`${trainer.firstName} ${trainer.lastName}`}
                    value={trainer.specialties.join(', ')}
                  />
                ))
              ) : (
                <p>{error ? error : 'Loading trainers...'}</p>
              )}
            </div>
          </div>

          <div className="grow p-4 mt-8">
            <h2 className='text-lg font-semibold mb-4 dark:text-gray-300'>Popular Members</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {popularMembers.length > 0 ? (
                popularMembers.map(member => (
                  <MemberCard
                    key={member._id}
                    imageSrc={member.profileImage ? `http://localhost:5000${member.profileImage}` : DefaultProfile}
                    title={`${member.firstName} ${member.lastName}`}
                    value={`Registered on ${new Date(member.registeredDate).toLocaleDateString()}`}
                  />
                ))
              ) : (
                <p>{error ? error : 'Loading members...'}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-none w-80 h-[700px] mt-8 ml-8 md:mr-2">
        <Profile />
      </div>
    </div>
  );
};

export default Dashboard;
