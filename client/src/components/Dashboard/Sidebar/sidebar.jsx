import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../../../assets/images/logo.png'

// ICONS //
import { AiOutlineDashboard } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { CgGym } from "react-icons/cg";
import { IoIosPeople } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci"

import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const SIDEBAR_LINKS = [
    { id: 1, path: "/dashboard", name: "Dashboard", icon: AiOutlineDashboard },
    { id: 2, path: "/dashboard/product", name: "Product", icon: BsCart4 },
    { id: 3, path: "/dashboard/editprofile", name: "Profile", icon: ImProfile },
    { id: 4, path: "/dashboard/Classes", name: "Classes", icon: CgGym },
    { id: 5, path: "/dashboard/member", name: "Member", icon: IoIosPeople },
    { id: 6, path: "/dashboard/Trainer", name: "Trainer", icon: FaPeopleGroup },
    { id: 8, path: "#", name: "Logout", icon: CiLogout, onClick: handleLogout },
  ];

  return (
    <>
      <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen pt-2 px-4 bg-white dark:bg-gray-800">
        {/* logo */}
        <div className="mb-8">
          <img src={Logo} alt="logo" className="w-30 hidden md:flex md:h-30 md:mb-[-30px]" />
          <img src={Logo} alt="logo" className="w-8 flex md:hidden" />
        </div>
        {/* logo */}

        {/* Navigation Links */}
        <ul className="mt-6 space-y-4">
          {SIDEBAR_LINKS.map((link, index) => (
            <li
              key={index}
              className={`font-medium rounded-md py-2 px-5 hover:bg-gradient-to-r from-violet-200 to-pink-200 dark:hover:bg-gradient-to-r dark:from-violet-600 dark:to-pink-600 ${
                activeLink === index ? "bg-gradient-to-r from-violet-200 to-pink-200 dark:bg-gradient-to-r dark:from-violet-600 dark:to-pink-600" : ""
              }`}
            >
              {link.path === "#" ? (
                <div
                  className="flex justify-center md:justify-start items-center md:space-x-5 cursor-pointer"
                  onClick={link.onClick || (() => setIsModalOpen(true))}
                >
                  <span>{link.icon()}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 hidden md:flex">
                    {link.name}
                  </span>
                </div>
              ) : (
                <Link
                  to={link.path}
                  className="flex justify-center md:justify-start items-center md:space-x-5"
                  onClick={() => handleLinkClick(index)}
                >
                  <span>{link.icon()}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 hidden md:flex">
                    {link.name}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
        {/* Navigation Links */}

        <div className="w-full absolute bottom-5 left-0 px-4 cursor-pointer text-center">
          <p
            className="flex items-center space-x-2 text-xs text-white py-2 px-5 bg-custom-gradient rounded-full"
            onClick={() => setIsModalOpen(true)} // Open modal on click
          >
            <span>?</span> <span className="hidden md:flex">Need Help</span>
          </p>
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-md shadow-lg max-w-sm mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Need Help?</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Welcome to the Admin Dashboard!
              <br /><br />
              Here, you can manage various aspects of the system:
              <ul className="list-disc ml-5">
                <li>Add, Edit, and Delete: Trainers, Members, Classes, Products, and Categories.</li>
                <li>View Charts: Analyze and view various charts to get insights into the data.</li>
              </ul>
              <br />
              If you have any questions or need further assistance, feel free to reach out!
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-custom-gradient w-full rounded-full text-white px-4 py-2 hover:bg-gradient-to-r from-violet-200 to-pink-200 dark:bg-gradient-to-r dark:from-violet-600 dark:to-pink-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

