import React from "react";
import Sidebar from "../Sidebar/sidebar.jsx";
import Header from "../Header/header.jsx";
import Card from "../Card/card.jsx";
import MemberCard from "../Card/membercard.jsx";
import Trainer1 from "../../../assets/images/trainer1.jpg"
import Trainer2 from "../../../assets/images/trainer3.png"
import EditProfileCard from "../Profile/profile.jsx";
import { dataLine, donutData, donutOptions } from '../../../assets/chartdata/ChartData.jsx'
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
    <div>
      <div className="flex">
        <Sidebar />
        <div className="w-full ml-16 md:ml-56">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

