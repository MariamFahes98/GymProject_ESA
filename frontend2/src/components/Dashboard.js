import React from 'react';
import Sidebar from './Sidebar';
import SettingsForm from './SettingsForm';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <SettingsForm />
      </div>
    </div>
  );
};

export default Dashboard;
