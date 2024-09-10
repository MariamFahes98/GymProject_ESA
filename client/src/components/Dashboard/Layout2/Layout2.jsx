import React from "react";
import Sidebar from "../Sidebar/sidebar.jsx";
import Header from "../Header/header.jsx";
import Card from "../Card/card.jsx";
import MemberCard from "../Card/membercard.jsx";
import Trainer1 from "../../../assets/images/trainer1.jpg"
import Trainer2 from "../../../assets/images/trainer3.png"
import EditProfileCard from "../Profile/profile.jsx";
import { dataLine, dataBar, donutData, donutOptions } from '../../../assets/chartdata/ChartData.jsx'
import { Line, Bar } from 'react-chartjs-2'
import { FaBox } from 'react-icons/fa'
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, ArcElement);

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <div>
        <div className="flex">
          <Sidebar />
          <div className="w-full ml-16 md:ml-56">
            <Header />
            <Outlet />
            <div className="md:flex">
              <div>
                <div className='grow p-8 '>
                  <h2 className='text-2xl mb-4'>Dashboard</h2>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
                    <Card icon={<CgGym />} title="Classes" value="20" />
                    <Card icon={<FaBox />} title="Products" value="120" />
                    <Card icon={<FaPeopleGroup />} title="Trainer" value="30" />
                    <Card icon={<IoIosPeople />} title="Member" value="50" />
                  </div>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md'>
                      <h3 className='text-lg font-semibold mb-4'>Sales Data</h3>
                      <Line data={dataLine} />
                    </div>

                    <div className='bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md'>
                      <h3 className='text-lg font-semibold mb-4'>Products Data</h3>
                      <Bar data={dataBar} />
                    </div>

                    <div className="bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
                      <h2 className="text-lg font-semibold mb-4 ">Classes Chart</h2>
                      <div className="h-80 w-full">
                        <Doughnut data={donutData} options={donutOptions} />
                      </div>
                    </div>
               
                  </div>
                  <div >
                    <div className="grow p-4 mt-8">
                      <h2 className='text-lg font-semibold mb-4'>Popular Trainers</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <MemberCard
                          imageSrc={Trainer1} // Adjust the path as needed
                          title="Trainer"
                          value="50"
                        />
                        <MemberCard
                          imageSrc={Trainer2} // Adjust the path as needed
                          title="Trainer"
                          value="20"
                        />
                        {/* Add more cards here if needed */}
                      </div>
                    </div>
                    <div className="grow p-4 mt-8">
                      <h2 className='text-lg font-semibold mb-4'>Popular Members</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <MemberCard
                          imageSrc={Trainer1} // Adjust the path as needed
                          title="Trainer"
                          value="50"
                        />
                        <MemberCard
                          imageSrc={Trainer2} // Adjust the path as needed
                          title="Trainer"
                          value="50"
                        />
                        {/* Add more cards here if needed */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-none w-80 h-[700px] mt-8 ml-8 md:mr-2">
                <EditProfileCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;


