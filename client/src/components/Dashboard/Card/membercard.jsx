// src/Card.jsx
import React from 'react';

const MemberCard = ({ imageSrc, title, value }) => {
  return (
    <div className="bg-white  shadow-lg rounded-lg overflow-hidden border border-gray-200  dark:bg-gray-800 dark:text-gray-100  dark:border-gray-700  ">
      <div className="relative">
        <img src={imageSrc} alt={title} className="w-full h-32 object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-400">{title}</h3>
        <p className="text-sm font-semibold  text-gray-500 dark:text-gray-400"> {value}</p>
      </div>
    </div>
  );
};

export default MemberCard;
