import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ icon, title, value }) => {
  return (
    <div className='bg-white text-dark p-4 rounded-lg shadow-md flex items-center space-x-6 md:w-fit
    dark:bg-gray-800 dark:text-white hover:'>
        <div className='text-3xl text-purple-400 dark:text-purple-300'>{icon}</div>
        <div>
            <h2 className='text-lg font-semibold dark:text-gray-300'>{title}</h2>
            <p className='text-xl dark:text-gray-300'>{value}</p>
        </div>
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Card;
